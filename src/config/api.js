import axios from 'axios'
import Vue from 'vue'
import router from '../router'
import { Toast } from 'vant';
import { getLocalStore } from '@/utils/storageUtil'

let cancel ,promiseArr = {}
const CancelToken = axios.CancelToken
let tokenArray = [
  '/UserMs/uRegister.do', 
  '/UserMs/sendValidByReg.do', 
  '/UserMs/uLogin.do', 
  '/UserMs/sendValidByPhone.do',
  '/UserMs/isValidOKByUpPass.do',
  '/UserMs/resetPasswd.do',
  '/UserMs/getHeadPicList.do'
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
    if (url == '/UserMs/sendValidByReg.do' && (param.type == 5)) {
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
        if (res.data.code == 0 && res.data.data == 'kick_out') {
          Toast({
            message: res.data.msg,
            duration: 1500
          })
          router.push('/login')
          console.log(router)
        } else {
          resolve(res)
        }
        console.log('res==',res)
      }).catch(error => {
        reject(error)
      })
    })
  }
}