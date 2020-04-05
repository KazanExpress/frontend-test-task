<template>
    <div class="card-wrapper">
        <li
                class="card"
                v-for="(project, filteredIndex) in filteredList()"
                :key="filteredIndex"
                :id="project.id"
                :draggable="true"
                @dragstart="dragStart"
        >

            <div class="title-wrapper">
                <div v-if="project.titleEdit"
                     class="card-title card-title--view-block"
                >
                    <h3 @click="editProjectTitleToggle(project.id)">
                        Тикет: {{ project.title }}
                    </h3>
                    <div class="card-title__controls">
                        <button
                                class="btn btn--not-done"
                                @click="setProjectInWork(project.id)"
                                title="В работу"
                        ></button>
                        <button
                                class="btn btn--done"
                                @click="setProjectDone(project.id)"
                                title="Готово"
                        ></button>
                        <button
                                class="btn btn--delete"
                                @click="softDelete(project.id)"
                                title="Удалить"
                        >
                        </button>
                    </div>
                </div>
                <div v-else class="card-title card-title--input-block">
                    <input
                            v-model="newProjectName[getProjectIndexById(project.id)]"
                            @blur="setProjectTitle(project.id)"
                            class="card-title__block"
                            type="text"
                            placeholder="Название тикета"
                            ref="project"
                    >
                    <button
                            class="btn btn--title-add"
                            @click="setProjectTitle(project.id)"
                            title="Сохранить"
                    >
                    </button>
                </div>
            </div>
            <div class="card__task-list">
                <div class="task-title">
                    <h4>Задач: {{ getTaskList(project.id).length }}</h4>
                </div>
                <ul>
                    <task-list
                            :index="filteredIndex"
                            :projectId="project.id" />
                </ul>
            </div>
        </li>
    </div>
</template>

<script>
    import TaskList from '@/components/TaskList'

    import {mapState, mapGetters} from 'vuex'

    export default {
        name: "Card",
        components: {
            TaskList
        },
        props: {
            value: {
                type: String,
                require: true
            },
            searchText: {
                type: String,
                require: false
            },

        },
        data() {
            return {
                newProjectName: [],
                projectInFocus: [],
                items: null
            }
        },
        computed: {
            ...mapState('data', ['projectList']),
            ...mapGetters('data', ['getProjectIndexById', 'getProjectTaskList', 'getProjectProgressList', 'getProjectProgressLength', 'getProjectTitle', 'getProjectLength','getProjectTaskListLength']),
        },
        methods: {
            getTaskList(project){
                let index = this.getProjectIndexById(project)
                return this.getProjectTaskList(index)
            },

            setProjectInWork(id) {
                let index = this.getProjectIndexById(id);
                this.$store.commit('data/setProjectInWork', {index})
            },

            setProjectDone(id) {
                let index = this.getProjectIndexById(id);
                this.$store.commit('data/setProjectDone', {index})
            },

            softDelete(id) {
                let index = this.getProjectIndexById(id);
                if(this.projectList[index].progress === 'Архив') {
                    this.$store.commit('data/deleteProject', {index})
                } else {
                    this.$store.commit('data/setProjectInArchive', {index})
                }


            },

            editProjectTitleToggle(id) {
                let index = this.getProjectIndexById(id);
                this.newProjectName[index] = this.getProjectTitle(index)
                this.$store.commit('data/editProjectTitleToggle', {index})

                if(this.projectInFocus.length === 0) {
                    this.$nextTick(() => this.$refs.project[0].focus())
                } else {
                    this.projectInFocus[index] = this.$refs.project.length
                    this.$nextTick(() => this.$refs.project[this.projectInFocus[index]].focus())
                }
            },


            setProjectTitle(id) {
                let index = this.getProjectIndexById(id);
                let newName = {
                    title: this.newProjectName[index] ? this.newProjectName[index].trim() : 'Без имени',
                    index
                }
                this.$store.commit('data/setProjectTitle', newName)
                this.$store.commit('data/editProjectTitleToggle', {index})
            },

            filteredList() {
                let progressList = this.getProjectProgressList(this.value)

                if (progressList && this.searchText) {
                    return progressList.filter(project => {
                        const title = project.title.toLowerCase()
                        const result = title.includes(this.searchText ? this.searchText.toLowerCase() : '')
                        this.items = result.length
                        return result
                    })
                } else if (progressList && !this.searchText) {
                    this.items = progressList.length
                    return progressList
                } else {
                    this.items = 0
                    return []
                }
            },

            dragStart(e) {
                const target = e.target;
                e.dataTransfer.setData("card_id", target.id);

                setTimeout(() => {
                    target.style.opacity = "0.5";
                }, 0);

            }
        }
    }
</script>

<style scoped lang="sass">
    .card-wrapper
        max-width: 90%
        margin-left: auto
        margin-right: auto

    .card-title
        margin-bottom: 10px

        &:hover
            background: #fcfcfc

        &--input-block
            display: flex
            align-items: center
            justify-content: center

        &__block
            width: 90%
            height: 14px

        &--view-block
            display: flex
            justify-content: space-between

        &__controls
            display: flex

</style>
