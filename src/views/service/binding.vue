<template>
  <com-page class="binding">
    <com-header :title="title" is-back slot="header"></com-header>
    
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
      v-model="formData.cardNoAgain"
      required
      clearable
      label="确认卡号"
      :error-message="errorMsg.cardNoAgain"
      placeholder="两次输入油卡卡号">
    </van-field>
    <van-field
      v-model="formData.idName"
      required
      clearable
      label="持卡人"
      placeholder="输入持卡人姓名">
    </van-field>
    <van-field
      v-model="formData.apntMobile"
      type="tel"
      required
      clearable
      label="预约人手机号"
      :error-message="errorMsg.apntMobile"
      placeholder="输入预约人手机号">
    </van-field>
    <van-field
      v-model="formData.mobile"
      type="tel"
      required
      clearable
      label="持卡人手机号"
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
      title: '油卡绑定',
      formData: {
        cardType: '中国石化',  //油卡类型
        cardNo: '',  //卡号
        cardNoAgain: '',
        idName: '',  //持卡人
        mobile: '',  //持卡人手机号
        apntMobile: ''  //预约人手机号
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
        apntMobile: [
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
        cardNoAgain: [
          {
            validator: (rule, value, callback) => {
              if (value !== this.formData.cardNo) {
                callback("两次卡号输入不一致")
              } else {
                callback()
              }
            }
          }
        ]
      },
      errorMsg: {
        mobile: '',
        apntMobile: '',
        cardNoAgain: ''
      },
      isSubmit: true,
      validator: undefined,  //验证对象
    };
  },

  beforeRouteEnter (to, from, next) {
    next(vm => {
      // 通过 `vm` 访问组件实例,将值传入oldUrl
      vm.title = from.fullPath === '/' ? '油卡绑定' : '添加油卡'
    })
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
    this.formData.idName = this.$store.getters.getUserInfo.idName
    this.formData.mobile = this.$store.getters.getUserInfo.mobile
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
        apntMobile: this.formData.apntMobile,
        cardType: this.CARDTYPE
      }
      let resData = await bindCard(param)
      if (resData.status === 200 && resData.data.code === 1) {
        Toast.success(resData.data.msg)
        this.$router.back()
      } else {
        Toast(resData.data.msg)
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
    },
  }
};
</script>
<style lang="scss">

</style>