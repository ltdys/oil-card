<template>
  <div class="appointment-dialog">
    <div class="text-spacing">
      加油卡仅限主卡进行充值，完成网上充值后，需到所充值油卡当地加油站请工作人员进行激活（圈存）操作，否则充值金额将无法生效。每张油卡押金200，可挂失，终止服务可办理退押金。
    </div>
    <div class="text-spacing">
    【中石化加油卡】充值注意事项：
    </div>
    <div class="text-spacing">
    1、中石化官方每日22：50-00：50为其系统对账时间，此段时间系统收单处理，对账结束，正常处理。
    </div>
    <div class="text-spacing">
    2、所有加油卡主卡都可以在线充值，包含记名主卡、不记名主卡、企业主卡。副卡、挂失卡、卡号不存在无法充值。
    </div>
    <div class="text-spacing">
    3、订单充值成功，一般10分钟即可到账，用户需在加油站完成圈存，方可使用。
    </div>
    <div class="text-spacing">
    4、同一时间同一卡号提交多笔，可能会被石化系统限制，导致充值失败，不同省份超限限制不同。
    </div>
    <div class="text-spacing">
    【中石油加油卡】充值注意事项：
    </div>
    <div class="text-spacing">
    1、暂只支持个人卡记名卡（卡号以90开头），不支持车队卡（卡号以91开头）。到账时间为48小时后。
    </div>
  </div>
</template>

<script>
export default {
  name: "AppointmentDialog"
}
</script>

<style lang="scss">
  .appointment-dialog {
    line-height: 20px;
    color: #222;
    font-size: 14px;
    overflow-y: scroll;
    margin-top: 10px;
    div {
      padding-right: 8px;
      padding-left: 8px;
    }
    .text-spacing {
      text-indent: 15px;
    }
  }
</style>


