// 用户相关请求模块
import request from '../utils/request'
import store from '../store/index'

//封装登录注册方法
export const login = (data) => {
    return request({
        method: 'POST',
        url: '/app/v1_0/authorizations',
        data
    })
}

//封装发送短信验证码
export const SendSms = mobile => {
    return request({
        method: 'GET',
        url: `/app/v1_0/sms/codes/${mobile}`, 
    })
}

//获取登录用户信息
export const getCurrenUser = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/user', 
        headers: {
            Authorization :`Bearer ${store.state.user.token}`
        }
    })
}

//请求频道数据
export const getUserChannels = () => {
    return request({
      method: 'GET',
      url: '/app/v1_0/user/channels'
    })
  }