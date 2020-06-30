<template>
	<div v-if="!deleted">

		<div class="task-wrapper">

			<div class="task-button-mark" :class="{'task-button-mark-marked': marked}" @click="marked = !marked" alt="COMPL"></div>

			<input type="text" class="task-input" :class="{'task-text-marked': marked}" v-model="input_field">

			<div v-if="input_field === null" class="task-text" :class="{'task-text-marked': marked}">
				Введите задачу...
			</div>

			<div class="task-button-subtask" @click="subtask++">Добавить подзадачу</div>
			<div class="task-button-mark task-button-delete" @click="deleted = true">X</div>

		</div>

		<div style="display: flex" v-for="sub in subtask">

			<div style="width: 2%;"></div>
			<task style="width: 98%;"></task>

		</div>


	</div>
</template>

<script>
	export default {
		name: "task",
		props: {
			text: {
				type: String,
				default: "Введите задачу..."
			}
		},
		data() {
			return {
				input_field: null,
				marked: false,
				deleted: false,
				subtask: 0
			}
		}
	}
</script>

<style scoped>

</style>