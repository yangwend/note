import { defineStore } from 'pinia';

export const todos = defineStore('todos', {
  state: () => ({
    todos: [],
    filter: 'all',
    nextId: 0,
  }),
  getters: {
    finishedTodos(state) {
      return state.todos.filter((todo) => todo.isFinished),
    },
    unfinishedTodos(state) {
      return state.todos.filter((todo) => !todo.isFinished),
    },
    filteredTodos(state) {
      if (this.filter === 'finished') {
        return this.finishedTodos;
      } else if (this.filter === 'unfinished') {
        return this.unfinishedTodos
      }
      return this.todos;
    }
  },
  actions: {
    addTodo(text) {
      this.todos.push({ text, id: this.nextId++, isFinished: false })
    }
  }
})