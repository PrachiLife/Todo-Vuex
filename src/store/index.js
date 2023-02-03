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
    ADD_ON_ENTER: (state, TaskName) => {
      state.id = state.id + 1;
      state.Tasks.push({ TaskName: TaskName, id: state.id });
    },
    DELETE_THE_TASK: (state, Id) => {
      state.Tasks.forEach((Task, index) => {
        if (Task.id == Id) {
          console.log(Task);
          state.Tasks.splice(index, 1);
        }
      });
    },
    EDIT_TASK: (state, data) => {
      state.Tasks.forEach((Task, index) => {
        if (Task.id == data[1]) {
          state.Tasks[index].TaskName = data[0];
        }
      });
    },
  },
  actions: {
    addOnEnter: (context, TaskName) => {
      context.commit("ADD_ON_ENTER", TaskName);
    },
    deleteTask: (context, Id) => {
      context.commit("DELETE_THE_TASK", Id);
    },
    editTask: (context, data) => {
      context.commit("EDIT_TASK", data);
    },
  },
  modules: {},
});
