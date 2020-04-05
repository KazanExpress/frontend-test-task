<template>
    <div>
        <div class="task-list"  v-if="getTaskList()">
            <li
                    class="task"
                    v-for="(task, taskIndex) in this.getTaskList()"
                    v-bind:key="taskIndex"
            >
                <div v-if="task.textEdit"
                     class="task-wrapper"
                >
                    <p class="task-wrapper__text"
                       @click="editProjectTaskToggle(taskIndex)"
                       :class="{ 'task-wrapper__text--done': task.isDone }"
                    >
                        {{ task.text }}
                    </p>
                    <div class="task-controls">
                        <button
                                class="btn btn--not-done"
                                @click="setTaskNotDone(task.id)"
                                title="В работу"
                        ></button>
                        <button
                                class="btn btn--done"
                                @click="setTaskDone(task.id)"
                                title="Готово"
                        ></button>
                        <button
                                class="btn btn--delete"
                                @click="deleteTask(task.id)"
                                title="Удалить"
                        ></button>
                    </div>
                </div>

                <div v-else>
                    <textarea
                            v-model="taskTextList[taskIndex]"
                            class="task__text-field"
                            type="text"
                            placeholder="Задача"
                            ref="taskEdit"
                            @blur="editProjectTask(taskIndex)"
                    ></textarea>
                    <button
                            class="btn btn--save"
                            @click="editProjectTask(taskIndex)"
                    >Сохранить</button>
                </div>
            </li>
        </div>
        <div v-if="!newItem"
                class=""
        >
            <span class="btn btn--add"
                    @click="showFields"
            >Добавить пункт</span>
        </div>
        <div v-else-if="newItem" class="" >
            <textarea
                    v-model="newTask"
                    @blur="addNewTask()"
                    class="task__text-field"
                    type="text"
                    placeholder="Новая задача"
                    ref="task"
            ></textarea>
            <button
                    class="btn btn--save"
                    @click="addNewTask()"
            >Сохранить
            </button>
        </div>
    </div>
</template>

<script>
    import { mapState, mapGetters } from 'vuex'

    export default {
        name: "TaskList",
        props: {
            projectId: {
                type: Number,
                require: true
            }
        },
        data() {
            return {
                newItem: false,
                taskTextList: [],
                taskInFocus: [],
                newTask: null
            }
        },
        computed: {
            ...mapState('data', ['projectList']),
            ...mapGetters('data', ['getTaskText', 'getTaskTextToggle', 'getProjectTaskList', 'getProjectTaskListLength', 'getProjectIndexById', 'getTaskIndexById'])
        },
        methods: {
            getTaskList(){
                let index = this.getProjectIndexById(this.projectId)
                return this.getProjectTaskList(index)
            },

            setTaskDone(id) {
                let projectIndex = this.getProjectIndexById(this.projectId)
                let taskTarget = {
                    index: projectIndex,
                    taskId: id
                }
                let task = {
                    index: projectIndex,
                    taskIndex: this.getTaskIndexById(taskTarget)
                }
                this.$store.commit('data/setTaskDone', task)
            },

            setTaskNotDone(id) {
                let projectIndex = this.getProjectIndexById(this.projectId)
                let taskTarget = {
                    index: projectIndex,
                    taskId: id
                }
                let task = {
                    index: projectIndex,
                    taskIndex: this.getTaskIndexById(taskTarget)
                }
                this.$store.commit('data/setTaskNotDone', task)
            },

            deleteTask(id) {
                let projectIndex = this.getProjectIndexById(this.projectId)
                let taskTarget = {
                    index: projectIndex,
                    taskId: id
                }

                let task = {
                    index: projectIndex,
                    taskIndex: this.getTaskIndexById(taskTarget)
                }
                this.$store.commit('data/deleteTask', task)
            },

            showFields() {
                this.newItem = !this.newItem
                if (this.newItem) this.$nextTick(() => this.$refs.task.focus())
            },

            editProjectTaskToggle(taskIndex){
                let task = {
                    index: this.getProjectIndexById(this.projectId),
                    taskIndex
                }
                this.taskTextList[taskIndex] = this.getTaskText(task)
                this.$store.commit('data/editProjectTaskToggle', task)

                if(this.taskInFocus.length === 0) {
                    this.$nextTick(() => this.$refs.taskEdit[0].focus())
                } else {
                    this.taskInFocus[taskIndex] = this.$refs.taskEdit.length
                    this.$nextTick(() => this.$refs.taskEdit[this.taskInFocus[taskIndex]].focus())
                }
            },

            editProjectTask(taskIndex) {
                let task = {
                    newText: this.taskTextList[taskIndex] ? this.taskTextList[taskIndex].trim() : "Пусто",
                    index: this.getProjectIndexById(this.projectId),
                    taskIndex
                }
                this.$store.commit('data/editProjectTask', task)
                this.$store.commit('data/editProjectTaskToggle', task)
            },

            addNewTask() {
                let index = this.getProjectIndexById(this.projectId)
                let task = {
                    task: {
                        id: this.projectList[index].tasksList.length,
                        text: this.newTask ? this.newTask : 'Пусто',
                        isDone: false,
                        textEdit: true
                    },
                    index
                }
                this.$store.commit('data/addNewTask', task)
                this.newTask = null
                this.showFields()
            }
        }
    }
</script>

<style lang="sass">
.task
    list-style: none

.task-wrapper
    display: flex
    flex-direction: row
    justify-content: space-between

    &__text
        flex-basis: 70%
        max-width: 70%
        padding: 3px
        word-break: break-word

        &:hover
            background: #fcfcfc

    &__text--done
        color: darkgray
        text-decoration: line-through
        font-style: italic


.task-controls
    display: flex

.task-list
    margin-bottom: 10px


</style>
