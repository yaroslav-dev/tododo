<template>
  <div class="col-lg-3 col-md-6 col-sm-8 col-xs-12 mx-auto">
    <h1>Create list</h1>
    <v-form ref="form" @submit.prevent="submitHandler">
      <v-text-field label="Title" autofocus v-model="title" solo flat dense hide-details required>
      </v-text-field>
      <v-list>
        <draggable v-model="todos" v-bind="dragOptions" @start="drag = true" @end="drag = false"  handle=".handle">
          <transition-group name="list">
            <Todo
              v-for="(todo, i) of todos"
              :todo="todo"
              :key="todo.id"
              :index="i"
              @remove-todo="removeTodo"
            />
          </transition-group>
        </draggable>
      </v-list>
      <transition name="add">
        <AddTodo @add-todo="addTodo"/>
      </transition>
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
import draggable from 'vuedraggable'

export default {
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },
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
        title: this.title || 'Shopping list',
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
    Todo,
    draggable
  }
}
</script>

<style lang="scss" scoped>
.list-enter-active {
  transition: all .5s;
}
.list-leave-active {
  transition: all .2s;
}
.list-enter, .list-leave-to {
  opacity: 0;
}
.add-move {
  transition: 1s;
}
</style>