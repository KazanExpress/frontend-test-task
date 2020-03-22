<template>
  <div class="todoList"  v-if="todos.length > 0">
    <div v-for="(todo, index) in todoList" 
        :key="index" 
        class="todoList__todos todos"
      >
      <div 
        class="todos__item item"
        :class="{ 'item_completed': todo.completed}"
      >
        <div class="item__currentPosition">
          <span>{{index + 1}}</span>
        </div>
        <div class="item__body bodyTodo">
          <div class="bodyTodo__title">
            <span
              v-if="!todo.editable"
            >{{todo.title}}</span>
            <input
              v-else
              ref="newTitleField"
              type="text"
              v-model="newItemTitle"
              @keyup.enter="editItemTitle(todo, index)"
              placeholder="Введите название"
            >
          </div>
          <button class="bodyTodo__removeButton">
            <img 
              src="../assets/iconRemove.svg" 
              alt="removeItem" 
              title="Удалить задачу" 
              width="17"
              @click="deleteTodo(index)"
            >
          </button>
          <div class="bodyTodo__action">
            <button 
                v-if="!todo.editable" 
                class="bodyTodo__editButton" 
                @click="activeEditItem(todo)"
                title="Изменить задание"
            >
              <img src="../assets/iconEdit.svg" alt="edit" width="17">
            </button>
            <button 
                v-else 
                class="bodyTodo__saveButton"
                @click="editItemTitle(todo, index)"
                title="Сохранить название"
            >
              <img src="../assets/iconSave.svg" alt="save" width="17">
            </button>
            <button 
                v-if="!todo.completed" 
                @click="toggleTodoComplete(index)" 
                title="Выполнить задачу"
            >
              <img
                src="../assets/iconComplete.svg" alt="complete" width="17">
            </button>
            <button 
                v-else 
                title="Возобновить задачу"
                @click="toggleTodoComplete(index)"
            >
              <img src="../assets/iconReload.svg" alt="reload" width="16"> 
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="emptyTodoList" v-else>
    <p>Добавьте свой первый элемент в список дел!</p>
  </div>
</template>

<script>
  import { mapGetters, mapState } from 'vuex'

  export default {
    name: "TodoList",
    props: {
      search: {
        type: String,
        required: false,
        default: ""
      }
    },
    data() {
      return {
        completeItem: false,
        newItemTitle: null
      }
    },
    computed: {
      ...mapGetters('data', ['getSelectedTodo']),
      ...mapState('data', ['todos']),

      todoList() {
        if (this.getSelectedTodo) {
          let todos = this.getSelectedTodo
          let filteredTodos = todos.filter(todo => {
            const title = todo.title.toLowerCase()
            return title.includes(this.search ? this.search.toLowerCase() : '')
          })

          return filteredTodos
        } else {
          return []
        }
      },
    },
    methods: {
      activeEditItem(todo) {
        todo.editable = !todo.editable
      },
      editItemTitle(todo, index) {
        todo.title = this.newItemTitle !== null ? this.newItemTitle : `Задача номер ${index + 1} `
        const editTodo = {
          index: index,
          todo: todo
        }
        this.$store.commit('data/editTodo', editTodo)
        todo.editable = false
        this.newItemTitle = null
      },
      toggleTodoComplete(index) {
        this.$store.commit("data/toggleTodoCompleteStatus", index)
      },
      deleteTodo(index) {
        this.$store.commit("data/deleteTodo", index)
      }
    }
  }
</script>

<style lang="sass">
  .todos
    &__item
      margin-bottom: 15px
  .emptyTodoList
    font-size: 22px
  .item
    display: flex
    max-width: 600px
    border-radius: 5px
    transition: all .3s
    min-height: 90px
    -webkit-box-shadow: 0px 3px 7px 1px rgba(150,150,150,1);
    -moz-box-shadow: 0px 3px 7px 1px rgba(150,150,150,1);
    box-shadow: 0px 3px 7px 1px rgba(150,150,150,1);
    &__currentPosition
      color: #dbdbdb
      font-size: 3rem
      cursor: default
      display: flex
      align-items: center
      justify-content: center
      width: 25%
    &:hover
      .bodyTodo__editButton
        opacity: 1
      .bodyTodo__removeButton
        opacity: 1
    &_completed
      opacity: 0.5

  .bodyTodo
    width: 75%
    position: relative
    &__editButton
      opacity: 0
      transition: all .3s
    &__title
      margin-top: 15px
      text-align: start
      padding: 5px
      color: #353535
      font-size: 18px
      max-width: 340px
      min-height: 35px
      word-wrap: break-word
    &__removeButton
      transition: all .3s
      opacity: 0
      background: #E74C3C!important
      border-bottom-left-radius: 22px
      position: absolute
      top: 0
      right: 0
      img
        margin-right: -3px
    &__action
      display: flex
      align-items: center
      justify-content: flex-end
      margin-bottom: 10px
      margin-right: 10px
    &__unDoneButton
      width: 20px
      height: 20px
      margin-left: 5px
      border: 2px solid grey
</style>