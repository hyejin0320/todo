<template lang="">
    <AppHeader></AppHeader>
    <div class="index_list">
        <GroupList :groupList="groupList" @modGroup="modGroup"></GroupList>
    </div>
    <div class="wrapper">
        <ul class="todo_list">
            <TodoItem v-for="todo in todoList" :key="todo.key" :todoItem="todo"></TodoItem>
        </ul>
        <div class="member_list" @click="addTodo">MEMBER</div>
        <div class="btn_add_todo" @click="addTodo">CREATE NEW TODO</div>

        <v-card class="mod_modal" :class="{activated: modGroupModal}" v-if="modGroupModal">
            <v-toolbar title="Opening from the Bottom"></v-toolbar>
    
            <v-card-text class="text-h2 pa-12">
            Hello world!
            </v-card-text>
    
            <v-card-actions class="justify-end">
            <v-btn
                text="Close"
            ></v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>
<script>
import AppHeader from '@/components/common/AppHeader.vue';
import GroupList from '@/components/GroupList.vue';
import TodoItem from '@/components/TodoItem.vue';
export default {
    components: {
        AppHeader,
        GroupList,
        TodoItem,
    },
    data(){
        return{
            todoList: [],
            groupList: [],
            modGroupModal: false,
        }
    },
    methods:{
        addTodo(){
            
        },
        modGroup(key){
            console.log(key)
            this.modGroupModal = true;
        }
    },
    wtach: {
        todoList(oldVal, newVal){
            console.log(oldVal, newVal);
            return newVal;
        }
    },
    created(){
        
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

        &::-webkit-scrollbar{
            display: none;
        }

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
                padding: 0px 20px;
                border-radius: 10px 10px 0px 0px;
                background-color: #058FFF;

                position: relative;
                bottom: -24px;
                min-width: 160px;
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

                p{
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap;
                }
            }
        }
    }

    .btn_mod_group{
        margin-left: 10px;
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

    .mod_modal{
        z-index: 110;
        position: absolute;
        width:800px;
        height:1200px;
        box-shadow: 10px 10px rgba(0,0,0,.5);
        transform: translateY(1000px) rotate(0deg);
        transition-property: transform;
        transition-duration: .4s;

        &.activated{
            transform: translateY(280px) rotate(2deg);
        }
    }
</style>