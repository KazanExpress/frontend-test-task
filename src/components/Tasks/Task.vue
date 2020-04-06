<template>
  <v-card outlined>
    <v-card-text class="content">
      <v-text-field
        v-model="task.title"
        class="title"
        placeholder="Введите название задачи"
        dense
        flat
        hide-details
      />
      <!-- solo -->
    </v-card-text>
    <v-card-actions class="actions">
      <v-checkbox v-model="task.completed" label="Finished" />
      <v-spacer />
      <v-btn
        depressed
        class="mr-2"
        @click.native="$emit('removeTask', task)"
      >
        <v-icon>mdi-delete</v-icon>
        Delete
      </v-btn>
      <!-- <v-switch dense flat hint="test"> </v-switch> -->
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

import { TaskI } from '../../types'

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}

@Component({
  components: {},
})
export default class Task extends Vue {
  @Prop(Object) readonly task!: TaskI

  mounted() {
    this.getText()
  }

  getText() {
    const max = rand(30, 150)
    const arr = []
    for (let i = 0; i < max; i++) {
      arr.push(String.fromCharCode(rand(1, 100)))
    }
    this.task.text = arr.join('')
  }
}
</script>

<style scoped>
.content >>> .v-input__slot {
  padding: 0 !important;
  /* transition: all 1s; */
}

.actions >>> .v-input__slot {
  /* flex-direction: row-reverse !important; */
  /* margin-right: 10px; */
}
</style>
