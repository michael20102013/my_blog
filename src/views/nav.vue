<template>
    <div id="nav">
        <ul>
            <li class= "nav-li" v-for="(nav,navkey,index) in navs">
                <span :class="['nav-span']" @click='changeState(navkey)'>{{nav.name}}</span>
                <transition-group name="nav" tag="p">
                    <ul class="nav-ul" :key = "navkey" v-show="!nav.hide">
                        <li v-for = "(subNav,subMenukey,index) in nav.subMenu" @click="changeAstate(navkey,subMenukey)"><router-link :to="subNav.url" :class="[{active:subNav.active}]">{{subNav.name}}</router-link></li>
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
                    item.subMenu.forEach((item,index,array)=>{
                        item.active = false;
                    })
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
                if(obj.navs[key].hide === false){
                    obj.navs.forEach((item,index,array)=>{
                        if(index !== key){
                            item.hide = true;
                        }
                    })
                }
                //用这种方法才能由数组触发更新
                obj.$set(obj.navs,key,obj.navs[key]);
            },
            changeAstate(navkey,subMenukey){
                console.log("click");
                let obj = this;
                obj.navs[navkey].subMenu[subMenukey].active = !obj.navs[navkey].subMenu[subMenukey].active;
                if(obj.navs[navkey].subMenu[subMenukey].active === true){
                    obj.navs.forEach((item,index,array)=>{
                        item.subMenu.forEach((item,index,array)=>{
                            if(subMenukey !== index)
                            {
                                item.active = false;
                            }
                        })
                    })
                }
                obj.$set(obj.navs,navkey,obj.navs[navkey]);
            }
        }
    }
</script>
<style lang="less" scoped>
    #nav{
        width: 160px;
        background-color: #25282a;
        height: 100%;
        color: #fff;
        text-align: center;
        line-height: 40px;
        float: left;
        a{
            text-decoration:none;
            outline: none;
            color: #fff;
            
        }
        .nav-span{
            cursor: pointer;
        }
        .nav-ul{
            overflow: hidden;
            background-color:#333333;
            .active{
                color: #0099CC;
            }
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