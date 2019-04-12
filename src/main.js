// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/config/api'

import Vuex from 'vuex'
import axios from 'axios'
import store from './store/index.js';
import './assets/styles/index.scss'
import './utils/rem'

import Vant from './components/vant'
Vue.use(Vant);

//移除移动端点击延迟
import FastClick from 'fastclick'
FastClick.attach(document.body); 

import { Lazyload } from 'vant';
Vue.use(Lazyload);

Vue.use(Vuex)
Vue.use(router)
Vue.config.productionTip = false
Vue.prototype.$axios = axios

import vFilters from '@/filters/vFilters'
for (let key in vFilters) {
	Vue.filter(key, vFilters[key])
}

import MyComponents from './components/index'
Vue.use(MyComponents)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
