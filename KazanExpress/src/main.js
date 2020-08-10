import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import Clipboard from 'v-clipboard'

Vue.use(Clipboard)
Vue.use(Vuex)
Vue.config.productionTip = false

const initFilters =
    [
        {
            text: 'done',
            type: 'init',
            selected: false,
            function: {
                args: 'a',
                body: 'return a.closed'
            }
        },
        {
            text: 'fully done',
            type: 'init',
            selected: false,
            function: {
                args: 'a',
                body: 'let flag = a.closed; a.children.forEach(c => {if (!c.closed) {flag = false}}); return flag;'
            },
        }
    ]

const getItemByRoot = (items, root) => {
    let current = items
    root.forEach(index => {
        current = current.children[index]
    })
    return current
}

const store = new Vuex.Store({
    state: {
        items: JSON.parse(sessionStorage.getItem('items')) || {children: [], text: '', closed: ''},
        name: sessionStorage.getItem('name') || 'New Project',
        root: JSON.parse(sessionStorage.getItem('root')) || [],
        search: sessionStorage.getItem('search') || '',
        filters: JSON.parse(sessionStorage.getItem('filters')) || initFilters,
        onDrag: false
    },
    mutations: {
        onDrag(state, flag) {
            state.onDrag=flag
        },
        updateFilters(state) {
            sessionStorage.setItem('filters', JSON.stringify(state.filters))
        },
        updateItems(state) {
            sessionStorage.setItem('items', JSON.stringify(state.items))
        },
        updateRoot(state) {
            sessionStorage.setItem('root', JSON.stringify(state.root))
        },
        updateName(state) {
            sessionStorage.setItem('name', state.name)
        },
        updateSearch(state) {
            sessionStorage.setItem('search', state.search)
        },
        goTo(state, index) {
            state.root.push(index)
        },
        back(state) {
            state.root.pop()
        },
        setName(state, name) {
            state.name = name
        },
        setSearch(state, search) {
            state.search = search
        },
        toggleFilter(state, index) {
            state.filters[index].selected = !state.filters[index].selected
        },
        addRegex(state, pattern) {
            state.filters.push({
                text: pattern, selected: true, type: 'regex', function: {
                    args: 'a', // need to set function into json
                    body: `const r = new RegExp('${pattern}', 'g'); return a.text.match(r)`
                }
            })
        },
        addItem(state, item) {
            getItemByRoot(state.items, state.root).children.push(item)
        },
        deleteFilter(state, index) {
            state.filters.splice(index, 1)
        },
        deleteItem(state, id) {
            getItemByRoot(state.items, state.root).children.splice(id, 1)
        },
        dropSide(state, payload) {
            if (payload.target == payload.drop) {
                return
            }
            console.log('drop before')
            const current = getItemByRoot(state.items, state.root)
            const drop = current.children[payload.drop]
            current.children.splice(payload.drop, 1)
            current.children.splice(payload.target + payload.isAfter, 0, drop)
        },
        dropInto(state, payload) {
            console.log('drop into')
            if (payload.target == payload.drop) {
                return
            }
            const current = getItemByRoot(state.items, state.root)
            const drop = current.children[payload.drop]
            current.children[payload.target].children.push(drop)
            current.children.splice(payload.drop, 1)
        },
        dropBack(state, payload) {
            let current = state.items
            let parent = null
            state.root.forEach(index => {
                parent = current
                current = current.children[index]
            })
            const drop = current.children[payload.drop]
            current.children.splice(payload.drop, 1)
            parent.children.push(drop)
        },
        deleteSelf(state) {
            const id = state.root.pop()
            const current = getItemByRoot(state.items, state.root)
            current.children.splice(id, 1)
        },
        closeItem(state, index) {
            const current = getItemByRoot(state.items, state.root)
            current.children[index]['closed'] = !current.children[index]['closed']
        },
        closeSelf(state) {
            const current = getItemByRoot(state.items, state.root)
            current.closed = !current.closed
        },
        export(state) {
            const content = JSON.stringify(state.items)
            const fileName = `${state.name}.todo`
            const data = `data:text/plain;charset=utf-8,${encodeURIComponent(content)}`
            const link = document.createElement('a')
            link.setAttribute('href', data)
            link.setAttribute('download', fileName)
            link.click()
        },
        import(state, payload) {
            state.items = payload.data
            state.name = payload.name
            state.root = []
        }
    },
    getters: {
        getCurrent: state => {
            return getItemByRoot(state.items, state.root)
        },
        getItemByRoot: state => root => {
            return getItemByRoot(state.items, root)
        },
        inSearch: state => {
            return !(state.search.length || state.filters.filter(x => x.selected).length)
        }
    },
    actions: {
        deleteSelf({commit}) {
            commit('deleteSelf')
            commit('updateItems')
        },
        addItem({commit}, item) {
            commit('addItem', item)
            commit('updateItems')
        },
        setName({commit}, name) {
            commit('setName', name)
            commit('updateName')
        },
        setSearch({commit}, search) {
            commit('setSearch', search)
            commit('updateSearch')
        },
        goTo(context, index) {
            context.commit('goTo', index)
            context.commit('updateRoot')
        },
        back(context) {
            context.commit('back')
            context.commit('updateRoot')
        },
        toggleFilter(context, index) {
            context.commit('toggleFilter', index)
            context.commit('updateFilters')
        },
        addRegex(context, pattern) {
            context.commit('addRegex', pattern)
            context.commit('updateFilters')
        },
        deleteFilter({commit}, index) {
            commit('deleteFilter', index)
            commit('updateFilters')
        },
        deleteItem({commit}, index) {
            commit('deleteItem', index)
            commit('updateItems')
        },
        dropSide({commit}, payload) {
            commit('dropSide', payload)
            commit('updateItems')
        },
        dropInto({commit}, payload) {
            commit('dropInto', payload)
            commit('updateItems')
        },
        dropBack({commit}, payload) {
            commit('dropBack', payload)
            commit('updateItems')
        },
        closeItem({commit}, index) {
            commit('closeItem', index)
            commit('updateItems')
        },
        closeSelf({commit}) {
            commit('closeSelf')
            commit('updateItems')
        },
        import({commit}, payload) {
            commit('import', payload)
            commit('updateItems')
            commit('updateName')
            commit('updateRoot')
        }
    }
})

new Vue({
    render: h => h(App),
    store,
}).$mount('#app')


