<template>
  <div class="mx-auto col-xl-3">
    <h1>Create note</h1>
    <v-form ref="form" @submit.prevent="submitHandler">
      <v-text-field label="Title" autofocus v-model="title" solo flat dense hide-details clearable required>
      </v-text-field>
      <v-list>
        <Todo
          v-for="(todo, i) of todos"
          :todo="todo"
          :key="todo.id"
          :index="i"
          @remove-todo="removeTodo"
        />
      </v-list>
      <AddTodo @add-todo="addTodo"/>
      <v-btn type="submit" class="mr-2" depressed outlined color="success">Create</v-btn>
      <v-btn type="submit" @click.stop.prevent="dialog = true" text right>Cancel</v-btn>
      <v-dialog  v-model="dialog"  max-width="290">
        <v-card>
          <v-card-title class="headline">Do you want to leave?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1"  text  @click="dialog = false">cancel</v-btn>
            <v-btn color="green darken-1" text  @click.prevent="cancel">ok</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>
  </div>
</template>

<script>
import AddTodo from '@/components/AddTodo'
import Todo from '@/components/Todo'

export default {
  name: 'addnote',
  data() {
    return {
      todos: [],
      title: '',
      id: null,
      dialog: false,
    }
  },
  methods: {
    removeTodo(id) {
      this.todos = this.todos.filter(t => t.id !== id)
    },
    addTodo(todo) {
      this.todos.push(todo)
    },
    submitHandler() {
      const note = {
        title: this.title || 'Note',
        id: Date.now(),
        todos: this.todos
      }
      this.$store.dispatch('createNote', note)
      this.$router.push('/')
    },
    cancel() {
      this.$router.push('/')
    }
  },
  beforeRouteLeave(to, from, next) {
    let submit = this.submitHandler
    let cancel = this.cancel
        
    if (cancel) {
      this.dialog = true
      next()
    } else if (submit) {
      next()
    }
  },
  components: {
    AddTodo,
    Todo
  }
}
</script>
