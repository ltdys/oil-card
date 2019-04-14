<template>
  <div class="nav-wrap">
    <div v-for="(item, index) in navList" :key="index" @click="$router.push(item.path)">
      <img :src="item.img" alt="">
      <div>{{ item.text }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      navList: [{
        img: 'static/images/icon/appointment.png',
        text: '预约办卡',
        path: '/service/appointment'
      }, {
        img: 'static/images/icon/binding.png',
        text: '油卡绑定',
        path: '/service/binding'
      }, {
        img: 'static/images/icon/recharge.png',
        text: '油卡充值',
        path: '/service/recharge'
      }, {
        img: 'static/images/icon/loss_report.png',
        text: '油卡挂失',
        path: '/service/loss_report'
      }, {
        img: 'static/images/icon/withdraw.png',
        text: '申请退卡',
        path: '/service/withdraw'
      }, {
        img: 'static/images/icon/problem.png',
        text: '常见问题',
        path: '/service/problem'
      }]
    }
  }
}
</script>


<style lang="scss">
  .nav {
    &-wrap {
      padding: 15px;
      display: flex;
      flex-wrap: wrap;
      box-sizing: border-box;
      justify-content: space-between;
      font-size: 14px;
      >div {
        width: calc(50% - 2.5px);
        height: 120px;
        background: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 5px;
        >img {
          width: 30px;
          margin-bottom: 10px;
        }
      }
    }
  }
</style>

