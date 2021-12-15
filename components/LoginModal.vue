<template>
  <div class="absolute top-0 bottom-0 left-0 right-0 bg-night-gray bg-opacity-80 flex flex-col items-center justify-center" v-show="loginModal">
    <div class="bg-pastel-blue dark:bg-night-black w-96 rounded-md p-3">
      <button class="float-right" @click="closeLoginModal">
        <i class="fas fa-times text-lg hover:text-light-secondary dark:hover:text-dark-secondary"></i>
      </button>
      <h4 class="text-center"><i class="fas fa-envelope"></i></h4>
      <div v-if="submitted">
        <p class="text-center">Check your email at {{ email }}<p/>
      </div>
      <div v-else-if="loading">
        loading
      </div>
      <div v-else-if="!user">
        <input class="w-full" type="email" v-model="email" placeholder="Enter your email">
        <button @click="signIn" type="submit" class="btn rounded-md w-full">Login</button>
        <transition name="slide-fade">
          <WarnBox v-if="error">
            {{ error }}
          </WarnBox>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      email: '',
      error: '',
      loading: false,
      submitted: false
    }
  },
  computed: {
    loginModal () {
      return this.$store.state.loginModal
    },
    user() {
      return this.$store.state.user.profile
    }
  },
  methods: {
    async signIn() {
      this.loading = true
      const { email } = this
      if (!email) {
        error = 'Please enter your email'
      }
      await this.$supabase.auth.signIn({ email })
      this.submitted = true
    },
    ...mapMutations({
      closeLoginModal: 'toggleModal'
    }),
  }
}
</script>