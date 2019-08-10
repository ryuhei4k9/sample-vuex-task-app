import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // タスクの初期ステート
    tasks: [
      {
        id: 1,
        name: "牛乳を買う",
        labelIds: [1, 2],
        done: false
      },
      {
        id: 2,
        name: "Vue.jsの本を買う",
        labelIds: [1, 3],
        done: true
      }
    ],

    // ラベルの初期ステート
    labels: [
      {
        id: 1,
        text: "買い物"
      },
      {
        id: 2,
        text: "食糧"
      },
      {
        id: 3,
        text: "本"
      }
    ],

    nextTaskId: 3,
    nextLabelId: 4,

    // フィルタするラベルのID
    filter: null
  },

  getters: {
    // フィルタリングしたタスクを返す
    filteredTasks(state) {
      // ラベルが選択されていなければ全体を返す
      if (!state.filter) {
        return state.tasks;
      }

      return state.tasks.filter(task => {
        return task.labelIds.indexOf(state.filter) >= 0;
      });
    }
  },

  mutations: {
    addTask(state, { name, labelIds }) {
      state.tasks.push({
        id: state.nextTaskId,
        name,
        labelIds,
        done: false
      });

      state.nextTaskId++;
    },

    toggleTaskStatus(state, { id }) {
      const filtered = state.tasks.filter(task => {
        return task.id === id;
      });

      filtered.forEach(task => {
        task.done = !task.done;
      });
    },

    addLabel(state, { text }) {
      state.labels.push({
        id: state.nextLabelId,
        text
      });

      state.nextLabelId++;
    },

    changeFilter(state, { filter }) {
      state.filter = filter;
    }
  },
  actions: {}
});
