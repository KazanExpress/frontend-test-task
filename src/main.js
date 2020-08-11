import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import Clipboard from 'v-clipboard'

Vue.use(Clipboard)
Vue.use(Vuex)
const eventHub = new Vue()
Vue.prototype['$eventHub'] = eventHub // bus event, need for alert message
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
                args: 'a', // break wrapper for lazy loop
                body: 'let flag = a.closed;if(!flag) return false; const b={};try{ a.children.forEach(c => {if (!c.closed) {throw b}});}catch(e){if(e===b)return false;else throw e;} return true;'
            },
        }
    ]

/**
 * Represents a pathfinder of recursive object
 * @param {Object} items - general items
 * @param {Array} root - path( array of indexes) to right item
 */
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
            state.onDrag = flag
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
        // in the future can put item in a blob file and transfer to another pages, but now all arranged by indexes
        dropSide(state, payload) {
            if (+payload.target === +payload.drop) {
                return
            }
            const current = getItemByRoot(state.items, state.root)
            const drop = current.children[payload.drop]
            if (payload.target < payload.drop) {
                current.children.splice(payload.drop, 1)
                current.children.splice(payload.target + (+payload.isAfter), 0, drop)
            } else {
                current.children.splice(payload.target + (+payload.isAfter), 0, drop)
                current.children.splice(payload.drop, 1)
            }
        },
        dropInto(state, payload) {
            console.log('drop into')
            if (+payload.target === +payload.drop) {
                return
            }
            const current = getItemByRoot(state.items, state.root)
            const drop = current.children.splice(payload.drop, 1)[0]
            current.children[payload.target].children.push(drop)
        },
        dropBack(state, payload) {
            let rootPopped = [...state.root]
            let childId = rootPopped.pop()
            let parent = getItemByRoot(state.items, rootPopped)
            const drop = parent.children[childId].children.splice(payload.drop, 1)[0] // dropped item
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
        },
        inStart: state => {
            return !state.root.length
        }
    },
    actions: {
        export({commit}) {
            commit('export')
        },
        deleteSelf({commit}) {
            commit('deleteSelf')
            commit('updateItems')
            commit('updateRoot')
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
