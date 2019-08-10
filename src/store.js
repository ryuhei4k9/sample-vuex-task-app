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
        done: false
      },
      {
        id: 2,
        name: "Vue.jsの本を買う",
        done: true
      }
    ],

    nextTaskId: 3
  },

  mutations: {
    addTask(state, { name }) {
      state.tasks.push({
        id: state.nextTaskId,
        name: name,
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
    }
  },
  actions: {}
});
