import request from './request'
function baseApiServer (url) {
  this.url = url
}

baseApiServer.prototype.post = function (url, data) {
  return request({
    method: 'post',
    url: this.url + url,
    data
  })
}
// baseApiServer.prototype.get = function (url, params) {
//   return request({
//     method: 'get',
//     url: this.url + url,
//     params
//   })
// }
// baseApiServer.prototype.put = function (url, data) {
//   return request({
//     method: 'put',
//     url: this.url + url,
//     data
//   })
// }
// baseApiServer.prototype.delete = function (url, data) {
//   return request({
//     method: 'delete',
//     url: this.url + url,
//     data
//   })
// }
export default baseApiServer