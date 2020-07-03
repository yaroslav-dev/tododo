<template>
  <div class="col mx-auto d-xs-flex">
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
          <v-btn text>Edit</v-btn>
        </router-link>
        <v-btn color="error"  @click.stop="dialog = true"  text depressed>delete</v-btn>
      </v-card-actions>
      <v-dialog  v-model="dialog"  max-width="290">
        <v-card>
          <v-card-title class="headline">Delete note?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1"  text  @click="dialog = false">cancel</v-btn>
            <v-btn color="green darken-1" text v-bind:note="note" @click="deleteNote(note)">delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>

    

    <div class="col xl6 s12 offset-xl3 center-wrap" v-if="!notes.length">
      <h1>Create your first note</h1>
      <router-link to='/add' class="link">
      <v-btn
        color="pink"
        fab
        dark
        right
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
      dialog: false
    }
  },
  methods: {
    deleteNote(note) {
      this.dialog = false
      this.$store.dispatch('deleteNote', {id: note.id})
    }
  },
  components: {
    Todo
  }
}
</script>

<style lang="scss" scoped>
.d-xs-flex {
  max-width: 500px;
}
.link {
  text-decoration: none;
}
</style>