<template>
  <div class="bg-gradient-to-tr from-pastel-gray to-pastel-blue dark:from-night-black dark:to-night-purple dark:text-white">
    <LoginModal />
    <div class="flex flex-col items-center justify-center min-h-screen py-10">
      <h1 title="Created by: Nizar Baihaqi">Todo list</h1>
      <p class="mb-2">{{ formatDate(Date.now()) }}</p>
      <div class="flex gap-2">
        <LightDark />
      </div>
      <div class="w-sm">
        <Todo />
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
export default {
  computed: {
    error () {
      return this.$store.state.todos.error
    },
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
  },
}
</script>