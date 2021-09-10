<template>
  <div id="wan-container">
    <button @click="handlePush()">Push</button>
    <button @click="handleQuery()">Query</button>
    <button @click="handleParams()">Params</button>

    <h1>父组件</h1>
     <Son :msg=msg @btn='getbtn'></Son>
     <brother></brother>
     <input type="text" v-model="sum">
     {{sum}}
  </div>  
</template>

<script>
import Son from './son.vue'
import brother from  './brother.vue'
export default {
  components: {Son,brother},
  name:'father',
  comments:{
  },
  props:{},
  data() {
      return {
        msg : 'hello eryue',
        sum:"二月"
      }
  },
  computed:{},
  watch:{},
  created() {

  },
  mounted() {
      
  },
  methods: {
    getbtn(e){
      // 接受子组件传递过来的值
      console.log(e,'e');
    },
    // handlePush(){
    //   let id = 3
    //   this.$router.push({
    //     path:`./son/${id}`
    //   })
    // }
    //     handleQuery(){
    //   this.$router.push({
    //     path:`./son`,
    //     query:{
    //       id:12,
    //       name: 'pyp',
    //       age:18
    //     }
    //   })
    // }
      handleParams(){
      this.$router.push({
        name:`my`,
        params:{
          id:12,
          name: 'pyp',
          age:18
        }
      })
    }
  },
}
</script>

<style lang="less">

</style>
