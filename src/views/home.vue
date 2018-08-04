<template>
    <div id="home">
        <headTemp></headTemp>
        <div id="homeContent">
            <router-view></router-view>
        </div>
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
<style>

</style>