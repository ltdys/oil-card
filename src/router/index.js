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
    path: '/my/wallet', //个人钱包
    component: () => import('@/views/my/wallet.vue')
  },
  {
    path: '/my/record', //充值记录
    component: () => import('@/views/my/record.vue')
  },
  {
    path: '/my/rq_code', //二维码推广
    component: () => import('@/views/my/rq_code.vue')
  },
  {
    path: '/my/follow_fans', //已关注粉丝
    component: () => import('@/views/my/follow_fans.vue')
  },
  {
    path: '/my/yh_coupon', //优惠券
    component: () => import('@/views/my/yh_coupon.vue')
  },
  {
    path: '/my/integral', //积分
    component: () => import('@/views/my/integral.vue')
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
