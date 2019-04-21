<template>
  <com-page class="myservice">
    <com-header title="客服" is-back slot="header"></com-header>
    <div class="service_ercode">
      <div id="qrcode" ref="qrcode"></div>
      <div class="service_ercode_att">关注我们</div>
    </div>
    <van-cell class="zjzp-cell" title="客服电话" :value="service.tel"></van-cell>
    <van-cell class="zjzp-cell" title="企业邮箱" :value="service.email | vUpperCase"></van-cell>
    <van-cell class="zjzp-cell" title="工作时间" :value="service.time"></van-cell>
  </com-page>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
  components: {
    QRCode
  },
  data() {
    return {
      qrcodeObj: { //设置客服二维码
        width: 125,  // 设置宽度 
        height: 125, // 设置高度
        text: 'https://www.baidu.com'
      },
      service: { //客服显示字段
        tel: '4008 517 517',
        email: 'chelianbao@163.com',
        time: '工作日09:00-18:00'
      }
    };
  },
  created() {
    
  },
  mounted () {
    this.$nextTick (function () {
      this.qrcode();
    })
  },
  methods: {
    qrcode () {
      let qrcode = new QRCode('qrcode', this.qrcodeObj)  
    },
  }
};
</script>
<style lang="scss">
.myservice{
  .service_ercode{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 209px;
    &_att{
      font-size: 15px;
      color: #313131;
      margin-top: 10px;
    }
  }
  .zjzp-cell{
    .van-cell__value{
      padding-left: 10px;
      color: #313131;
    }
  }
}
</style>