import { createStore } from 'vuex'
import { getItem,setItem } from '../utils/storage'

export default createStore({
  state: {
    user:getItem('user') //当前登录用户的登录状态（token等数据）
  },
  mutations: {
    setUser(state,data) {
      state.user = data 
      setItem('user',state.user)
      // window.localStorage.setItem('user',JSON.stringify(state.user))
    }
  },
  actions: {
  },
  modules: {
  }
})
