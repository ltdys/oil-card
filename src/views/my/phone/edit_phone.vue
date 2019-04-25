<template>
  <com-page class="my-edit-phone">
    <com-header title="手机号" is-back slot="header"></com-header>
    <van-cell class="zjzp-cell former-phone" title="原手机号" :value="userInfo.mobile"></van-cell>
    <van-field
      label="身份证号"
      v-model="editPhone.IDCord"
      required
      clearable
      placeholder="输入持卡人身份证号"
      :error-message="errorMsg.IDCord"
      >
    </van-field>
    <van-field
      label="新手机号"
      type="tel"
      v-model="editPhone.mobile"
      required
      clearable 
      placeholder="输入新手机号"
      @input="mobileChange"
      :error-message="errorMsg.mobile">
    </van-field>
    <van-field
      v-model="editPhone.verCode"
      center
      required
      clearable
      label="验证码"
      placeholder="输入手机验证码"
      :error-message="errorMsg.verCode"
    >
      <!-- <div class="send-code" slot="button" @click="sendPhoneCode">{{ codeText }}</div> -->
      <van-button slot="button" size="small" type="primary" :disabled="isCodeBtnShow" @click="sendPhoneCode">
        {{codeText}}
      </van-button>
    </van-field>
    <div class="submit_buttons">
      <van-button type="primary" block :disabled="isBtnShow" @click="confireBtn">确定</van-button>
    </div>
  </com-page>
</template>

<script>
import { Toast } from 'vant';
import { checkStr, paramsValidate } from '@/utils/typeUtil'
import validator from "@/utils/validator.js"
import { list_mixins } from "@/mixins";
import { uUpdateUserMobile, sendValidByReg } from '@/service/oilcard.js'
export default {
  mixins: [list_mixins],
  data() {
    return {
      editPhone: {
        IDCord: '', //身份证号
        mobile: '', //新手机号
        verCode: '', //验证码
      },
      codeText: '发送验证码', //发送验证码
      isBtnShow: true, //确认按钮显示
      isCodeBtnShow: true, //验证码按钮显示
      timeCell: null, //验证码定时器
      times: 60, //定时时间
    };
  },
  created() {
    this.editPhone.IDCord = this.userInfo.idCard
    this.validator = validator(this.rules, this.editPhone)
  },
  watch: {
    editPhone: {
      handler: function (val, old) {
        this.isBtnShow = !paramsValidate(val)
      },
      deep: true
    }
  },
  methods: {
    mobileChange () {
      if (this.editPhone.mobile != '' && checkStr(this.editPhone.mobile, 'phone')) {
        this.isCodeBtnShow = false
      } else {
        this.isCodeBtnShow = true
      }
    },
    async sendPhoneCode () { //发送手机验证码
      let self = this;
      let param = {
        mobile: self.userInfo.mobile,
        type: 5
      }
      let resData = await sendValidByReg(param)
      if (resData.status === 200 && resData.data.code === 1) {
        Toast.success({
          message: resData.data.msg || '发送验证码成功',
          duration: 1500
        })
        self.codeText = self.times + 's后重新获取'
        self.isCodeBtnShow = true
        self.timeCell = setInterval(function () {
          if (self.times <= 0) {
            window.clearInterval(self.timeCell)
            self.timeCell = null
            self.codeText = '重新获取'
            self.times = 60
            self.isCodeBtnShow = false
          } else {
            self.times --
            self.codeText = self.times + 's后重新获取'
            self.isCodeBtnShow = true
          }
        },1000)
      } else {
        Toast.fail({
          message: resData.data.msg,
          duration: 1500
        })
			}
    },
    confireBtn () { //确定修改手机号
      let self = this;
      this.validate(error => {
				if (!error) {
					self.updataPhone()
				}
      }, this.editPhone)
    },
    async updataPhone () {
      let self = this;
      let param = {
        id: self.userInfo.id,
        idCard: self.editPhone.IDCord,
        mobile: self.editPhone.mobile,
        validCode: self.editPhone.verCode
      }
      console.log(param)
      let resData = await uUpdateUserMobile(param)
      console.log('resData',resData)
      if (resData.status === 200 && resData.data.code === 1) {
        Toast.success({
          message: resData.data.msg,
          duration: 1500
        })
        // self.getUserInfo()
        self.$nextTick(()=>{
          self.$router.push('/login')
        })
      } else {
        Toast.fail({
          message: resData.data.msg,
          duration: 1500
        })
      }
    }
  }
};
</script>
<style lang="scss">
.my-edit-phone{
  .former-phone{
    .van-cell__value{
      color: #323233;
    }
  }
  .van-field__button{
    padding-left: 30px;
    .send-code{
      color: #323233;
    }
  }
  .submit_buttons{
    margin-top: 63px;
  }
}
</style>