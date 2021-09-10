<template>
  <div id="login-container">
    <van-nav-bar
      class="app-nav-bar"
      title="注册/登录"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 登录表单 -->
    <!-- 当表单校验通过是的时候才会触发调用 submit-->
    <van-form
      :show-error-message="false"
      ref="login-from"
      @submit="onLogin"
      @failed="onFailed"
    >
      <van-field
        v-model="user.mobile"
        icon-prefix="iconfont icon"
        left-icon="shouji"
        placeholder="请输入手机号"
        name="mobile"
        :rules="fromRules.mobile"
      />
      <van-field
        v-model="user.code"
        clearable
        icon-prefix="iconfont icon"
        left-icon="icon--"
        placeholder="请输入验证码"
        name="code"
        :rules="fromRules.code"
      >
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="1000 * 60"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            class="send-btn"
            size="mini"
            @click.prevent="onSendSms"
            round
            :loading="isSendSmsLoading"
            >发送验证码</van-button
          >
        </template>
      </van-field>

      <div class="login-btn-wrap">
        <van-button type="primary" block native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, SendSms } from "../../api/user";
import { Toast } from "vant";

export default {
  name: "LoginIndex",
  comments: {},
  props: {},
  data() {
    return {
      user: {
        mobile: "13922222222", //手机号
        code: "246810", //验证码
      },
      fromRules: {
        mobile: [
          { required: true, message: "请填写手机号" },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: "手机号格式错误" },
        ],
        code: [
          { required: true, message: "请填写验证码" },
          { pattern: /^\d{6}$/, message: "验证码格式错误" },
        ],
      },
      isCountDownShow: false, //控制倒计时显示状态
      isSendSmsLoading: false, //发送验证码的Loading
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLogin() {
      Toast.loading({
        message: "登录中...",
        forbidClick: true,
        duration: 0, //展示时长(ms)，值为 0 时，toast 不会消失
      });
      // 首先try提捕获异常的，即异常并不是我们能预先知道的
      try {
        const { data } = await login(this.user);
        Toast.success("登录成功");
        //将后端返回的用户登录状态（token等数据）放到VueX容器zhong
        this.$store.commit("setUser", data.data);
        //登录成功。跳转回原来页面
        this.$route.back(); 
      } catch (err) {
        if (err.response.status === 400) {
          Toast.fail("登录失败,手机号或者验证码错误");
        }
      }
    },
    //提交表单且验证不通过后触发
    onFailed(errors) {
      if (errors.errors[0]) {
        Toast({
          message: errors.errors[0].message,
          position: "top",
        });
      }
    },
    async onSendSms() {
      //校验手机号码.prevent阻止了默认事件
      try {
        await this.$refs["login-from"].validate("mobile");
        this.isSendSmsLoading = true;
        const res = await SendSms(this.user.mobile);
        this.isCountDownShow = true;
        console.log(res);
      } catch (err) {
        let message = "";
        if (err && err.response && err.response.statsus === 429) {
          message = "发送太频繁了，请稍后再试";
        } else if (err.name === "mobile") {
          message = err.message;
        } else {
          message = "发送失败，请稍后再试";
        }
        //任何错误都会进入catch里面
        Toast({
          message,
          position: "top",
        });
      }
      this.isSendSmsLoading = false;
    },
  },
};
</script>

<style lang="less" scope>
#login-container {
  font-size: 14px;
  .login-btn-wrap {
    padding: 26px 16px;
    .van-button {
      background: #6db4fb;
      border: none;
      .van-button__text {
        font-size: 15px;
      }
    }
  }
  .send-btn {
    width: 76px;
    height: 23px;
    background: #ededed;
    .van-button__text {
      color: #666;
      font-size: 11px;
    }
  }
}
</style>
