<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        methods:{

        },
        components:{

        }
    }
</script>
<style lang="less">
    #app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      color: #2c3e50;
      height: 100%;
      width: 100%;
      transition: all 0.8s linear;
      #main{
        width: 100%;
        height: 100%;
      }
    }    
</style>
