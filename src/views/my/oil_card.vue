<template>
  <com-page class="my_oil">
    <com-header title="我的油卡" is-back is-go icon-name="plus" v-on:goClick="goClick" slot="header"></com-header>
    <van-swipe :width="swipeWid" :height="swipeHei" :loop="false" :show-indicators="false" @change="changeSwipe">
      <van-swipe-item v-for="(item, index) in oilcardList" :key="index">
        <div class="oil_box">
          <img class="my_oil_img" v-lazy="item.img"/>
          <div class="oil_box_ye" v-show="item.money != null && item.money !== ''">
            <div>当前余额</div>
            <div class="oil_box_ye_mon">{{ item.money | vFixedTwo }}</div>
          </div>
          <div class="oil_box_bm">{{ item.code | vUpperCase }}</div>
          <div class="oil_box_zt">
            <img v-if="item.status == 2" src="static/images/icon/encrypt.png" alt="" @click="oilCardClick(item)">
            <img v-else-if="item.status == 3" src="static/images/icon/lose.png" alt="" @click="oilCardClick(item)">
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
    <van-tabs
      @click="changeTab"
      v-model="currentTab"
      title-inactive-color="#A3A3A3"
      title-active-color="#313131"
      color="#313131"
      :line-width="31">
      <van-tab v-for="(item, index) in tabList" :key="index" :title="item.title">
        <div v-if="item.list.length != 0">
          <div class="oil_cons" v-for="(val, ind) in item.list" :key="ind" @click="jumpDetail(val, item)">
            <img v-if="currentTab == 0" src="static/images/icon/oil_czjl.png" alt="">
            <img v-else-if="currentTab == 1" src="static/images/icon/oil_xfjl.png" alt="">
            <div class="oil_cons_left">
              <div class="oil_cons_left_title">{{ val.title }}</div>
              <div class="oil_cons_left_order">订单号：{{ val.orderId }}</div>
            </div>
            <div class="oil_cons_right">
              <div class="oil_cons_right_sum" :class="[currentTab == 0 ? 'color_red' : 'color_blue']">
                <span v-show="currentTab == 1">-</span>{{ val.sum | vMoneyChange }}
              </div>
              <div class="oil_cons_right_time">{{ val.time }}</div>
            </div>
          </div>
        </div>
        <div class="no-data-sty" v-else>
          暂无{{ item.title }}
        </div>
      </van-tab>
    </van-tabs>
  </com-page>
</template>

<script>
import { Toast } from 'vant';
import { list_mixins } from "@/mixins";
import { bindCardList, getCardApntList } from '@/service/oilcard.js'
export default {
  mixins: [list_mixins],
  data() {
    return {
      swipeWid: 0, //轮播主图的宽度
      swipeHei: 0, //轮播主图的高度
      oilcardList: [], //油卡列表
      currentCard: {}, //当前油卡
      currentTab: 0, //当前tab
      tabList: [
        {
          index: 0,
          title: '充值记录',
          list: []
        }, {
          index: 1,
          title: '消费记录',
          list: []
        }
      ]
    };
  },
  created() {
    let self = this;
    let pmWid = document.body.clientWidth;
    self.swipeWid = pmWid * 323 / 375
    self.swipeHei = self.swipeWid * 146 / 323
    self.getBindCardList()
  },
  methods: {
    async getBindCardList () { // 获取我的油卡列表
      let self = this;
      let param = {
        mobile: self.userInfo.mobile
      }
      let resData = await bindCardList(param)
      console.log('获取我的油卡列表',resData)
      if (resData.status === 200 && resData.data.code === 1) {
        let list = resData.data.data;
        if (list.length == 0) {
          let obj = {
            img: 'static/images/icon/oil_4.png',
            money: '',
            code: '',
            status: 2
          }
          self.oilcardList.push(obj)
        } else {
          list.forEach((item, index) => {
            let obj = {
              img: 'static/images/icon/oil_' + item.status + '.png',
              money: item.balance,
              code: item.cardNo,
              status: item.status
            }
            self.oilcardList.push(obj)
          })
          self.$nextTick(() => {
            self.currentCard = self.oilcardList[0]
            self.cardApntList()
          })
        }
      } else {
        Toast({
          message: resData.data.msg,
          duration: 1500
        })
      }
    },
    changeTab (index, title) { //切换tab
      this.currentTab = index
    },
    jumpDetail (val, old) {
      this.$store.dispatch("setCurrentOilType", this.currentTab)
      this.$store.dispatch("setCurrentDity", val)
      this.$router.push('/my/oil_detail')
    },
    goClick () { // 新增页面
      this.$router.push('/service/binding')
    },
    oilCardClick (item) { // 油卡挂失
      let self = this;
      if (item.status == 2) { //正常（进入解绑）
        self.$store.dispatch("setCurrentOil", item)
        console.log(item)
        self.$router.push('/my/oil_delete')
      }
    },
    changeSwipe (index) { //切换油卡
      let self = this;
      self.currentCard = self.oilcardList[index]
    },
    async cardApntList () { // 当前油卡充值记录
      let self = this;
      let param = {
        id: self.currentCard.id,
        mobile: self.userInfo.mobile
      }
      let resData = await getCardApntList(param)
      console.log('当前油卡充值记录',resData)
      if (resData.status === 200 && resData.data.code === 1) {
        let list = resData.data.data
        self.tabList[0].list = list
      } else {
        Toast({
          message: resData.data.msg,
          duration: 1500
        })
      }
    },
  }
};
</script>
<style lang="scss">
.my_oil{
  &_img{
    width: 100%;
  }
  .oil_box{
    position: relative;
    color: #FFF;
    &_ye{
      position: absolute;
      top: 25px;
      left: 25px;
      &_mon{
        font-size: 30px;
      }
    }
    &_bm{
      position: absolute;
      bottom: 21px;
      left: 25px;
    }
    &_zt{
      position: absolute;
      top: 25px;
      right: 20px;
    }
  }
  .oil_cons{
    width: calc(100% - 30px);
    padding: 17px 0;
    margin: 0 15px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #F1F1F1;
    img{
      width: 50px;
      height: 50px;
      margin-right: 13px;
    }
    &_left{
      width: 40%;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;
      &_title{
        font-size: 15px;
        color: #313131;
        font-weight:600;
      }
      &_order{
        font-size: 13px;
        color: #A8A8A8;
      }
    }
    &_right{
      width: 40%;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      flex-direction: column;
      .color_red{
        color: #FF4560;
      }
      .color_blue{
        color: #53A8FD;
      }
      &_sum{
        font-size: 17px;
        font-weight:600;
      }
      &_time{
        font-size: 13px;
        color: #A8A8A8;
      }
    }
  }

  .van-swipe{
    padding-left: 30px;
    padding-top: 16px ;
    padding-bottom: 16px;
    box-sizing: border-box;
    .van-swipe-item{
      padding-right: 10px;
    }
  }
  .no-data-sty{
    text-align: center;
    font-size: 14px;
    color: #A0A0A0;
    margin-top: 20px;
  }
}
</style>