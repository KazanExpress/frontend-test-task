<template>
    <div>
        <b-container>
            <b-row class="mb-5">
                <b-col md="6" sm="12">
                    <h2 contenteditable
                        v-text="projectTitle"
                        @blur="onEdit">
                    </h2>
                </b-col>
                <b-col md="6" sm="12" class="nav--right">
                    <b-button variant="link" class="btn-link">
                        <vue-blob-json-csv
                                @error="handleDownloadError"
                                tag-name="div"
                                file-type="json"
                                :file-name=this.projectTitle
                                title="Download project"
                                :data=[this.getProjectById(this.id)]
                                confirm="Do you want to download it?"
                        />
                    </b-button>
                    <b-button variant="link" v-b-modal.modal-prevent-closing>New task</b-button>
                </b-col>
            </b-row>

            <TodoList v-bind:id="id"/>
        </b-container>


        <b-modal
                id="modal-prevent-closing"
                ref="modal"
                title="New task"
                ok-only
                ok-variant="link"
                ok-title="Save"
                @show="resetModal"
                @hidden="resetModal"
                @ok="handleSubmit"
        >
            <form ref="form" @submit.prevent="handleSubmit">
                <b-form-group
                        label="Title"
                        label-for="title-input"
                        invalid-feedback="Title is required"
                >
                    <b-form-input
                            id="title-input"
                            v-model="taskTitle"
                            required
                    ></b-form-input>
                </b-form-group>
                <b-form-group
                        label="Status"
                        label-for="status-select">
                    <b-form-select
                            id="status-select"
                            v-model="taskStatus"
                            :options="statusOptions"
                            required
                    ></b-form-select>
                </b-form-group>

            </form>
        </b-modal>
    </div>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'
    import TodoList from "@/components/TodoList";

    export default {
        computed: mapGetters(["allProjects", "getProjectById"]),
        props: {
            id: {
                required: true
            }
        },
        components: {
            TodoList
        },
        mounted() {
            this.init();
        },
        data() {
            return {
                taskTitle: "",
                taskStatus: "",
                statusOptions: ['to do', 'in progress', 'done'],
                projectTitle: ""
            }
        },
        methods: {
            ...mapMutations(["updateProjects"]),
            init() {
                this.projectTitle = this.getProjectById(this.id).title;
            },
            resetModal() {
                this.taskTitle = "";
                this.taskStatus = "";
            },
            handleSubmit() {
                if (this.taskTitle.length > 0 && this.taskStatus.length > 0) {
                    let newProjects = this.allProjects;
                    let newTask = ({
                        id: Date.now(),
                        title: this.taskTitle,
                        status: this.taskStatus,
                        tasks: []
                    });
                    let index = newProjects.findIndex(project => project.id == this.id);
                    newProjects[index].tasks.push(newTask);
                    this.updateProjects(
                        newProjects
                    );
                }
                this.$refs['modal'].toggle();
            },
            updateTitle(title) {
                let updatedProjects = this.allProjects;
                updatedProjects.find(project => project.id == this.id).title = title;
                this.updateProjects(
                    updatedProjects
                );
            },
            onEdit(evt) {
                let src = evt.target.innerText;
                this.projectTitle = src;
                this.updateTitle(src);
            },
            handleDownloadError() {
                alert("Try again");
            }

        }

    }
</script>

<style>
    h2 {
        text-align: left;
        margin: 30px;
        width: fit-content;
    }
</style>