<template>
  <div class="leftSection">
    <div class="leftSection__title">
      <span>to—do app</span>
    </div>
    <div class="leftSection__nameProject namedProject">
      <p 
        v-if="!editNameProject"
        :title="getTitle"
      >{{getTitle}}
      </p>
      <input 
          v-else
          v-model="newTitleProject"
          @keyup.enter="editTitleProject"
          class="namedProject__field" 
          type="text" 
          placeholder="Введите название"
      >
      <button 
          v-if="!editNameProject" 
          class="namedProject__editButton" 
          @click="activeEditName"
      >
        <img 
          src="../assets/iconEdit.svg" alt="edit" 
          width="17" 
          title="Редактировать название"
        >
      </button>
      <button
          v-else
          class="namedProject__editButton" 
          @click="editTitleProject"
      >
        <img 
          src="../assets/iconSave.svg" alt="save" 
          width="17" 
          title="Сохранить название"
        >
      </button>
    </div>
    <div class="leftSection__text">
      <p v-if="getTodosLength > 0">Хей, количество твоих невыполненых задач: <span class="leftSection__unfinishedNumber">{{getCount}}</span></p>
      <p v-else>Упс, cписок задач <span class="leftSection__unfinishedNumber">пуст</span></p>
    </div>
  </div>  
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "TodoHeader",
  data() {
    return {
      editNameProject: false,
      newTitleProject: null
    }
  },
  computed: {
    ...mapGetters('data', ['getTitleProject', 'getCountUnCompletedTodo', 'getLengthTodos']),
    
    getTitle() {
      let title = ""
      if(this.getTitleProject !== '') {
        title = this.getTitleProject
        document.title = this.getTitleProject
        return title
      } else {
        title = "Назовите свой проект"
        return title
      }
    },
    getCount() {
      if(this.getCountUnCompletedTodo) {
        return this.getCountUnCompletedTodo
      } else {
        return 0
      }
    },
    getTodosLength() {
      if(this.getLengthTodos) {
        return this.getLengthTodos
      } else {
        return 0 
      }
    }
  },
  methods: {
    activeEditName() {
      this.editNameProject = !this.editNameProject
    },
    editTitleProject() {
      this.$store.commit("data/editTitleProject", this.newTitleProject !== null ? this.newTitleProject : "Назовите свой проект")
      this.editNameProject = false
      this.newTitleProject = null
    }
  }
}
</script>

<style scoped lang="sass">
  .leftSection
    &__title 
      font-size: 16px
      font-weight: bold
      text-align: left
      color: #FEA958
    &__nameProject
      font-size: 19px
      margin-top: 35px
      font-weight: bold
      text-align: left
      p
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis
        text-align: left
    &__text
      width: 345px
      text-align: left
      font-size: 38px
      word-break: break-word
    &__unfinishedNumber
      color: #FEA958
      border-bottom: 3px solid #FEA958
      font-weight: bold
  .namedProject
    display: flex
    align-items: center
    &__field
      width: 200px
    &__editButton
      margin-left: 10px
      padding-top: 4px
 
</style>