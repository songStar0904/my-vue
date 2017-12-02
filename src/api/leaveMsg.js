import fetch from './fetch/index.js'
// get leaveMsg
export function get (params) {
  return fetch({
    url: 'service/board',
    method: 'get',
    params
  })
}
// del
export function del (data) {
  return fetch({
    url: 'service/board/bdel',
    method: 'post',
    data
  })
}
