<template>
  <main class="container mx-auto max-w-screen-sm flex flex-col justify-center items-center">
      <h3 v-if="error.statusCode === 404">Your page request is doesn't exist in this website</h3>
      <h3 v-else>An error occured</h3>
      <code class="text-sm mb-3">{{ error.statusCode }}</code>
      <NuxtLink v-if="user" class="btn btn-primary rounded-md" to="/">Home page</NuxtLink>
      <NuxtLink v-else class="btn btn-primary rounded-md" to="/login">Login</NuxtLink>
  </main>
</template>

<script>
export default {
  props: ['error'],
  computed: {
    user() {
      return this.$store.state.user
    },
  }
}
</script>
