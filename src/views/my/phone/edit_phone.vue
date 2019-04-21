<template>
  <com-page class="my-edit-phone">
    <com-header title="手机号" is-back slot="header"></com-header>
    <van-cell class="zjzp-cell former-phone" title="原手机号" :value="userInfo.phone"></van-cell>
    <van-field label="身份证号" v-model="editPhone.IDCord" clearable placeholder="输入持卡人身份证号"></van-field>
    <van-field label="新手机号" v-model="editPhone.newPhone" clearable placeholder="输入新手机号"></van-field>
    <van-field
      v-model="editPhone.verCode"
      center
      clearable
      label="验证码"
      placeholder="输入手机验证码"
    >
      <!-- <van-button slot="button" size="small" type="primary">发送验证码</van-button> -->
      <div class="send-code" slot="button">{{ codeText }}</div>
    </van-field>
    <div class="submit_buttons">
      <van-button type="primary" block :disabled="isBtnShow" @click="confireBtn">确定</van-button>
    </div>
  </com-page>
</template>

<script>
import { list_mixins } from "@/mixins";
export default {
  mixins: [list_mixins],
  data() {
    return {
      editPhone: {
        IDCord: '', //身份证号
        newPhone: '', //新手机号
        verCode: '', //验证码
      },
      codeText: '发送验证码', //发送验证码
      isBtnShow: true
    };
  },
  created() {
    
  },
  watch: {
    editPhone: {
      handler: function (val, old) {
        if (val.IDCord == '' || val.newPhone == '' || val.verCode == '') {
          this.isBtnShow = true;
        } else {
          this.isBtnShow = false;
        }
      },
      deep: true
    }
  },
  methods: {
    confireBtn () { //确定

    },
  }
};
</script>
<style lang="scss">
.my-edit-phone{
  .former-phone{
    .van-cell__value{
      color: #323233;
    }
  }
  .van-field__button{
    padding-left: 30px;
    .send-code{
      color: #323233;
    }
  }
  .submit_buttons{
    margin-top: 63px;
  }
}
</style>