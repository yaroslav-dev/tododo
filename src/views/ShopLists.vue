<template>
  <div class="col-lg-3 col-md-6 col-sm-8 col-xs-12 mx-auto">

    <v-card class="mb-3 d-flex" v-for="list of lists" :key="list.id" outlined>
      <router-link class="flex-grow-1" style="cursor:pointer" tag="span" :to="'/edit/' + list.id">
        <v-card-title class="pr-0">{{list.title}}<v-spacer></v-spacer>{{list.items.filter(t => t.done).length}}/{{list.items.length}}</v-card-title>
      </router-link>
      <v-card-actions>
        <v-menu bottom left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click.stop="dialogHandler(list.id)">
              <v-list-item-title>Delete</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-actions>
    </v-card>
    
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Delete list?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">cancel</v-btn>
          <v-btn color="green darken-1" text @click="deleteList(id)">delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="mx-auto flex-column justify-center" v-if="!lists.length">
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
    lists() {
      return this.$store.getters.lists
    }
  },
  data() {
    return {
      dialog: false,
      list: this.list,
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
    deleteList(id) {
      this.$store.dispatch('deleteList', id)
      this.dialog = false
    }
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