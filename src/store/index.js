import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lists: JSON.parse(localStorage.getItem('lists') || '[]')
  },
  mutations: {
    createList(state, list) {
      state.lists.push(list)
      localStorage.setItem('lists', JSON.stringify(state.lists))
    },
    updateList(state, {title, id, items}) {
      const lists = state.lists.concat()
      const idx = lists.findIndex(t => t.id === id)
      const list = lists[idx]
      lists[idx] = {...list, title, id, items}
      state.lists = lists
      localStorage.setItem('lists', JSON.stringify(state.lists))
    },
    deleteList(state, index) {
      let lists = state.lists.concat()
      for (let i = 0; i < lists.length; i++) {
        if (lists[i].id == index) {
          lists.splice(i, 1)
        }
      }
      state.lists = lists
      localStorage.setItem('lists', JSON.stringify(state.lists))
    }
  },
  actions: {
    createList({commit}, list) {
      commit('createList', list)
    },
    updateList({commit}, list) {
      commit('updateList', list)
    },
    deleteList({commit}, list) {
      commit('deleteList', list)
    }
  },
  getters: {
    lists: s => s.lists,
    listById: s => id => s.lists.find(t => t.id === id)
  },
  modules: {
  }
})
