<template>
        <div id="write">
            <el-row>
                    <el-col :span="4" class="back">
                        <el-container>
                                <el-header>
                                    <el-button type="text">
                                            <span class="backToIndex">返回首页</span>
                                    </el-button>
                                </el-header>
                                <el-main></el-main>
                                <el-footer></el-footer>
                        </el-container>                     
                    </el-col>
                    <el-col :span="6"  class="catalog">
                        <el-container>
                            <el-header class="add">
                                    <i class="el-icon-circle-plus"></i><span>新建文章</span>
                            </el-header>
                            <el-main class="catalog-content">
                                <div class="catalog-content-item selected">
                                    <el-row>
                                        <el-col :span="20">
                                                <h1>2018-07-18</h1>
                                                <h3>js 权威指南</h3>
                                            </el-col>
                                        <el-col :span="4">
                                                <i class="el-icon-setting"></i>                                                    
                                        </el-col>
                                    </el-row>
                                </div>
                                <div class="catalog-content-item">
                                        <el-row>
                                            <el-col :span="20">
                                                    <h1>2018-07-18</h1>
                                                    <h3>vue 权威指南</h3>
                                                </el-col>
                                            <el-col :span="4">
                                                    <i class="el-icon-setting"></i>                                                    
                                            </el-col>
                                        </el-row>
                                </div>
                                <div class="catalog-content-item">
                                        <el-row>
                                            <el-col :span="20">
                                                    <h1>2018-07-18</h1>
                                                    <h3>angular 权威指南</h3>
                                                </el-col>
                                            <el-col :span="4">
                                                    <i class="el-icon-setting"></i>                                                    
                                            </el-col>
                                        </el-row>
                                </div>                                
                            </el-main>
                            <el-footer>

                            </el-footer>
                        </el-container>
                    </el-col>
                    <el-col :span="14" class="content">
                        <el-container>
                                <el-header class="content-title">
                                        <span>2018-07-18</span>
                                        <div class="toolbox">
                                            <el-tooltip class="item" effect="dark" content="粗体" placement="top">
                                                <el-button class="myfont fa fa-bold small-font"></el-button>
                                            </el-tooltip>
                                            <el-tooltip class="item" effect="dark" content="斜体" placement="top">
                                                <el-button class="myfont fa fa-italic small-font"></el-button>
                                            </el-tooltip>
                                            <el-tooltip class="item" effect="dark" content="删除线" placement="top-start">
                                                <el-button class="myfont fa fa-strikethrough small-font"></el-button>
                                            </el-tooltip>
                                            <el-tooltip class="item" effect="dark" content="引用" placement="top">
                                                <el-button class="myfont fa fa-quote-left small-font"></el-button>
                                            </el-tooltip>
                                            <el-tooltip class="item" effect="dark" content="插入图片" placement="top-end">
                                                <el-button class="myfont fa fa-picture-o small-font"></el-button>
                                            </el-tooltip>
                                            <div class="hWrapper" @mouseover="showHfont" @mouseleave="hideHfont">
                                                <el-tooltip class="item" effect="dark" content="标题1" placement="top">
                                                    <el-button class="myfont fa fa-undefined small-font">H1
                                                        <span id="arrow" :class="{hide:isArrowShow,arrow:true}"></span>
                                                    </el-button>     
                                                </el-tooltip>

                                                <div id="hFont" :class="{hide:ishFontShow}">
                                                    <el-tooltip class="item" effect="dark" content="标题2" placement="right">
                                                        <el-button class="myfont fa fa-undefined small-font">H2</el-button>
                                                    </el-tooltip>
                                                    <el-tooltip class="item" effect="dark" content="标题3" placement="right">
                                                        <el-button class="myfont fa fa-undefined small-font">H3</el-button>
                                                    </el-tooltip>
                                                </div>                                                
                                            </div>
                                            <el-tooltip class="item" effect="dark" content="分割线" placement="top">
                                                <el-button class="myfont fa fa-undefined small-font">——</el-button>
                                            </el-tooltip>
                                            <el-tooltip class="item" effect="dark" content="插入链接" placement="top">
                                                <el-button class="myfont fa fa-link small-font"></el-button>
                                            </el-tooltip>
                                            <el-tooltip class="item" effect="dark" content="插入视频" placement="top">
                                                    <el-button class="myfont fa fa-youtube-play small-font"></el-button>
                                            </el-tooltip>
                                            <el-tooltip class="item" effect="dark" content="保存" placement="top">
                                                    <el-button class="myfont fa fa-floppy-o small-font"></el-button>
                                            </el-tooltip>
                                            <el-tooltip class="item" effect="dark" content="发布" placement="top">
                                                    <el-button class="myfont fa fa-mail-forward small-font release"></el-button>
                                            </el-tooltip>
                                        </div>
                                </el-header>
                                <el-main class="catalog-content">

                                </el-main>
                                <el-footer>
                                </el-footer>
                        </el-container>                        
                    </el-col>
            </el-row>
        </div>
      </template>
      <script>
      export default {
        data(){
            return{
                ishFontShow:true,
                isArrowShow:false
            }
        },
        created(){
              // this.$http.get('http://localhost:3000/api/login').then((res)=>{
              //     this.navs = res.data;
              //     if(res.cc === 0){
              //     	alert("登录成功");
              //     }
              //     else{
              //     	alert("登录失败");
              //     }
      
              // })
              // .catch((err)=>{
              //     console.log(err);
              // })  	
        },
        methods:{
            showHfont(){
                console.log(123)
                this.ishFontShow = false;
                this.isArrowShow = true;
            },
            hideHfont(){
                this.ishFontShow = true;
                this.isArrowShow = false;
            }
        }
      }
      </script>
      <style lang="less">
          .el-icon-setting, .el-icon-circle-plus{
            cursor: pointer;
          }
          #write{
              height: 100%;
              min-width: 1380px;
          }
          .el-row{
              height: 100%;
          }
          .back{
              text-align: center;
              height: 100%;
              float: left;
              background-color:#404040;
          }
          .catalog{
              height: 100%;
              float: left;
              background-color: gray;
              color: #fff;
          }
          .content{
              min-width: 800px;
              height: 100%;
              float: left;
              background-color: blanchedalmond;
          }
          .backBtn{
              /* margin-left: 15px; */
          }
          .add{
              font-size: 24px;
              text-align: center;
              color: #303133;
              span{
                color:#fff;
              }
          }
          .el-icon-circle-plus{
              margin-right: 15px;
          }         
          .backToIndex{
              font-size: 24px;
          }
          .selected{
            background-color: #909399;
          }
          .catalog-content{
              .el-row{
                  display: flex;
                  align-items:center;
              }
              h1,h3{
                -webkit-margin:0;
              }
              .catalog-content-item{
                padding: 15px;
              }
              .el-icon-setting{
                  font-size: 21px;
              }
              .el-col-4{
                  text-align: center;
              }
          }
          .el-header{
              padding-top: 15px;
          }
          .content-title{
              font-size: 24px;
              text-align: center;
              color: #303133;
              span{
                margin-bottom: 24px;
              }
          }
          .toolbox{
              margin-top: 30px;
              background-color: #d9d9d9;
              border: 0;
          }
          .myfont{
              background-color: #D9D9D9;
              border:0;
              &:hover{
                  color:#fff;
                  background-color: #595959;
              }
          }
          .small-font{
              font-size: 16px;
              border-radius: 0;
          }
          .arrow{
              position: relative;
                display: block;
                width: 0;
                height: 0;
                border: 5px solid #999;
                border-left-color: transparent;
                border-right-color: transparent;
                border-bottom: 0;
                position: absolute;
                top: 8px;
                right: 5px;
                &.hide{
                    display: none;
                }                 
          }          
          .release{
              &:before{
                  content:'\F064 发布文章'
              }
          }
          #hFont{
              float: left;
              display: inline-block;
              button{
                  display: block;
                  margin-left:0;
              }
          }
          #hFont.hide{
            display: none             
          }
          .hWrapper{
              margin-bottom: -113px;
              width: 50px;
              display: inline-block;
              /* overflow: hidden; */
              button{
                  position: relative;
              }
          }
      </style>
      