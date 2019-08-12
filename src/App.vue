<template>
  <div id="app">
    <h2>タスク一覧</h2>
    <ul>
      <li v-for="task in tasks" v-bind:key="task.id">
        <input
          type="checkbox"
          v-bind:checked="task.done"
          v-on:change="toggleTaskStatus(task)"
        />
        {{ task.name }}
        -
        <span v-for="id in task.labelIds" v-bind:key="id">
          {{ getLabelText(id) }}
        </span>
      </li>
    </ul>

    <form v-on:submit.prevent="registerTask">
      <input type="text" v-model="newTaskName" placeholder="新しいタスク" />
    </form>

    <h2>ラベル一覧</h2>
    <ul>
      <li v-for="label in labels" v-bind:key="label.id">
        <input
          type="checkbox"
          v-bind:value="label.id"
          v-model="newTaskLabelIds"
        />
        {{ label.text }}
      </li>
    </ul>

    <form v-on:submit.prevent="registerLabel">
      <input type="text" v-model="newLabelText" placeholder="新しいラベル" />
    </form>

    <h2>ラベルでフィルタ</h2>
    <ul>
      <li v-for="label in labels" v-bind:key="label.id">
        <input
          type="radio"
          v-bind:checked="label.id === filter"
          v-on:change="changeFilter({ filter: label.id })"
        />
        {{ label.text }}
      </li>
      <li>
        <input
          type="radio"
          v-bind:checked="filter === null"
          v-on:change="changeFilter({ filter: null })"
        />
        フィルタしない
      </li>
    </ul>

    <h2>保存と復元</h2>
    <button type="button" v-on:click="save">保存</button>
    <button type="button" v-on:click="restore">復元</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "app",

  data() {
    return {
      newTaskName: "",

      newTaskLabelIds: [],

      newLabelText: ""
    };
  },

  computed: {
    ...mapState(["labels", "filter"]),

    ...mapGetters({
      tasks: "filteredTasks"
    })
  },

  methods: {
    registerTask() {
      this.addTask({
        name: this.newTaskName,
        labelIds: this.newTaskLabelIds
      });

      this.newTaskName = "";
      this.newTaskLabelIds = [];
    },

    registerLabel() {
      this.addLabel({
        text: this.newLabelText
      });

      this.newLabelText = "";
    },

    // ラベルIDから、そのラベルのテキストを返す
    getLabelText(id) {
      const label = this.labels.filter(label => label.id === id)[0];
      return label ? label.text : "";
    },

    ...mapMutations([
      "addTask",
      "toggleTaskStatus",
      "addLabel",
      "changeFilter"
    ]),

    ...mapActions(["save", "restore"])
  }
};
</script>

<style></style>
