import fetch from './fetch/index.js'
// get slider
export function get (params) {
  return fetch({
    url: 'service/slider',
    method: 'get',
    params
  })
}
export function add (data) {
  return fetch({
    url: 'service/slider/snew',
    method: 'post',
    data
  })
}
export function edit (data) {
  return fetch({
    url: 'service/slider/smodify ',
    method: 'post',
    data
  })
}
export function del (data) {
  return fetch({
    url: 'service/slider/sdel ',
    method: 'post',
    data
  })
}
