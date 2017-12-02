import api from '@/api'
import { Message } from 'element-ui'
export const SET_TYPE = 'SET_TYPE'
export const SET_API = 'SET_API'
export const GET_TYPE = 'GET_TYPE'

const state = {type: [], api: ''}

const actions = {
  [GET_TYPE] ({ commit }) {
    commit(SET_API, 'cichushi api 用于获取type是啥')
    api.apiObj.getType.list()
          .then((res) => {
            if (res.status) {
              commit(SET_TYPE, res.data)
            } else {
              Message.error(res.msg)
            }
          })
  }
}

const getters = {
}
const mutations = {
  [SET_TYPE] (state, data) {
    state.type = data
  },
  [SET_API] (state, data) {
    state.api = data
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
