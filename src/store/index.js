import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    Tasks: [],
    id: 0,
    // TodoComplete: false,
    //date: new Date(),
    // checked1: false,
  },
  getters: {
    tasksInputs: (state) => {
      return state.Tasks;
    },
  },
  mutations: {
    ADD_ON_ENTER: (state, TaskName) => {
      state.id = state.id + 1;
      state.Tasks.push({
        TaskName: TaskName,
        id: state.id,
        Checked: false,
        Date: new Date(),
      });
    },
    DELETE_THE_TASK: (state, Id) => {
      state.Tasks.forEach((Task, index) => {
        if (Task.id == Id) {
          // state.checked1 = state.Tasks[index].id;
          console.log(Task);
          state.Tasks.splice(index, 1);
          //state.Tasks[index].id = state.checked1;
          console.log("delete-the-task", state.Tasks[index]);
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
      console.log(state, data);
      state.Tasks.forEach((Task, index) => {
        if (Task.id == data[1]) {
          state.Tasks[index].Checked = data[0];
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
  },
  modules: {},
});
