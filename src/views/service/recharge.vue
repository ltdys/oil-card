<template>
  <com-page class="recharge">
    <com-header title="油卡充值" is-back slot="header"></com-header>
    
    <div class="recharge_top">
      <div><img src="static/images/icon/problem.png" alt=".." class="recharge_top__img"></div>
      <div>{{card}}</div>
      <div><van-icon :name="iconName"></van-icon></div>
    </div>
    <div class="recharge_recharge">
      <div>选中充值金额</div>
      <div class="recharge_recharge__panel">
        <div v-for="(item, index) in list" :key="index"
          :class="[item.isCheck ? 'recharge-check' : 'recharge-default']"
          @click="clickPanel(item)">
          <span>{{item.title}}</span>
          <span>{{item.desc}}</span>
        </div>
      </div>
    </div>
    <div>
      <van-coupon-cell
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        @click="showList = true">
      </van-coupon-cell>
    </div>
    <div class="recharge_agreement">
      <div>提醒:代充值服务暂不提供发票</div>
      <div>同意<span class="recharge_agreement__text">{{agreementText}}</span></div>
    </div>

    <van-goods-action>
      <van-goods-action-big-btn
        text="总计:99(省1元)"
      />
      <van-goods-action-big-btn
        primary
        text="立即充值"
        @click="onClickBigBtn"
      />
    </van-goods-action>

    <!-- 优惠券列表 -->
    <van-popup v-model="showList" position="bottom">
      <van-coupon-list
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        :disabled-coupons="disabledCoupons"
        @change="onChange"
        @exchange="onExchange"
      />
    </van-popup>
  </com-page>
</template>

<script>
const coupon = {
  available: 1,
  condition: '无使用门槛\n最多优惠12元',
  reason: '',
  value: 150,
  name: '优惠券名称',
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: '1.5',
  unitDesc: '元'
}
export default {
  data() {
    return {
      card: 'NO1000114500001332537',  //油卡卡号
      iconName: 'arrow-down',  //icon图标
      list:[{
        title: '100元',
        desc: '支付99元',
        isCheck: true
      }, {
        title: '200元',
        desc: '支付198元',
        isCheck: false,
      }, {
        title: '500元',
        desc: '支付496元',
        isCheck: false
      }],
      //选择优惠券
      showList: false,
      chosenCoupon: -1,
      coupons: [coupon],
      disabledCoupons: [coupon],
      agreementText: '<<服务协议>>'
    };
  },
  created() {
    
  },
  methods: {
    clickPanel (item) {
      this.list.forEach((l, i) => {
        l.isCheck = l.title === item.title
      })
    },
    onChange(index) {
      this.showList = false
      this.chosenCoupon = index
    },
    onExchange(code) {
      this.coupons.push(coupon)
    },
    onClickBigBtn () {
      
    }
  }
};
</script>
<style lang="scss">
  .recharge {
    &_top {
      height: 83px;
      display: flex;
      align-items: center;
      background: #fff;
      justify-content: space-around;
      margin-bottom: 2px;
      &__img {
        width: 63px;
        height: 42px;
      }
    }
    &_recharge {
      padding: 15px;
      height: 146px;
      background: #fff;
      margin-bottom: 2px;
      &__panel {
        display: flex;
        justify-content: space-between;
        margin: 14px 0px;
        >div {
          display: flex;
          width: 110px;
          height: 83px;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          span:nth-child(1) {
            font-size: 21px;
          }
          span:nth-child(2) {
            font-size: 13px;
          }
        }
      }
    }
    &_agreement {
      padding: 15px;
      font-size: 15px;
      line-height: 30px;
      color: #A0A0A0;
      &__text {
        color: #55ADFC;
      }
    }
    .recharge-check {
      background: #55ADFC;
      color: #fff;
    }
    .recharge-default {
      background: #F1F1F1;
      color: #313131;
    }

  }
</style>