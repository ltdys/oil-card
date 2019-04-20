import * as types from './types'
import {setSesStorage, getSesStore, getLocalStore, setLocalStore, clearStorage} from '@/utils/storageUtil'

const state = {
  userInfo: {},  //用户信息
  currentOil: 0, //当前选择的油卡充值类型
}

const actions = {
  setUserInfo ( { commit }, boo) {
    commit(types.SET_USER_INFO, boo)
  },
  setCurrentOil ( { commit }, boo) {
    commit(types.SET_CURRENT_OIL, boo)
  },
}

const getters = {
  getUserInfo: state => {
    let status = getLocalStore('USER_INFO')
    if (status) {
      state.userInfo = status
    }
    return state.userInfo
  },
  getCurrentOil: state => {
    return state.currentOil
  },
}

const mutations = {
  //用户信息存储
  ['SET_USER_INFO'] (state, boo) {
    state.userInfo = boo
    setLocalStore('USER_INFO', boo)
  },
  //当前选择的油卡充值类型
  ['SET_CURRENT_OIL'] (state, boo) {
    state.currentOil = boo
  },
}

export default {
  state,
  actions,
  getters,
  mutations
}