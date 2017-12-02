import api from '@/api'
import { Message } from 'element-ui'
export const SET_ISLOGIN = 'SET_ISLOGIN'
export const SET_USER_INFO = 'SET_USER_INFO'
export const SET_USER = 'SET_USER'
export const GET_USER = 'GET_USER'
export const GET_USER_INFO = 'GET_USER_INFO'
export const IS_LOGIN = 'IS_LOGIN'

const state = {userInfo: [], islogin: 0}

const actions = {
  [IS_LOGIN] ({ commit }) {
    return new Promise((resolve, reject) => {
      if (localStorage.getItem('token')) {
        commit(SET_USER_INFO, JSON.parse(localStorage.getItem('token')))
      }
      console.log(api, state)
      api.apiObj.admin.islogin(state.userInfo)
          .then((res) => {
            commit(SET_ISLOGIN, res.status)
            if (res.status) {
              Message.success(res.msg)
              resolve(1)
            } else {
              Message.error(res.msg)
              resolve(0)
            }
          })
    })
  },
  [GET_USER] ({commit}) {
    return new Promise((resolve, reject) => {
      api.apiObj.admin.get({
        username: state.userInfo.username
      }).then((res) => {
        if (res.status) {
          resolve(res.data)
          commit(SET_USER, res.data)
        } else {
          Message.error(res.msg)
        }
      })
    })
  }
}
const getters = {
}
const mutations = {
  [SET_USER_INFO] (state, data) {
    state.userInfo = data
  },
  [SET_USER] (state, data) {
    state.user = data
  },
  [SET_ISLOGIN] (state, status) {
    state.islogin = status
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
