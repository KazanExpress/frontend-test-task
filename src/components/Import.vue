<template>
    <div>
        <label
                class="btn btn--upload"
                for="inputFile">
            Загрузить
        </label>
        <input
                @change="importFile"
                type="file"
                id="inputFile"
                class="visually-hidden"
        />
    </div>
</template>

<script>
    export default {
        name: "Import",
        data() {
            return {
                newProjectName: [],
                projectInFocus: []
            }
        },
        methods:{
            importFile(ev) {
                const file = ev.target.files[0];
                const reader = new FileReader();

                reader.onload = e => this.$emit("load", e.target.result);
                reader.readAsText(file);
            }
        }
    }
</script>

<style scoped>

</style>
