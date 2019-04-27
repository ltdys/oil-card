<template>
  <com-page class="loss_report">
    <com-header title="油卡挂失" is-back slot="header"></com-header>
    
    <van-field
      v-model="card"
      required
      clearable
      label="油卡卡号"
      placeholder="输入挂失油卡卡号">
    </van-field>
    <div class="submit_buttons">
      <van-button type="primary" :disabled="isSubmit" @click="submit">立即挂失</van-button>
    </div>
  </com-page>
</template>

<script>
import { list_mixins } from "@/mixins";
import { lossCard } from '@/service/oilcard.js'
export default {
  mixins: [list_mixins],
  data() {
    return {
      card: '',  //挂失油卡卡号
      isSubmit: true
    };
  },

  watch: {
    card: {
      handler: function(val, old) {
        this.isSubmit = !this.card
      }
    },
  },

  created() {
    
  },
  methods: {
    async submit () { //油卡挂失接口
      let self = this;
      let param = {
        mobile: self.userInfo.mobile,
        cardNo: self.card
      }
      let resData = await lossCard(param)
      console.log('resData',resData)
      if (resData.status === 200 && resData.data.code === 1) {
        Toast.success({
          message: resData.data.msg,
          duration: 1500
        })
      } else {
        Toast({
          message: resData.data.msg,
          duration: 1500
        })
      }
    }
  }
};
</script>
<style lang="scss">

</style>