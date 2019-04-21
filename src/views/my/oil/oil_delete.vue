<template>
  <com-page class="mydelete">
    <com-header title="解除绑定" is-back slot="header"></com-header>
    <van-cell class="zjzp-cell" title="油卡卡号" :value="deleteOil.oilId"></van-cell>
    <van-field label="手机号" v-model="deleteOil.oilPhone" clearable placeholder="输入手机号"></van-field>
    <van-field
      v-model="deleteOil.verCode"
      center
      clearable
      label="验证码"
      placeholder="输入手机验证码"
    >
      <!-- <van-button slot="button" size="small" type="primary">发送验证码</van-button> -->
      <div class="send-code" slot="button">{{ codeText }}</div>
    </van-field>
    <van-checkbox v-model="isChecked" class="detele_box">
      同意<span class="detele_box_deal">《解绑服务协议》</span>
    </van-checkbox>
    <div class="submit_buttons">
      <van-button type="primary" block :disabled="isBtnShow" @click="deleteBtn">解除绑定</van-button>
    </div>
  </com-page>
</template>

<script>
export default {
  data() {
    return {
      deleteOil: {
        oilId: '', // 油卡卡号
        oilPhone: '', // 手机号
        verCode: '', // 验证码
      },
      codeText: '获取验证码', // 获取验证码字段
      isBtnShow: true,
      isChecked: false
    };
  },
  computed: {
    currentOil: {
      get: function () {
        return this.$store.getters.getCurrentOil
      }
    }
  },
  created() {
    
  },
  methods: {
    deleteBtn () { //解除绑定

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