import { checkStr } from '@/utils/typeUtil'
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
  IDCord: [ //验证身份证号
    {
      validator: (rule, value, callback) => {
        if (!value) {
          callback("请输入身份证号");
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
}

export var errorMsg = {
  mobile: '', //手机号错误提醒字段
  IDCord: '', //身份证号错误提醒字段
  verCode: '', //验证码错误提醒字段
}
