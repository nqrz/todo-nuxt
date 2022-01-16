<template>
  <header class="flex flex-col items-center pt-10">
    <h1 title="Created by: Nizar Baihaqi">Todo list</h1>
    <div class="flex mb-2 items-center">
      <span class="ml-3 mr-2">
        <p>{{ formatDate(Date.now()) }}</p>
      </span>
    </div>
    <p v-if="user" class="text-xs mb-1">{{ user.email }}</p>
    <div class="flex gap-2 my-2">
      <LightDark />
      <NuxtLink v-if="!user" to="/login">
        <button class="btn btn-secondary rounded-full" title="Login">
          <i class="fas fa-user"></i>
        </button>
      </NuxtLink>
      <button v-else @click="signout" class="btn btn-secondary rounded-full">
        <i class="fas fa-door-open"></i>
      </button>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      date: null,
      bg: false
    }
  },
  methods: {
    handleDateReq() {
      if (!this.date) return
      this.$store.commit('dateUpdate', this.date)
      this.date = ''
    },
    toggleBg() {
      this.bg = !this.bg
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
    async signout() {
      const { error } = await this.$supabase.auth.signOut()
      if (error) throw error
      this.$store.dispatch('modalSubmit', 'Good bye 👋')
      console.log('Successfully logged out');
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
  }
}
</script>