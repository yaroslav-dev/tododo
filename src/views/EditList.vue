<template>
  <div class="col-lg-3 col-md-6 col-sm-8 col-xs-12 mx-auto">
    <div v-if="list">
      <v-form @submit.prevent>

        <v-row class="col-12 mr-0 pb-0 pl-4">
          <v-text-field class="title" label="Title" v-model="list.title" solo flat dense hide-details required></v-text-field>
          <span class="align-self-center mt-1">{{list.items.filter(t => t.done).length}}/{{list.items.length}}</span>
        </v-row>
        
        <v-list transition="slide-y-transition">
          <draggable v-model="list.items" v-bind="dragOptions" @start="drag = true" @end="drag = false" handle=".handle">
            <transition-group name="list">
              <Item
                v-for="(item, i) of list.items.filter(t => !t.done)"
                :item="item"
                :key="item.id"
                :done="item.done"
                :index="i"
                @remove-item="removeItem"
              />
              <Item
                v-for="(item, i) of list.items.filter(t => t.done)"
                :item="item"
                :key="item.id"
                :done="item.done"
                :index="i"
                @remove-item="removeItem"
              />
            </transition-group>
          </draggable>
        </v-list>


          <AddItem @add-item="addItem"/>

        <v-btn type="submit" @click="confirmSave = true;$router.push('/')" class="mr-2" rounded x-large depressed outlined color="success">save</v-btn>
        <v-btn type="submit" @click.stop="dialog = true" rounded x-large text right>cancel</v-btn>
        <v-dialog  v-model="dialog"  max-width="290">
          <v-card>
            <v-card-title class="headline">Do you want to leave?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1"  text  @click="dialog = false">cancel</v-btn>
              <v-btn color="green darken-1" text  @click="confirmCancel = true;$router.push('/')">ok</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-form>
    </div>
    <h1 v-else>Page not found!</h1>
  </div>
</template>

<script>
import AddItem from '@/components/AddItem'
import Item from '@/components/Item'
import draggable from 'vuedraggable'

export default {
  computed: {
    list() {
      return this.$store.getters.listById(+this.$route.params.id)
    },
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },
  data() {
    return {
      items: [],
      title: '',
      id: null,
      dialog: false,
      confirmCancel: false,
      confirmSave: false
    }
  },
  created() {
    this.beforeEditList = Object.assign({}, this.list)
    this.beforeEditListItem = Array.from(this.list.items)
  },
  methods: {
    removeItem(id) {
        this.list.items = this.list.items.filter(t => t.id !== id)
    },
    addItem(item) {
      this.list.items.push(item)
    }
  },
  beforeRouteLeave(to, from, next) {
    let confirmSave = this.confirmSave
    let confirmCancel = this.confirmCancel

    if (!confirmSave) {
      this.dialog = true
      
      if (confirmCancel) {
        Object.assign(this.list, this.beforeEditList)
        this.list.items = Array.from(this.beforeEditListItem)
        next()
      } else {
        next(false)
      }
    } else if (confirmSave) {
      this.$store.dispatch('updateList', {
        title: this.title || 'List',
        id: this.id,
        items: this.items
      })
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
.ghost {
  opacity: 0;
}
.title {
  font-size: 24px;
}
</style>