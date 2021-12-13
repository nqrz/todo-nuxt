<template>
  <div class="bg-gradient-to-tr from-pastel-gray to-pastel-blue dark:from-night-black dark:to-night-purple">
    <button class="btn rounded-r-md absolute top-1/2">Login</button>
    <div class="flex flex-col items-center justify-center min-h-screen py-10">
      <h1>Todo list</h1>
      <p class="mb-2">{{ formatDate(Date.now()) }}</p>
      <div class="w-sm">
        <div>
          <ul>
            <li v-for="todo in todos" :key="todo.id" class="flex justify-between items-center w-full py-1">
              <div>
                <input :checked="todo.done" @change="toggle(todo)" type="checkbox" :id="todo.id">
                <label :class="{ done: todo.done }" :for="todo.id">{{ todo.text }}</label>
              </div>
              <button class="btn rounded-md" @click="removeTodo(todo)">remove</button>
            </li>
          </ul>
          <input class="w-full" type="text" @keyup.enter="addTodo" v-model="text" placeholder="What todo next?">
        </div>
        <transition name="slide-fade">
          <WarnBox v-if="error">
            {{ error }}
          </WarnBox>
        </transition>
        <InfoBox>
          Press enter to submit
        </InfoBox>
        <InfoBox>
          This list is stored with Vuex. Erased if web is reloaded. But, go to another routes and back is not going to erase this list
        </InfoBox>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      text: '',
      error: ''
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
        this.error = 'Please type something.'
      } else {
        this.$store.commit('todos/add', this.text)
        this.text = ''
        this.error = ''
      }
    },
    ...mapMutations({
      toggle: 'todos/toggle'
    }),
    removeTodo (todo){
      this.$store.commit('todos/remove', todo)
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    }
  }
}
</script>