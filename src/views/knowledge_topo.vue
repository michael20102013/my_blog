<template>
    <div id="knowledgeWrapper" style="width: 1000px;height:1500px;">

    </div>
</template>
<script>
    const echarts = require('echarts');
    export default {
        data() {
            return {
                data: ''
            }
        },
        created() {
            this.data = {
                "name": "前端技术体系",
                "children": [
                    {
                        "name": "构建生态",
                        "children": [
                            {
                                "name": "webpack",
                                "children": []
                            },
                            {
                                "name": "gulp",
                                "children": []
                            }
                        ]
                    },
                    {
                        "name": "移动开发",
                        "children": [
                            {
                                "name": "android",
                                "children": []
                            },
                            {
                                "name": "ios",
                                "children": []
                            },
                            {
                                "name": "小程序开发",
                                "children": []
                            },
                            {
                                "name": "react native",
                                "children": []
                            }                    
                        ]
                    },
                    {
                        "name": "全栈开发",
                        "children": [
                            {
                                "name": "nodejs",
                                "children": []
                            },
                            {
                                "name": "express/koa",
                                "children": []
                            },
                            {
                                "name": "mongodb",
                                "children": []
                            },
                            {
                                "name": "java/php/python",
                                "children": []
                            },
                            {
                                "name": "nginx/apache",
                                "children": []
                            },
                            {
                                "name": "linux/shell",
                                "children": []
                            }                                                                             
                        ]
                    },
                    {
                        "name": "前端框架",
                        "children": [
                            {
                                "name": "vue",
                                "children": []
                            },
                            {
                                "name": "angular",
                                "children": []
                            },
                            {
                                "name": "react",
                                "children": []
                            }                                                                           
                        ]
                    },
                    {
                        "name": "UI框架",
                        "children": [
                            {
                                "name": "elementUI",
                                "children": []
                            },
                            {
                                "name": "bootstrap",
                                "children": []
                            }                                                                          
                        ]
                    },
                    {
                        "name": "组件库",
                        "children": [
                            {
                                "name": "echarts",
                                "children": []
                            },
                            {
                                "name": "commonJS/AMD/CMD",
                                "children": []
                            },
                            {
                                "name": "requireJS",
                                "children": []
                            }                                                                          
                        ]
                    },
                    {
                        "name": "工具和调试",
                        "children": [
                            {
                                "name": "wireshark",
                                "children": []
                            },
                            {
                                "name": "nodemon",
                                "children": []
                            },
                            {
                                "name": "requireJS",
                                "children": []
                            },
                            {
                                "name": "chrome inspect/vorlon/",
                                "children": []
                            }                                                                                          
                        ]
                    },
                    {
                        "name": "项目管理",
                        "children": [
                            {
                                "name": "开发规范",
                                "children": []
                            },
                            {
                                "name": "开发方案",
                                "children": []
                            },
                            {
                                "name": "测试方案",
                                "children": []
                            },
                            {
                                "name": "项目部署",
                                "children": []
                            }                                                                                          
                        ]
                    },
                    {
                        "name": "技术趋势",
                        "children": [
                            {
                                "name": "PWA",
                                "children": []
                            }                                                                                         
                        ]
                    },
                    {
                        "name": "其他技能",
                        "children": [
                            {
                                "name": "can i use",
                                "children": []
                            },
                            {
                                "name": "github",
                                "children": []
                            },
                            {
                                "name": "svn/git/totoriseGit",
                                "children": []
                            },
                            {
                                "name": "CDN",
                                "children": []
                            },
                            {
                                "name": "SEO",
                                "children": []
                            },
                            {
                                "name": "pagespeed",
                                "children": []
                            },
                            {
                                "name": "网络/资源/协议/存储",
                                "children": []
                            } 
                        ]
                    },
                    {
                        "name": "安全",
                        "children": [
                            {
                                "name": "Sandbox",
                                "children": []
                            },
                            {
                                "name": "XSS",
                                "children": []
                            },
                            {
                                "name": "CORS/CSRF",
                                "children": []
                            },
                            {
                                "name": "SQL注入",
                                "children": []
                            },
                            {
                                "name": "https",
                                "children": []
                            },
                            {
                                "name": "pagespeed",
                                "children": []
                            },
                            {
                                "name": "网络/资源/协议/存储",
                                "children": []
                            } 
                        ]
                    },
                    {
                        "name": "CSS预处理器",
                        "children": [
                            {
                                "name": "less",
                                "children": []
                            },
                            {
                                "name": "sass",
                                "children": []
                            },
                            {
                                "name": "CORS/CSRF",
                                "children": []
                            },
                            {
                                "name": "SQL注入",
                                "children": []
                            },
                            {
                                "name": "https",
                                "children": []
                            },
                            {
                                "name": "pagespeed",
                                "children": []
                            },
                            {
                                "name": "网络/资源/协议/存储",
                                "children": []
                            } 
                        ]
                    },
                    {
                        "name": "代码质量",
                        "children": [
                            {
                                "name": "eslint/jslint/tslint",
                                "children": []
                            } 
                        ]
                    },
                    {
                        "name": "http协议",
                        "children": [
                            {
                                "name": "URI",
                                "children": []
                            },
                            {
                                "name": "Authentication",
                                "children": []
                            },
                            {
                                "name": "Request",
                                "children": []
                            },
                            {
                                "name": "Response",
                                "children": []
                            },
                            {
                                "name": "server push",
                                "children": []
                            },
                            {
                                "name": "WebSocket",
                                "children": []
                            }
                        ]
                    },
                    {
                        "name": "国内前端团队学习网站",
                        "children": [
                            {
                                "name": "http://taobaofed.org/",
                                "children": []
                            },
                            {
                                "name": "http://fex.baidu.com/",
                                "children": []
                            },
                            {
                                "name": "http://www.alloyteam.com/",
                                "children": []
                            }
                        ]
                    },
                    {
                        "name": "js编译语言",
                        "children": [
                            {
                                "name": "TypeScript",
                                "children": []
                            },
                            {
                                "name": "JSX(facebook)",
                                "children": []
                            }
                        ]
                    }
                    
                ]
            }

        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                let obj = this;
                let myChart = echarts.init(document.getElementById('knowledgeWrapper'));
                // 绘制图表
                echarts.util.each(obj.data.children, function (datum, index) {
                    datum.collapsed = false
                });
                let option;
                myChart.setOption(option = {
                    tooltip: {
                        trigger: 'item',
                        triggerOn: 'mousemove'
                    },
                    series: [
                        {
                            type: 'tree',

                            data: [obj.data],

                            top: '1%',
                            left: '12%',
                            bottom: '1%',
                            right: '20%',

                            symbolSize: 7,

                            label: {
                                normal: {
                                    position: 'left',
                                    verticalAlign: 'middle',
                                    align: 'right',
                                    fontSize: 12
                                }
                            },

                            leaves: {
                                label: {
                                    normal: {
                                        position: 'right',
                                        verticalAlign: 'middle',
                                        align: 'left'
                                    }
                                }
                            },

                            expandAndCollapse: true,
                            animationDuration: 550,
                            animationDurationUpdate: 750
                        }
                    ]
                });
            }
        },
        components: {

        }
    }
</script>
<style lang="less" scoped>
    #knowledgeWrapper{
        background-color: #fff;
        margin: 0 auto;
        margin-bottom:50px;
        margin-top:50px;
    }
</style>