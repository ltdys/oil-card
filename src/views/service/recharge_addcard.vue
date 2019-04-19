<template>
  <com-page class="addcard">
    <com-header title="添加油卡" is-back slot="header"></com-header>
    
    <van-field
      v-model="formData.cardType"
      required
      clearable
      label="油卡类型">
    </van-field>
    <van-field
      v-model="formData.card"
      required
      clearable
      label="油卡卡号"
      placeholder="输入油卡卡号">
    </van-field>
    <van-field
      v-model="formData.cardAgain"
      required
      clearable
      label="确认卡号"
      placeholder="再次输入油卡卡号">
    </van-field>
    <van-field
      v-model="formData.cardAgain"
      required
      clearable
      label="姓名"
      placeholder="输入持卡人姓名">
    </van-field>
    <van-field
      type="tel"
      v-model="formData.cardholder"
      required
      clearable
      label="手机号"
      placeholder="输入持卡人手机号">
    </van-field>
    <div class="submit_buttons">
      <van-button type="primary" :disabled="isSubmit" @click="submit">添加</van-button>
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
        cardAgain: '',  //确认卡号
        name: '',  //持卡人姓名
        phone: ''  //持卡人手机号
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