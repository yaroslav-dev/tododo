<template>
  <div class="col-lg-3 col-md-6 col-sm-8 col-xs-12 mx-auto">

    <v-card class="mb-3 d-flex" v-for="note of notes" :key="note.id" outlined>
      <router-link class="flex-grow-1" style="cursor:pointer" tag="span" :to="'/edit/' + note.id">
        <v-card-title class="pr-0">{{note.title}}<v-spacer></v-spacer>{{note.todos.filter(t => t.done).length}}/{{note.todos.length}}</v-card-title>
      </router-link>
      <v-card-actions>
        <v-menu bottom left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click.stop="dialogHandler(note.id)">
              <v-list-item-title>Delete</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
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
      <h1 class="h1-center">Create your first shopping list</h1>
    </div>

    <v-app-bar class="ml-auto rounded-pill" bottom fixed hide-on-scroll flat scroll-threshold="1" width="97" height="157" color="transparent">
      <v-btn
          to='/add'
          color="pink"
          class="mb-12"
          fab
          dark
          large
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
    </v-app-bar>

  </div>
</template>

<script>

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