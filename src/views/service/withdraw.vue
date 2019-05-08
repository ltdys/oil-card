<template>
  <com-page class="withdraw">
    <com-header title="申请退卡" is-back slot="header"></com-header>
    
    <van-field
      v-model="formData.cardNo"
      required
      clearable
      placeholder="输入油卡背面的卡号"
      label="油卡卡号">
    </van-field>
    <van-field
      v-model="formData.descr"
      type="textarea"
      required
      clearable
      label="退卡原因"
      placeholder="输入退卡的原因">
    </van-field>
    <div class="withdraw_agreement">
      <van-checkbox v-model="formData.isAgree">
        <span>退卡协议</span>
      </van-checkbox>
    </div>
    <div class="submit_buttons1">
      <van-button type="primary" :disabled="isSubmit" @click="submit" class="submit_buttons1__apply">申请退卡</van-button>
      <van-button type="primary" @click="submit1" class="submit_buttons1__retreat">退卡查询</van-button>
    </div>

  </com-page>
</template>

<script>
import { checkStr, paramsValidate } from '@/utils/typeUtil'
import validator from "@/utils/validator.js"
import { cardReject } from '@/service/oilcard.js'
import { Toast } from 'vant'
export default {
  data() {
    return {
      validator: undefined,  //验证对象
      formData: {
        cardNo: '',  //油卡卡号
        descr: '',  //退卡原因
        mobile: '',
        isAgree: true
      },
      isSubmit: true,
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
    this.validator = validator(this.rules, this.formData)
  },
  methods: {
    submit () {
      this.validator.validate(error => {
				if (!error) {
          this.cardReject()
				}
      }, this.formData)
    },
    submit1 () {

    },
    async cardReject () {
      this.formData.isAgree = this.formData.isAgree === true ? 1 : 0
      let resData = await cardReject(this.formData)
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
    }
  }
};
</script>
<style lang="scss">
  .withdraw {
    &_agreement {
      padding: 14.5px;
    }
    .submit_buttons1 {
      display: flex;
      padding: 0 14.5px;
      &__apply {
        width: 173px;
        height: 52px;
        margin-right: 14.5px;
      }
      &__retreat {
        width: 173px;
        height: 52px;
      }
    }
  }
</style>