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
          v-model="TaskName"
          @keyup.enter="addOnEnter(TaskName)"
        ></v-text-field>
      </div>
      <div v-for="(task, index) in tasksInputs" :key="index">
        <TodoTask :task="task" />
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
  }),
  computed: {
    ...mapGetters(["tasksInputs"]),
  },
  components: {
    TodoTask,
  },
  methods: {
    addOnEnter(Payload) {
      this.$store.dispatch("addOnEnter", Payload);
      this.TaskName = "";
    },
  },
};
</script>

<style scoped>
.border {
  border: 2px solid #9fa8da;
}
</style>
