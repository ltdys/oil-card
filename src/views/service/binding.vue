<template>
  <com-page class="binding">
    <com-header title="油卡绑定" is-back slot="header"></com-header>
    
    <van-field
      v-model="formData.cardType"
      required
      clearable
      label="油卡类型">
    </van-field>
    <van-field
      v-model="formData.card"
      required
      clearable
      label="卡号"
      placeholder="输入油卡背面的卡号">
    </van-field>
    <van-field
      v-model="formData.cardholder"
      required
      clearable
      label="持卡人"
      placeholder="输入持卡人姓名">
    </van-field>
    <van-field
      v-model="formData.phone"
      type="tel"
      required
      clearable
      label="手机号"
      :error-message="errorMsg.phone"
      placeholder="输入持卡人手机号">
    </van-field>
    <div class="submit_buttons">
      <van-button type="primary" :disabled="isSubmit" @click="submit">立即绑定</van-button>
    </div>
  </com-page>
</template>

<script>
import { checkStr, paramsValidate } from '@/utils/typeUtil'
import validator from "@/utils/validator.js"
export default {
  data() {
    return {
      formData: {
        cardType: '中国石化',  //油卡类型
        card: '',  //卡号
        cardholder: '',  //持卡人
        phone: ''  //手机号
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
      isSubmit: true,
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
		}
  }
};
</script>
<style lang="scss">

</style>