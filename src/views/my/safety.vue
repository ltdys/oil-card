<template>
  <com-page class="mysafety">
    <com-header title="实名认证" is-back slot="header"></com-header>
    <van-field
      label="真实姓名"
      v-model="safetyInfo.realname"
      required
      clearable
      placeholder="填写本人的真实姓名"
      :error-message="errorMsg.realname">
    </van-field>
    <van-field
      label="身份证号"
      v-model="safetyInfo.IDCord"
      required
      clearable
      placeholder="填写本人的身份证号"
      :error-message="errorMsg.IDCord">
    </van-field>
    <van-cell title="证件照片" class="zjzp-cell">
      <van-uploader :after-read="frontImg" accept="image/gif, image/jpeg, image/png">
        <div class="zjzp-cell_box" v-if="safetyInfo.IDfront == ''">
          <!-- <img class="zjzp-cell_icon" src="static/images/icon/add_icon.png" alt=""> -->
          <van-icon class="zjzp-cell_icon" size="38px" name="plus" />
          <div class="zjzp-cell_text">身份证正面照片</div>
        </div>
        <img class="zjzp-cell_img" v-else :src="safetyInfo.IDfront | vAddPerfix" alt="">
      </van-uploader>
      <van-uploader :after-read="versoImg" accept="image/gif, image/jpeg, image/png">
        <div @click="updataImg('2')" class="zjzp-cell_box" v-if="safetyInfo.IDverso == ''">
          <!-- <img class="zjzp-cell_icon" src="static/images/icon/add_icon.png" alt=""> -->
          <van-icon class="zjzp-cell_icon" size="38px" name="plus" />
          <div class="zjzp-cell_text">身份证反面照片</div>
        </div>
        <img class="zjzp-cell_img" v-else :src="safetyInfo.IDverso | vAddPerfix" alt="">
      </van-uploader>
    </van-cell>
    <div class="mysafety_toast">
      为有限保障您的资金安全，提升订单处理效率，请填 写与您身份证一致的信息，否则不会通过审核。
    </div>
    <div class="submit_buttons">
      <van-button type="primary" block :disabled="isBtnShow" @click="confireBtn">确定</van-button>
    </div>
  </com-page>
</template>

<script>
import { Toast } from 'vant';
import { list_mixins } from "@/mixins";
import validator from "@/utils/validator.js"
import { verifyObj, paramsValidate } from "@/utils/typeUtil";
import { uploadAppPic, uUpdateUserInfo } from '@/service/oilcard.js'
import { imgChangeForm } from '@/utils/oilUtil.js'
export default {
  mixins: [list_mixins],
  data() {
    return {
      safetyInfo: {
        realname: '', //真实姓名
        IDCord: '', //身份证号
        IDfront: '', //身份证正面照
        IDverso: '', //身份证反面照
      },
      isBtnShow: true, //确认按钮显示状态
    };
  },
  watch: {
    safetyInfo: {
      handler: function (val, old) {
        // this.isBtnShow = !paramsValidate(val)
        console.log( this.verifyChange())
        if (verifyObj(val) && this.verifyChange()) {
          this.isBtnShow = false
        } else {
          this.isBtnShow = true
        }
      },
      deep: true
    }
  },
  created() {
    this.safetyInfo.realname = this.userInfo.idName || ''
    this.safetyInfo.IDCord = this.userInfo.idCard || ''
    this.safetyInfo.IDfront = this.userInfo.idCardImage || ''
    this.safetyInfo.IDverso = this.userInfo.idCardBackImage || ''
    this.validator = validator(this.rules, this.safetyInfo)
  },
  updated () {
    Toast.clear();
  },
  methods: {
    frontImg (file) { //证件照片（正面）点击事件
      // let form = new FormData();
      // form.append("file", key.file);
      // this.upLoadImg(form, '1')
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
          self.upLoadImg(form, '1')
        }                       
      }else{
        let form = imgChangeForm(file.content)
        self.upLoadImg(form, '1')
      }
    },
    versoImg (file) { //证件照片（反面）点击事件
      // let form = new FormData();
      // form.append("file", key.file);
      // this.upLoadImg(form, '2')
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
          self.upLoadImg(form, '2')
        }                       
      }else{
        let form = imgChangeForm(file.content)
        self.upLoadImg(form, '2')
      }
    },
    confireBtn () { //确认提交按钮事件
      let self = this;
      self.validate(error => {
				if (!error) {
					self.updataSafety()
				}
      }, self.safetyInfo)
    },
    async updataSafety () { //身份验证接口联调
      let self = this;
      let param = {
        id: self.userInfo.id,
        idName: self.safetyInfo.realname,
        idCard: self.safetyInfo.IDCord,
        idCardImage: self.safetyInfo.IDfront,
        idCardBackImage: self.safetyInfo.IDverso
      }
      let resData = await uUpdateUserInfo(param)
      console.log('resData',resData)
      if (resData.status === 200 && resData.data.code === 1) {
        Toast({
          message: '实名认证成功！',
          duration: 1500
        })
        self.getUserInfo()
        self.$nextTick(()=>{
          self.$router.back()
        })
      } else {
        Toast({
          message: '实名认证失败！',
          duration: 1500
        })
      }
    },
    upLoadImg (form, key) { //上传身份证照联调
      let self = this;
       Toast.loading({
        mask: true,
        message: '上传中...',
        duration: 1000000
      });
      self.$axios({
        method: 'post',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        url: '/FileUpload/uploadAppPsn.do',
        data: form
      })
      .then(res => {
        console.log('图片上传成功返回',res)
        // let safetyImage = self.HEAD_IMAGE_PR + res.data
        let safetyImage = res.data
        if (key === '1') {
          self.safetyInfo.IDfront = safetyImage
        } else if (key === '2') {
          self.safetyInfo.IDverso = safetyImage
        }
      })
      .catch(err => {
        console.log('失败返回',err)
      });
    },
    verifyChange () {
      let self = this;
      let old = self.userInfo;
      let now = self.safetyInfo;
      let isShow = false
      if (now.realname == old.idName
        && now.IDCord == old.idCard 
        && now.IDfront == old.idCardImage 
        && now.IDverso == old.idCardBackImage) 
      {
        isShow = false
        } else {
        isShow = true
      }
      return isShow
    },
  }
};
</script>
<style lang="scss">
.mysafety{
  .zjzp-cell{
    &_box{
      width: 252px;
      height: 135px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      border: 2px dashed #CACACA;
      margin-bottom: 10px;
      box-sizing: border-box;
    }
    &_icon{
      width: 38px;
      height: 38px;
      margin-bottom: 8px;
    }
    &_text{
      color: #A0A0A0;
      font-size: 15px;
    }
    &_img{
      width: 252px;
      height: 135px;
      border: 2px dashed #CACACA;
      margin-bottom: 10px;
      box-sizing: border-box;
    }
  }
  &_toast{
    width: 346px;
    color: #A0A0A0;
    font-size: 15px;
    // padding: 8px 0.3rem;
    margin: 8px auto;
  }
}
</style>