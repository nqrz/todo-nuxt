<template>
  <div class="bg-primary min-h-screen flex flex-col justify-center">
    <PromptModal />
    <Header />
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
export default {

  // This only be called when component 'mounted' except we declare event listener here
  async mounted() {

    // Fetch the user state
    const user = this.$supabase.auth.user()

    // Store it to Vuex
    this.$store.commit('userUpdate', user)

    // This is event listener from Supabase
    // Listen to user authentication state (Login or logout)
    this.$supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        this.$store.commit('userUpdate', session.user)
        this.$router.push('/')
      } else {
        this.$store.commit('userUpdate', null)
        this.$router.push('/login')
      }
    })
  },
}
</script>
