<template>
  <com-page class="forgetpwd">
    <com-header title="重置密码" is-back slot="header"></com-header>

    <van-field
      v-model="formData.mobile"
      type="tel"
      clearable
      left-icon="user-o"
      @input="mobileChange"
      placeholder="手机号">
    </van-field>
    <van-field
      v-model="formData.validCode"
      clearable
      center
      left-icon="coupon-o"
      @blur="isValidOKByUpPass"
      placeholder="手机验证码">
      <van-button slot="button" size="small" type="primary" :disabled="isBtnShow" @click="getAccCode">
        {{codeText}}
      </van-button>
    </van-field>
    <van-field
     type="password"
      v-model="formData.pwd"
      left-icon="bag-o"
      placeholder="输入密码">
    </van-field>

    <div class="submit_buttons">
      <van-button type="primary" :disabled="isSubmit" @click="submit">重置密码</van-button>
    </div>
  </com-page>
</template>

<script>
import { checkStr, paramsValidate } from '@/utils/typeUtil'
import { sendValidByReg, isValidOKByUpPass, resetPasswd } from '@/service/oilcard.js'
import { Toast } from 'vant'
import md5 from 'js-md5'
export default {
  data () {
    return {
      formData: {
        mobile: '',
        validCode: '',
        pwd: ''
      },
      times: 60,
      timeCell: null,
      codeText: '获取验证码',
      isBtnShow: true,
      isSubmit: true,
      validCodeIsPass: false  //验证码是否通过
    }
  },

  watch: {
    formData: {
      handler: function (val, old) {
        this.isSubmit = !paramsValidate(this.formData) || !this.validCodeIsPass
      },
      deep: true
    }
  },

  methods: {
    async getAccCode () {
      let self = this;
      let param = {
        mobile: this.formData.mobile,
        type: '4'
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
				Toast(resData.data.msg)
			}
    },
    mobileChange () {
      if (this.formData.mobile != '' && checkStr(this.formData.mobile, 'phone')) {
        this.isBtnShow = false
      } else {
        this.isBtnShow = true
      }
    },
    async isValidOKByUpPass () {
      let param = {
        mobile: this.formData.mobile,
        validCode: this.formData.validCode
      }
      let resData = await isValidOKByUpPass(param)
      if (resData.status === 200 && resData.data.code === 1) {
        Toast.success('验证通过')
        this.validCodeIsPass = true
      } else {
        Toast('验证码错误')
        this.validCodeIsPass = false
      }
    },
    async resetPasswd () {
      let param = {
        mobile: this.formData.mobile,
        pwd: md5(this.formData.pwd)
      }
      let resData = await resetPasswd(param)
      if (resData.status === 200 && resData.data.code === 1) {
        Toast.success(resData.data.msg)
        this.$router.push('/login')
      } else {
        Toast(resData.data.msg)
      }
    },
    submit () {
      this.resetPasswd()
    }
  }
}
</script>

