export const state = () => ({
  user: null,
  authenticated: false
})

export const getters = {
  getUser(state) {
    return state.user
  },
}

export const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
}


export const actions = {
  async onAuthStateChangedAction(state, { authUser, claims }) {
    if (!authUser) {
      // remove state
      state.commit('SET_USER', null)

      //redirect from here
      this.$router.push({
        path: '/login',
      })
    } else {
      const { uid, email } = authUser
      state.commit('SET_USER', {
        uid,
        email,
      })
    }
  },
}

