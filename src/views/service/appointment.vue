<template>
  <com-page class="appointment">
    <com-header title="预约办卡" is-back slot="header"></com-header>
    
    <van-field
      v-model="formData.cardType"
      required
      clearable
      label="油卡类型">
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
      v-model="formData.addressee"
      required
      clearable
      label="收件人"
      placeholder="输入收件人姓名">
    </van-field>
    <van-field
      type="number"
      v-model="formData.phone"
      required
      clearable
      label="手机号"
      placeholder="输入收件人手机号">
    </van-field>
    <van-field
      v-model="formData.address"
      required
      clearable
      label="收货地址"
      placeholder="输入收货地址">
    </van-field>
    <div class="submit_buttons">
      <van-button type="primary" :disabled="isSubmit" @click="submit">立即申请</van-button>
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
        cardType: '中国石化',  //油卡类型
        express: '顺丰', //快递
        addressee: '',  //收件人
        phone: '',  //手机号
        address: '',  //收货地址
      },
      //校验
      rules: {
        phone: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback("请输入手机号码");
              } else if (checkStr(value, 'phone')) {
                callback();
              } else {
                callback("请输入正确的手机号码");
              }
            }
          }
        ],
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