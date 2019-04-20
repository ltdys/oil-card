<template>
  <com-page class="oil_detail">
    <com-header :title="currentOil | vstatusTit" is-back slot="header"></com-header>
    <div class="detail_box">
      <img v-if="currentOil == 0" src="static/images/icon/oil_czjl.png" alt="">
      <img v-else-if="currentOil == 1" src="static/images/icon/oil_xfjl.png" alt="">
      <div class="detail_box_title">{{ currentDity.title }}</div>
      <div class="detail_box_sum" :class="[currentOil == 0 ? 'color_red' : 'color_blue']">
        <span v-show="currentOil == 1">-</span>{{ currentDity.sum | vMoneyChange }}
      </div>
    </div>
    <div class="detail_cont">
      <van-cell class="zjzp-cell" title="当前状态" :value="currentDity.state"></van-cell>
      <van-cell class="zjzp-cell" title="商品" :value="currentDity.name"></van-cell>
      <van-cell class="zjzp-cell" title="支付时间" :value="currentDity.time"></van-cell>
      <van-cell class="zjzp-cell" title="支付方式" :value="currentDity.type"></van-cell>
      <van-cell class="zjzp-cell" title="订单号" :value="currentDity.orderId"></van-cell>
      <van-cell class="zjzp-cell" title="商品单号" :value="currentDity.id"></van-cell>
    </div>
  </com-page>
</template>

<script>
export default {
  data() {
    return {
      
    };
  },
  computed: {
    currentOil: {
      get: function () {
        return this.$store.getters.getCurrentOil
      }
    },
    currentDity: {
      get: function () {
        return this.$store.getters.getCurrentDity
      }
    }
  },
  created() {
    
  },
  methods: {

  },
  filters: {
    vstatusTit: (value) => {
      let val = ''
      if (value) { val = '' }
      if (value == 0) {
        val = '充值详情'
      } else {
        val = '消费详情'
      }
      return val
    }
  }
};
</script>
<style lang="scss">
.oil_detail{
  .detail_box{
    width: calc(100% - 84px);
    height: 208px;
    margin: 0 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-bottom: 1px solid #F1F1F1;
    .color_red{
      color: #FF4560;
    }
    .color_blue{
      color: #53A8FD;
    }
    &_title{
      font-size: 15px;
      color: #313131;
      margin: 6px 0 9px;
    }
    &_sum{
      font-size: 25px;
      font-weight:600;
    }
  }
  .detail_cont{
    width: calc(100% - 84px);
    height: 208px;
    margin: 31px 42px 0;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    .zjzp-cell{
      background: #F9F9F9;
      padding: 0.15rem 0;
      &:not(:last-child)::after{
        border: none;
      }
      .van-cell__title{
        color: #A8A8A8;
      }
      .van-cell__value{
        padding-left: 20px;
        color: #313131;
      }
    }
  }
}
</style>