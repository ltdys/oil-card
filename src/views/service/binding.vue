<template>
  <com-page class="binding">
    <com-header title="油卡绑定" is-back slot="header"></com-header>
    
    <van-field
      v-model="formData.cardType"
      required
      clearable
      disabled
      label="油卡类型">
    </van-field>
    <van-field
      v-model="formData.cardNo"
      required
      clearable
      label="卡号"
      placeholder="输入油卡背面的卡号">
    </van-field>
    <van-field
      v-model="formData.idName"
      required
      clearable
      label="持卡人"
      placeholder="输入持卡人姓名">
    </van-field>
    <van-field
      v-model="formData.mobile"
      type="tel"
      required
      clearable
      label="手机号"
      :error-message="errorMsg.mobile"
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
import { bindCard } from '@/service/oilcard.js'
import { Toast } from 'vant'
export default {
  data() {
    return {
      formData: {
        cardType: '中国石化',  //油卡类型
        cardNo: '',  //卡号
        idName: '',  //持卡人
        mobile: ''  //手机号
      },
      //校验
      rules: {
        mobile: [
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
        mobile: ''
      },
      isSubmit: true,
      validator: undefined,  //验证对象
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
					this.bindCard()
				}
      }, this.formData)
    },
    async bindCard () {
      let param = {
        mobile: this.formData.mobile,
        cardNo: this.formData.cardNo,
        idName: this.formData.idName,
        cardType: this.CARDTYPE
      }
      let resData = await bindCard(param)
      if (resData.status === 200 && resData.data.code === 1) {
        Toast.success('油卡绑定成功')
      } else {
        Toast.fail(resData.data.msg)
      }
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