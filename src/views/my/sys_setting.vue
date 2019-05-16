<template>
  <com-page class="sys_setting">
    <com-header title="设置" is-back slot="header"></com-header>
    <van-cell title="忘记密码" is-link to="/my/my_setting"></van-cell>
    <van-cell title="退出登录" is-link @click="uLogout"></van-cell>
  </com-page>
</template>

<script>
import { clearStorage } from '@/utils/storageUtil'
import { uLogout } from '@/service/oilcard'
export default {
  data () {
    return {

    }
  },

  methods: {
    async uLogout() {
      let params = {
        mobile: this.$store.getters.getUserInfo.mobile
      }
      let resData = await uLogout(params)
      if (resData.status === 200 && resData.data.code === 1) {
        this.$store.dispatch('setClearAll', '')
        clearStorage()
        this.$router.push('/login')
      }
    }
  }
}
</script>

