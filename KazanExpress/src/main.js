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
const store = new Vuex.Store({
    state: {
        items: JSON.parse(sessionStorage.getItem('items')) || {children: [], text: '', closed: ''},
        name: sessionStorage.getItem('name') || 'New Project',
        root: JSON.parse(sessionStorage.getItem('root')) || [],
        search: sessionStorage.getItem('search') || '',
        filters: JSON.parse(sessionStorage.getItem('filters')) || initFilters
    },
    mutations: {
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
        toggleFilter(state, index) {
            state.filters[index].selected = !state.filters[index].selected
        },
        addRegex(state, pattern) {
            state.filters.push({text: pattern, selected: true, type: 'regex', function: {args: 'a', // need to set function into json
                        body: `const r = new RegExp('${pattern}', 'g'); return a.text.match(r)`}})
        },
        addItem(state, newItem) {
            let current = state.items
            state.root.forEach(index => {
                current = current.children[index]
            })
            current.children.push(newItem)
        },
        deleteFilter(state, index) {
            state.filters.splice(index, 1)
        },
        deleteItem(state, payload) {
            let current = state.items
            state.root.forEach(index => {
                current = current.children[index]
            })
            current.children.splice(payload.id, 1)
        },
        dropBefore(state, payload) {
            let current = state.items
            state.root.forEach(index => {
                current = current.children[index]
            })
            const drop = current.children[payload.drop]
            current.children.splice(payload.drop, 1)
            current.children.splice(payload.target, 0, drop)
        },
        dropInto(state, payload) {
            if (payload.target==payload.drop) {
                return
            }
            let current = state.items
            state.root.forEach(index => {
                current = current.children[index]
            })
            const drop = current.children[payload.drop]
            current.children.splice(payload.drop, 1)
            current.children[payload.target].children.push(drop)
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
            let current = state.items
            const id = state.root.pop()
            state.root.forEach(index => {
                current = current.children[index]
            })
            current.children.splice(id, 1)
        },
        closeItem(state, payload) {
            let current = state.items
            state.root.forEach(index => {
                current = current.children[index]
            })
            current.children[payload.id]['closed'] = !current.children[payload.id]['closed']
        },
        closeSelf(state) {
            let current = state.items
            state.root.forEach(index => {
                current = current.children[index]
            })
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
        getItemByRoot: state => {
            let current = state.items
            state.root.forEach(index => {
                current = current.children[index]
            })
            return current
        },
        getFilters: state => {
            return state.filters
        },
        getRoot: state => {
            return state.root
        },
        getName: state => {
            return state.name
        },
        getTest: state => {
            return state.test
        }
    }
})

new Vue({
    render: h => h(App),
    store,
}).$mount('#app')


