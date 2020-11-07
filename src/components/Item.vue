<template>
  <v-list-item class="px-0">
    <v-card class="px-3 my-1 d-flex align-content-center flex-grow-1" outlined color="#e7dfd5">
    <v-checkbox v-if="$route.path != '/add'" class="py-0 my-0 align-self-center" :color="item.done && 'grey' || 'primary'" hide-details v-model="item.done" :checked="item.done == true" :ripple="false"></v-checkbox>
    <v-text-field background-color="transparent" @focus="rmButton = true" @blur.prevent="blurDelay" :disabled="item.done" :class="item.done && 'text-decoration-line-through' || 'text-decoration-none'" class="flex-grow-1" type="text" full-width solo flat single-line hide-details v-model="item.title"></v-text-field>
    <v-spacer></v-spacer>
    <transition name="fade">
      <v-btn v-if="rmButton" @click="$emit('remove-item', item.id)" class="align-self-center" icon text >
        <v-icon color="#204051" class="remove-icon">mdi-trash-can-outline</v-icon>
      </v-btn>
    </transition>
    <v-icon ref="dragIcon" class="drag-icon material-icons handle ">drag_indicator</v-icon>
    </v-card>
  </v-list-item>
</template>

<script>
  export default {
    data() {
      return {
        rmButton: false,
        done: false
      }
    },
    props: {
      item: {
        type: Object,
        required: true,
      },
      index: Number
    },
    methods: {
      blurDelay() {
        const TM = setTimeout(() => {this.$data.rmButton = false}, 100)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .drag-icon {
    color: #204051;
    font-size: 27px;
    cursor: grab;
    user-select: none;
  }
  .remove-icon {
    color: #204051;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>