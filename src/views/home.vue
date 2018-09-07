<template>
    <div id="home">
        <headTemp></headTemp>
        <div id="homeContent">
            <router-view></router-view>
        </div>
        <div id="bottom">刺激战场王牌高手带你吃鸡!</div>
    </div>
</template>
<script>
    import headTemp from './header';
    export default {
        data() {
            return {

            }
        },
        methods:{
               
        },
        components:{
            headTemp
        }
    }
</script>
<style lang="less" scoped>
    #bottom{
        height: 100px;
        background-color: grey;
        line-height: 100px;
        text-align: center;
        font-size: 20px;
        color:#fff;
    }
</style>