<template>
  <div class="container">
    <div class="container__wrapper">
      <div class="container__welcomeSection">
        <todo-left-section  />
      </div>
      <div class="container__mainSection">
        <todo-search @search="updateSearchValue" />
        <todo-list :search="search" />
      </div>
    </div>
  </div>
</template>

<script>

import TodoLeftSection from '@/components/TodoLeftSection'
import TodoSearch from '@/components/TodoSearch'
import TodoList from '@/components/TodoList'

import {mapState} from 'vuex'


export default {
  name: "TodoApp",
  
  components: {
    TodoLeftSection,
    TodoSearch,
    TodoList
  },

  computed: {
    ...mapState('data', ['todos'])
  },

  data() {
    return {
      search: null
    }
  },
  
  methods: {
    updateSearchValue(value) {
      this.search = value
    }
  }

}
</script>

<style lang="sass">
  .container
    display: flex
    justify-content: center 
    &__wrapper
      display: flex
      align-items: felx-start
      width: 95%
      max-width: 1000px
    &__welcomeSection
      width: 335px
      border-right: 2px solid #eaeaea
    &__mainSection
      width: 100%
      padding-left: 13px
      padding-right: 20px
      max-height: 600px
      overflow-y: auto
      overflow-x: hidden
</style>