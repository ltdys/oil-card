<template>
  <div class="nav-wrap">
    <div>
      <van-icon name="shop-o"/>
      <span>预约办卡</span>
    </div>
    <div>
      <van-icon name="chat-o"/>
      <span>油卡绑定</span>
    </div>
    <div>
      <van-icon name="diamond-o"/>
      <span>油卡充值</span>
    </div>
    <div>
      <van-icon name="balance-o"/>
      <span>油卡挂失</span>
    </div>
    <div>
      <van-icon name="refund-o"/>
      <span>申请退卡</span>
    </div>
    <div>
      <van-icon name="bullhorn-o"/>
      <span>常见问题</span>
    </div>
  </div>
</template>

<style lang="scss">
  .nav {
    &-wrap {
      padding: 15px;
      display: flex;
      flex-wrap: wrap;
      box-sizing: border-box;
      justify-content: space-between;
      >div {
        width: calc(50% - 2.5px);
        height: 120px;
        background: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 5px;
      }
    }
  }
</style>

