import * as types from './types'
import {setSesStorage, getSesStore, getLocalStore, setLocalStore, clearStorage} from '@/utils/storageUtil'

const state = {
  userInfo: {}  //用户信息
}

const actions = {
  setUserInfo ( { commit }, boo) {
    commit(types.SET_USER_INFO, boo)
  }
}

const getters = {
  getUserInfo: state => {
    let status = getLocalStore('USER_INFO')
    if (status) {
      state.userInfo = status
    }
    return state.userInfo
  }
}

const mutations = {
  //用户信息存储
  ['SET_USER_INFO'] (state, boo) {
    state.userInfo = boo
    setLocalStore('USER_INFO', boo)
  },
}

export default {
  state,
  actions,
  getters,
  mutations
}