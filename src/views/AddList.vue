<template>
  <div class="col-lg-3 col-md-6 col-sm-8 col-xs-12 mx-auto">
    <h1 style="color: #e7dfd5;text-align: center;">Create list</h1>
    <v-form ref="form" @submit.prevent="submitHandler">
      <v-text-field label="Title" color="#e7dfd5" background-color="transparent" v-model="title" dark solo flat outlined rounded hide-details required>
      </v-text-field>
      <v-list color="transparent">
        <draggable v-model="items" v-bind="dragOptions" @start="drag = true" @end="drag = false"  handle=".handle">
          <transition-group name="list">
            <Item
              v-for="(item, i) of items"
              :item="item"
              :key="item.id"
              :index="i"
              @remove-item="removeItem"
            />
          </transition-group>
        </draggable>
      </v-list>
      <transition name="add">
        <AddItem @add-item="addItem"/>
      </transition>
      <v-btn type="submit" class="mr-2" rounded x-large depressed style="color:#3b6978;" color="#e7dfd5">Create</v-btn>
      <v-btn type="submit" @click.stop.prevent="dialog = true" rounded x-large depressed outlined right color="#e7dfd5">Cancel</v-btn>
      <v-dialog v-model="dialog" max-width="290">
        <v-card color="#e7dfd5">
          <v-card-title style="color:#204051;" class="headline">Do you want to leave?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#3b6978"  text  @click="dialog = false">cancel</v-btn>
            <v-btn color="#3b6978" text  @click.prevent="cancel">leave</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>
  </div>
</template>

<script>
import AddItem from '@/components/AddItem'
import Item from '@/components/Item'
import draggable from 'vuedraggable'

export default {
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },
  name: 'addnote',
  data() {
    return {
      items: [],
      title: '',
      id: null,
      dialog: false,
    }
  },
  methods: {
    removeItem(id) {
      this.items = this.items.filter(t => t.id !== id)
    },
    addItem(item) {
      this.items.push(item)
    },
    submitHandler() {
      const list = {
        title: this.title || 'Shopping list',
        id: Date.now(),
        items: this.items
      }
      this.$store.dispatch('createList', list)
      this.$router.push('/')
    },
    cancel() {
      this.$router.push('/')
    }
  },
  beforeRouteLeave(to, from, next) {
    let submit = this.submitHandler
    let cancel = this.cancel
        
    if (cancel) {
      this.dialog = true
      next()
    } else if (submit) {
      next()
    }
  },
  components: {
    AddItem,
    Item,
    draggable
  }
}
</script>

<style lang="scss" scoped>
.list-enter-active {
  transition: all .5s;
}
.list-leave-active {
  transition: all .2s;
}
.list-enter, .list-leave-to {
  opacity: 0;
}
.add-move {
  transition: 1s;
}
</style>