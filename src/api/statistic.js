import fetch from './fetch/index.js'
// get statistic
export function get (params) {
  return fetch({
    url: 'service',
    method: 'get',
    params
  })
}
