import axios from 'axios'

let cancel ,promiseArr = {}
const CancelToken = axios.CancelToken

axios.defaults.baseURL = ''
// axios.defaults.baseURL = process.env.BASE_API


//设置默认请求头
axios.defaults.headers = {
  'X-Requested-With': 'XMLHttpRequest',
}

export default {
  //get请求
  get (url,param) {
    return new Promise((resolve,reject) => {
      axios({
        method: 'get',
        url,
        params: param,
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        resolve(res)
      })
    })
  },
  //post请求
  post (url,param) {
    param.token = 'jiangpeng'
    return new Promise((resolve,reject) => {
      axios({
        method: 'post',
        url,
        params: param,
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
}