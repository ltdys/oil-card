<template>
  <com-page class="recharge">
    <com-header title="油卡充值" is-back slot="header"></com-header>
    
    <template v-if="pupupList.length > 0">
      <div class="recharge_top">
        <div><img src="static/images/icon/card.png" alt=".." class="recharge_top__img"></div>
        <div>{{card}}</div>
        <div><van-icon :name="iconName" @click="iconClick"></van-icon></div>
      </div>
    </template>
    <template v-else>
      <div class="recharge_addcard">
        <div class="recharge_addcard__btn" @click="$router.push('/service/binding')">
          <van-icon name="plus"></van-icon>
          <span>添加油卡</span>
        </div>
      </div>
    </template>
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
      <!-- <van-coupon-cell
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        @click="jumpYhCoupon">
      </van-coupon-cell> -->
      <van-cell title="优惠劵" is-link :value="currentCoupon.title || '使用优惠'" to="/my/yh_coupon?id=2" />
    </div>
    <div class="recharge_agreement">
      <div>提醒:代充值服务暂不提供发票</div>
      <div>
        <van-checkbox v-model="checked">
          同意<span class="recharge_agreement__text vertical-align-middle">{{agreementText}}</span>
        </van-checkbox>
      </div>
    </div>

    <div class="recharge_action">
      <div class="recharge_action__data">
        <span>总计:</span>
        <span>&nbsp;￥{{payment}}&nbsp;</span>
        <span>(省{{less}}元)</span>
      </div>
      <div class="recharge_action__submit" :class="[!checked ? 'opacity-disabled' : '']">
        立即充值
      </div>
    </div>

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

    <!-- popup弹出层 -->
    <transition name="van-fade">
      <van-popup
        v-model="popupShow"
        position="top"
        :overlay="false"
        style="z-index: 2000">
        <div v-for="(item, index) in pupupList" :key="index" class="recharge_popup">
          <div><img src="static/images/icon/card.png" alt=".."></div>
          <div>{{item.cardNo}}</div>
          <van-radio-group v-model="radio" @change="radioChange">
            <van-radio :name="item.cardNo" />
          </van-radio-group>
        </div>
      </van-popup>
    </transition>

    <div class="recharge_overlay" style="z-index: 1999" v-show="iconName === 'arrow-up'"> 
    </div>
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
import { bindCardList } from '@/service/oilcard.js'
import { list_mixins } from '@/mixins'
export default {
  mixins: [list_mixins],

  data() {
    return {
      hasCard: true,
      card: '',  //油卡卡号
      iconName: 'arrow-down',  //icon图标
      checked: false,
      popupShow: false,
      radio: '1',
      list:[{
        title: '100元',
        desc: '支付99元',
        isCheck: true,
        payment: '99',
        less: '1'
      }, {
        title: '200元',
        desc: '支付198元',
        isCheck: false,
        payment: '198',
        less: '2'
      }, {
        title: '500元',
        desc: '支付496元',
        isCheck: false,
        payment: '500',
        less: '4'
      }],
      payment: '',
      less: '',
      pupupList: [],
      //选择优惠券
      showList: false,
      chosenCoupon: -1,
      coupons: [coupon],
      disabledCoupons: [coupon],
      agreementText: '《服务协议》'
    };
  },
  computed: {
    currentCoupon: {
      get: function () {
        return this.$store.getters.getCurrentCoupon
      }
    }
  },
  created() {
    this.payment = this.list[0].payment
    this.less = this.list[0].less
    this.bindCardList()
  },
  methods: {
    clickPanel (item) {
      this.payment = item.payment
      this.less = item.less
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
      
    },
    iconClick () {
      this.popupShow = this.iconName === 'arrow-down'
      this.iconName = this.iconName === 'arrow-down' ? 'arrow-up' : 'arrow-down'
    },
    radioChange (name) {
      this.popupShow = false
      this.iconName = 'arrow-down'
      this.card = name
    },
    async bindCardList () {
      let param = {
        mobile: this.userInfo.mobile
      }
      let resData = await bindCardList(param)
      if (resData.status === 200 && resData.data.code === 1) {
        this.pupupList = resData.data.data || []
        if (this.pupupList.length > 0) {
          this.card = this.pupupList[0].cardNo
          this.pupupList.forEach((item, index) => {
            item.isCheck = index === 0
          })
          this.pupupList.shift()
        }
      }
    },
    jumpYhCoupon () { // 跳转优惠劵页面
      let self = this;
      self.$router.push({
        path: '/my/yh_coupon',
        query: {
          id: '2'
        }
      })
    },
  }
};
</script>
<style lang="scss">
  .recharge {
    &_overlay {
      position: fixed;
      top: 2.58rem;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
    }
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
    &_addcard {
      height: 83px;
      background: #fff;
      padding: 15px;
      color: #fff;
      &__btn {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        background: #55ADFC;
        border-radius: 2px;
        >span {
          margin-left: 5px;
          font-size: 16px;
        }
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
    &_action {
      height: 52px;
      display: flex;
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      box-sizing: border-box;
      &__data {
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color:#fff;
        border: 0.02rem solid #fff;
        color: #313131;
        span:nth-child(1) {
          font-size: 15px;
        }
        span:nth-child(2) {
          font-size: 21px;
          color: #FC4C5D;
        }
        span:nth-child(3) {
          font-size: 13px;
        }
      }
      &__submit {
        width: 50%;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #55ADFC;
        border: 0.02rem solid #55ADFC;
      }
    }
    &_popup {
      height: 83px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      img {
        width: 63px;
        height: 42px;
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