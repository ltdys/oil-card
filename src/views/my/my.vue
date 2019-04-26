<template>
  <com-page class="my">
    <com-header title="我的" slot="header"></com-header>
    <div class="my_header">
      <img class="my_header__img" :src="userInfo.headImage | vUserImg" onerror="onerror=null;this.src='static/images/icon/user_defu.png'" alt="">
      <span class="my_header__text">微信昵称：</span>
      <span class="my_header__name">{{ userInfo.nickName }}</span>
    </div>
    <div class="blank-10"></div>
    <div class="my_user">个人服务</div>
    <div class="my_serve">
      <div v-for="(item, index) in imgs" :key="index" @click="jumpPath(item)">
        <template v-if="Object.keys(item).length != 0">
          <img class="my_serve__img" :src="item.img" alt="">
          <div>{{ item.text }}</div>
        </template>
      </div>
    </div>
  </com-page>
</template>
<script>
import { list_mixins } from "@/mixins";
export default {
  mixins: [list_mixins],
  components: {
    
  },

  data () {
    return {
      user_name: '蒋鹏',
      imgs: [
        {
          img: 'static/images/icon/user.png',
          text: '个人信息',
          path: '/my/info'
        }, {
          img: 'static/images/icon/safety.png',
          text: '实名认证',
          path: '/my/safety'
        }, {
          img: 'static/images/icon/wallet.png',
          text: '我的油卡',
          path: '/my/oil_card'
        }, {
          img: 'static/images/icon/record.png',
          text: '油卡充值',
          path: '/service/recharge'
        }, {
          img: 'static/images/icon/rq_code.png',
          text: '我的订单',
          path: '/my/my_order'
        }, {
          img: 'static/images/icon/collect.png',
          text: '我的优惠劵',
          path: '/my/yh_coupon'
        }, {
          img: 'static/images/icon/coupon.png',
          text: '设置',
          path: '/my/my_setting'
        }, {
          img: 'static/images/icon/integral.png',
          text: '客服',
          path: '/my/service'
        }, {
          img: 'static/images/icon/integral.png',
          text: '商城',
          path: '/my/shopping'
        }
      ]
    }
  },
  methods: {
    jumpPath (item) { // 跳转子项页面
      let self = this;
       if (item.path == '/my/yh_coupon') {
        self.$router.push({
        path: '/my/yh_coupon',
        query: {
          id: '1'
        }
      })
      } else {
        self.$router.push(item.path)
      }
    },
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
      border-radius: 50%;
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