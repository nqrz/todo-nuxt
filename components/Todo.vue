<template>
  <div>
    <ul>
      <li v-for="todo in todos" :key="todo.id" class="flex justify-between items-center w-full py-2">
        <div>
          <input :checked="todo.is_complete" @change="toggle(todo)" type="checkbox" :id="todo.id">
          <label :class="{ done: todo.is_complete }" :for="todo.id">{{ todo.task }}</label>
        </div>
        <button class="btn btn-primary shadow-primary rounded-md" @click="removeTodo(todo.id)">Remove</button>
      </li>
    </ul>
    <figure v-if="loading" class="flex justify-center items-center my-2">
      <img src="icon/favicon-32x32.png" alt="logo" class="w-8 spin"/>
      <p class="ml-3">Why this thing is spinning?</p>
    </figure>
    <input class="input w-full shadow-primary my-2" type="text" @keyup.enter="addTodo" v-model="text" placeholder="What todo next?">
    <p v-if="!textIsValid" class="px-3 py-2">
      Type 3 characters or more.
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todos: [],
      text: '',
      textIsValid: true,
      loading: false
    }
  },
  async fetch() {
    try {
      this.loading = true
      const { data: todos, error } = await this.$supabase
        .from('todos')
        .select('*')
        .order('id', { ascending: true})
      if (error) throw error
      this.todos = todos
    } catch (error) {
      this.$store.dispatch('modalSubmit', error.message)
    } finally {
      this.loading = false
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
  },
  methods: {
    textValidator() {
      if (this.text.length > 3) {
        this.textIsValid = true
      } else {
        this.textIsValid = false
      }
    },
    async addTodo() {
      try {
        this.textValidator()
        if (!this.textIsValid) return
        if (!this.user) {
          const error = {
            message: 'Please login first'
          }
          this.$router.push('/login')
          throw error
        }
        const { error } = await this.$supabase
          .from('todos')
          .insert([
            { user_id: this.user.id, task: this.text }
          ])
        if (error) throw error
        this.text = ''
        this.$nuxt.refresh()
      } catch (error) {
        this.$store.dispatch('modalSubmit', error.message)
      }
    },
    async toggle({ id, is_complete }) {
      try {
        const { error } = await this.$supabase
          .from('todos')
          .update({ is_complete: !is_complete })
          .match({ id })
        if (error) throw error
        const key = this.todos.findIndex(item => item.id == id)
        this.todos[key].is_complete = !this.todos[key].is_complete
        console.log('Toggle task is success');
      } catch (error) {
        this.$store.dispatch('modalSubmit', error.message)
      }
    },
    async removeTodo(id) {
      try {
        const { error } = await this.$supabase
          .from('todos')
          .delete()
          .match({ id })
        if (error) throw error
        this.todos = this.todos.filter(item => item.id !== id)
        console.log('success deleted todo');
      } catch (error) {
        this.$store.dispatch('modalSubmit', error.message)
      }
    },
  }
}
</script>

<style scoped>
.spin {
  animation: spin 3.5s infinite linear;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
