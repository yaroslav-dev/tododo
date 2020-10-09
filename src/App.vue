<template>
  <v-app>
    
    <v-app-bar
      class=""
      color="white"
      elevate-on-scroll
      hide-on-scroll
      fixed
    >
      
      <v-toolbar-title id="logo-title">
        <router-link to="/" class="logo">Listify</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon color="cyan darken-1" x-large></v-app-bar-nav-icon>
    </v-app-bar>

    <v-main class="mt-16">
      <v-container class="px-0" fluid>
        <router-view />
      </v-container>
    </v-main>

    <v-app-bar class="p-0 m-0" height="56" flat fixed bottom hide-on-scroll color="transparent">
      <v-bottom-navigation absolute grow  :value="activeBtn" color="cyan darken-1">
        <v-btn>
          <span>Shopping</span>
          <v-icon >mdi-cart-plus</v-icon>
        </v-btn>
        <v-btn>
          <span>Todo</span>
          <v-icon >mdi-list-status</v-icon>
        </v-btn>
        <v-btn>
          <span>Timer</span>
          <v-icon >mdi-timer-outline</v-icon>
        </v-btn>
        <v-btn>
          <span>Settings</span>
          <v-icon >mdi-cogs</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-app-bar>

  </v-app>
</template>

<script>
export default {
  data () {
    return {
      activeBtn: 0,
    }
  },
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Audiowide&display=swap');

#logo-title {
  font-family: 'Audiowide', cursive;
  font-weight: bold;
  font-size: 2.5rem;
}
.link {
  text-decoration: none;
  color: black;
}
.logo {
  text-decoration: none;
  color: #00ACC1;
}
</style>