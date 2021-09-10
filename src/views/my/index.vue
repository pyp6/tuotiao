<template>
  <div id="my-container">
    <van-cell-group class="my-info" v-if="user">
      <van-cell center class="base-info" >
        <template #title>
         <van-image
         class="avatar"
          round
          fit="cover"
          :border='false'
          :src="CurrenUser.photo"
        />
        <span class="avatar__name">{{CurrenUser.name}}</span>
        </template>
       
        <template #right-icon>
          <van-button 
          class="updata-btn"
          size="small"
          round>
          编辑资料
          </van-button>
        </template>
      </van-cell>
      <van-grid :border='false' class="data-info">
      <van-grid-item class="data-info-item"> 
        <div Slots="text" class="text-wrap">
            <div class="count">{{CurrenUser.art_count}}</div>
            <div class="text">头条</div>
        </div>
      </van-grid-item>
      <van-grid-item class="data-info-item"> 
        <div Slots="text" class="text-wrap">
            <div class="count">{{CurrenUser.follow_count}}</div>
            <div class="text">关注</div>
        </div>
      </van-grid-item>
      <van-grid-item class="data-info-item"> 
        <div Slots="text" class="text-wrap">
            <div class="count">{{CurrenUser.fans_count}}</div>
            <div class="text">粉丝</div>
        </div>
      </van-grid-item>
      <van-grid-item class="data-info-item"> 
        <div Slots="text" class="text-wrap">
            <div class="count">{{CurrenUser.like_count}}</div>
            <div class="text">获赞</div>
        </div>
      </van-grid-item>
    </van-grid>
    </van-cell-group>

    <div class="not-login" v-else>
      <div @click="$router.push('/login')">
          <img class="moblie" src="./shouji.jpg" alt="">
      </div>
      <div class="text">登录 / 注册</div>      
    </div>

    <van-grid :column-num="2" class="nav-grid">
      <van-grid-item icon-prefix="iconfont icon" icon="add" text="收藏" class="nav-grid-item" />
      <van-grid-item icon-prefix="iconfont icon" icon="history" text="历史记录" class="nav-grid-item" />
    </van-grid>

    <van-cell title="消息通知" is-link to="/"  class="mb"/>
    <van-cell title="小智同学" is-link to="/" />
    <van-cell 
    v-if="user"
    title="退出登录" 
    @click="onlogout"
    class="logout-cell mb"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getCurrenUser } from '../../api/user'

export default {
  name: "MyIndex",
  comments: {},
  props: {},
  data() {
    return {
      CurrenUser:{}  //当前登录用户信息

    };
  },
  computed: {
    //映射到本地
    ...mapState(['user'])
  },
  watch: {},
  created() {
    this.loadCurrenUser()
  },
  mounted() {},
  methods: {
    async loadCurrenUser(){
      const { data } = await getCurrenUser()
      this.CurrenUser = data.data
      console.log('this.CurrenUser',this.CurrenUser);
    },
    onlogout(){
      //提示用户是否退出
      this.$dialog.confirm({
        title: '退出提示',
        message: '确认退出吗？',
      })
        .then(() => {
          // 确认 清除登录状态
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // 退出
        });
    }
  },
};
</script>

<style lang="less">
  .my-info{
    background: url('./background.jpg'); 
  }
  .base-info{
    padding-top: 38px;
    padding-bottom: 12px;
  }
  .base-info,.van-grid-item__content{
    background: unset;
  }
  .van-cell::after{
    border-bottom: none;
  }
  .van-cell--clickable{
    border-bottom: 0.5px solid #ebedf0;
  }
  .avatar{
    box-sizing: border-box;
    width: 66px;
    height: 66px;
    border: 1px solid #fff; 
  }
  .avatar__name{
      color: #fff;
      font-size: 15px;
    }
  .updata-btn{
    font-size: 10px;
    color: #666;
    height: 16px;
  }
  .data-info{
    .data-info-item{
    height: 65px;
    color: #fff;
    .text-wrap{
      display: flex;
      flex-direction:column;
      justify-content: center;
      align-items: center;
        .count{
            font-size: 18px;
          }
          .text{
            font-size: 11px;
        }
    }
    }
  }
  .nav-grid{ 
    background: #fff;
    .nav-grid-item{
      height:70px;
    }
  }
    .icon-add{
    font-size: 24px;
    color: #eb5253;
  }
 .icon-history{
   font-size: 22px;
   color: #ff9d1d !important;
  }
  .logout-cell{
    text-align: center;
    color: #d86262;
  }
  .mb{
    margin-top: 4px;
  }
  .not-login{
    background: url('./background.jpg'); 
    height: 180px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;  
    .moblie{
      width: 66px;
      height: 66px;
      border-radius: 25%;
    }
    .text{
      font-size: 14px;
      color: #fff;
    }
  }
</style>
