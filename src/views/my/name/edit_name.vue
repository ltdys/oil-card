<template>
  <com-page class="my">
    <com-header title="昵称" is-back slot="header"></com-header>
    <van-field v-model="niceName" placeholder="请输入用户名"></van-field>
  </com-page>
</template>

<script>
export default {
  data() {
    return {
      niceName: ''
    };
  },
  created() {
    
  },
  methods: {
  }
};
</script>
<style lang="scss">

</style>