<template>
  <button class="nav-link" @click="toggleColor()">
    <i title="Light mode" class="fas fa-sun transition-all" v-if="$colorMode.preference == 'light'"></i>
    <i title="Dark mode" class="fas fa-moon" v-else></i>
  </button>
</template>

<script>
export default {
  methods: {
    toggleColor () {
      if (this.$colorMode.preference == "dark") {
        this.$colorMode.preference = "light"
      } else {
        this.$colorMode.preference = "dark"
      }
    },
  }
}
</script>