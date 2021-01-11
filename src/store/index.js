import Vue from 'vue'
import Vuex from 'vuex'
import { addCount } from './mutations/modules/ldqMutations'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    count: 0,
    ldq: '李大庆',
    todos: [
      { id: 1, text: '1...', done: true },
      { id: 2, text: '2...', done: false }
    ],
    action: 999
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.text)
    },
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length
    },
    getTodoById: (state) => (id) => {
      return state.todos.find(todo => todo.id === id)
    }
  },
  mutations: {
    increment (state, payload) {
      state.count += payload.amount
    },
    [`dd${addCount}`] (state) {
      state.count++
    },
    'actionA_Mutation' (state) {
      state.action++
    }
  },
  actions: {
    increment (context, query) {
      // console.log(context)
      // console.log(query)
      setInterval(() => {
        context.commit('increment', { amount: query.amount })
      }, 1000)
    },
    add (context) {
      console.log(context)
      setInterval(() => {
        context.commit('ddaddCount')
      }, 1000)
    },
    incrementAsync ({ commit }, query) {
      setInterval(() => {
        commit('increment', { amount: query.amount })
      }, 1000)
    },
    async  actionA (context) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('A')
          context.commit('actionA_Mutation')
          resolve()
        }, 1000)
      })
    },
    async actionB (context) {
      console.log('B')
      await setTimeout(() => {
        context.dispatch('actionA')
      }, 1000)
    }

  },
  modules: {
  }
})
