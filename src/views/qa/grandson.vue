<template>
  <div id="">
        <h1>孙子组件</h1>
        <h2>------{{age}}</h2>
  </div>  
</template>

<script>
export default {
    inject:['son'],
    props:{},
  components: { },
  name:'father',
  comments:{
  },
  data() {
      return {
          age:this.son.age
      }
  },
  computed:{},
  watch:{},
  created() {
   
  },
  mounted() {
      
  },
  methods: {

  },
}
</script>

<style lang="less">

</style>
