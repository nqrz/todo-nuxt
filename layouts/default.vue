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
  async mounted() {
    const user = this.$supabase.auth.user()
    this.$store.commit('userUpdate', user)
    if (!user) {
      this.$router.push('/login')
      this.$store.dispatch('modalSubmit', "Welcome!👋 You must login first to use this app")
    }
    this.$supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        this.$store.commit('userUpdate', session.user)
      } else {
        this.$store.commit('userUpdate', null)
        this.$router.push('/login')
      }
    })
  },
}
</script>
