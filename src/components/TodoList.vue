<template>
    <div>
        <b-row>
            <b-col md="4" sm="12">
                <h4>To Do</h4>
                <div
                        class="drop-zone"
                        @drop='onDrop($event, "to do")'
                        @dragover.prevent
                        @dragenter.prevent
                >
                    <ul class="p-0">
                        <li
                                v-for="todo in getProjectById(id).tasks"
                                v-if="todo.status === 'to do'"
                                draggable
                                @dragstart="startDrag($event, todo)">
                            <div class="drag-el">
                                <TodoItem
                                        v-bind:todo="todo"
                                        v-bind:projectId="id"
                                />
                            </div>
                        </li>
                    </ul>
                </div>
            </b-col>
            <b-col md="4" sm="12">
                <h4>In Progress</h4>
                <div
                        class="drop-zone"
                        @drop='onDrop($event, "in progress")'
                        @dragover.prevent
                        @dragenter.prevent
                >
                    <ul class="p-0">
                        <li
                                v-for="todo in getProjectById(id).tasks"
                                v-if="todo.status === 'in progress'"
                                draggable
                                @dragstart="startDrag($event, todo)">
                            <div class="drag-el">
                                <TodoItem
                                        v-bind:todo="todo"
                                        v-bind:projectId="id"
                                />
                            </div>
                        </li>
                    </ul>
                </div>
            </b-col>
            <b-col md="4" sm="12">
                <h4>Done</h4>
                <div
                        class="drop-zone"
                        @drop='onDrop($event, "done")'
                        @dragover.prevent
                        @dragenter.prevent
                >
                    <ul class="p-0">
                        <li
                                v-for="todo in getProjectById(id).tasks"
                                v-if="todo.status === 'done'"
                                draggable
                                @dragstart="startDrag($event, todo)">
                            <div class="drag-el">
                                <TodoItem
                                        v-bind:todo="todo"
                                        v-bind:projectId="id"
                                />
                            </div>
                        </li>
                    </ul>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import {mapGetters, mapMutations} from "vuex";
    import TodoItem from '@/components/TodoItem'
    import projects from "../store/modules/projects";

    export default {
        computed: mapGetters(["allProjects", "getProjectById"]),
        props: ['id'],
        components: {
            TodoItem
        },
        data() {
            return {
                moveToSelected: null,
                editShow: false
            }
        },
        methods: {
            ...mapMutations(["updateProjects"]),
            startDrag(evt, item) {
                evt.dataTransfer.dropEffect = 'move';
                evt.dataTransfer.effectAllowed = 'move';
                evt.dataTransfer.setData('itemID', item.id);

            },
            onDrop(evt, list) {
                let itemID = evt.dataTransfer.getData('itemID');
                let updatedProjects = this.allProjects;
                updatedProjects.find(project => project.id == this.id).tasks.find(task => task.id == itemID).status = list;
                this.updateProjects(
                    updatedProjects
                );
            },
        }
    }
</script>

<style>
    .drop-zone {
        background-color: #eee;
        margin-bottom: 10px;
        padding: 10px;
    }

    .drag-el {
        background-color: #fff;
        margin-bottom: 10px;
        padding: 5px;
    }
</style>