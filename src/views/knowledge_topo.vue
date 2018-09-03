<template>
    <div id="knowledgeWrapper" style="min-width: 1200px;min-height:800px;">

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
                                "name": "cluster",
                                "children": [
                                    { "name": "AgglomerativeCluster", "value": 3938 },
                                    { "name": "CommunityStructure", "value": 3812 },
                                    { "name": "HierarchicalCluster", "value": 6714 },
                                    { "name": "MergeEdge", "value": 743 }
                                ]
                            },
                            {
                                "name": "graph",
                                "children": [
                                    { "name": "BetweennessCentrality", "value": 3534 },
                                    { "name": "LinkDistance", "value": 5731 }
                                ]
                            },
                            {
                                "name": "optimization",
                                "children": [
                                    { "name": "AspectRatioBanker", "value": 7074 }
                                ]
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
                    index % 2 === 0 && (datum.collapsed = true);
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
                            left: '7%',
                            bottom: '1%',
                            right: '20%',

                            symbolSize: 7,

                            label: {
                                normal: {
                                    position: 'left',
                                    verticalAlign: 'middle',
                                    align: 'right',
                                    fontSize: 9
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
</style>