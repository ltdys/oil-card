import axios from '@/config/api.js'

//手机用户注册
export const uRegister = params => axios.post('/UserMs/uRegister.do',params);

//注册手机/邮箱发送验证码
export const sendValidByReg = params => axios.post('/UserMs/sendValidByReg.do', params)

//app手机用户登录
export const uLogin = params => axios.post('/UserMs/uLogin.do', params)

//手机发送验证码登录
export const sendValidByPhone = params => axios.post('/UserMs/sendValidByPhone.do', params)

//油卡绑定
export const bindCard = params => axios.post('/UserMs/bindCard.do', params)
