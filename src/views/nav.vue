<template>
    <div id="nav">
        <ul>
            <li class= "nav-li" v-for="(nav,key,index) in navs">
                <span :class="['nav-span',{'nav-span-active':nav.active}]" @click='changeState(key)'>{{nav.name}}</span>
                <transition-group name="nav" tag="p">
                    <ul class="nav-ul" :key = "key" v-show="!nav.hide">
                        <li v-for = "(subNav,key,index) in nav.subMenu">{{subNav.name}}</li>
                    </ul>
                </transition-group>
            </li>
        </ul>        
    </div>
</template>
<script>
    export default{
        data(){
            return {
                navs:[]
            }
        },
        created(){
            this.$http.get('http://localhost:3000/navs').then((res)=>{
                this.navs = res.data;
                this.navs.forEach((item,index,array)=>{
                    item.hide = true;
                    item.active = false;
                })
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        methods:{
            changeState(key){
                let obj = this;
                obj.navs[key].hide = !obj.navs[key].hide;
                obj.navs[key].active = !obj.navs[key].active;
                if(obj.navs[key].hide === false){
                    obj.navs.forEach((item,index,array)=>{
                        if(index !== key){
                            item.hide = true;
                            item.active = false;
                        }
                    })
                }
                //用这种方法才能由数组触发更新
                obj.$set(obj.navs,key,obj.navs[key]);
            }
        }
    }
</script>
<style lang="less" scoped>
    #nav{
        width: 100px;
        background-color: #25282a;
        height: 100%;
        color: #fff;
        text-align: center;
        line-height: 40px;
        .nav-span{
            cursor: pointer;
        }
        .nav-ul{
            overflow: hidden;
        }
        .nav-span{
            display: block;
            cursor: pointer;
        }
        .nav-span{
            background-color: #22282e;
        }
        .nav-enter-active{
            transition: max-height 0.8s linear;
        }
        .nav-enter{
            max-height: 0;
        }
        .nav-enter-to{
            max-height: 1000px;
        }
        .nav-leave-active{
            transition: all 0.1s linear;
        }
        .nav-leave{
            max-height: 1000px;
        }
        .nav-leave-to{
            max-height: 0;
        }
    }
</style>