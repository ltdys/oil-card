import { checkStr } from '@/utils/typeUtil'
import { getLocalStore } from '@/utils/storageUtil'
export const rules = { //验证规则集合
  mobile: [ //验证手机号
    {
      validator: (rule, value, callback) => {
        if (!value) {
          callback("请输入手机号码");
        } else if (checkStr(value, 'phone')) {
          callback();
        } else {
          callback("请输入正确的手机号码");
        }
      }
    }
  ],
  phone: [ //验证手机号与本人相符
    {
      validator: (rule, value, callback) => {
        let phone = getLocalStore('USER_INFO', 'json').mobile || ''
        if (!value) {
          callback("请输入手机号码");
        } else if (phone != '' && value != phone) {
          callback("您输入的不是持卡人手机号码");
        } else if (checkStr(value, 'phone')) {
          callback();
        } else {
          callback("请输入正确的手机号码");
        }
      }
    }
  ],
  IDCord: [ //验证身份证号
    {
      validator: (rule, value, callback) => {
        let oldCard = getLocalStore('USER_INFO', 'json').idCard || ''
        if (!value) {
          callback("请输入身份证号");
        } else if (oldCard != '' && value != oldCard) {
          callback("您输入的不是持卡人身份证号");
        } else if (checkStr(value, 'card')) {
          callback();
        } else {
          callback("请输入正确的身份证号");
        }
      }
    }
  ],
  verCode: [ //验证验证码
    {
      validator: (rule, value, callback) => {
        if (!value) {
          callback("请输入验证码");
        } else {
          callback();
        }
      }
    }
  ],
  realname: [ //验证真实姓名
    {
      validator: (rule, value, callback) => {
        if (!value) {
          callback("填写本人真实姓名");
        } else {
          callback();
        }
      }
    }
  ],
}

export var errorMsg = {
  mobile: '', //手机号错误提醒字段
  phone: '', //持卡人手机号错误提醒字段
  IDCord: '', //身份证号错误提醒字段
  verCode: '', //验证码错误提醒字段
  realname: '', //真实姓名错误提醒字段
}
