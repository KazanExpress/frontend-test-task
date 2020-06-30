<template>

	<div class="header-wrapper">

		<input type="text" class="header-input" v-model="input_field">

		<div v-if="input_field === null" class="header-text">
			Введите название...
		</div>
<!--		<div v-else class="header-text">-->
<!--			{{input_field}}-->
<!--		</div>-->

	</div>
</template>

<script>
	export default {
		name: "task-header",
		props: {
			text: {
				type: String,
				default: "Введите заголовок..."
			}
		},
		data() {
			return {
				input_field: null
			}
		}
	}
</script>

<style scoped>

</style>