<template>
  <div class="welcomeTip">
    <h1>{{title}}</h1>
    <h3>{{welcomeTip}}</h3>
  </div>
</template>
<script>
  export default {
    data (){
        return {
            title: `iWangcx's Blog`,
            welcomeTip: `为自己吹过的牛逼奋斗终生`
        }
    }
  }
</script>
<style>
  .welcomeTip{
    color: #fff;
    height: 200px;
    width: 750px;
    position: absolute;
    top: 40%;
    left: 50%;
    text-align: center;
    transform: translate(-50%,-50%); 
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
</style>