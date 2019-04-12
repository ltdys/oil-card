<template>
  <div>
    <div class="message-wall-bulletin">
      <div class="message-wall-title">
        <van-icon name="volume"/>
      </div>
      <div class="message_wallbox">
        <ul class="message_wallbox__list" :class="{ wallbox_top: animate }">
          <li v-for="(item, index) in messageList" :key="index">
            <span>{{item.title}}</span>
          </li>
        </ul>
      </div>
      <div class="message-wall-time">
        <span>{{messageList[0].time}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      timer: null,
      animate: false,
       messageList: [
        {
         title: '【136xxxx9216】购买了500加油套餐',
         time: '3小时前' 
        }, {
          title: '【158xxx3333】充值了5000油卡',
          time: '2小时前' 
        }, {
          title: '【139xxxx5248】购买了1500加油套餐',
          time: '5分钟前'
        }, {
          title: '【135xxxx6852】 充值了200油卡',
          time: '1天前'
        }
      ],
    }
  },

  created () {
    this.timer = setInterval(this.scroll, 3000)
  },

  methods: {
    scroll () {
      let self = this
      self.animate = true
      setTimeout(() => {
        if (self.messageList != null && self.messageList.length != 0) {
          self.messageList.push(self.messageList[0])
          self.messageList.shift()
          self.animate = false
        }
      }, 500)
    }
  },

  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="scss">
  $messageHeight: 40px;
  .message {
    &-wall-bulletin {
      width: 100%;
      height: 60px;
      padding: 15px;
      display: flex;
      background: #FFF;
      align-items: center;
      box-sizing: border-box;
    }
    &-wall-title {
      display: flex;
    }
    &-wall-time {
      font-size: 14px;
      color: #888888;
    }
    &_wallbox {
      display: block;
      position: relative;
      width: 80%;
      height: $messageHeight;
      overflow: hidden;
      &__list {
        display: block;
        position: absolute;  
        width: 1100px;
        top: 0;
        left: 0;
        margin-top: 0;
        li {
          height: $messageHeight;
          display: flex;
          flex: 1;
          align-items: center;
          justify-content: flex-start;
          font-size: 14px;
          color: #333333;
          box-sizing: border-box;
          span {
            overflow: hidden;
            word-wrap: break-word;
          }
        }
      }
    }
  }
  .wallbox_top {
    transition: all 0.5s;
    margin-top: -$messageHeight;
  }
</style>


