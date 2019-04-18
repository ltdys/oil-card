<template>
  <com-page class="mysafety">
    <com-header title="实名认证" is-back slot="header"></com-header>
    <van-field label="真实姓名" v-model="safetyInfo.realname" placeholder="填写本人的真实姓名"></van-field>
    <van-field label="身份证号" v-model="safetyInfo.IDnumber" placeholder="填写本人的身份证号"></van-field>
    <van-cell title="证件照片" class="zjzp-cell">
      <van-uploader :after-read="frontImg" accept="image/gif, image/jpeg, image/png">
        <div class="zjzp-cell_box" v-if="safetyInfo.IDfront == ''">
          <img class="zjzp-cell_icon" src="static/images/icon/add_icon.png" alt="">
          <div class="zjzp-cell_text">身份证正面照片</div>
        </div>
        <img class="zjzp-cell_img" v-else :src="safetyInfo.IDfront" alt="">
      </van-uploader>
      <van-uploader :after-read="versoImg" accept="image/gif, image/jpeg, image/png">
        <div @click="updataImg('2')" class="zjzp-cell_box" v-if="safetyInfo.IDverso == ''">
          <img class="zjzp-cell_icon" src="static/images/icon/add_icon.png" alt="">
          <div class="zjzp-cell_text">身份证反面照片</div>
        </div>
        <img class="zjzp-cell_img" v-else :src="safetyInfo.IDverso" alt="">
      </van-uploader>
    </van-cell>
    <div class="mysafety_toast">
      为有限保障您的资金安全，提升订单处理效率，请填 写与您身份证一致的信息，否则不会通过审核。
    </div>
    <div class="submit_buttons">
      <van-button type="primary" block :disabled="isBtnShow" @click="confireBtn">确定</van-button>
    </div>
  </com-page>
</template>

<script>
import { list_mixins } from "@/mixins";
import { verifyObj } from "@/utils/typeUtil";
export default {
  mixins: [list_mixins],
  data() {
    return {
      safetyInfo: {
        realname: '', //真实姓名
        IDnumber: '', //身份证号
        IDfront: '', //身份证正面照
        IDverso: '', //身份证反面照
      },
      isBtnShow: true, //确认按钮显示状态
    };
  },
  watch: {
    safetyInfo: {
      handler: function (val, old) {
        if (verifyObj(val)) {
          this.isBtnShow = false
        } else {
          this.isBtnShow = true
        }
      },
      deep: true
    }
  },
  created() {
    
  },
  methods: {
    frontImg (key) { //证件照片（正面）点击事件
      this.safetyInfo.IDfront = key.content
    },
    versoImg (key) { //证件照片（反面）点击事件
      this.safetyInfo.IDverso = key.content
    },
    confireBtn () { //确认提交按钮事件
      let self = this;
      console.log("确认提交按钮事件")
    }
  }
};
</script>
<style lang="scss">
.mysafety{
  .zjzp-cell{
    &_box{
      width: 252px;
      height: 135px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      border: 2px dashed #CACACA;
      margin-bottom: 10px;
      box-sizing: border-box;
    }
    &_icon{
      width: 38px;
      height: 38px;
      margin-bottom: 8px;
    }
    &_text{
      color: #A0A0A0;
      font-size: 15px;
    }
    &_img{
      width: 252px;
      height: 135px;
      border: 2px dashed #CACACA;
      margin-bottom: 10px;
      box-sizing: border-box;
    }
  }
  &_toast{
    width: 346px;
    color: #A0A0A0;
    font-size: 15px;
    // padding: 8px 0.3rem;
    margin: 8px auto;
  }
}
</style>