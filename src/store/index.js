import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    Tasks: [],
    id: 0,
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
    // CHECK_TASK: (state, data) => {
    //   state.Tasks.forEach((Task, index) => {
    //     if (Task.id == data[1]) {
    //       console.log("start in index", data[1], Task.id);
    //       state.Tasks[index].Checked = data[0];
    //       console.log("end in index", state.Tasks[index].Checked);
    //     }
    //      console.log("check-task", state.Tasks[index].Checked);
    //   });
    // },
    CHECK_BOX: (state, data) => {
      state.Tasks.forEach((Task, index) => {
        if (Task.id == data[1]) {
          console.log("CHECKBOX START", data[1], Task.id);
          state.Tasks[index].Checked = data[0];
          console.log("CHECKBOX END", data[1], state.Tasks[index].Checked);
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
    // checkTask: (context, data) => {
    //   context.commit("CHECK_TASK", data);
    // },
    checkBox: (context, data) => {
      context.commit("CHECK_BOX", data);
    },
    dateUpdate: (context, date) => {
      context.commit("DATE_UPDATE", date);
    },
  },
  modules: {},
});
