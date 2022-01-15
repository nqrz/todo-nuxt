<template>
  <header class="flex flex-col items-center pt-10">
    <h1 title="Created by: Nizar Baihaqi">Todo list</h1>
    <p class="mb-2">{{ formatDate(Date.now()) }}</p>
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
  methods: {
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