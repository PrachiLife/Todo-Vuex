<template>
  <v-card
    class="mx-auto my-auto"
    min-width="500"
    min-height="500"
    max-height="auto"
  >
    <v-toolbar color="indigo" dark>
      <v-toolbar-title>Todo</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-toolbar>

    <v-container fluid>
      <div class="d-flex justify-space-between">
        <v-text-field
          outlined
          label="Add Task"
          ref="input"
          v-model="TaskName"
          @keyup.enter="addOnEnter()"
        ></v-text-field>
      </div>
      <div v-for="(task, index) in tasksInputs" :key="index">
        <TodoTask :task="task" @data="editTask" />
      </div>
    </v-container>
  </v-card>
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
  },
};
</script>

<style scoped></style>
