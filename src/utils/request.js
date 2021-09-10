// 请求模块
import axios from 'axios'
import store from '../store/index'

const request = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/'  //基础路径
})
// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(function (config) {
    // Do something before request is sent
    console.log(config);
    const { user } = store.state
    //如果用户登录统一给接口设置.token信息
    if(user){
        config.headers.Authorization = `Bearer ${user.token}`
    }
    //处理完之后一定要把config返回，否则请求失败
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
})

// 响应拦截器


// 导出
export default request