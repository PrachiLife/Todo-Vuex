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
        <div class="d-flex border rounded-lg mb-2">
          <span class="mb-4">
            <v-checkbox
              color="primary"
              value="primary"
              hide-details
              class="align-self-center"
            ></v-checkbox
          ></span>
          <span class="align-self-center">
            {{ task.TaskName }}{{ task.id }}
          </span>
          <span class="align-self-center ml-auto">
            <v-icon color="indigo lighten-1" class="IconSize">
              mdi-pencil
            </v-icon>
            <v-icon color="red lighten-1" class="IconSize"> mdi-delete </v-icon>
          </span>
        </div>
      </div>
    </v-container>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";
//import { mapActions } from "vuex";
export default {
  data: () => ({
    due: null,
    TaskName: "",
  }),
  computed: {
    ...mapGetters(["tasksInputs"]),
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
