import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userinfo:{

    },
  },
  mutations: {
    getuserName(state,name){
      state.userinfo=name;
    }
  },
  actions: {
  },
  modules: {
  }
})
