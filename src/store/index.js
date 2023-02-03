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
    ADD_ON_ENTER: (state, data) => {
      state.id = state.id + 1;
      state.Tasks.push({
        TaskName: data[0],
        id: state.id,
        Checked: false,
        Date: new Date(),
        Due: data[1],
        render: false,
      });
    },
    DELETE_THE_TASK: (state, Id) => {
      state.Tasks.forEach((Task, index) => {
        if (Task.id == Id) {
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
    DATE_UPDATE: (state, data) => {
      state.Tasks.forEach((Task, index) => {
        if (Task.id == data[1]) {
          state.Tasks[index].Date = data[0];
        }
      });
    },
    CHECKED_TASK: (state, data) => {
      state.Tasks.forEach((Task, index) => {
        if (Task.id == data[1]) {
          state.Tasks[index].Checked = data[0];
        }
      });
    },
    SHOW_TASK: (state, data) => {
      state.Tasks.forEach((Task, index) => {
        if (Task.id == data[1]) {
          state.Tasks[index].render = data[0];
        }
      });
    },
    SHOW_TOMORROW: (state, data) => {
      state.Tasks.forEach((Task, index) => {
        if (Task.id == data[1]) {
          state.Tasks[index].render = data[0];
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
    dateUpdate: (context, date) => {
      context.commit("DATE_UPDATE", date);
    },
    checkedTask: (context, data) => {
      context.commit("CHECKED_TASK", data);
    },
    showTask: (context, data) => {
      context.commit("SHOW_TASK", data);
    },
    showTomorrow: (context, data) => {
      context.commit("SHOW_TOMORROW", data);
    },
  },
  modules: {},
});
