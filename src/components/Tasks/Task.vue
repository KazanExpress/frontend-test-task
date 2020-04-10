<template>
  <v-card
    outlined
    color="#272727"
    class="localTask"
  >
    <v-card-text class="task__content">
      <v-text-field
        v-model="title_"
        class="task__content__name body-1 font-weight-bold"
        placeholder="Task name"
        dense
        flat
        hide-details
      />

      <v-textarea
        v-model="description_"
        class="font-weight-light lighten-1 mt-2 mx-1"
        rows="4"
        no-resize
        flat
        background-color="rgba(0,0,0,0)"
        hide-details
        placeholder="Description"
      />
    </v-card-text>
    <v-card-actions class="actions">
      <v-checkbox
        v-model="completed_"
        label="Finished"
      />
      <v-spacer />
      <v-btn
        depressed
        class="mr-2"
        @click.native="$emit('remove-task')"
      >
        <v-icon>mdi-delete</v-icon>
        Delete
      </v-btn>
      <!-- <v-switch dense flat hint="test"> </v-switch> -->
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync } from 'vue-property-decorator'
import { TaskI } from '../../store/ProjectStore/Task'

@Component({
  components: {},
})
export default class Task extends Vue {
  @PropSync('title', { type: String }) readonly title_!: string

  @PropSync('description', { type: String }) readonly description_!: string

  @PropSync('completed', { type: Boolean }) readonly completed_!: boolean
}
</script>

<style scoped>
.task__content__name >>> .v-input__slot {
  padding: 0 !important;
  /* transition: all 1s; */
}

/* .actions >>> .v-input__slot { */
/* flex-direction: row-reverse !important; */
/* margin-right: 10px; */
/* } */
</style>
