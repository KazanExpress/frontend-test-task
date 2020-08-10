<template>
    <div>
        <div>
            <div class="d-flex">
                <input v-model="search" placeholder="Search todo" type="text"
                       class="form-control p-3 pl-3 m-2 mb-1 neo search">
            </div>
            <Tags/>
        </div>
        <div>
            <ToDoShort v-for="item in searchedList" :index="item.index" :key="item.index" :item="item.child"/>
        </div>
        <div v-if="!searchedList.length" class="alert alert-light text-center" role="alert">
            Nothing found
        </div>
        <div>
            <AddButton :click-function="add" :class-name="'d-flex p-2 pl-3'" :placeholder="'add todo'"/>
        </div>
    </div>
</template>

<script>
    import AddButton from './AddButton'
    import ToDoShort from './ToDoShort'
    import Tags from './Tags'

    export default {
        name: 'ToDoList',
        components: {Tags, AddButton, ToDoShort},
        props: ['children'],
        data: () => ({
            search: ''
        }),
        methods: {
            add(text) {
                this.$store.commit('addItem', {text: text, closed: false, children: []})
                this.$store.commit('updateItems')
            }
        },
        watch: {
            root() { // change when go up or down
                this.search = ''
            }
        },
        computed: {
            filters() {
                return this.$store.getters.getFilters
            },
            root() {
                return this.$store.getters.getRoot
            },
            searchedList() {
                return this
                    .children
                    .map((child, index) => ({child: child, index: index})).filter(item => {
                            let total = item.child.text.toLowerCase().includes(this.search.toLowerCase())
                            this.filters.filter(filter => filter.selected).forEach(filter => {
                                const f = new Function(filter.function.args, filter.function.body)
                                console.log(f)
                                total = total && f(item.child)
                                console.log(f(item.child))
                            })
                            return total
                        }
                    )
            }
        }
    }
</script>
