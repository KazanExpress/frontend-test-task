<template>
    <div>
        <div v-if="children.length>1" class="d-flex mb-4">
            <input v-model="search" placeholder="Search todo" type="text" class="form-control p-3 pl-3 m-2 neo search">
        </div>
        <div>
            <ToDoShort v-for="item in searchedList" :index="item.index" :key="item.index" :item="item.child"/>
        </div>
        <div>
            <AddButton/>
        </div>
    </div>
</template>

<script>
    import AddButton from './AddButton'
    import ToDoShort from './ToDoShort'

    export default {
        name: 'ToDoList',
        components: {AddButton, ToDoShort},
        props: ['children'],
        data: () => ({
            search: ''
        }),
        watch: {
            root() { // when go up or down
                this.search=''
            }
        },
        computed: {
            root() {
                return this.$store.getters.getRoot
            },
            searchedList() {
                return this
                    .children
                    .map((child, index) => {
                       return {'child': child, 'index': index}
                    }).filter(item => {
                        return item.child.text.toLowerCase().includes(this.search.toLowerCase())
                    })
            }
        }
    }
</script>
