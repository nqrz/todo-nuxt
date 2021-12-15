<template>
  <div>
    <ul>
      <li v-for="todo in todos" :key="todo.id" class="flex justify-between items-center w-full py-2">
        <div>
          <input :checked="todo.done" @change="toggle(todo)" type="checkbox" :id="todo.id">
          <label :class="{ done: todo.done }" :for="todo.id">{{ todo.text }}</label>
        </div>
        <button class="btn rounded-md" @click="removeTodo(todo)">remove</button>
      </li>
    </ul>
    <input class="w-full mb-3" type="text" @keyup.enter="addTodo" v-model="text" placeholder="What todo next?">
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      text: ''
    }
  },
  computed: {
    todos () {
      return this.$store.state.todos.list
    }
  },
  methods: {
    addTodo () {
      if (!this.text) {
        this.$store.commit('todos/error')
      } else {
        this.$store.commit('todos/add', this.text)
        this.text = ''
      }
    },
    ...mapMutations({
      toggle: 'todos/toggle'
    }),
    removeTodo (todo){
      this.$store.commit('todos/remove', todo)
    },
  }
}
</script>