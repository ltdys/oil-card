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

//油卡申请记录列表
export const getCardApntList = params => axios.post('/UserMs/getCardApntList.do', params)

//油卡申请详情
export const getCardApntDetail = params => axios.post('/UserMs/getCardApntDetail.do', params)

//油卡挂失
export const lossCard = params => axios.post('/UserMs/lossCard.do', params)

//忘记密码时,验证码是否有效
export const isValidOKByUpPass = params => axios.post('/UserMs/isValidOKByUpPass.do', params)

//忘记密码时,重置密码
export const resetPasswd = params => axios.post('/UserMs/resetPasswd.do', params)

// 充值金额获取
export const getChargePrice = params => axios.post('/UserMs/getChargePrice.do', params)

// 为油卡充值
export const paycheck = params => axios.post('/UserMs/paycheck.do', params)

// 首页轮播图
export const getHeadPicList = params => axios.post('/UserMs/getHeadPicList.do', params)

//油卡申请(预约)
export const cardAppointment = params => axios.post('/UserMs/cardAppointment.do', params)

//油卡退卡
export const cardReject = params => axios.post('/UserMs/cardReject.do', params)

//退出登录
export const uLogout = params => axios.post('/UserMs/uLogout.do', params)

// 油卡余额查询
export const getConsChaList = params => axios.post('/UserMs/getConsChaList.do', params)

// 凭证提交记录查询
export const getHQPayList = params => axios.post('/UserMs/getHQPayList.do', params)

// 查询用户关联的油卡数量，总金额/总余额
export const queryRelationCardInfo = params => axios.post('/UserMs/queryRelationCardInfo.do', params)

// 查询用户关联的油卡列表
export const queryRelationCardList = params => axios.post('/UserMs/queryRelationCardList.do', params)
