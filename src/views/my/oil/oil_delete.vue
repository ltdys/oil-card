<template>
  <com-page class="mydelete">
    <com-header title="解除绑定" is-back slot="header"></com-header>
    <van-cell class="zjzp-cell" title="油卡卡号" :value="currentOil.code"></van-cell>
    <van-field
      label="手机号"
      type="tel"
      v-model="deteleCard.phone"
      required
      clearable
      placeholder="输入手机号"
      @input="mobileChange"
      :error-message="errorMsg.phone">
    </van-field>
    <van-field
      v-model="deteleCard.verCode"
      center
      required
      clearable
      label="验证码"
      placeholder="输入手机验证码"
      :error-message="errorMsg.verCode"
    >
      <!-- <van-button slot="button" size="small" type="primary">发送验证码</van-button> -->
      <van-button slot="button" size="small" type="primary" :disabled="isCodeBtnShow" @click="sendPhoneCode">
        {{codeText}}
      </van-button>
    </van-field>
    <van-checkbox v-model="deteleCard.isChecked" class="detele_box">
      同意<span class="detele_box_deal">《解绑服务协议》</span>
    </van-checkbox>
    <div class="submit_buttons">
      <van-button type="primary" block :disabled="isBtnShow" @click="deleteBtn">解除绑定</van-button>
    </div>
  </com-page>
</template>

<script>
import { Toast } from 'vant';
import { list_mixins } from "@/mixins";
import { checkStr, paramsValidate } from '@/utils/typeUtil'
import validator from "@/utils/validator.js"
import { unbindCard, sendValidByReg } from '@/service/oilcard.js'
export default {
  mixins: [list_mixins],
  data() {
    return {
      deteleCard: {
        phone: '', // 手机号
        verCode: '', // 验证码
        isChecked: false,
      },
      codeText: '获取验证码', // 获取验证码字段
      isCodeBtnShow: true, //验证码显示
      isBtnShow: true,
      timeCell: null, //验证码定时器
      times: 60, //定时时间
    };
  },
  computed: {
    currentOil: {
      get: function () {
        return this.$store.getters.getCurrentOil
      }
    }
  },
  watch: {
    deteleCard: {
      handler: function (val, old) {
        if (val.isChecked) {
          this.isBtnShow = !paramsValidate(val)
        } else {
          this.isBtnShow = true
        }
      },
      deep: true
    }
  },
  created() {
    this.validator = validator(this.rules, this.deteleCard)
  },
  methods: {
    mobileChange () {
      if (this.deteleCard.phone != '' && checkStr(this.deteleCard.phone, 'phone')) {
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
        Toast({
          message: resData.data.msg,
          duration: 1500
        })
			}
    },
    deleteBtn () { //解除绑定
      let self = this;
      self.validate(error => {
				if (!error) {
					self.updataUnBind()
				}
      }, self.deteleCard)
    },
    async updataUnBind () { //解绑接口请求
      let self = this;
      let param = {
        cardNo: self.currentOil.code,
        mobile: self.deteleCard.phone,
        validCode: self.deteleCard.verCode
      }
      console.log(param)
      let resData = await unbindCard(param)
      console.log('resData',resData)
      if (resData.status === 200 && resData.data.code === 1) {
        Toast({
          message: resData.data.msg,
          duration: 1500
        })
        // self.getUserInfo()
        self.$nextTick(()=>{
          self.$router.back()
        })
      } else {
        Toast({
          message: resData.data.msg,
          duration: 1500
        })
      }
    }
  }
};
</script>
<style lang="scss">
.mydelete{
  .detele_box{
    padding: 16px 15px 0;
    .van-checkbox__label{
      font-size: 15px;
      color: #A0A0A0;
    }
    &_deal{
      color: #55ADFC;
    }
  }
  .submit_buttons{
    margin-top: 59px;
  }
}
</style>