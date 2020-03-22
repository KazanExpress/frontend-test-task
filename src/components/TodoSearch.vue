<template>
  <div class="todoSearch">
    <div class="todoSearch__block">
      <div 
        v-if="!activeAddNewItem && allTodosLength > 0"
        class="searchBlock"
      >
        <div>
          <input 
              class="searchBlock__field" 
              type="text" 
              v-model="search" 
              placeholder="Поиск..."
          >
        </div>
        <div>
          <button 
            class="searchBlock__addNewTaskButton" 
            @click="toggleActiveAddNewItem"
          >
            <img 
              src="../assets/iconNewItemTodo.png" 
              alt="newItemBtn" 
              width="17" 
              title="Добавить новую задачу"
            >
          </button>
        </div>
      </div>
      <div 
        v-else 
        class="searchBlock__createNewItem"
      >
        <input 
            ref="searchField"
            class="searchBlock__createField"
            type="text" 
            v-model="newTodoName" 
            placeholder="Напишите название задачи здесь"
            @keyup.enter="addNewItem"
        >
       <button
          class="searchBlock__addNewTaskButton" 
          @click="addNewItem"
        >
          <img 
            src="../assets/iconNewItem.svg" 
            alt="newItemBtn" 
            width="17" 
            title="Добавить задачу">
        </button>
        <button 
          v-if="allTodosLength > 0"
          @click="toggleActiveAddNewItem"
          class="searchBlock__cancelCreateButton"
        >Отмена</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "TodoSearch",
  data() {
    return {
      activeAddNewItem: false,
      search: null,
      newTodoName: null,
    }
  },
  watch: {
    search(value) {
      this.$emit("search", value)
      sessionStorage.setItem('search', this.search)
    }
  },
  created() {
    this.checkSavedSearch()
  },
  computed: {
    ...mapGetters('data', ["getLengthTodos"]),

    allTodosLength() {
      if (this.getLengthTodos) {
          return this.getLengthTodos
        } else {
          return 0
        }
    }
  },
  methods: {
    toggleActiveAddNewItem() {
      this.activeAddNewItem = !this.activeAddNewItem
      if(this.activeAddNewItem !== false) {
        this.$nextTick(() => this.$refs.searchField.focus())
      }
    },
    checkSavedSearch() {
      let savedSearch = sessionStorage.getItem('search')
      if (savedSearch) this.search = savedSearch
    },
    addNewItem() {
      const todo = {
        title: this.newTodoName !== null ? this.newTodoName : "Отредактируйте название",
        completed: false,
        editable: false 
      }

      this.$store.commit('data/addNewItem', todo)
      this.activeAddNewItem = true
      this.newTodoName = null
      this.$nextTick(() => this.$refs.searchField.focus())
    }
  }
}
</script>

<style scoped lang="sass">
  .todoSearch
    &__block
      margin-bottom: 39px
  .searchBlock
    display: flex
    justify-content: center
    align-items: center
    &__field
      width: 200px
      height: 20px
    &__createField
      width: 300px
      height: 30px
      font-size: 17px
      border-color: #FEA958
    &__addNewTaskButton
      width: 50px
      margin-left: 5px
      margin-right: 10px
      padding-top: 3px
    &__createNewItem
      display: flex
      justify-content: center
      align-items: center
    &__cancelCreateButton
      font-size: 18px
</style>