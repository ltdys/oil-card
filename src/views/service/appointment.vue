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
      v-model="formData.express"
      required
      clearable
      disabled
      label="快递选择"
      right-icon="arrow">
    </van-field>
    <van-field
      v-model="formData.addressee"
      required
      clearable
      label="收件人"
      placeholder="输入收件人姓名">
    </van-field>
    <van-field
      v-model="formData.phone"
      required
      clearable
      label="手机号"
      placeholder="输入收件人手机号">
    </van-field>
    <van-field
      v-model="formData.address"
      required
      clearable
      label="收货地址"
      placeholder="输入收货地址">
    </van-field>
    <div class="submit_buttons">
      <van-button type="primary">立即申请</van-button>
    </div>
  </com-page>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        cardType: '中国石化',  //油卡类型
        express: '顺丰', //快递
        addressee: '',  //收件人
        phone: '',  //手机号
        address: '',  //收货地址
      }
    };
  },
  created() {
    
  },
  methods: {
  }
};
</script>
<style lang="scss">

</style>