<template>
  <div class="page-home">
    <van-swipe :autoplay="3000" indicator-color="white" >
        <van-swipe-item v-for="(item, index) in images" :key="index">
          <img :src="HEAD_IMAGE_PR + item.image" class="w-100 h-150 block"
            @click="jumpDetail(item)"/>
        </van-swipe-item>
    </van-swipe>
    <div class="page-home-middle">
      <home-message></home-message>
      <home-nav></home-nav>
    </div>
  </div>
</template>

<script>
  import homeMessage from './components/message'
  import homeNav from './components/nav'
  import { getHeadPicList } from '@/service/oilcard.js'
  export default {
    components: {
      homeMessage, homeNav
    },

    data () {
      return {
        images: []
      }
    },

    created () {
      this.getHeadPicList()
    },

    methods: {
      async getHeadPicList () {
        let params = {
          page: 1,
          rows: 10
        }
        let resData = await getHeadPicList(params)
        if (resData.status === 200 && resData.data.code === 1) {
          this.images = resData.data.data
          console.log("this.images", this.images)
        }
      },
      jumpDetail (item) {
        if (item.url !== "") {
          window.location.href = item.url;
        }
      }
    }
  }
</script>
