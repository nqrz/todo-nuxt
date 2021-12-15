<template>
  <div>
    <button title="Logout" v-if="user !== null" @click="logout"><i class="fas fa-door-open"></i></button>
    <button title="Login" v-else @click="showLoginModal"><i class="fas fa-address-card"></i></button>
    <pre>{{ $store.user }}</pre>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  computed: {
    user() {
      return this.$store.state.user.profile
    }
  },
  methods: {
    async logout() {
      await this.$supabase.auth.signOut()
      this.$store.commit('user/logout')
    },
    ...mapMutations({
      showLoginModal: 'toggleModal'
    }),
  }
}
</script>