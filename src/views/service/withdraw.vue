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

    <van-picker
      v-show="show"
      :default-index="0"
      show-toolbar
      :columns="columns"
      @cancel="onCancel"
      @confirm="onConfirm"
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
      columns: ['顺丰', '中通', '申通', '韵达', '圆通', 'EMS']
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
    onConfirm(value, index) {
      this.formData.express = value
      this.show = false
    },
    onCancel () {
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