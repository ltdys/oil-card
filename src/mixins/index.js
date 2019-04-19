export const list_mixins = {
  data () {
    return {
      userInfo: {
        img: 'static/images/icon/gril3.png',
        userName: '修身',
        phone: '18814479161'
      },
      pageIndex:1,
      pageSize:20,
      resultList:[],
      finished:false
    }
  },

  methods: {
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