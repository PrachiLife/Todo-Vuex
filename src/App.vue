<template>
  <v-app>
    <TodoComponent />
  </v-app>
</template>

<script>
import TodoComponent from "./components/TodoComponent.vue";
export default {
  name: "App",

  components: {
    TodoComponent,
  },
};
</script>
