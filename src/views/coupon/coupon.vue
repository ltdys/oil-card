<template>
  <com-page class="coupon">
    <com-header title="优惠券" slot="header"> </com-header>

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item, index) in list" :key="index">
        <div class="coupon_img">
          <img :src="item.img" alt="..">
        </div>
        <div class="coupon_content">
          <div>{{item.title}}</div>
          <div class="coupon_content__btn">
            {{item.type}}
          </div>
        </div>
      </van-cell>
    </van-list>
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
        type: '进行中'
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
      color: #393939;
      &__btn {
        width: 58px;
        height: 29px;
        line-height: 29px;
        font-size: 13px;
        text-align: center;
        border: 2px solid #55ADFC;
        color: #55ADFC;
      }
    }
  }
</style>

