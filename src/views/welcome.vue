<template>
  <div id="welcome">
    <div id="home_background" v-bind:class="[state]">
      <div class="welcomeTip">
        <h1>{{title}}</h1>
        <h3>{{welcomeTip}}</h3>
        <h2 class="jump"><router-link to="home">jump</router-link></h2>
      </div>      
    </div>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                state:"wcx",
                title: "iWangcx's Blog",
                welcomeTip: `为自己吹过的牛逼奋斗终生`
            }
        },
        methods:{

        },
        components:{

        }
    }
</script>
<style lang="less">
    .hide{
      display: none;
    }
    #welcome {
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
    #home_background{
        height: 100%;
        width:100%;
        background-image: url(../assets/img/home_bg.jpg);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        opacity: 1;
        position: relative;
        transition: all 0.8s linear;
    }
     #home_background.roll-down{
        transform: translate3d(0,-100%,0);
    }
     #home_background.roll-up{
        transform: translate3d(0,-0,0);
    }    
    .click-down{
        position: absolute;
        bottom: 5%;
        left: 50%;
        width: 50px;
        height: 50px;
        background-image: url(data:image/png;base64,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);
        background-size: 100% 100%;
        font-style: italic;
        animation: pull-down 0.8s linear infinite;
        cursor: pointer;    
    }
    .click-up{
      bottom:-90%;
      right: 0;
      position: fixed;
      display: inline-block;
      height: 50px;
      width: 50px;
      background-size: 100% 100%;
      background-image: url(../assets/img/up_arrow.png);
      cursor: pointer;
    }
    #main_wrapper{
      background-color: #ffffff;
      height: 100%;
      width: 100%;
    }
    @keyframes pull-down
    {
        from {transform: translate(-50%,-50%);}
        to {transform: translate(-50%,0%);}
    }
    #nav{
        height: 100%;
        background-color: #545c64;
        width: 13%;
        min-width: 200px;
        float: left;
        border-right: solid 1px #e6e6e6;
    }
    .el-col-3{
        width: 100%;
    }
    .el-menu{
        border-right: none;
    }
    .welcomeTip{
      color: #fff;
      height: 200px;
      width: 750px;
      position: absolute;
      top: 40%;
      left: 50%;
      text-align: center;
      transform: translate(-50%,-50%);
      font-size: 30px;
    }
    h1{
          display: block;
          font-size: 2em;
          -webkit-margin-before: 0.67em;
          -webkit-margin-after: 0.67em;
          -webkit-margin-start: 0px;
          -webkit-margin-end: 0px;
          font-weight: bold;    
    }
    h3{
          display: block;
          font-size: 1.17em;
          -webkit-margin-before: 1em;
          -webkit-margin-after: 1em;
          -webkit-margin-start: 0px;
          -webkit-margin-end: 0px;
          font-weight: bold;    
    }
    #content{
      width: 800px;
      background-color: grey;
      margin: auto;
    }
    #write_wrapper{
      height: 100%;      
    }
</style>
