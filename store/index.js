export const state = () => ({
  loginModal: false
})

export const mutations = {
  toggleModal (state) {
    state.loginModal = !state.loginModal
  }
}