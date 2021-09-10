import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载全局样式
import './styles/index.less'
import './styles/icon.less'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css'

// 加载Vant组件库
import Vant from 'vant';
// 加载Vant组件样式
import 'vant/lib/index.css';

// 自动设置rem  基准值（html标签字体大小）
import 'amfe-flexible/index.js'

//兄弟组件传值
// Vue.prototype.bus=new Vue()


// 全局注册Vant中的组件
createApp(App).use(Vant).use(store).use(router).use(ElementPlus).mount('#app')
