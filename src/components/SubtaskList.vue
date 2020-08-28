<template>
    <div>
        <b-container :style="indent">
            <b-row>
                <b-col lg="5" sm="12" class="task-item-title">
                    <span contenteditable
                          v-text="taskTitle"
                          @blur="onTitleEdit">
                    </span>
                </b-col>
                <b-col lg="6" sm="12" class="todo-menu">
                    <b-button
                            variant="link"
                            v-if="task.tasks.length > 0"
                            @click="toggleChildren"
                            class="project-btn">
                        &or;
                    </b-button>
                    <b-button
                            variant="link"
                            @click="$emit('add-clicked', task.id)"
                            class="project-btn">
                        &plus;
                    </b-button>
                    <b-button
                            variant="link"
                            @click="$emit('remove-clicked', task.id)"
                            class="project-btn">
                        &times;
                    </b-button>
                </b-col>
            </b-row>
        </b-container>
        <transition-group name="fade">
            <subtask-list
                    v-bind:key="task.id"
                    v-if="showChildren"
                    v-for="task in task.tasks"
                    :task="task"
                    :depth="depth + 1"
                    v-on:remove-clicked="handleRemove"
                    v-on:add-clicked="handleAdd"
                    v-on:task-title-edit="handleEdit"
            >
            </subtask-list>
        </transition-group>
    </div>
</template>

<script>
    export default {
        props: ['task', 'depth'],
        data() {
            return {
                showChildren: false,
                taskTitle: ""
            }
        },
        mounted() {
            this.init();
        },
        name: 'subtask-list',
        computed: {
            indent() {
                return {transform: `translate(${this.depth * 15}px)`}
            }
        },
        methods: {
            init() {
                this.taskTitle = this.task.title;
            },
            handleRemove(todoId) {
                this.$emit('remove-clicked', todoId);
            },
            handleAdd(todoId) {
                this.$emit('add-clicked', todoId);
            },
            handleEdit(taskId, taskTitle) {
                this.$emit('task-title-edit', taskId, taskTitle);
            },
            toggleChildren() {
                this.showChildren = !this.showChildren;
            },
            onTitleEdit(evt) {
                let src = evt.target.innerText;
                this.taskTitle = src;
                this.$emit('task-title-edit', this.task.id, this.taskTitle);
            }
        }
    }
</script>

<style>
    .task-item-title {
        padding: 6px;
    }

    .btn.project-btn {
        padding: 6px;
    }

    @media (min-width: 992px) {
        .todo-menu {
            text-align: right;
        }
    }

</style>