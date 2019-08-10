<template>
  <div id="app">
    <h2>タスク一覧</h2>
    <ul>
      <li v-for="task in tasks" v-bind:key="task.id">
        <input
          type="checkbox"
          v-bind:checked="tasks.done"
          v-on:change="toggleTaskStatus(task)"
        />
        {{ task.name }}
      </li>
    </ul>

    <form v-on:submit.prevent="addTask">
      <input type="text" v-model="newTaskName" placeholder="新しいタスク" />
    </form>
  </div>
</template>

<script>
export default {
  name: "app",

  data() {
    return {
      newTaskName: ""
    };
  },

  computed: {
    tasks() {
      return this.$store.state.tasks;
    }
  },

  methods: {
    addTask() {
      // ストアのaddTaskミューテーションをコミットする
      this.$store.commit("addTask", {
        name: this.newTaskName
      });
      this.newTaskName = "";
    },

    toggleTaskStatus(task) {
      // ストアのtoggleTaskStatusミューテーションをコミットする
      this.$store.commit("toggleTaskStatus", {
        id: task.id
      });
    }
  }
};
</script>

<style></style>
