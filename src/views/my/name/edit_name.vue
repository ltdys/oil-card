<template>
  <com-page class="my-edit-name">
    <com-header title="昵称" is-back slot="header"></com-header>
    <van-field v-model="niceName" clearable placeholder="请输入用户昵称"></van-field>
    <div class="submit_buttons">
      <van-button type="primary" block :disabled="isBtnShow" @click="confireBtn">确定</van-button>
    </div>
  </com-page>
</template>

<script>
import { list_mixins } from "@/mixins";
import { uUpdateUserInfo } from '@/service/oilcard.js'
export default {
  mixins: [list_mixins],
  data() {
    return {
      niceName: '',
      isBtnShow: true
    };
  },
  created() {
    let self = this;
    self.niceName = self.userInfo.userName
  },
  watch: {
    niceName: {
      handler: function (val, old) {
        if (val == '' || val == this.userInfo.userName) {
          this.isBtnShow = true
        } else {
          this.isBtnShow = false
        }
      },
      deep: true
    }
  },
  methods: {
    async confireBtn () { //确定修改用户昵称
      let self = this;
      let param = {
        id: self.userInfo.id,
        nickName: self.niceName,
        token: self.userInfo.token
      }

    }
  }
};
</script>
<style lang="scss">
.my-edit-name{
  .submit_buttons{
    margin-top: 63px;
  }
}
</style>