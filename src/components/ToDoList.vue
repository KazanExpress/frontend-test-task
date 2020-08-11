<template>
    <div>
        <div class="transition" :class="{'hidden':$store.state.onDrag}">
            <div class="d-flex">
                <input @copy.stop.self @paste.stop @cut.stop @input="change"
                       :value="search" placeholder="Search todo"
                       type="text"
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
        <div class="p-2">
            <transition name="fadeHeight" mode="out-in">
                <AddButton v-if="!$store.state.onDrag" :click-function="add" :class-name="'d-flex p-2 pl-3'"
                           :placeholder="'add todo'"/>
            </transition>
        </div>
    </div>
</template>

<script>
    import AddButton from './AddButton'
    import ToDoShort from './ToDoShort'
    import Tags from './Tags'
    import {mapState} from 'vuex'

    /**
     * Represents a list of quick view items with filtering  and add button
     * @vue-prop {Array} children - return array of subItems
     * @vue-computed {Array} root - return actual root
     * @vue-computed {Array} filters - return filter array
     * @vue-computed {String} search - return text from search input
     * @vue-event {Void} change - handler for search input update
     * @vue-event {Void} add - clickFunction for add button
     */
    export default {
        name: 'ToDoList',
        components: {Tags, AddButton, ToDoShort},
        props: ['children'],
        computed: {
            ...mapState(
                ['root', 'filters', 'search']
            ),
            searchedList() {
                return this
                    .children
                    .map((child, index) => ({child: child, index: index})).filter(item => {
                            let total = item.child.text.toLowerCase().includes(this.search.toLowerCase())
                            this.filters.filter(filter => filter.selected).forEach(filter => {
                                const f = new Function(filter.function.args, filter.function.body)
                                total = total && f(item.child) // need break for lazy loop, but foreach
                            })
                            return total
                        }
                    )
            }
        },
        watch: {
            root() { // change when go up or down
                this.$store.dispatch('setSearch', '')
            }
        },
        methods: {
            change(e) {
                this.$store.dispatch('setSearch', e.target.value)
            },
            add(text) {
                this.$store.dispatch('addItem', {text: text, closed: false, children: []})
            }
        },
    }
</script>
