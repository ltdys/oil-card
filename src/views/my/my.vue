<template>
  <com-page class="my">
    <com-header title="我的" slot="header"></com-header>
    <div class="my_header">
      <img class="my_header__img" src="static/images/icon/user_defu.png" alt="">
      <span class="my_header__text">微信昵称：</span>
      <span class="my_header__name">{{ user_name }}</span>
    </div>
    <div class="my_serve">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
      <div>7</div>
      <div>8</div>
      <div>9</div>
    </div>
  </com-page>
</template>
<script>
export default {
  components: {
    
  },

  data () {
    return {
      user_name: '蒋鹏'
    }
  }
}
</script>
<style lang="scss">
.my{
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
  &_serve{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    border-left: 1px solid #eee;
    border-top: 1px solid #eee;
    div{
      width: 33.33%;
      height: 100px;
      line-height: 100px;
      text-align: center;
      border-right: 1px solid #eee;
      border-bottom: 1px solid #eee;
    }
  }
}
</style>