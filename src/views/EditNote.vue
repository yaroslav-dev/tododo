<template>
  <div class="col-lg-3 col-md-6 col-sm-8 col-xs-12 mx-auto">
    <div v-if="note">
      <v-form @submit.prevent>

        <v-row class="col-12 mr-0 pb-0 pl-4 d-flex">
          <v-text-field class="title" label="Title" v-model="note.title" solo flat dense hide-details required></v-text-field>
          <span class="align-self-center mt-1">{{note.todos.filter(t => t.done).length}}/{{note.todos.length}}</span>
        </v-row>
        
        <v-list transition="slide-y-transition">
          <draggable v-model="note.todos" v-bind="dragOptions" @start="drag = true" @end="drag = false" handle=".handle">
            <transition-group name="list">
              <Todo
                v-for="(todo, i) of note.todos.filter(t => !t.done)"
                :todo="todo"
                :key="todo.id"
                :done="todo.done"
                :index="i"
                @remove-todo="removeTodo"
              />
              <Todo
                v-for="(todo, i) of note.todos.filter(t => t.done)"
                :todo="todo"
                :key="todo.id"
                :done="todo.done"
                :index="i"
                @remove-todo="removeTodo"
              />
            </transition-group>
          </draggable>
        </v-list>


          <AddTodo @add-todo="addTodo"/>

        <v-btn type="submit" @click="confirmSave = true;$router.push('/')" class="mr-2" rounded x-large depressed outlined color="success">save</v-btn>
        <v-btn type="submit" @click.stop="dialog = true" rounded x-large text right>cancel</v-btn>
        <v-dialog  v-model="dialog"  max-width="290">
          <v-card>
            <v-card-title class="headline">Do you want to leave?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1"  text  @click="dialog = false">cancel</v-btn>
              <v-btn color="green darken-1" text  @click="confirmCancel = true;$router.push('/')">ok</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-form>
    </div>
    <h1 v-else>Page not found!</h1>
  </div>
</template>

<script>
import AddTodo from '@/components/AddTodo'
import Todo from '@/components/Todo'
import draggable from 'vuedraggable'

export default {
  name: 'editnote',
  computed: {
    note() {
      return this.$store.getters.noteById(+this.$route.params.id)
    },
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },
  data() {
    return {
      todos: [],
      title: '',
      id: null,
      dialog: false,
      confirmCancel: false,
      confirmSave: false
    }
  },
  created() {
    this.beforeEditNote = Object.assign({}, this.note)
    this.beforeEditNoteTodo = Array.from(this.note.todos)
  },
  methods: {
    removeTodo(id) {
        this.note.todos = this.note.todos.filter(t => t.id !== id)
    },
    addTodo(todo) {
      this.note.todos.push(todo)
    }
  },
  beforeRouteLeave(to, from, next) {
    let confirmSave = this.confirmSave
    let confirmCancel = this.confirmCancel

    if (!confirmSave) {
      this.dialog = true
      
      if (confirmCancel) {
        Object.assign(this.note, this.beforeEditNote)
        this.note.todos = Array.from(this.beforeEditNoteTodo)
        next()
      } else {
        next(false)
      }
    } else if (confirmSave) {
      this.$store.dispatch('updateNote', {
        title: this.title || 'Note',
        id: this.id,
        todos: this.todos
      })
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
.ghost {
  opacity: 0;
}
.title {
  font-size: 24px;
}
</style>