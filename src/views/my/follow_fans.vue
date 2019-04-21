<template>
  <com-page class="mycoupon">
    <com-header title="我的优惠券" is-back slot="header"></com-header>
    <van-tabs
      @click="changeTab"
      v-model="currentTab"
      title-inactive-color="#A3A3A3"
      title-active-color="#313131"
      color="#313131"
      :line-width="31">
      <van-tab v-for="(item, index) in tabList" :key="index" :title="item.title">
        <div class="oil_cons" v-for="(val, ind) in item.list" :key="ind" @click="jumpDetail(val, item)">
          <img v-if="currentTab == 0" src="static/images/icon/yhq.png" alt="">
          <img v-else src="static/images/icon/yhq_defu.png" alt="">
          <div class="oil_cons_left">
            <div class="oil_cons_left_sum">{{ val.price | vMoneyChange }}</div>
            <div class="oil_cons_left_title">{{ val.name }}</div>
          </div>
           <div class="oil_cons_right">
            <div class="oil_cons_right_title">{{ val.title }}</div>
            <div class="oil_cons_right_time">{{ val.time }}</div>
          </div>
          <!-- <div class="oil_cons_right">
            <div class="oil_cons_right_sum" :class="[currentTab == 0 ? 'color_red' : 'color_blue']">
              <span v-show="currentTab == 1">-</span>{{ val.sum | vMoneyChange }}
            </div>
            <div class="oil_cons_right_time">{{ val.time }}</div>
          </div> -->
        </div>
      </van-tab>
    </van-tabs>
  </com-page>
</template>

<script>
export default {
  data() {
    return {
      currentTab: 0, //当前tab
      tabList: [
        {
          index: 0,
          title: '未使用',
          list: [
            {
              price: '60',
              name: '满499可用',
              title: '60元加油优惠劵',
              time: '2018.04.01-2019.01.01',
            }, {
              price: '10',
              name: '满499可用',
              title: '10元加油优惠劵',
              time: '2018.04.01-2019.01.01',
            }, 
          ]
        }, {
          index: 1,
          title: '已使用',
          list: [
            {
              price: '60',
              name: '满499可用',
              title: '60元加油优惠劵',
              time: '2018.04.01-2019.01.01',
            }, {
              price: '10',
              name: '满499可用',
              title: '10元加油优惠劵',
              time: '2018.04.01-2019.01.01',
            }, 
          ]
        }, {
          index: 2,
          title: '已过期',
          list: [
            {
              price: '60',
              name: '满499可用',
              title: '60元加油优惠劵',
              time: '2018.04.01-2019.01.01',
            }, {
              price: '10',
              name: '满499可用',
              title: '10元加油优惠劵',
              time: '2018.04.01-2019.01.01',
            }, 
          ]
        }
      ]
    };
  },
  created() {
    
  },
  methods: {
    changeTab (index, title) { //切换tab
      this.currentTab = index
    },
  }
};
</script>
<style lang="scss">
.mycoupon{
  .oil_cons{
    width: calc(100% - 30px);
    margin: 0 15px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    margin-top: 10px;
    background: #FFF;
    position: relative;
    img{
      width: 125px;
      height: 94px;
    }
    &_left{
      position: absolute;
      top: 0;
      left: 0;
      width: 125px;
      height: 94px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      color: #FFF;
      &_title{
        font-size: 13px;
      }
      &_sum{
        font-size: 27px;
        font-weight:600;
      }
    }
    &_right{
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;
      margin-left: 20px;
      &_title{
        font-size: 17px;
        font-weight:600;
        color: #313131;
      }
      &_time{
        font-size: 15px;
        color: #A8A8A8;
      }
    }
  }
}
</style>