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
  vUserImg: value => { //用户头像
    if (!value) { value = 'static/images/icon/user_defu.png' }
    return value
  }
}

export default vFilter