import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import Clipboard from 'v-clipboard'

Vue.use(Clipboard)
Vue.use(Vuex)
Vue.config.productionTip = false

const store = new Vuex.Store({
    state: {
        items: JSON.parse(sessionStorage.getItem('items')) || {children: [], text: '', closed: ''},
        name: sessionStorage.getItem('name') || 'New Project',
        root: JSON.parse(sessionStorage.getItem('root')) || [],
        search: sessionStorage.getItem('search') || ''
    },
    mutations: {
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
            state.name =name
        },
        addItem(state, newItem) {
            let current = state.items
            state.root.forEach(index => {
                current = current.children[index]
            })
            current.children.push(newItem)
        },
        deleteItem(state, payload) {
            let current = state.items
            state.root.forEach(index => {
                current = current.children[index]
            })
            current.children.splice(payload.id, 1)
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
        getRoot: state => {
            return state.root
        },
        getName: state => {
            return state.name
        }
    }
})

new Vue({
    render: h => h(App),
    store: store,
}).$mount('#app')


