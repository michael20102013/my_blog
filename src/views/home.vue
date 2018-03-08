<template>
  <div id="home_background" v-bind:class="[state]">
    <welcomeTip></welcomeTip>
    <i class="click-down" @click="rollDown"></i>    
    <i class="click-up" @click="rollUp"></i>    
  </div>
</template>
<script>
    import welcomeTip from '../views/welcomeTip.vue'
    export default {
        data() {
            return {
                state:'wcx'
            }
        },
        methods:{
            rollDown:()=>{
                console.log(this.state);
                this.state = 'roll-down';
            },
            rollUp:()=>{
                this.state = 'roll-up';
            }                
        },
        components:{
            welcomeTip
        }
    }
</script>
<style>
    #home_background{
        height: 100%;
        width:100%;
        background-color: black;
        opacity: 1;
        position: relative;
    }
    #home_background.roll-down{
        background-color: red;
        transform: translateY(200px);
    }
    #home_background.roll-up{
        background-color: blue;
    }    
    .click-down{
        position: absolute;
        bottom: 5%;
        left: 50%;
        width: 50px;
        height: 50px;
        transform: translateX(-50%);
        background-color: green;
        /*-webkit-animation: pull-down 0.8s linear infinite;*/
        cursor: pointer;    
    }
    @keyframes pull-down
    {
        from {transform: translateY(-50%);}
        to {transform: translateY(0%);}
    }
</style>