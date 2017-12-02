export const SET_COLLAPSE = 'SET_COLLAPSE'
export const GET_COLLAPSE = 'GET_COLLAPSE'

const state = {isCollapse: true}

const getters = {
  [GET_COLLAPSE] (state) {
    return state.isCollapse
  }
}
const mutations = {
  [SET_COLLAPSE] (state) {
    state.isCollapse = !state.isCollapse
  }
}

export default {
  state,
  mutations,
  getters
}
