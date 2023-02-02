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
    DELETE_THE_TASK: (state, Id) => {
      console.log(state);
      console.log("delete the task", Id);
      state.Tasks.forEach((Task, index) => {
        if (Task.id == Id) {
          console.log(Task);
          state.Tasks.splice(index, 1);
        }
      });
    },
  },
  actions: {
    addOnEnter: (context, Payload) => {
      context.commit("ADD_ON_ENTER", Payload);
    },
    deleteTask: (context, Id) => {
      context.commit("DELETE_THE_TASK", Id);
    },
  },
  modules: {},
});
