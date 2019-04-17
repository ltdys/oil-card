<template>
  <com-page class="loss_report">
    <com-header title="油卡挂失" is-back slot="header"></com-header>
    
    <van-field
      v-model="card"
      type="number"
      required
      clearable
      label="油卡卡号"
      placeholder="输入挂失油卡卡号">
    </van-field>
    <div class="submit_buttons">
      <van-button type="primary" :disabled="isSubmit" @click="submit">立即挂失</van-button>
    </div>
  </com-page>
</template>

<script>
export default {
  data() {
    return {
      card: '',  //挂失油卡卡号
      isSubmit: true
    };
  },

  watch: {
    card: {
      handler: function(val, old) {
        this.isSubmit = !this.card
      }
    },
  },

  created() {
    
  },
  methods: {
    submit () {

    }
  }
};
</script>
<style lang="scss">

</style>