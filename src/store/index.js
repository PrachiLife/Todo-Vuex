import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    Tasks: [],
    id: 0,
  },
  getters: {
    tasksInputs: (state) => {
      return state.Tasks;
    },
  },
  mutations: {
    ADD_ON_ENTER: (state, Payload) => {
      console.log(state, Payload);
      state.id = state.id + 1;
      state.Tasks.push({ TaskName: Payload, id: state.id });
    },
  },
  actions: {
    addOnEnter: (context, Payload) => {
      context.commit("ADD_ON_ENTER", Payload);
    },
  },
  modules: {},
});
