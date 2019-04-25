<template>
  <com-page class="addcard">
    <com-header title="添加油卡" is-back slot="header"></com-header>
    
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
      label="油卡卡号"
      placeholder="输入油卡卡号">
    </van-field>
    <van-field
      v-model="formData.cardAgain"
      required
      clearable
      label="确认卡号"
      :error-message="errorMsg.cardAgain"
      placeholder="再次输入油卡卡号">
    </van-field>
    <van-field
      v-model="formData.name"
      required
      clearable
      label="姓名"
      placeholder="输入持卡人姓名">
    </van-field>
    <van-field
      type="tel"
      v-model="formData.phone"
      required
      clearable
      label="手机号"
      :error-message="errorMsg.phone"
      placeholder="输入持卡人手机号">
    </van-field>
    <div class="submit_buttons">
      <van-button type="primary" :disabled="isSubmit" @click="submit">添加</van-button>
    </div>
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
        card: '',  //卡号
        cardAgain: '',  //确认卡号
        name: '',  //持卡人姓名
        phone: ''  //持卡人手机号
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
        cardAgain: [
          {
            validator: (rule, value, callback) => {
              if (value !== this.formData.card) {
                callback("两次卡号输入不一致")
              } else {
                callback()
              }
            }
          }
        ]
      },
      errorMsg: {
        phone: '',
        cardAgain: ''
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