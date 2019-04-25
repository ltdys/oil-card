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

//用户信息查询
export const uUserInfo = params => axios.post('/UserMs/userInfo.do', params)

//更新个人昵称或头像等信息
export const uUpdateUserInfo = params => axios.post('/UserMs/updateUserInfo.do', params)

//更新手机号
export const uUpdateUserMobile = params => axios.post('/UserMs/updateUserMobile.do', params)

// //更新实名认证信息
// export const uUpdateUserMobile = params => axios.post('/UserMs/updateUserInfo.do', params)

//查询用户已绑定油卡列表
export const bindCardList = params => axios.post('/UserMs/bindCardList.do', params)

//油卡解绑
export const unbindCard = params => axios.post('/UserMs/unbindCard.do', params)
