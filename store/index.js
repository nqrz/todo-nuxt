export const state = () => ({
  modal: null,
  user: null
})

export const mutations = {
  modalChanged(state, payload) {
    state.modal = payload
  },
  userUpdate(state, payload) {
    state.user = payload
  }
}

export const actions = {
  modalSubmit({ commit }, payload) {
    commit('modalChanged', payload)
    setTimeout(() => {
      commit('modalChanged', null)
    }, 8000)
  }
}