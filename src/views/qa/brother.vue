<template>
  <div id="">
        <h1>兄弟组件</h1>
  </div>  
</template>

<script>
export default {
    props:{},
  components: { },
  name:'father',
  comments:{
  },
  data() {
      return {

      }
  },
  computed:{},
  watch:{},
  created() {
    // this.$bus.$on('btnone',this.getbtnone)
  },
  mounted() {
      
  },
  methods: {
    getbtnone(e){
      console.log(e,'兄弟组件');
    }
  },
}
</script>

<style lang="less">

</style>
