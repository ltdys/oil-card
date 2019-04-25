<template>
  <com-page class="register">
    <com-header title="注册" is-back slot="header"></com-header>

    <div class="register_title">新用户注册</div>
    <div class="register_form">
      <van-field
        v-model="formData.mobile"
        type="tel"
        required
        clearable
        left-icon="user-o"
        @input="mobileChange"
        placeholder="手机号">
      </van-field>
      <van-field
        v-model="formData.pwd"
        type="password"
        required
        clearable
        left-icon="bag-o"
        placeholder="输入密码">
      </van-field>
      <van-field
        v-model="formData.validCode"
        required
        center
        clearable
        left-icon="coupon-o"
        placeholder="手机验证码">
        <van-button slot="button" size="small" type="primary" :disabled="isBtnShow" @click="getAccCode">
          {{codeText}}
        </van-button>
      </van-field>
    </div>
    <div class="submit_buttons">
      <van-button type="primary" :disabled="isSubmit" @click="submit">立即注册领取新人福利</van-button>
    </div>
  </com-page>
</template>

<script>
import { checkStr, paramsValidate } from '@/utils/typeUtil'
import validator from "@/utils/validator.js"
import { sendValidByReg, uRegister } from '@/service/oilcard.js'
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
      formData: {
        mobile: '',
        pwd: '',
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
    }
  },

  created () {
    this.validator = validator(this.rules, this.formData)
  },

  methods: {
    async getAccCode () {//获取验证码
      let self = this;
      let param = {
        mobile: this.formData.mobile,
        type: '3'
      }
      let resData = await sendValidByReg(param)
      if (resData.status === 200 && resData.data.code === 1) {
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
				
			}
    },
    mobileChange () {
      if (this.formData.mobile != '' && checkStr(this.formData.mobile, 'phone')) {
        this.isBtnShow = false
      } else {
        this.isBtnShow = true
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
    async submit () {
      this.formData.pwd = md5(this.formData.pwd)
      let resData = await uRegister(this.formData)
      if (resData.status === 200 && resData.data.code === 1) {
        Toast.success('注册成功')
        this.$router.push('/entrance/login')
      } else {
        Toast.fail(resData.data.msg)
      }
    }
  }
}
</script>

<style lang="scss">
  .register {
    &_title {
      display: flex;
      justify-content: center;
      padding: 38px 0;
      font-size: 31px;
      color: #313131;
    }
    &_form {
      padding: 0 0.29rem;
    }
  }
</style>


