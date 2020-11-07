<template>
  <v-text-field class="mb-3" background-color="#e7dfd5" color="#204051" @keydown.enter.prevent="addItem" id="add-item" type="text" label="Add item" hide-details solo flat rounded outlined v-model="title">
    <v-btn @click="addItem" slot="append" color="#3b6978" icon rounded text>
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-text-field>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      id: null,
      completed: false
    }
  },
  methods: {
    addItem() {
      if (this.title.trim()) {
        const item = {
          id: Date.now(),
          title: this.title,
          completed: false
        }
        this.$emit('add-item', item)
        this.title = ''
      }
    }
  }
}
</script>