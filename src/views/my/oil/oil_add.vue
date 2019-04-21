<template>
  <com-page class="myoiladd">
    <com-header title="添加油卡" is-back slot="header"></com-header>
    <van-cell class="zjzp-cell" title="油卡类型" :value="oil.oilType"></van-cell>
    <van-cell class="zjzp-cell" title="油卡卡号" :value="oil.oilId | vUpperCase"></van-cell>
    <van-field label="确认卡号" v-model="oil.oilConf" clearable placeholder="再次输入油卡卡号"></van-field>
    <van-field label="持卡人" v-model="oil.oilName" clearable placeholder="输入持卡人姓名"></van-field>
    <van-field label="持卡人" v-model="oil.oilTel" clearable placeholder="输入持卡人手机号"></van-field>
    <div class="submit_buttons">
      <van-button type="primary" block :disabled="isBtnShow" @click="confireBtn">添加</van-button>
    </div>
  </com-page>
</template>

<script>
export default {
  data() {
    return {
      oil: {
        oilType: '中国石化', //油卡类型
        oilId: 'no8456878949161313', //油卡卡号
        oilConf: '', //确认油卡卡号
        oilName: '', //持卡人姓名
        oilTel: '', //持卡人手机号
      },
      isBtnShow: true
    };
  },
  watch: {
    oil: {
      handler: function (val, old) {
        if (val.oilConf == '' || val.oilName == '' || val.oilTel == '') {
          this.isBtnShow = true;
        } else {
          this.isBtnShow = false;
        }
      },
      deep: true
    }
  },
  created() {
    
  },
  methods: {
    confireBtn () { // 添加油卡

    }
  }
};
</script>
<style lang="scss">
.myoiladd{
  .zjzp-cell{
    .van-cell__value{
      color: #313131;
    }
  }
  .submit_buttons{
    margin-top: 63px;
  }
}
</style>