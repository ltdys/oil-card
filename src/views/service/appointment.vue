<template>
  <com-page class="appointment">
    <com-header title="预约办卡" is-back slot="header"></com-header>
    
    <van-field
      v-model="formData.cardType"
      required
      clearable
      label="油卡类型">
    </van-field>
    <van-field
      v-model="formData.recPsn"
      required
      clearable
      label="预约人姓名"
      placeholder="输入预约人姓名">
    </van-field>
    <van-field
      type="tel"
      v-model="formData.apntCardCount"
      required
      clearable
      label="预约卡数量"
      :error-message="errorMsg.apntCardCount"
      placeholder="输入预约卡数量">
    </van-field>
    <van-field
      type="tel"
      v-model="formData.recMobile"
      required
      clearable
      label="预约手机号"
      :error-message="errorMsg.recMobile"
      placeholder="输入预约手机号">
    </van-field>
    <van-field
      v-model="formData.recAddr"
      required
      clearable
      label="收卡地址"
      placeholder="输入收卡地址">
    </van-field>
    <div class="appointment_agreement">
      <van-checkbox v-model="formData.isAgree">
        <span>同意预约协议</span>
      </van-checkbox>
    </div>
    <div class="submit_buttons1">
      <van-button type="primary" :disabled="isSubmit" @click="submit" class="submit_buttons1__apply">立即申请</van-button>
      <van-button type="primary" @click="querySubmit" class="submit_buttons1__query">申请查询</van-button>
    </div>

    <van-dialog v-model="dialogShow" title="加油卡重要提示" show-cancel-button cancelButtonText="不同意"
      confirmButtonText="同意" @confirm="confirm">
      <appointment-dialog></appointment-dialog> 
    </van-dialog>
  </com-page>
</template>

<script>
import { checkStr, paramsValidate } from '@/utils/typeUtil'
import validator from "@/utils/validator.js"
import { cardAppointment } from '@/service/oilcard.js'
import { Toast, Dialog } from 'vant'
import AppointmentDialog from './appointment-dialog.vue'
export default {
  components: {
    AppointmentDialog
  },
  data() {
    return {
      validator: undefined,  //验证对象
      formData: {
        cardType: '中国石化',  //油卡类型
        apntCardCount: 1,  //预约卡数量
        recMobile: '',  //收件人手机号
        recAddr: '',  //收件人地址
        recPsn: '',  //收件人名字
        mobile: '',  //登录手机号
        isAgree: true  //是否同意预约协议 0=否 1=是
      },
      //校验
      rules: {
        recMobile: [
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
        apntCardCount: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback("请输入预约卡数量");
              } else if (value > 9999) {
                callback("数量不能大于9999");
              } else {
                callback();
              }
            }
          }
        ]
      },
      errorMsg: {
        recMobile: '',
        apntCardCount: ''
      },
      show: false,
      isSubmit: true,
      dialogShow: false
    };
  },

  watch: {
    formData: {
      handler: function (val, old) {
        this.isSubmit = !(paramsValidate(this.formData) && this.formData.isAgree)
      },
      deep: true
    }
  },

  created() {
    this.formData.mobile = this.$store.getters.getUserInfo.mobile
    this.formData.recPsn = this.$store.getters.getUserInfo.idName
    this.formData.recMobile = this.$store.getters.getUserInfo.mobile
    this.validator = validator(this.rules, this.formData)
  },
  methods: {
    onConfirm(value, index) {
      this.show = false
    },
    onCancel () {
      this.show = false
    },
    submit () {
      this.dialogShow = true
    },
    confirm () {  //确认
      this.validate(error => {
				if (!error) {
					this.cardAppointment()
				}
      }, this.formData)
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
    oneValidate (data) {
      this.validator.validate((errors, fields) => {
        this.resetField();
        if (errors) {
          fields.forEach(item => {
            this.errorMsg[item.field] = item.message;
          });
        }
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
    async cardAppointment () {
      let agree = this.formData.isAgree === true ? 1 : 0
      let params = {
        cardType: this.CARDTYPE,  //油卡类型
        apntCardCount: this.formData.apntCardCount,  //预约卡数量
        recMobile: this.formData.recMobile,  //收件人手机号
        recAddr: this.formData.recAddr,  //收件人地址
        recPsn: this.formData.recPsn,  //收件人名字
        mobile: this.formData.mobile,  //登录手机号
        isAgree: agree  //是否同意预约协议 0=否 1=是
      }
      let resData = await cardAppointment(params)
      if (resData.status === 200 && resData.data.code === 1) {
        Toast.success(resData.data.msg)
        this.$router.push('/')
      } else {
        this.formData.isAgree = true
        Toast({
          message: resData.data.msg,
          duration: 1500
        })
      }
    },
    querySubmit () {
      this.$router.push('/service/appointment-query')
    }
  }
};
</script>
<style lang="scss">
  .appointment {
    &_agreement {
      padding: 20px;
    }
    .submit_buttons1 {
      display: flex;
      padding: 0 14.5px;
      &__apply {
        width: 173px;
        height: 52px;
        margin-right: 14.5px;
      }
      &__query {
        width: 173px;
        height: 52px;
      }
    }
  }
</style>