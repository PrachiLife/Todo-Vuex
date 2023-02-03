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
            class="mb"
            :disabled="TodoComplete"
          ></v-text-field>
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
        <div v-for="task in tasksInputs" :key="task['id']">
          <TodoTask :task="task" @data="editTask" />
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
      } else if (this.TaskName != "") {
        this.$store.dispatch("addOnEnter", this.TaskName);
        this.TaskName = "";
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
</style>
