<template>
  <div class="">
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
        {{ task.TaskName }}
      </span>
      <span class="align-self-center ml-auto">
        <v-icon
          color="indigo lighten-1"
          class="IconSize"
          @click="editTask([task.TaskName, task.id])"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          color="red lighten-1"
          class="IconSize"
          @click="deleteTask(task.id)"
        >
          mdi-delete
        </v-icon>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    task: Object,
  },
  methods: {
    deleteTask(Id) {
      this.$store.dispatch("deleteTask", Id);
    },
    editTask(data) {
      this.$emit("data", data);
    },
  },
};
</script>

<style scoped>
.border {
  border: 2px solid #9fa8da;
}
</style>
