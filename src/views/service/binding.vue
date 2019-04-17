<template>
  <com-page class="binding">
    <com-header title="油卡绑定" is-back slot="header"></com-header>
    
    <van-field
      v-model="formData.cardType"
      required
      clearable
      label="油卡类型">
    </van-field>
    <van-field
      v-model="formData.card"
      type="number"
      required
      clearable
      label="卡号"
      placeholder="输入油卡背面的卡号">
    </van-field>
    <van-field
      type="tel"
      v-model="formData.cardholder"
      required
      clearable
      label="持卡人"
      placeholder="输入持卡人姓名">
    </van-field>
    <van-field
      v-model="formData.phone"
      type="number"
      required
      clearable
      label="手机号"
      placeholder="输入持卡人手机号">
    </van-field>
    <div class="submit_buttons">
      <van-button type="primary" :disabled="isSubmit" @click="submit">立即绑定</van-button>
    </div>
  </com-page>
</template>

<script>
import { paramsValidate } from '@/utils/typeUtil'
export default {
  data() {
    return {
      formData: {
        cardType: '中国石化',  //油卡类型
        card: '',  //卡号
        cardholder: '',  //持卡人
        phone: ''  //手机号
      },
      isSubmit: true,
    };
  },

  watch: {
    formData: {
      handler: function (val, old) {
        this.isSubmit = !paramsValidate(this.formData)
      },
      deep: true
    }
  },
  
  created() {
    
  },
  methods: {
    submit () {

    }
  }
};
</script>
<style lang="scss">

</style>