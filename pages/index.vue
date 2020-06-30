<template>

	<div class="todo-wrapper">

		<task-header></task-header>

		<div>
			<task v-for="todo in todolist"></task>

			<div class="todo-button-wrapper">
				<button class="task-button-new_task" @click="todolist++">Новая задача</button>

				<router-link to="" target="_blank">
					<button class="task-button-new_task">Новый проект</button>
				</router-link>

			</div>

		</div>

	</div>


</template>

<script>

	import TaskHeader from "~/components/TaskHeader";

	import Task from "~/components/Task";

	export default {
		name: "Todo",
		components: {Task, TaskHeader},
		head: {
			title: 'TODO list',
		},
		data() {
			return {
				todolist: 0
			}
		}
	}

</script>

<style scoped>

</style>