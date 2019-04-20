<template>
  <com-page class="my">
    <com-header :title="currentOil | vstatusTit" is-back slot="header"></com-header>
    
  </com-page>
</template>

<script>
export default {
  data() {
    return {
      
    };
  },
  computed: {
    currentOil: {
      get: function () {
        return this.$store.getters.getCurrentOil
      }
    }
  },
  created() {
    
  },
  methods: {

  },
  filters: {
    vstatusTit: (value) => {
      let val = ''
      if (value) { val = '' }
      if (value == 0) {
        val = '充值详情'
      } else {
        val = '消费详情'
      }
      return val
    }
  }
};
</script>
<style lang="scss">

</style>