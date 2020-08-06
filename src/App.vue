<template>
  <v-app>
    <v-app-bar
      class="pl-0"
      color="white"
      elevate-on-scroll
      fixed
    >
      <v-toolbar-title id="logo-title">
        <router-link to="/" class="logo">Tododo</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to='/add' class="link">
        <v-btn class="d-none d-sm-flex" depressed small outlined color="success">create note</v-btn>
        <v-btn class="d-flex d-sm-none" depressed small outlined color="success"><v-icon>mdi-plus</v-icon></v-btn>
      </router-link>
    </v-app-bar>
    <v-main class="mt-16">
      <v-container class="px-0" fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

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