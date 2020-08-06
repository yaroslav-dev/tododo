<template>
  <div class="col-lg-3 col-md-6 col-sm-8 col-xs-12 mx-auto">
    <v-card class="mb-5" v-for="note of notes" :key="note.id" outlined>
      <v-card-title class="pb-1">{{note.title}}</v-card-title>
      <v-list class="pt-0">
        <Todo
          v-for="(todo, i) of note.todos"
          :todo="todo"
          :key="todo.id"
          :index="i"
        />
      </v-list>
      <v-divider></v-divider>
      <v-card-actions>
        <router-link tag="span" :to="'/edit/' + note.id">
          <v-btn text>edit</v-btn>
        </router-link>
        <v-btn color="error"  @click.stop="dialogHandler(note.id)"  text depressed>delete</v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Delete note?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">cancel</v-btn>
          <v-btn color="green darken-1" text @click="deleteNote(id)">delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="mx-auto flex-column justify-center" v-if="!notes.length">
      <h1 class="h1-center">Create your first note</h1>
      <router-link to='/add' class="d-flex link justify-center ">
        <v-btn
          color="pink"
          fab
          dark
          center
          small
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </router-link>
    </div>
  </div>
</template>

<script>
import Todo from '@/components/Todo'

export default {
  computed: {
    notes() {
      return this.$store.getters.notes
    }
  },
  data() {
    return {
      dialog: false,
      note: this.note,
      id: null
    }
  },
  methods: {
    dialogHandler(id) {
      this.id = id
      if (this.dialog == false) {
        this.dialog = true
      } else this.dialog = false
    },
    deleteNote(id) {
      this.$store.dispatch('deleteNote', id)
      this.dialog = false
    }
  },
  components: {
    Todo
  }
}
</script>

<style lang="scss" scoped>
.h1-center {
  text-align: center;
}
.link {
  text-decoration: none;
}
</style>