<template>
  <v-list-item class="px-0">
    <v-card class="px-3 my-1 d-flex align-content-center flex-grow-1" outlined>
    <v-checkbox class="py-0 my-0 align-self-center" :color="todo.done && 'grey' || 'primary'" hide-details v-model="todo.done" :checked="todo.done == true" :ripple="false"></v-checkbox>
      <v-text-field @focus="rmButton = true" @blur.prevent="blurDelay" :disabled="todo.done" :class="todo.done && 'text-decoration-line-through' || 'text-decoration-none'" class="flex-grow-1" type="text" full-width solo flat single-line hide-details v-model="todo.title"></v-text-field>
    <v-spacer></v-spacer>
    <transition name="fade">
      <v-btn v-if="rmButton" @click="$emit('remove-todo', todo.id)" class="align-self-center" icon text >
        <!-- <v-icon>mdi-close</v-icon> -->
        <v-icon>mdi-trash-can-outline</v-icon>
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
      todo: {
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
  color: rgba(0, 0, 0, 0.54);
  font-size: 27px;
  cursor: grab;
  user-select: none;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>