<template>
  <div class="">
    <div class="d-flex border rounded-lg mb-2">
      <span class="mb-4">
        <v-checkbox
          color="primary"
          hide-details
          class="align-self-center"
          v-model="checkedBox"
          :value="checkedTask([task.Checked, task.id])"
        ></v-checkbox
      ></span>
      <span class="align-self-center">
        {{ task.TaskName }}
      </span>
      <span class="align-self-center ml-auto">
        <div class="d-flex flex-column">
          <div class="grey--text">
            {{
              task.Date.getFullYear() +
              "/" +
              (task.Date.getMonth() + 1) +
              "/" +
              task.Date.getDate()
            }}
            {{ task.Date.getHours() + ":" + task.Date.getMinutes() }}
          </div>
          <div class="ml-8">
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
          </div>
        </div>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    task: Object,
  },
  data() {
    return {
      checkedBox: false,
    };
  },
  methods: {
    deleteTask(Id) {
      this.$store.dispatch("deleteTask", Id);
    },
    editTask(data) {
      this.$emit("data", data);
    },
    checkedTask(data) {
      data[0] = this.checkedBox;
      this.$store.dispatch("checkedTask", data);
      console.log(data[0], this.checkedBox);
    },
  },
};
</script>

<style scoped>
.border {
  border: 2px solid #9fa8da;
}
</style>
