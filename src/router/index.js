import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const routes = [{
    path: '/',
    component: () => import('@/views/index/index'),
    children: [
      {
        path: '',
        component: () => import('@/views/home/home.vue'),
        meta: {
          index: 1
        }
      },
      {
        path: '/coupon',
        component: () => import('@/views/coupon/coupon.vue'),
        meta: {
          index: 1,
          requireAuth: true
        }
      },
      {
        path: '/my',
        component: () => import('@/views/my/my.vue'),
        meta: {
          index: 1,
          requireAuth: true
        }
      },
    ]
  },
  {
    path: '/my/info', //个人信息
    component: () => import('@/views/my/info.vue'),
    meta: {
      index: 20,
      requireAuth: true
    }
  },
  {
    path: '/my/safety', //安全认证
    component: () => import('@/views/my/safety.vue'),
    meta: {
      index: 20,
      requireAuth: true
    }
  },
  {
    path: '/my/oil_card', //我的油卡wallet
    component: () => import('@/views/my/oil_card.vue'),
    meta: {
      index: 20,
      requireAuth: true
    }
  },
  {
    path: '/my/oil_detail', //我的油卡充值详情
    component: () => import('@/views/my/oil/oil_detail.vue'),
    meta: {
      index: 21,
      requireAuth: true
    }
  },
  {
    path: '/my/oil_add', //我的油卡新增
    component: () => import('@/views/my/oil/oil_add.vue'),
    meta: {
      index: 22,
      requireAuth: true
    }
  },
  {
    path: '/my/oil_delete', //我的油卡解除绑定
    component: () => import('@/views/my/oil/oil_delete.vue'),
    meta: {
      index: 23,
      requireAuth: true
    }
  },
  {
    path: '/my/record', //油卡充值
    component: () => import('@/views/my/record.vue'),
    meta: {
      index: 20,
      requireAuth: true
    }
  },
  {
    path: '/my/my_order', //我的订单rq_code
    component: () => import('@/views/my/my_order.vue'),
    meta: {
      index: 20,
      requireAuth: true
    }
  },
  {
    path: '/my/yh_coupon', //我的优惠券follow_fans
    component: () => import('@/views/my/yh_coupon.vue'),
    meta: {
      index: 20,
      requireAuth: true
    }
  },
  {
    path: '/my/my_setting', //设置yh_coupon
    component: () => import('@/views/my/my_setting.vue'),
    meta: {
      index: 20,
      requireAuth: true
    }
  },
  {
    path: '/my/service', //客服
    component: () => import('@/views/my/service.vue'),
    meta: {
      index: 20,
      requireAuth: true
    }
  },
  {
    path: '/my/shopping', //商城
    component: () => import('@/views/my/shopping.vue'),
    meta: {
      index: 20,
      requireAuth: true
    }
  },
  {
    path: '/my/edit_name', //修改昵称
    component: () => import('@/views/my/name/edit_name.vue'),
    meta: {
      index: 21,
      requireAuth: true
    }
  },
  {
    path: '/my/edit_phone', //修改手机号
    component: () => import('@/views/my/phone/edit_phone.vue'),
    meta: {
      index: 21,
      requireAuth: true
    }
  },
  {
    path: '/my/sys_setting',
    component: () => import('@/views/my/sys_setting.vue'),
    meta: {
      index: 21,
      require: true
    }
  },
  {
    path: '/service/appointment', //预约办卡
    component: () => import('@/views/service/appointment.vue'),
    meta: {
      index: 10,
      requireAuth: true
    }
  },
  {
    path: '/service/appointment-query', //预约办卡
    component: () => import('@/views/service/appointment-query.vue'),
    meta: {
      index: 11,
      requireAuth: true
    }
  },
  {
    path: '/service/binding', //油卡绑定
    component: () => import('@/views/service/binding.vue'),
    meta: {
      index: 10,
      requireAuth: true
    }
  },
  {
    path: '/service/recharge', //油卡充值
    component: () => import('@/views/service/recharge.vue'),
    meta: {
      index: 10,
      requireAuth: true
    }
  },
  {
    path: '/service/recharge_addcard', //油卡充值-添加油卡
    component: () => import('@/views/service/recharge_addcard.vue'),
    meta: {
      index: 11,
      requireAuth: true
    }
  },
  {
    path: '/service/loss_report', //油卡挂失
    component: () => import('@/views/service/loss_report.vue'),
    meta: {
      index: 10,
      requireAuth: true
    }
  },
  {
    path: '/service/withdraw', //申请退卡
    component: () => import('@/views/service/withdraw.vue'),
    meta: {
      index: 10,
      requireAuth: true
    }
  },
  {
    path: '/service/problem', //常见问题
    component: () => import('@/views/service/problem.vue'),
    meta: {
      index: 10,
      requireAuth: true
    }
  },
  {
    path: '/register',  //注册
    component: () => import('@/views/entrance/register.vue'),
    meta: {
      index: 29
    }
  },
  {
    path: '/login',  //登录
    component: () => import('@/views/entrance/login.vue'),
    meta: {
      index: 28
    }
  },
  {
    path: '/forgetpwd',  //忘记密码
    component: () => import('@/views/entrance/forgetpwd.vue'),
    meta: {
      index: 29
    }
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0,
    x: 0
  }),
  routes: routes
})
