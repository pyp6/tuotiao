<template>
  <div id="">
        <p>获取路由参数{{this.$route.params.id}}</p>
         <p>query路由参数{{this.$route.query.id}}</p>
         <p>Params{{this.$route.params}}</p>
        <h1>子组件</h1>
        <p>{{msg}}</p>
        <button @click="btn">点击</button>
        <grandson></grandson>
  </div>  
</template>

<script>
    import grandson from './grandson.vue'
export default {
    props:['msg'],
  components: {grandson },
  name:'father',
  comments:{
  },
  provide(){
     return{
          son:this
     } 
  },
  data() {
      return {
          age:23
      }
  },
  computed:{},
  watch:{},
  created() {

  },
  mounted() {
      
  },
  methods: {
    btn(){
       this.$emit('btn','woshi liuliu') 
        // this.$bus.$emit('btnone','woshi chacha') 
    }
  },
}
</script>

<style lang="less">

</style>
