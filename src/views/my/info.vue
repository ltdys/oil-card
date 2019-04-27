<template>
  <com-page class="myinfo">
    <com-header title="个人信息" is-back slot="header"></com-header>
    <van-uploader :after-read="onRead" accept="image/gif, image/jpeg, image/png" :max-size=5242880 @oversize="overSize">
			<van-cell title="头像" is-link class="zl-cell">
				<img class="myinfo__avatar" v-lazy="userInfo.headImage" onerror="onerror=null;this.src='static/images/icon/user_defu.png'"/>
			</van-cell>
		</van-uploader>
    <van-cell title="昵称" :value="userInfo.nickName" is-link @click.native="$router.push('/my/edit_name')"></van-cell>
    <van-cell title="手机号" :value="userInfo.mobile | vPhone" is-link @click.native="$router.push('/my/edit_phone')"></van-cell>
    <van-loading color="white" v-show="isLoading"/>
  </com-page>
</template>

<script>
import { Toast } from 'vant';
import { list_mixins } from "@/mixins";
import { uploadAppPic, uUpdateUserInfo } from '@/service/oilcard.js'
import { imgChangeForm } from '@/utils/oilUtil.js'
export default {
  mixins: [list_mixins],
  data() {
    return {
      headerBackImg: '', //头像返回地址
      // isLoading: false
    };
  },
  created() {

  },
  updated () {
    
  },
  methods: {
    overSize (v) { //超过大小提醒
      if (v.file.size > 5 * 1024 * 1024) {
        Toast({
          message: '图片暂时不能超过5M',
          duration: 1500
        })
      }
    },
    onRead (file) { //图片切换
      let self = this;
      if(/\/(?:jpeg|png)/i.test(file.file.type) && file.file.size > 102400) {
        let canvas =  document.createElement('canvas')  
        let context = canvas.getContext('2d') 
        let img = new Image()
        img.src = file.content
        img.onload = () => {
          canvas.width = 300
          canvas.height = 300
          context.drawImage(img, 0, 0, 300, 300)
          file.content = canvas.toDataURL(file.file.type, 0.92) 
          let form = imgChangeForm(file.content)
          self.uploadPost(form)
        }                       
      }else{
        let form = imgChangeForm(file.content)
        self.uploadPost(form)
      }
    },
    uploadPost (form) {
      let self = this;
      Toast.loading({
        mask: true,
        message: '上传中...',
        duration: 1000000
      });
      // let form = new FormData();
      // form.append("file", v.file);
      self.$axios({
        method: 'post',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        url: '/FileUpload/uploadAppPic.do',
        data: form
      })
      .then(res => {
        console.log('图片上传成功返回',res)
        // let headImage = self.HEAD_IMAGE_PR + res.data
        let headImage = res.data
        self.amendUserInfo(headImage)
      })
      .catch(err => {
        console.log('失败返回',err)
      });
    },
    async amendUserInfo (img) {
      let self = this;
      let param = {
        id: self.userInfo.id,
        headImage: img,
      }
      let resData = await uUpdateUserInfo(param)
      console.log('resData',resData)
      if (resData.status === 200 && resData.data.code === 1) {
        Toast.success({
          message: resData.data.msg,
          duration: 1500
        })
        self.getUserInfo()
      } else {
        Toast({
          message: resData.data.msg,
          duration: 1500
        })
      }
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

