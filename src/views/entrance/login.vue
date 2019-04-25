<template>
  <com-page class="login">
    <com-header title="登录" slot="header"></com-header>

    <div class="login_title">
      <img src="static/images/icon/user_defu.png" alt="..">
    </div>

    <div class="login_form" v-if="loginType === 'pwd'">
      <van-field
        v-model="formData.mobile"
        type="tel"
        clearable
        left-icon="user-o"
        placeholder="手机号">
      </van-field>
      <van-field
        v-model="formData.pwd"
        type="password"
        clearable
        left-icon="bag-o"
        placeholder="输入密码">
      </van-field>
      <div class="login_form__text" @click="loginType = 'code'">短信验证码 登录</div>
    </div>

    <div class="login_form" v-if="loginType === 'code'">
      <van-field
        v-model="formData1.mobile"
        type="tel"
        clearable
        left-icon="user-o"
        @input="mobileChange"
        placeholder="手机号">
      </van-field>
      <van-field
        v-model="formData1.validCode"
        clearable
        center
        left-icon="coupon-o"
        placeholder="手机验证码">
        <van-button slot="button" size="small" type="primary" :disabled="isBtnShow" @click="getAccCode">
          {{codeText}}
        </van-button>
      </van-field>
      <div class="login_form__text" @click="loginType = 'pwd'">输入密码 登录</div>
    </div>
    <div class="submit_buttons" v-if="loginType === 'pwd'">
      <van-button type="primary" :disabled="isSubmit" @click="submit">登录</van-button>
    </div>
    <div class="submit_buttons" v-if="loginType === 'code'">
      <van-button type="primary" :disabled="isSubmit1" @click="submit">登录</van-button>
    </div>
    <div class="login_bottom" @click="$router.push('/register')">
      没帐号?立即注册
    </div>
  </com-page>
</template>

<script>
import { checkStr, paramsValidate } from '@/utils/typeUtil'
import validator from '@/utils/validator.js'
import { uLogin, sendValidByPhone, sendValidByReg } from '@/service/oilcard.js'
import { Toast } from 'vant'
import md5 from 'js-md5'
export default {
  data () {
    return {
      codeText: '发送验证码',
      isBtnShow: true,
      codeText: '获取验证码',
      times: 60,
      timeCell: null,
      isSubmit: true,
      isSubmit1: true,  //验证码登录
      loginType: 'pwd',  //登录方式  pwd--密码  code--验证码
      formData: {
        mobile: '',
        pwd: '',
      },
      formData1: {
        type: 2,
        mobile: '',
        validCode: ''  //验证码
      },
      //校验
      rules: {
        mobile: [
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
      },
      errorMsg: {
        mobile: ''
      },
    }
  },

  watch: {
    formData: {
      handler: function (val, old) {
        this.isSubmit = !paramsValidate(this.formData)
      },
      deep: true
    },
    formData1: {
      handler: function (val, old) {
        this.isSubmit1 = !paramsValidate(this.formData1)
      },
      deep: true
    }
  },

  created () {
    this.validator = validator(this.rules, this.formData)
  },

  methods: {
    async getAccCode () {//获取验证码
      let self = this;
      let param = {
        mobile: this.formData1.mobile,
        type: 1
      }
      let resData = await sendValidByReg(param)
      if (resData.status === 200 && resData.data.validCode === 1) {
        Toast.success(resData.data.msg)
        self.codeText = self.times + 's后重新获取'
        self.isBtnShow = true
        self.timeCell = setInterval(function () {
          if (self.times <= 0) {
            window.clearInterval(self.timeCell)
            self.timeCell = null
            self.codeText = '重新获取'
            self.times = 60
            self.isBtnShow = false
          } else {
            self.times --
            self.codeText = self.times + 's后重新获取'
            self.isBtnShow = true
          }
        },1000)
			} else {
				Toast.fail(resData.data.msg)
			}
    },
    validate(callback, data) {
      this.validator.validate((errors, fields) => {
        this.resetField();
        if (errors) {
          fields.forEach(item => {
            this.errorMsg[item.field] = item.message;
          });
        }
        callback && callback(errors, fields);
      }, data);
		},
		resetField(attrs) {
      attrs = !attrs
        ? Object.keys(this.errorMsg)
        : Array.isArray(attrs)
        ? attrs
        : [attrs];
      attrs.forEach(attr => {
        this.errorMsg[attr] = "";
      });
    },
    mobileChange () {
      if (this.formData1.mobile != '' && checkStr(this.formData1.mobile, 'phone')) {
        this.isBtnShow = false
      } else {
        this.isBtnShow = true
      }
    },
    submit () {
      if (this.loginType === 'pwd') {
        this.uLogin()
      } else {
        this.sendValidByPhone()
      }
    },
    async uLogin () {  //帐号密码登录
      this.formData.pwd = md5(this.formData.pwd)
      let resData = await uLogin(this.formData)
      if (resData.status === 200 && resData.data.code === 1) {
        Toast.success('登录成功')
        this.$store.dispatch('setUserInfo', resData.data.data)
        this.$router.push('/')
      } else {
        Toast.fail(resData.data.msg)
      }
    },
    async sendValidByPhone () {  //手机发送验证码登录
      let resData = await sendValidByPhone(this.formData1)
      if (resData.status === 200 && resData.data.code === 1) {
        Toast.success('登录成功')
        this.$store.dispatch('setUserInfo', resData.data.data)
        this.$router.push('/')
      } else {
        Toast.fail(resData.data.msg)
      }
    }
  },

  destroyed () {
    let self = this
    window.setInterval(self.timeCell)
    self.timeCell = null
  },
}
</script>

<style lang="scss">
  .login {
    &_title {
      display: flex;
      justify-content: center;
      padding: 38px 0;
      font-size: 31px;
      color: #313131;
    }
    &_form {
      padding: 0 0.29rem;
      &__text {
        margin-top: 11px;
        margin-left: 3px;
        color: #a0a0a0;
        font-size: 15px;
      }
    }
    &_bottom {
      margin-top: 150px;
      text-align: center;
      color: #a0a0a0;
      font-size: 15px;
    }
  }
</style>


