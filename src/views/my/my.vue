<template>
  <com-page class="my">
    <com-header title="我的" slot="header"></com-header>
    <div class="my_header">
      <img class="my_header__img" src="static/images/icon/user_defu.png" alt="">
      <span class="my_header__text">微信昵称：</span>
      <span class="my_header__name">{{ user_name }}</span>
    </div>
    <div class="blank-10"></div>
    <div class="my_user">个人服务</div>
    <div class="my_serve">
      <div v-for="(item, index) in imgs" :key="index">
        <template v-if="Object.keys(item).length != 0">
          <img class="my_serve__img" :src="item.img" alt="">
          <div>{{ item.text }}</div>
        </template>
      </div>
    </div>
  </com-page>
</template>
<script>
export default {
  components: {
    
  },

  data () {
    return {
      user_name: '蒋鹏',
      imgs: [
        {
          img: 'static/images/icon/user.png',
          text: '个人信息'
        }, {
          img: 'static/images/icon/safety.png',
          text: '实名认证'
        }, {
          img: 'static/images/icon/wallet.png',
          text: '个人钱包'
        }, {
          img: 'static/images/icon/record.png',
          text: '充值记录'
        }, {
          img: 'static/images/icon/code.png',
          text: '二维码推广'
        }, {
          img: 'static/images/icon/collect.png',
          text: '已关注粉丝'
        }, {
          img: 'static/images/icon/coupon.png',
          text: '优惠券'
        }, {
          img: 'static/images/icon/integral.png',
          text: '积分'
        }, {}
      ]
    }
  }
}
</script>
<style lang="scss">
.my{
  font-size: 14px;
  &_header{
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    background: #f3ac38;
    font-size: 14px;
    &__img{
      width: 50px;
      height: 50px;
    }
    &__text{
      margin: 0 10px;
    }
    &__name{
      color: #FFF;
    }
  }
  &_user{
    width: 100%;
    height: 35px;
    line-height: 35px;
    padding: 0 15px;
    box-sizing: border-box;
  }
  &_serve{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    border-left: 1px solid #eee;
    border-top: 1px solid #eee;
    >div{
      width: 33.33%;
      height: 100px;
      // line-height: 100px;
      text-align: center;
      border-right: 1px solid #eee;
      border-bottom: 1px solid #eee;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
    &__img{
      width: 30px;
      margin-bottom: 10px;
    }
  }
}
</style>