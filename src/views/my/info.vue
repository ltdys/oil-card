<template>
  <com-page class="myinfo">
    <com-header title="个人信息" is-back slot="header"></com-header>
    <van-uploader :after-read="onRead" accept="image/gif, image/jpeg, image/png">
			<van-cell title="头像" is-link class="zl-cell">
				<img class="myinfo__avatar" :src="userInfo.img | vUserImg" onerror="onerror=null;this.src='static/images/icon/user_defu.png'"/>
			</van-cell>
		</van-uploader>
    <van-cell title="昵称" :value="userInfo.userName" is-link @click.native="$router.push('/my/edit_name')"></van-cell>
    <van-cell title="手机号" :value="userInfo.phone | vPhone" is-link @click.native="$router.push('/my/edit_phone')"></van-cell>
  </com-page>
</template>

<script>
import { list_mixins } from "@/mixins";
import { uploadAppPic } from '@/service/oilcard.js'
export default {
  mixins: [list_mixins],
  data() {
    return {
      
    };
  },
  created() {
    
  },
  methods: {
    onRead (v) { //图片切换
      let self = this;
      let form = new FormData();
      form.append("file", v.file);
      self.userInfo.img = v.content
      self.$axios({
        method: 'post',
        url: '/FileUpload/uploadAppPic.do',
        data: form
      })
      .then(res => {
        console.log('成功返回',res)
      })
      .catch(err => {
        console.log('失败返回',err)
      });
    }
  }
};
</script>
<style lang="scss">
.myinfo{
  &__avatar{
    display: inline-block;
    border-radius: 50%;
    height: 50px;
		width: 50px;
		vertical-align: middle;
  }
  .zl-cell{
		display: flex;
    align-items: center;
    padding: 11px 15px;
    height: 73px;
    box-sizing: border-box;
	}
}
</style>

