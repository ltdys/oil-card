<template>
  <com-page class="coupon">
    <com-header title="优惠券" slot="header"> </com-header>

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      v-if="list.length > 0"
    >
      <van-cell v-for="(item, index) in list" :key="index">
        <div class="coupon_img">
          <img :src="item.img" alt=".."
            :class="[item.type === '已结束' ? 'img-filter' : '']">
        </div>
        <div class="coupon_content">
          <div>{{item.title}}</div>
          <div class="coupon_content__btn"
            :class="[item.type === '进行中' ? 'btn-conduct' : 'btn-end']">
            {{item.type}}
          </div>
        </div>
      </van-cell>
    </van-list>

    <div class="coupon_default" v-else>
      <div><img src="static/images/icon/coupon_defu.png" alt=".."></div>
      <div>暂时没有优惠券</div>
    </div>
  </com-page>
</template>

<script>
export default {
  data () {
    return {
      list: [{
        img: 'static/images/banner.jpg',
        title: '邀请好友,红包拿不停',
        type: '进行中'
      }, {
        img: 'static/images/banner1.jpg',
        title: '邀请好友,红包拿不停',
        type: '已结束'
      }],
      loading: false,
      finished: false,
    }
  },

  methods: {
    onLoad () {
      this.loading = false
      if (this.list.length >= 10) {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="scss">
  .coupon {
    &_img >img {
      width: 346px;
      height: 146px;
    }
    &_content {
      display: flex;
      justify-content: space-between;
      padding: 16px 21px;
      background: #fff;
      color: #393939;
      &__btn {
        width: 58px;
        height: 29px;
        line-height: 25px;
        font-size: 13px;
        text-align: center;
      }
    }
    &_default {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      color: #9AAEC0;
      font-size: 15px;
      div:nth-child(1) {
        margin-top: 50%;
      }
      div:nth-child(2) {
        margin-top: 14px;
      }
      img {
        width: 139px;
        height: 84px;
      }
    }
  }
</style>

