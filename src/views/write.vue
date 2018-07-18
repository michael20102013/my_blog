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
                                                <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
                                                  <el-button>上左</el-button>
                                                </el-tooltip>
                                                <el-tooltip class="item" effect="dark" content="Top Center 提示文字" placement="top">
                                                  <el-button>上边</el-button>
                                                </el-tooltip>
                                                <el-tooltip class="item" effect="dark" content="Top Right 提示文字" placement="top-end">
                                                  <el-button>上右</el-button>
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
        }
      }
      </script>
      <style lang="less">
          .el-icon-setting, .el-icon-circle-plus{
            cursor: pointer;
          }
          #write{
              height: 100%;
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
          }
          .toolbox{
              background-color: #d9d9d9;
          }
      </style>
      