<template>
    <v-text-field transition="slide-y-transition" @keydown.enter.prevent="addTodo" id="add-todo" type="text" class="" label="Add todo" solo flat dense v-model="title" :autofocus="this.$route.path != '/add'">
      <v-btn append-icon="mdi-plus" @click="addTodo" slot="append" color="success" small text>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-text-field>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      id: null,
      completed: false
    }
  },
  methods: {
    addTodo() {
      if (this.title.trim()) {
        const todo = {
          id: Date.now(),
          title: this.title,
          completed: false
        }
        this.$emit('add-todo', todo)
        this.title = ''
      }
    }
  }
}
</script>