import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  user: null,
  authenticated: false,
  isShowBackdrop: false
})

export type RootState = ReturnType<typeof state>

export const getters:  GetterTree<RootState, RootState> = {
  getUser(state) {
    return state.user
  },

  getBackDrop(state) {
    return state.isShowBackdrop
  }
}

export const mutations: MutationTree<RootState> = {
  SET_USER(state, user) {
    state.user = user
  },
  SHOW_BACKDROP(state) {
    state.isShowBackdrop = true
  },
  HIDE_BACKDROP(state) {
    state.isShowBackdrop = false
  }
}


export const actions: ActionTree<RootState, RootState> = {
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

  showBackdrop(state) {
    state.commit('SHOW_BACKDROP')
  },

  hideBackdrop(state) {
    state.commit('HIDE_BACKDROP')
  }
}

