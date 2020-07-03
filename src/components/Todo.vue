<template>
  <v-list-item class="px-3" dense>
    <v-checkbox class="mt-0" hide-details dense v-model="todo.checkbox" :label="todo.title"  :checked="todo.completed" :disabled="this.$route.path == '/'"></v-checkbox>
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
  }
}
</script>