<template>
  <div class="col-lg-3 col-md-6 col-sm-8 col-xs-12 mx-auto">
    <v-card class="mb-3 d-flex card" color="#e7dfd5" v-for="list of lists" :key="list.id" outlined>
      <router-link class="flex-grow-1" style="cursor:pointer" tag="span" :to="'/edit/' + list.id">
        <v-card-title class="pr-0">{{list.title}}<v-spacer></v-spacer><span class="count">{{list.items.filter(t => t.done).length}}/{{list.items.length}}</span></v-card-title>
      </router-link>
      <v-card-actions>
        <v-menu bottom left close-on-click>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon color="#3b6978">mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list color="#e7dfd5">
            <v-list-item @click="deleteList(list.id);snackbar = true;$emit('show-snackbar')">
              <v-list-item-title class="delete">Delete</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-actions>
    </v-card>
    <div class="mx-auto flex-column justify-center" v-if="!lists.length">
      <h1 class="h1-center">Create your first shopping list</h1>
    </div>

    <v-snackbar color="#204051" v-model="snackbar" timeout="4000" @input="$emit('hide-snackbar')">
      List has been deleted
      <template v-slot:action="{ attrs }">
        <v-btn
          color="#84a9ac"
          text
          v-bind="attrs"
          @click="snackbar = false;$emit('hide-snackbar')"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>


    <!-- <v-app-bar class="ml-auto rounded-pill" bottom  hide-on-scroll flat scroll-threshold="1" width="97" height="97" color="transparent">
      <v-btn
          to='/add'
          color="#84a9ac"
          class="fab"
          fab
          large
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
    </v-app-bar> -->

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
      snackbar: false,
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
    }
  }
}
</script>

<style lang="scss" scoped>
.h1-center {
  text-align: center;
  color: #e7dfd5;
}
.link {
  text-decoration: none;
}
.card {
  color: #204051;
}
.count {
  color: #3b6978;
}
.delete {
  color: #204051;
  font-size: 1.1em;
}
</style>