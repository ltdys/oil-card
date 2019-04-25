import axios from '@/config/api.js'

//获取验证码
export const uRegister = params => axios.post('/UserMs/uRegister.do',params);

//注册手机/邮箱发送验证码
export const sendValidByReg = params => axios.post('/UserMs/sendValidByReg.do', params)