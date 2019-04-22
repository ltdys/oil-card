<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',

  data () {
    return {
      transitionName: 'van-slide-right'
    }
  },

  watch: {
    '$route': {
      handler: function (val, oldval) {
        this.transitionName = val.meta.index > oldval.meta.index ? 'van-slide-right' : 'van-slide-left'
      }
    }
  }
}
</script>

<style>
#app {
  height: 100%;
}
</style>
