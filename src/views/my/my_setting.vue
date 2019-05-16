<template>
  <com-page class="mysetting">
    <com-header title="修改密码" is-back slot="header"></com-header>
    <van-field label="旧密码" v-model="editPsd.oldpsd" clearable placeholder="输入旧密码"></van-field>
    <van-field label="新密码" v-model="editPsd.psd" clearable placeholder="输入新密码"></van-field>
    <van-field label="确认新密码" v-model="editPsd.confpsd" clearable placeholder="输入确认新密码"></van-field>
    <div class="submit_buttons">
      <van-button type="primary" block :disabled="isBtnShow" @click="confireBtn">确定</van-button>
    </div>
  </com-page>
</template>

<script>
export default {
  data() {
    return {
      editPsd: {
        oldpsd: '', //旧密码
        psd: '', //新密码
        confpsd: '', //确认新密码
      },
      isBtnShow: true
    };
  },
  created() {
    
  },
  watch: {
    editPsd: {
      handler: function (val, old) {
        if (val.oldpsd == '' || val.psd == '' || val.confpsd == '') {
          this.isBtnShow = true;
        } else {
          this.isBtnShow = false;
        }
      },
      deep: true
    }
  },
  methods: {
    confireBtn () { //确定提交

    },
  }
};
</script>
<style lang="scss">
.mysetting{
  .submit_buttons{
    margin-top: 63px;
  }
}
</style>