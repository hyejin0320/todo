<template lang="">
    <AppHeader></AppHeader>
    <div class="index_list">
        <GroupList></GroupList>
    </div>
    <div class="wrapper">
        <ul class="todo_list">
            <TodoItem v-for="todo in todoList" :key="todo.key" :todoItem="todo"></TodoItem>
        </ul>
        <div class="member_list" @click="addTodo">MEMBER</div>
        <div class="btn_add_todo" @click="addTodo">CREATE NEW TODO</div>
    </div>
</template>
<script>
import AppHeader from '@/components/common/AppHeader.vue';
import GroupList from '@/components/GroupList.vue';
import TodoItem from '@/components/TodoItem';
import { getSession } from '@/utils/session';
export default {
    components: {
        AppHeader,
        GroupList,
        TodoItem
    },
    data(){
        return{
            todoList: [],
        }
    },
    methods:{
        addTodo(){
            
        }
    },
    created(){
        const url = '/api/group/list';
        this.$axios(url, {
            params: {
                userId: getSession('userId'),
            },
        }).then((res) => {
            if(res.data.scccess){
                this.todoList = res.data.todoList;
            }
        }).catch((err) => {
            console.error(err);
        });
    },
    mounted(){
        for(var i=0;i<20;i++){
            this.todoList.push({
                key: i,
                text: i+': 글자 수마다 종이 길이를 다르게 하기 ',
                regDt: '2024-06-04 00:00 (화)',
            });
        }
    }
}
</script>
<style lang="scss">
    html{
        background-color: #058FFF;
        overflow: hidden;
    }

    .index_list{
        width: 100%;
        height:60px;
        background-color: #fff;
        position: absolute;
        overflow-y: hidden;
        top: 100px;

        ul{
            display: flex;
            width: 100%;
            position: absolute;

            li{
                display: flex;
                align-items: center;
                justify-content: center;
                color:#fff;
                font-weight: bold;
                font-size: 18px;
                border-radius: 10px 10px 0px 0px;
                background-color: #058FFF;

                position: relative;
                bottom: -24px;
                width: 200px;
                height:36px;

                cursor: pointer;

                &.selected{
                    bottom: -6px;
                    height: 58px;
                }

                &>span{
                    margin-left:4px;
                }

                &:hover{
                    bottom: -6px;
                    height: 58px;
                }

                &.selected{
                    height: 58px;
                }

                &.btn_add_group{
                    background-color: #1450C7;
                }
            }
        }
    }

    .btn_add_todo{
        position: absolute;
        bottom: -30px;
        right: 80px;
        z-index: 100;
        align-self:flex-end;

        width: 500px;
        height: 150px;
        background-color: #fff;
        box-shadow: 10px 10px rgba(0,0,0, .3);

        display: flex;
        justify-content: center;
        align-items: center;

        color: #000;
        font-family: "Black Han Sans", sans-serif;
        font-weight: 400;
        font-style: normal;
        font-size:40px;
        transform: rotate(3deg);

        transition: all;
        transition-duration: .1s;
        transition-timing-function:ease-in-out;

        cursor: pointer;

        &:hover{
            transform: rotate(0deg);
            bottom: 0px;
        }
    }

    .member_list{
        position: absolute;
        bottom: -30px;
        left: 80px;
        z-index: 100;
        align-self:flex-end;

        width: 500px;
        height: 150px;
        background-color: #fff;
        box-shadow: 10px 10px rgba(0,0,0, .3);

        display: flex;
        justify-content: center;
        align-items: center;

        color: #000;
        font-family: "Black Han Sans", sans-serif;
        font-weight: 400;
        font-style: normal;
        font-size:40px;
        transform: rotate(-3deg);

        transition: all;
        transition-duration: .1s;
        transition-timing-function:ease-in-out;

        cursor: pointer;

        &:hover{
            transform: rotate(0deg);
            right: 120px;
            bottom: 0px;
        }
    }

    .todo_list{
        display: flex;
        gap: 100px;
        list-style-type: none;
        width: 100%;
        height:700px;
        overflow-x: auto;
        overflow-y: hidden;

        &::-webkit-scrollbar{
            display: none;
        }
    }
</style>