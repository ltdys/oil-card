<template>
  <com-page class="appointment-query">
    <com-header title="申请查询" is-back slot="header"></com-header>
     <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="appointment-query_wrap" v-for="(item, index) in list" :key="index">
        <div class="appointment-query_wrap__left">
          <div>
            <img src="static/images/icon/oil_xfjl.png">
          </div>
          <div>
            <span class="fa-stack-16x fa-color-31">{{ item.recPsn }}</span>
            <span class="fa-stack-12x fa-color-a8">{{ item.isPass | vIsAgree }}</span>
          </div>
        </div>
        <div class="appointment-query_wrap__right">
          <span class="fa-stack-16x fa-color-327">申请个数: {{ item.apntCardCount }}</span>
          <span class="fa-stack-14x fa-color-a8">{{ item.createTime }}</span>
        </div>
      </div>
    </van-list>
  </com-page>
</template>

<script>
import { list_mixins } from "@/mixins";
import { getCardApntList } from "@/service/oilcard.js"
export default {
  mixins: [list_mixins],
  data () {
    return {
      loading: false,
      finished: false,
      list: [],
      page: 0,
      rows: 10,
      mobile: ''
    }
  },

  methods: {
    onLoad () {
      let self = this
      if (self.finished) {
        return
      }
      self.page ++
      self.getCardApntList()
    },
    async getCardApntList () { // 当前油卡充值记录
      let self = this;
      let param = {
        mobile: self.userInfo.mobile,
        page: self.page,
        rows: self.rows
      }
      let resData = await getCardApntList(param)
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
  .appointment-query {
    width: 100%;
    height: 100%;
    &_wrap {
      display: flex;
      height: 83px;
      box-shadow: 0px 1px 0px 0px rgba(241, 241, 241, 1);
      justify-content: space-between;
      padding: 15px;
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


