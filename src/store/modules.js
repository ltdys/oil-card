import * as types from './types'
import {setSesStorage, getSesStore, getLocalStore, setLocalStore, clearStorage} from '@/utils/storageUtil'

const state = {
  userInfo: {},  //用户信息
  currentOilType: 0, //当前选择的油卡充值类型
  currentDity: {}, //当前油卡详情数据
  currentOil: {}, //当前油卡
}

const actions = {
  setUserInfo ( { commit }, boo) {
    commit(types.SET_USER_INFO, boo)
  },
  setCurrentOilType ( { commit }, boo) {
    commit(types.SET_CURRENT_OIL_TYPE, boo)
  },
  setCurrentDity ( { commit }, boo) {
    commit(types.SET_CURRENT_DITY, boo)
  },
  setCurrentOil ( { commit }, boo) {
    commit(types.SET_CURRENT_OIL, boo)
  },
}

const getters = {
  getUserInfo: state => {
    let status = getLocalStore('USER_INFO', 'json')
    if (status) {
      state.userInfo = status
    }
    return state.userInfo
  },
  getCurrentOilType: state => {
    return state.currentOilType
  },
  getCurrentDity: state => {
    return state.currentDity
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
  ['SET_CURRENT_OIL_TYPE'] (state, boo) {
    state.currentOilType = boo
  },
  //当前油卡详情数据
  ['SET_CURRENT_DITY'] (state, boo) {
    state.currentDity = boo
  },
  //当前油卡
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