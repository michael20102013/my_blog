<template>
  <div id="app" v-bind:class="[state]">
    <div id="home_background">
      <welcomeTip></welcomeTip>
      <i class="click-down" @click="rollDown"></i>
    </div>
    <div id="main_wrapper">
      <headerTemp></headerTemp>
      <div id="main">
    <div id="nav">
      <el-row class="tac">
      <el-col :span="3">
      <el-menu
        default-active="/article1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        unique-opened
        router>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-edit"></i>
            <span>学习笔记</span>
          </template>
          <el-menu-item-group>
            <!-- <template slot="title">分组一</template> -->
            <el-menu-item index="/article1">选项1</el-menu-item>
            <el-menu-item index="/article2">选项2</el-menu-item>
          </el-menu-item-group>
          <!-- <el-menu-item-group title="分组2"> -->
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
          <el-submenu index="1-5">
            <template slot="title">选项5</template>
            <el-menu-item index="1-5-1">选项1</el-menu-item>
          </el-submenu>        
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-service"></i>
            <span>娱乐与生活</span>
          </template>
          <el-menu-item-group>
            <!-- <template slot="title">分组一</template> -->
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
          </el-menu-item-group>
          <!-- <el-menu-item-group title="分组2"> -->
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
          </el-submenu>
          <el-submenu index="2-5">
            <template slot="title">选项5</template>
            <el-menu-item index="2-5-1">选项1</el-menu-item>
          </el-submenu>        
        </el-submenu>
      </el-menu>
      </el-col>
      </el-row>             
    </div>
        <div id="content">
          <router-view/>
        </div>
      </div>
      <i class="click-up" @click=rollUp></i>
    </div>    
  </div>
</template>
<script>
    import welcomeTip from './views/welcomeTip.vue'
    import headerTemp from './views/header.vue'
    export default {
        data() {
            return {
                state:'wcx'
            }
        },
        methods:{
            rollDown() {
                this.state = 'roll-down';
            },
            rollUp() {
                this.state = 'roll-up';
            },
            handleOpen(key, keyPath) {
              console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
              console.log(key, keyPath);
            }                                    
        },
        components:{
            welcomeTip,
            headerTemp
        }
    }
</script>
<style lang="less">
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
     font-size: 14px;
    }
    #app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      color: #2c3e50;
      /*margin-top: 60px;*/
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
        background-image: url(./assets/img/home_bg.jpg);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        opacity: 1;
        position: relative;
        transition: all 0.8s linear;
    }
    #app.roll-down{
        transform: translate3d(0,-100%,0);
    }
    #app.roll-up{
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
      background-image: url(./assets/img/up_arrow.png);
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
</style>
