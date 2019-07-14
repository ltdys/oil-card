<template>
  <com-page class="oil-card">
    <com-header title="我的油卡" is-back icon-name="plus" slot="header"></com-header>
      <div class="oil-card_wrap" :style="backgroundDiv" v-for="(item, index) in list" :key="index">
        <div>
          <span class="oil-card-a">已消费金额</span>
          <span class="oil-card-b">状态：{{ item.status | vCardStatus }}</span>
        </div>
        <div>
          <span class="oil-card-c">{{ item.rePayBalance | vFixedOne }} 元</span>
        </div>
        <div class="oil-card-d">
          {{ item.cardNo }}
        </div>
      </div>
  </com-page>
</template>

<script>
import { Toast } from 'vant';
import { list_mixins } from "@/mixins";
import { queryRelationCardList } from '@/service/oilcard.js'
export default {
  mixins: [list_mixins],
  data () {
    return {
      list: [],
      backgroundDiv: {
        backgroundImage:'url(' + require('../../../static/images/icon/oil_1.png') + ')',
        backgroundRepeat:'no-repeat',
        backgroundSize:'100% 100%'
      }
    }
  },
  created () {
    this.queryRelationCardList()
  },

  methods: {
    async queryRelationCardList () {
      let params = {
        mobile: this.userInfo.mobile
      }
      let resData = await queryRelationCardList(params)
      if (resData.status === 200 && resData.data.code === 1) {
        this.list = resData.data.data;
      } else {
        Toast({
          message: resData.data.msg,
          duration: 1500
        })
      }
    },
    oilCardClick (item) { // 油卡挂失
      let self = this;
      if (item.status == 2) { //正常（进入解绑）
        self.$store.dispatch("setCurrentOil", item)
        console.log(item)
        self.$router.push('/my/oil_delete')
      }
    }
  }
}
</script>

<style lang="scss">
  .oil-card {
    width: 100%;
    background: #fff;
    &_wrap {
      height: 146px;
      border-radius: 6px;
      margin: 15px;
      background: pink;
      display: flex;
      flex-direction: column;
      padding-left: 30px;
      padding-top: 45px;
    }
    .oil-card-a {
      padding-right: 70px;
    }
    .oil-card-a, .oil-card-b {
      font-size: 14px;
      font-family:PingFangSC-Semibold;
      font-weight:600;
      color: #ebedf0;
    }
    .oil-card-c {
      font-size:30px;
      font-family:ExpoBlackSSiBlack;
      color: #fff;
    }
    .oil-card-d {
      width:146px;
      height:19px;
      font-size:14px;
      font-family:ExpoBlackSSiBlack;
      color:#fff;
    }
  }
</style>


