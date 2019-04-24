import axios from '@/config/api.js'

//获取验证码
export const uRegister = params => axios.post('/UserMs/uRegister.do', params);