<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
<!--     <i class="click-down" v-on:click="rollDown"></i>
    <i class="click-up" @click="rollUp"></i> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
      return {
          state:''
      }
  },
  methods:{
      rollDown:()=>{
          this.state = 'roll-down';
      },
      rollUp:()=>{
          this.state = 'roll-up';
      }    
  },
  components:{}
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
html,body {
 width: 100%;
 height: 100%;
 overflow: hidden;
 margin: 0;
 padding: 0;
 font-size: 30px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /*margin-top: 60px;*/
  height: 100%;
  width: 100%;
}
</style>
