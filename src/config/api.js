import axios from 'axios'
import { getLocalStore } from '@/utils/storageUtil'

let cancel ,promiseArr = {}
const CancelToken = axios.CancelToken
let tokenArray = [
  '/UserMs/uRegister.do', 
  '/UserMs/sendValidByReg.do', 
  '/UserMs/uLogin.do', 
  '/UserMs/sendValidByPhone.do'
]

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
    param.token = tokenArray.includes(url) ? 'jiangpeng' : getLocalStore('USER_INFO', 'json').token
    if (url == '/UserMs/sendValidByReg.do' && (param.type == 4 || param.type == 5)) {
      param.token = getLocalStore('USER_INFO', 'json').token
    }
    console.log("======", param.token)
    return new Promise((resolve,reject) => {
      axios({
        method: 'post',
        url,
        data: param,
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