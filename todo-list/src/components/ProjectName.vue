<template>
    <div>
        <input type="text" :value="projectName()" v-on:input="changeProjectName"/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ProjectName extends Vue {
    private projectName(){
        if (sessionStorage.getItem('projectName') === null) {
            sessionStorage.setItem('projectName', 'Новый проект');
        }

        return sessionStorage.getItem('projectName');
    }

    private changeProjectName(e: Event){
        let target = e.target as HTMLInputElement;

        sessionStorage.setItem('projectName', target.value);
    }
}
</script>

<style scoped lang="scss">
input {
  border: none;
}
</style>