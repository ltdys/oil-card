import { uUserInfo } from '@/service/oilcard.js'
export const list_mixins = {
  data () {
    return {
      pageIndex:1,
      pageSize:20,
      resultList:[],
      finished:false
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
        mobile: self.userInfo.mobile,
        token: self.userInfo.token
      }
      console.log(self.userInfo)
      let resData = await uUserInfo(param)
      console.log('resData',resData)
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
    }
  }
}