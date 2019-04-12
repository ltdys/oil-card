<template>
  <van-tabbar v-model="selected" :fixed="false">
    <van-tabbar-item :icon="menu.icon" v-for="menu in menus" :key="menu.icon" :to="menu.path">
      {{menu.name}}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
  export default {
    data () {
      return {
        selected: 0,
        menus: [
          { name: '首页', icon: 'wap-home', path: '/'},
          { name: '优惠券', icon: 'gift-card-o', path: '/coupon'},
          { name: '我的', icon: 'user-o', path: '/my'},
        ],
        active: 0
      }
    },

    created () {
      for(let i in this.menus){
        if(this.menus[i].path === this.$route.path){
          this.selected = +i
        }
      }
    }
  }
</script>