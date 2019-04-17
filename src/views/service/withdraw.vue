<template>
  <com-page class="withdraw">
    <com-header title="申请退卡" is-back slot="header"></com-header>
    
    <van-field
      v-model="formData.card"
      required
      clearable
      disabled
      label="油卡卡号">
    </van-field>
    <van-field
      v-model="formData.express"
      required
      clearable
      disabled
      label="选择快递"
      right-icon="arrow"
      @click-right-icon="expressChange">
    </van-field>
    <van-field
      v-model="formData.expressNo"
      required
      clearable
      label="快递单号"
      placeholder="输入快递单号">
    </van-field>
    <van-field
      v-model="formData.reason"
      type="textarea"
      required
      clearable
      label="退卡原因"
      placeholder="输入退卡的原因">
    </van-field>
    <div class="submit_buttons">
      <van-button type="primary" :disabled="isSubmit" @click="submit">申请退卡</van-button>
    </div>

    <van-actionsheet
      v-model="show"
      :actions="actions"
      @select="onSelect"
    />
  </com-page>
</template>

<script>
import { checkStr, paramsValidate } from '@/utils/typeUtil'
import validator from "@/utils/validator.js"
export default {
  data() {
    return {
      validator: undefined,  //验证对象
      formData: {
        card: '123456789',  //油卡卡号
        express: '顺丰', //快递
        expressNo: '',  //快递单号
        reason: '',  //退卡原因
      },
      show: false,
      isSubmit: true,
      actions: [{
        name: '选择快递'
      }, {
        name: '顺丰'
      }, {
        name: '中通'
      }, {
        name: '申通'
      }, {
        name: '韵达'
      }, {
        name: '圆通'
      }, {
        name: 'EMS'
      }]
    };
  },

  watch: {
    formData: {
      handler: function (val, old) {
        this.isSubmit = !paramsValidate(this.formData)
      },
      deep: true
    }
  },

  created() {
   
  },
  methods: {
    expressChange () {
      this.show = true
    },
    onSelect (item) {
      this.formData.express = item.name
      this.show = false
    },
    submit () {
      // this.validator.validate(error => {
			// 	if (!error) {
      //     debugger
			// 	}
      // }, this.formData)
    }
  }
};
</script>
<style lang="scss">

</style>