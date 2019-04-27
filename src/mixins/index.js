import { Toast } from 'vant';
import { rules, errorMsg } from '@/utils/dataUtil'
import { uUserInfo } from '@/service/oilcard.js'
export const list_mixins = {
  data () {
    return {
      validator: undefined,  //验证对象
      pageIndex:1,
      pageSize:20,
      resultList:[],
      finished:false,
      rules: rules,
      errorMsg: errorMsg,
      isLoading: true,
    }
  },

  computed:{
    userInfo: {
      cache: false,
      get: function () {
        return this.$store.getters.getUserInfo
      }
    },
  },

  methods: {
    async getUserInfo () { //获取个人用户信息
      let self = this;
      let param = {
        mobile: self.userInfo.mobile
      }
      let resData = await uUserInfo(param)
      console.log('resData',resData)
      if (resData.status === 200 && resData.data.code === 1) {
        let userInfo = resData.data.data;
        userInfo.headImage = userInfo.headImage ? (self.HEAD_IMAGE_PR + userInfo.headImage) : 'static/images/icon/user_defu.png'
        userInfo.idCardImage = userInfo.idCardImage ? (self.HEAD_IMAGE_PR + userInfo.idCardImage) : ''
        userInfo.idCardBackImage = userInfo.idCardBackImage ? (self.HEAD_IMAGE_PR + userInfo.idCardBackImage) : ''

        console.log(self.perfixImg)
        console.log(userInfo.headImage)
        self.$store.dispatch('setUserInfo', userInfo)
      } else {
        Toast({
          message: resData.data.msg,
          duration: 1500
        })
      }
    },
    loadTop() {
      return new Promise(r=>{
        setTimeout(()=>r(),500)
      }).then(()=>{
        return this.init_data();
      }).then((res)=>{
        this.$refs.loadmore && this.$refs.loadmore.onTopLoaded();
        return res
      })
    },
    loadBottom() {
      if (this.finished){
        return
      }
      return this.list_data().then((res)=>{
        this.resultList = this.resultList.concat(res)
        this.$refs.loadmore && this.$refs.loadmore.onBottomLoaded();
        return res
      })
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
}