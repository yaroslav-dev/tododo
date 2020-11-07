<template>
  <v-app >
    <v-app-bar color="#e7dfd5" elevate-on-scroll hide-on-scroll fixed>
      <v-toolbar-title id="logo-title">
        <router-link to="/" class="logo">Listify</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon color="#3b6978" x-large @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-main class="mt-11 mt-md-13 main flex-grow-1">
      <v-container class="px-0 flex-grow-1" :class="$route.path == '/timer' && 'fill-height'" fluid>
        <router-view @show-snackbar="snackbar = true" @hide-snackbar="snackbar = false"/>
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="drawer" app temporary color="#e7dfd5" right>
      <v-list>
        <v-list-item-group v-model="group" color="#204051">
          <v-list-item to="/">
            <v-list-item-icon>
              <v-icon>mdi-cart-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Shopping lists</v-list-item-title>
          </v-list-item>
          <v-list-item disabled>
            <v-list-item-icon>
              <v-icon>mdi-list-status</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Todo lists</v-list-item-title>
          </v-list-item>
          <v-list-item to="/timer">
            <v-list-item-icon>
              <v-icon>mdi-timer-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Pomodoro timer</v-list-item-title>
          </v-list-item>
          <v-list-item disabled>
            <v-list-item-icon>
              <v-icon>mdi-cogs</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar class="ml-auto rounded-t-pill" fixed bottom hide-on-scroll flat scroll-threshold="1" width="97" height="97" color="transparent">
      <v-slide-y-reverse-transition>

        <!-- Выбор типа списка для создания -->

        <v-btn v-show="!snackbar && $route.path == '/'" to='/add' color="#84a9ac" class="fab" fab large>
          <v-icon color="#204051">mdi-plus</v-icon>
        </v-btn>
      </v-slide-y-reverse-transition>
    </v-app-bar>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        activeBtn: 0,
        snackbar: false,
        drawer: false,
        group: null,
      }
    },
    watch: {
      group () {
        this.drawer = false
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css2?family=Black+Ops+One&display=swap');

  #app {
    background-color: #3b6978;
  }
  #logo-title {
    font-family: 'Black Ops One', cursive;
    font-size: 2.5rem;
  }
  .link {
    text-decoration: none;
    color: black;
  }
  .logo {
    text-decoration: none;
    color: #3b6978;
  }
  .active-bar {
    // margin-bottom: 52px;
    height: 149px;
  }
</style>