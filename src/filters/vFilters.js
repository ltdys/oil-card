import Vue from 'vue'
const vFilter = {
  getDay: value => {
    return parseInt(Math.floor(value/3600) / 24)
  },
  vCard: value => { //银行卡显示
    return value ? '**** **** **** ' + value.substr(value.length-4):''
  },
  vPhone: str => { //手机号隐藏显示
    return str ?　str.substr(0,3) + '****' + str.substr(7) : ''
  },
  vTelPhone: str => { //手机号断层显示
    return str.substr(0,3) + ' ' + str.substr(3,4) + ' ' + str.substr(7)
  },
  vIdCard: str => { //身份证号断层显示
    return str.substr(0,3) + ' ' + str.substr(3,3) + ' ' + str.substr(6,4) + ' ' + str.substr(10,4) + ' ' + str.substr(14)
  },
  vUserImg: value => { //用户头像
    if (!value) { value = 'static/images/icon/user_defu.png' }
    return value
  },
  vFixedTwo: value => {//保留两位小数
    if (!value) { value = 0 }
    return parseFloat(value).toFixed(2)
  },
  vUpperCase: value => { //转化大写
    if (!value) { value = '暂无' }
    return value.toUpperCase()
  },
  vLowerCase: value => { //转化小写
    if (!value) { value = '' }
    return value.toLowerCase()
  },
  vMoneyChange: value => {//金额转化
    if (!value) { value = 0 }
    return "￥" + value
  },
  vAddPerfix: value => { //图片路径转化
    if (!value) { value = '' }
    let perfix = Vue.prototype.HEAD_IMAGE_PR
    return value.indexOf(perfix) != -1 ? value : perfix + value
  },
}

export default vFilter