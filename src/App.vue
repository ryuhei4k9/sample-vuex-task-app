<template>
  <div id="app">
    <h2>タスク一覧</h2>
    <ul>
      <li v-for="task in tasks" v-bind:key="task.id">
        <input type="checkbox" v-bind:checked="tasks.done" />
        {{ task.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "app",
  computed: {
    tasks() {
      return this.$store.state.tasks;
    }
  }
};
</script>

<style></style>
