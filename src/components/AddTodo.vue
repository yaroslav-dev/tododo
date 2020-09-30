<template>
    <v-text-field class="mb-3" @keydown.enter.prevent="addTodo" id="add-todo" type="text" label="Add item" hide-details solo flat rounded outlined success v-model="title">
      <v-btn @click="addTodo" slot="append" color="success" icon rounded text>
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