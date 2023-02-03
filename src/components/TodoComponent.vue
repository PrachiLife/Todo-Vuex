<template>
  <div class="relative">
    <v-card
      class="mx-auto mt-10"
      max-width="500"
      min-height="500"
      max-height="auto"
    >
      <v-toolbar color="indigo" dark>
        <v-toolbar-title>Todo</v-toolbar-title>

        <v-spacer></v-spacer>
      </v-toolbar>
      <div>
        <v-snackbar v-model="snackbar.show" :timeout="2000" class="absolute">
          <span>{{ snackbar.message }}</span>
        </v-snackbar>
      </div>

      <v-container fluid>
        <div class="d-flex justify-space-between">
          <v-text-field
            outlined
            label="Add Task"
            ref="input"
            v-model="TaskName"
            @keyup.enter="addOnEnter()"
            class="mb max-width"
            :disabled="TodoComplete"
          ></v-text-field>
          <div class="width">
            <v-menu
              v-model="showDatePicker"
              :close-on-content-click="false"
              transition="scale-transition"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  @keyup.enter="addOnEnter()"
                  :value="due"
                  v-bind="attrs"
                  v-on="on"
                  outlined
                  prepend-icon="mdi-calendar"
                  redaonly
                  label="Due Date"
                  :disabled="TodoComplete"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="due"
                :min="new Date().toISOString().substr(0, 10)"
              ></v-date-picker>
            </v-menu>
          </div>
        </div>
        <div class="d-flex justify-end mb-2">
          <span>
            <v-checkbox
              color="primary"
              hide-details
              class="align-self-center mb-2"
              v-model="TodoComplete"
              @click="CheckedTodo()"
            ></v-checkbox
          ></span>
          <span class="mt-4"> TodoComplete</span>
        </div>
        <div v-if="Today">Today</div>
        <div v-for="task in tasksInputs" :key="'A' + task['id']">
          <div v-if="show(task)">
            <TodoTask :task="task" @data="editTask" />
          </div>
        </div>
        <hr class="indigo lighten-1 mb-2" v-if="Today" />
        <div v-if="Tomorrow">Tomorrow</div>
        <div v-for="task in tasksInputs" :key="'B' + task['id']">
          <div v-if="showTomorrow(task)">
            <TodoTask :task="task" @data="editTask" />
          </div>
        </div>
        <hr class="indigo lighten-1 mb-2" v-if="Tomorrow" />
        <!-- <div>Rest Task</div> -->
        <div v-for="task in tasksInputs" :key="'C' + task['id']">
          <div v-if="!task.render">
            <TodoTask :task="task" @data="editTask" />
          </div>
        </div>
      </v-container>
    </v-card>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
//import { mapActions } from "vuex";
import TodoTask from "./TodoTask.vue";
export default {
  data: () => ({
    due: null,
    TaskName: "",
    EditId: -1,
    TodoComplete: false,
    snackbar: {
      show: false,
      message: null,
    },
    showDatePicker: false,
    Date: new Date(),
    render: false,
    Today: false,
    Tomorrow: false,
  }),
  computed: {
    ...mapGetters(["tasksInputs"]),
  },
  components: {
    TodoTask,
  },
  methods: {
    addOnEnter() {
      if (this.EditId != -1) {
        this.$store.dispatch("editTask", [this.TaskName, this.EditId]);
        this.TaskName = "";
        this.$store.dispatch("dateUpdate", [new Date(), this.EditId]);
        this.EditId = -1;
      } else if (this.TaskName != "" && this.due != null) {
        this.$store.dispatch("addOnEnter", [this.TaskName, this.due]);
        this.TaskName = "";
        this.due = null;
      } else if (
        (this.TaskName != "" && this.due == null) ||
        this.TaskName == "" ||
        this.due != null ||
        (this.TaskName == "" && this.due == null)
      ) {
        this.snackbar.message = "Add Task name and due date both please!!";
        this.snackbar.show = true;
      } else {
        console.log("In the addOnEnter function");
      }
    },
    editTask(data) {
      this.$refs.input.focus();
      this.EditId = data[1];
      this.TaskName = data[0];
    },
    CheckedTodo() {
      if (this.TodoComplete == true) {
        this.snackbar.message = "Awesome! your Todo is Completed";
        this.snackbar.show = true;
      }
    },
    show(task) {
      if (
        new Date(task["Due"]).getDate() === this.Date.getDate() &&
        new Date(task["Due"]).getMonth() === this.Date.getMonth() &&
        new Date(task["Due"]).getFullYear() === this.Date.getFullYear()
      ) {
        this.render = true;
        this.Today = true;
        this.$store.dispatch("showTask", [this.render, task.id]);
        return true;
      }
    },
    showTomorrow(task) {
      if (
        new Date(task["Due"]).getDate() ===
          new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getDate() &&
        new Date(task["Due"]).getMonth() + 1 ===
          new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getMonth() + 1 &&
        new Date(task["Due"]).getFullYear() ===
          new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getFullYear()
      ) {
        this.render = true;
        this.Tomorrow = true;
        this.$store.dispatch("showTomorrow", [this.render, task.id]);
        return true;
      }
    },
  },
};
</script>

<style scoped>
.border {
  border: 2px solid red;
}
.mb {
  margin-bottom: -30px;
}
.relative {
  position: relative;
}
.absolute {
  position: absolute;
}
.max-width {
  max-width: 49%;
}
</style>
