import axios from "axios"
import apiConfig from "@/utils/apiConfig"

const request = axios.create({
  baseURL: apiConfig.baseURL,
  timeout: 30000,
})

request.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json'
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}` || ''

    let dataParam = ''
    let res = {}
    res = Object.assign({
      sign: changeMd5(config.data)
    }, config.data)
    dataParam = JSON.stringify({
      reqObj: encrypt(JSON.stringify(res), CryptoJS.enc.Utf8.parse('U2FsdGVkX19QeUbF'))
    })
    config.data = dataParam
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  (res) => {
    if (res.status == 200) {
      return JSON.parse(decrypt(res.data.data, CryptoJS.enc.Utf8.parse('U2FsdGVkX19QeUbF')))
    } else {
      Promise.reject(res)
    }
  },
  (err) => {
    return Promise.reject(err)
  }
);

export default request
