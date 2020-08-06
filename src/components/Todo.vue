<template>
  <v-list-item class="px-3" dense>
    <span v-if="this.$route.path != '/'" ref="dragIcon" @mousedown="mousedown" @mouseup="mouseup" @mouseleave="mouseleave" class="drag-icon material-icons handle">drag_indicator</span>
    <v-checkbox class="mt-0 pt-0 pr-0" hide-details  v-model="todo.checkbox"  :checked="todo.completed" :disabled="this.$route.path == '/'"></v-checkbox>
    <v-text-field class="pl-0" type="text" dense full-width solo flat single-line hide-details v-model="todo.title" :disabled="this.$route.path == '/'"></v-text-field>
    <v-spacer></v-spacer>
    <v-btn v-if="this.$route.path != '/'" v-on:click.prevent="$emit('remove-todo', todo.id)" small text color="error">
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-list-item>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
    index: Number
  },
  methods: {
    mousedown() {
      this.$refs.dragIcon.classList.add('active')
    },
    mouseup() {
      this.$refs.dragIcon.classList.remove('active')
    },
    mouseleave() {
      this.$refs.dragIcon.classList.remove('active')
    }
  }
}
</script>

<style lang="scss" scoped>
.drag-icon {
  color: rgba(0, 0, 0, 0.54);
  font-size: 22px;
  cursor: grab;
  user-select: none;
}
.active {
  cursor: grabbing;
}
</style>