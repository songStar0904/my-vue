/*
*  状态管理
* @Author: songstar
* @Date:   2017-06-30 22:42:29
* @Last Modified by:   Administrator
* @Last Modified time: 2017-06-30 22:48:45
*/
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import userInfo from './userInfo/userInfo'
import type from './type/type'
import collapse from './collapse/collapse'

export default new Vuex.Store({
  modules: {
    userInfo,
    type,
    collapse
  }
})
