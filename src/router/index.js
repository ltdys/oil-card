import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const routes = [{
    path: '/',
    component: () => import('@/views/index/index'),
    children: [
      {
        path: '',
        component: () => import('@/views/home/home.vue')
      },
      {
        path: '/coupon',
        component: () => import('@/views/coupon/coupon.vue')
      },
      {
        path: '/my',
        component: () => import('@/views/my/my.vue')
      },
    ]
  },
  {
    path: '/my/info', //个人信息
    component: () => import('@/views/my/info.vue')
  },
  {
    path: '/my/safety', //安全认证
    component: () => import('@/views/my/safety.vue')
  },
  {
    path: '/my/oil_card', //我的油卡wallet
    component: () => import('@/views/my/oil_card.vue')
  },
  {
    path: '/my/oil_detail', //我的油卡充值详情
    component: () => import('@/views/my/oil/oil_detail.vue')
  },
  {
    path: '/my/oil_add', //我的油卡新增
    component: () => import('@/views/my/oil/oil_add.vue')
  },
  {
    path: '/my/oil_delete', //我的油卡解除绑定
    component: () => import('@/views/my/oil/oil_delete.vue')
  },
  {
    path: '/my/record', //油卡充值
    component: () => import('@/views/my/record.vue')
  },
  {
    path: '/my/my_order', //我的订单rq_code
    component: () => import('@/views/my/my_order.vue')
  },
  {
    path: '/my/yh_coupon', //我的优惠券follow_fans
    component: () => import('@/views/my/yh_coupon.vue')
  },
  {
    path: '/my/my_setting', //设置yh_coupon
    component: () => import('@/views/my/my_setting.vue')
  },
  {
    path: '/my/service', //客服
    component: () => import('@/views/my/service.vue')
  },
  {
    path: '/my/shopping', //商城
    component: () => import('@/views/my/shopping.vue')
  },
  {
    path: '/my/edit_name', //修改昵称
    component: () => import('@/views/my/name/edit_name.vue')
  },
  {
    path: '/my/edit_phone', //修改手机号
    component: () => import('@/views/my/phone/edit_phone.vue')
  },
  {
    path: '/service/appointment', //预约办卡
    component: () => import('@/views/service/appointment.vue')
  },
  {
    path: '/service/binding', //油卡绑定
    component: () => import('@/views/service/binding.vue')
  },
  {
    path: '/service/binding', //油卡绑定
    component: () => import('@/views/service/binding.vue')
  },
  {
    path: '/service/recharge', //油卡充值
    component: () => import('@/views/service/recharge.vue')
  },
  {
    path: '/service/recharge_addcard', //油卡充值
    component: () => import('@/views/service/recharge_addcard.vue')
  },
  {
    path: '/service/loss_report', //油卡挂失
    component: () => import('@/views/service/loss_report.vue')
  },
  {
    path: '/service/withdraw', //申请退卡
    component: () => import('@/views/service/withdraw.vue')
  },
  {
    path: '/service/problem', //常见问题
    component: () => import('@/views/service/problem.vue')
  },
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0,
    x: 0
  }),
  routes: routes
})
