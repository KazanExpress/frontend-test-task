<template>
    <div>
        <ProjectName/>
    </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';
import ProjectName from './ProjectName.vue';


@Component({
  components: {
    ProjectName,
  },
})
export default class ToDoList extends Vue {
}
</script>

