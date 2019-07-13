<template>
  <com-page class="balance">
    <com-header title="我的余额" is-back slot="header"></com-header>
    <div class="balance_info">
      <div>
        <div class="fa-stack-16x fa-color-31">剩余金额：</div>
        <div class="fa-stack-16x fa-color-31">充值总额：</div>
      </div>
      <div class="balance_info__right">
        <div class="fa-stack-16x fa-color-327">{{ relationCardInfo.cardTotalBlan | vFixedTwo }}</div>
        <div class="fa-stack-14x fa-color-31">{{ relationCardInfo.cardSum || 0 }}</div>
      </div>
    </div>
     <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="balance_wrap" v-for="(item, index) in list" :key="index">
        <div class="balance_wrap__left">
          <div>
            <img src="static/images/icon/oil_xfjl.png">
          </div>
          <div>
            <span class="fa-stack-14x fa-color-31">充值金额:{{ item.tradeStatus | vStatus }}</span>
            <span class="fa-stack-12x fa-color-a8">支付方式: {{ item.payType | vPayType}}</span>
          </div>
        </div>
        <div class="balance_wrap__right">
          <span class="fa-stack-16x fa-color-327">{{ item.totalAmount | vFixedOne }}元</span>
          <span class="fa-stack-14x fa-color-a8">{{ item.createTime }}</span>
        </div>
      </div>
    </van-list>
  </com-page>
</template>

<script>
import { list_mixins } from "@/mixins";
import { getHQPayList, queryRelationCardInfo } from "@/service/oilcard.js"
export default {
  mixins: [list_mixins],
  data () {
    return {
      loading: false,
      finished: false,
      list: [],
      page: 0,
      rows: 10,
      mobile: '',
      relationCardInfo: {}
    }
  },

  created () {
    this.queryRelationCardInfo()
  },

  methods: {
    onLoad () {
      let self = this
      if (self.finished) {
        return
      }
      self.page ++
      self.getHQPayList()
    },
    async queryRelationCardInfo () {
      let params = {
        mobile: this.userInfo.mobile
      }
      let resData = await queryRelationCardInfo(params)
      if (resData.status === 200 && resData.data.code === 1) {
        this.relationCardInfo = resData.data.data
      } else {
        Toast({
          message: resData.data.msg,
          duration: 1500
        })
      }
    },
    async getHQPayList () { // 当前油卡充值记录
      let self = this;
      let param = {
        mobile: self.userInfo.mobile,
        page: self.page,
        rows: self.rows
      }
      let resData = await getHQPayList(param)
      console.log('当前油卡充值记录',resData)
      if (resData.status === 200 && resData.data.code === 1) {
        self.list = resData.data.data
        this.loading = false
        if (self.list.length == 0 || self.list.length < self.rows) {
          self.finished = true;
        }
      } else {
        Toast({
          message: resData.data.msg,
          duration: 1500
        })
      }
    },
  }
}
</script>

<style lang="scss">
  .balance {
    width: 100%;
    height: 100%;
    &_info {
      padding: 15px;
      display: flex;
      height: 90px;
      justify-content: space-between;
      align-items: center;
      background: #fff;
      &__right {
        text-align: right;
      }
    }
    &_wrap {
      display: flex;
      height: 83px;
      box-shadow: 0px 1px 0px 0px rgba(241, 241, 241, 1);
      justify-content: space-between;
      padding: 15px;
      margin-top: 10px;
      background: #fff;
      &__left {
        display: flex;
        div:nth-child(2) {
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          margin-left: 13px;
        }
        img {
          width: 50px;
          height: 50px;
        }
      }
      &__right {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: flex-end;
      }
    }
  }
</style>


