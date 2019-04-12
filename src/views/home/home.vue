<template>
  <div class="page-home">
    <van-swipe :autoplay="3000" indicator-color="white" >
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img :src="image" class="w-100 h-150 block"/>
        </van-swipe-item>
    </van-swipe>
    <div class="page-home-middle">
      <home-message></home-message>
    </div>
  </div>
</template>

<script>
  import homeMessage from './components/message'
  export default {
    components: {
      homeMessage
    },

    data () {
      return {
        images: [
          'static/images/banner.jpg',
          'static/images/banner1.jpg'
        ]
      }
    }
  }
</script>
