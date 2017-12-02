/*
* @Author: Administrator
* @Date:   2017-06-30 23:30:16
* @Last Modified by:   Administrator
* @Last Modified time: 2017-07-01 13:23:47
*/

import fetch from './fetch/index.js'
// login
export function login (params) {
  return fetch({
    url: '/admin/login',
    method: 'get',
    params
  })
}

