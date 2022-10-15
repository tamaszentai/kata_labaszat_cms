export const state = () => ({
  authenticated: false,
  pageTitle: 'Információs pult'
})

export const getters = {
  getPageTitle(state:any) {
    return state.pageTitle
  }
}

export const mutations = {
  setPageTitle(state: any, payload: string) {
    state.pageTitle = payload
  }
}

export const actions = {
  setPageTitle(context: any, payload: string) {
    context.commit('setPageTitle', payload)

  }
}
