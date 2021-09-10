<template>
  <div id="home-container">
    <van-nav-bar class="app-nav-bar">
      <template #title>
        <van-button
          class="search-btn"
          icon="search"
          type="info"
          round
          size="small"
        >
          搜索
        </van-button>
      </template>
    </van-nav-bar>
    <!-- 文字频道 -->
    <van-tabs v-model="active">
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <!-- //文章列表 -->
        <ArticleList/>
        <!-- //文章列表 -->
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from "../../api/user";
import ArticleList from "./components/article-list";

export default {
  name: "HomeIndex",
  // 注册组件
  components:{
      ArticleList
  },
  comments: {},
  props: {},
  data() {
    return {
      active: 0,
      channels: [], //频道数据
    };
  },
  computed: {},
  watch: {},
  created() {
    this.loadChannels();
  },
  mounted() {},
  methods: {
    async loadChannels() {
      const { data } = await getUserChannels();
      this.channels = data.data.channels;
      console.log(this.channels);
    },
  },
};
</script>

<style lang="less">
.search-btn {
  width: 277px;
  height: 32px;
  background: #5babfb;
  border: none;
}
.van-nav-bar__title {
  max-width: none;
}
.van-button__text {
  font-size: 14px;
}
/deep/ .van-icon {
  font-size: 16px !important;

}
</style>
