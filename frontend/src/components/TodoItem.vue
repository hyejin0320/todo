<template lang="">
    <li class="todo_item" :key="todoItem.key" :style="{transform: 'rotate('+randomDeg(8)+'deg)'}">
        <!-- 핀 랜덤 배치.. -->
        <!-- <label class="chk_pin" :style="{left: randomDistance(0, 200)+'px', top: randomDistance(-60, -40)+'px'}"> -->
        <label class="chk_pin" :style="{left: randomDistance(110, 130)+'px'}">
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <input type="checkbox" hidden>
        </label>
        <p class="todo_text">
            {{todoItem.text}}
        </p>
        <p class="todo_regDt">
            {{todoItem.regDt}}
        </p>
    </li>
</template>
<script>
export default {
    props:{
        todoItem: {
            type: Object,
            required: true,
        }
    },
    data(){
        return{

        }
    },
    methods:{
        randomDeg(maxRotate){
            const randomRotate = Math.floor(Math.random() * (maxRotate + 1))+2;
            const rightRotate = randomRotate;
            const leftRotate = randomRotate * -1;
            return Math.random() < 0.5 ? rightRotate : leftRotate;
        },
        randomDistance(minDistance, maxDistance){
            const min = Math.ceil(minDistance);
            const max = Math.floor(maxDistance);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }
}
</script>
<style lang="scss">
    .todo_item{
        background-color: #fff;
        padding: 30px;
        min-width: 260px;
        height:360px;
        position:relative;
        top:100px;
        box-shadow: 10px 10px rgba(0,0,0, .3);
        transition-property: transform;
        transition-duration: .2s;

        &:hover{
            transform: rotate(0deg) !important;
        }

        &:nth-child(1){
            margin-left: 100px;
        }

        &:nth-last-child(1){
            margin-right: 100px;
        }
    }

    .chk_pin{
        display: block;
        position: absolute;
        top:-40px;
        left: 120px;
        width:80px;
        height: 100px;
        background-color: transparent;
        cursor: pointer;

        i{
            display: block;
            position: absolute;
        }

        i:nth-child(1){
            z-index: 20;
            left: 21px;
            width:40px;
            height:40px;
            border-radius: 50px;
            background: linear-gradient(to bottom, transparent, rgb(255, 126, 126));
        }

        i:nth-child(2){
            z-index: 19;
            left: 16px;
            width:50px;
            height:50px;
            border-radius: 50px;
            background-color: rgb(255, 45, 45);
        }

        i:nth-child(3){
            z-index: 18;
            top:20px;            
            left: 20px;
            width:40px;
            height:40px;
            border-radius: 50px;
            background-color: rgb(218, 13, 13);
        }

        i:nth-child(4){
            z-index: 17;
            top:26px;            
            left: 14px;
            width:50px;
            height:50px;
            border-radius: 50px;
            background-color: rgb(255, 73, 73);
        }
        i:nth-child(5){
            z-index: 16;
            top:24px;            
            left: 34px;
            width:10px;
            height: 60px;
            border-radius: 50px;
            background-color: rgb(159, 214, 255);
        }
        i:nth-child(6){
            z-index: 14;
            top: 78px;            
            left: 33px;
            width:12px;
            height:12px;
            border-radius: 50px;
            background-color: rgba(39, 49, 56, 0.3);
        }
        i:nth-child(7){
            z-index: 15;
            top: 62px;            
            left: 19px;
            width:40px;
            height:40px;
            border-radius: 50px;
            background-color: rgba(39, 49, 56, 0.15);
        }
        i:nth-child(8){
            display: none;
            z-index: 14;
            top:60px;            
            left: 34px;
            width:10px;
            height: 60px;
            border-radius: 50px;
            background-color: rgb(159, 214, 255);
        }
    }

    .todo_text{
        font-size: 20px;
        position:relative;
        top: 50px;
        left:0px;
    }

    .todo_regDt{
        display: block;
        position: absolute;
        bottom: 20px;
        right: 20px;
    }
</style>