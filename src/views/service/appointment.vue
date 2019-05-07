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
      type="tel"
      v-model="formData.phone"
      required
      clearable
      label="手机号"
      :error-message="errorMsg.phone"
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
    
    <van-popup position="bottom" v-model="show">
      <van-picker
        :default-index="0"
        show-toolbar
        :columns="columns"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </van-popup>

  </com-page>
</template>

<script>
import { checkStr, paramsValidate } from '@/utils/typeUtil'
import validator from "@/utils/validator.js"
import { cardAppointment } from '@/service/oilcard.js'
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
      errorMsg: {
        phone: ''
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
    this.validator = validator(this.rules, this.formData)
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
      this.validate(error => {
				if (!error) {
					this.register()
				}
      }, this.formData)
    },
    validate(callback, data) {
      this.validator.validate((errors, fields) => {
        this.resetField();
        if (errors) {
          fields.forEach(item => {
            this.errorMsg[item.field] = item.message;
          });
        }
        callback && callback(errors, fields);
      }, data);
    },
    oneValidate (data) {
      this.validator.validate((errors, fields) => {
        this.resetField();
        if (errors) {
          fields.forEach(item => {
            this.errorMsg[item.field] = item.message;
          });
        }
      }, data);
    },
    resetField(attrs) {
      attrs = !attrs
        ? Object.keys(this.errorMsg)
        : Array.isArray(attrs)
        ? attrs
        : [attrs];
      attrs.forEach(attr => {
        this.errorMsg[attr] = "";
      });
    },
    async cardAppointment () {
      let resData = await cardAppointment()
    }
  }
};
</script>
<style lang="scss">

</style>