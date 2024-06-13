<template lang="">
    <AppHeader></AppHeader>
    <div class="index_list">
        <GroupList 
            ref="groupListComponent" 
            @openModGroupModal="openModGroupModal" 
            @openDelGroupModal="openDelGroupModal"
            @getTodoList="getTodoList"
        ></GroupList>
    </div>
    <div class="wrapper">
        <transition-group :name="transitionNm" tag="ul" class="todo_list" @scroll="handleScroll">
            <TodoItem 
                v-for="todo in todoList" 
                :key="todo.key" 
                :todoItem="todo" 
                @setTodoItem="setTodoItem" 
                @delTodoItem="delTodoItem"
                ref="todoItem"
            ></TodoItem>
        </transition-group>
        <div class="member_list">MEMBER</div>
        <div class="btn_add_todo"
            @click="addTodo"
        >CREATE NEW TODO</div>

        <div class="mod_modal group_modal" :class="{activated: modGroupModal}">
            <div class="mod_modal_color_set">
                <label 
                    v-for="color in colorList"
                    :key="color.color" 
                    :style="{'background-color': color.color}"
                    :class="{activated: color.activated}"
                    @click="changeBgColor(color.color)"
                >
                    <input type="radio" name="">
                </label>
            </div>
            <div class="mod_modal_group_name">
                <div class="mod_modal_outer_box">
                    <span>
                        <input class="mod_modal_input_grp_nm" maxlength="50" v-model="grpNm">
                    </span>
                </div>
            </div>
            <div class="mod_modal_btns right">
                <button class="btn_no" type="button" @click="closeModGroupModal">안 바꿈</button>
                <button class="btn_yes" type="button" @click="modGroup">바꿈</button>
            </div>
        </div>
        <div class="del_modal group_modal" :class="{activated: delGroupModal}">
            <div class="del_modal_title">
                CAUTION
            </div>
            <div class="del_modal_content">
                삭제하시겠습니까?<br>
                그룹 내에서 작성된 Todo 리스트가 모두 삭제됩니다.
            </div>
            <div class="del_modal_btns">
                <button class="btn_no" @click="closeDelGroupModal">안됨</button>
                <button class="btn_yes" @click="delGroup">OK</button>
            </div>
        </div>
        <div class="alert_modal" :class="{activated: alertModal}">
            <button class="btn_no" @click="closeAlertModal">X</button>
            <div class="alert_modal_content">
                {{alertModalContent}}
            </div>
        </div>
        <div class="modal_bg" :class="{activated: isVisibledModal}" @click="closeModal"></div>
    </div>
</template>
<script>
import AppHeader from '@/components/common/AppHeader.vue';
import GroupList from '@/components/GroupList.vue';
import TodoItem from '@/components/TodoItem.vue';
import { getSession } from '@/utils/session.js';
import { getColorSet } from '@/utils/colorSet';
export default {
    components: {
        AppHeader,
        GroupList,
        TodoItem,
    },
    data(){
        return{
            todoList: [],
            colorList: getColorSet(),
            grpSeq: '',
            grpNm: '',
            grpColor: '',
            modGroupModal: false,
            delGroupModal: false,
            alertModal: false,
            alertModalContent: '',
            scrollTimeOut: null,
            prevScrollLeft: 0,
            transitionNm: 'upDown',
        }
    },
    computed: {
        isVisibledModal(){
            return this.modGroupModal || this.delGroupModal || this.alertModal;
        }
    },
    methods:{
        async openModGroupModal(key){
            this.modGroupModal = true;

            try{
                const res = await this.$axios.get('/api/group/detail', {
                    params:{
                        grpSeq: key,
                    }
                });

                if(res.data.success){
                    this.grpNm = res.data.grpNm;
                    this.grpSeq = res.data.grpSeq;
                    this.grpColor = res.data.grpColor;

                    this.colorList = getColorSet(res.data.grpColor);
                }else{
                    return console.error(res);
                }
            }catch(err){
                console.error(err);
            }
        },
        closeModGroupModal(){
            if(this.grpSeq && this.grpColor){
                document.body.style.backgroundColor = this.grpColor;
                this.$refs.groupListComponent.setGroupItem(this.grpSeq, null, this.grpColor);
            }
            this.modGroupModal = false;
        },
        async modGroup(){
            const changedColor = this.colorList[this.colorList.findIndex(item => item.activated === true)].color;
            if(this.grpColor !== changedColor) this.grpColor = changedColor;
            try{
                const res = await this.$axios.post('/api/group/modify', {
                    grpSeq: this.grpSeq,
                    grpNm: this.grpNm,
                    grpColor: this.grpColor,
                });

                if(res.data.success){
                    this.$refs.groupListComponent.setGroupItem(this.grpSeq, this.grpNm, this.grpColor);
                    this.modGroupModal = false;
                }
            }catch(err){
                console.error(err);
            }
        },
        async openDelGroupModal(key){
            this.grpSeq = key;
            this.delGroupModal = true;
        },
        closeDelGroupModal(){
            this.delGroupModal = false;
        },
        async delGroup(){
            try{    
                const res = await this.$axios.post('/api/group/delete', {
                    grpSeq: this.grpSeq,
                });

                if(res.data.success){
                    this.$refs.groupListComponent.delGroupItem(this.grpSeq);
                    this.delGroupModal = false;
                    this.alertModal = true;
                    this.alertModalContent = res.data.message;
                }else{
                    this.delGroupModal = false;
                    this.alertModal = true;
                    this.alertModalContent = res.data.message;
                }
            }catch(err){
                console.error(err);
            }
        },
        closeAlertModal(){
            this.alertModal = false;
        },
        closeModal(){
            if(this.modGroupModal) this.closeModGroupModal();
            if(this.delGroupModal) this.closeDelGroupModal();
            if(this.alertModal) this.closeAlertModal();
        },
        async getTodoList(key, transitionNm){
            this.transitionNm = transitionNm;
            console.log(transitionNm+': \n'+ new Date)
            this.grpSeq = key;
            try{
                const res = await this.$axios.get('/api/todo/list', {
                    params:{
                        grpSeq: key,
                    },
                });

                if(res.data.success){
                    this.todoList = res.data.todoList;
                    this.$nextTick(()=>{
                        this.transitionNm = 'fade';
                        console.log('fade: \n'+ new Date)
                    });
                }else{
                    console.log(res.data.message);
                }
            }catch(err){
                console.error(err);
            }
        },
        async addTodo(){
            try{
                const res = await this.$axios.post('/api/todo/add', {
                    userId: getSession('userId'),
                    grpSeq: this.grpSeq,
                });

                if(res.data.success){
                    this.todoList.unshift(res.data.todoInfo);
                }else{
                    this.alertModal = true;
                    this.alertModalContent = res.data.message;
                }
            }catch(err){
                console.error(err);
            }
        },
        setTodoItem(todoSeq, todoText){
            const todoIndex = this.todoList.findIndex(item => item.key === todoSeq);
            this.todoList[todoIndex].text = todoText;
        },
        delTodoItem(todoSeq){
            const todoIndex = this.todoList.findIndex(item => item.key === todoSeq);
            this.todoList.splice(todoIndex, 1);
        },
        changeBgColor(color){
            const beforeColorIndex = this.colorList.findIndex(item => item.activated === true);
            const afterColorIndex = this.colorList.findIndex(item => item.color === color);
            this.colorList[beforeColorIndex].activated = false;
            this.colorList[afterColorIndex].activated = true;
            document.body.style.backgroundColor = color;
            this.$refs.groupListComponent.setGroupItem(this.grpSeq, null, color);
        },
        handleScroll(e){
            const scrollLeft =  e.target.scrollLeft;
            console.log(scrollLeft, e.target.scrollWidth)
            let scrollRotate = 0;
            if(this.prevScrollLeft < scrollLeft) scrollRotate = -10;
            else scrollRotate = 10;

            this.$refs.todoItem.forEach(elem => {
                elem.rootTodoRotate = scrollRotate;
            });

            this.prevScrollLeft = scrollLeft;

            if(this.scrollTimeOut){
                clearTimeout(this.scrollTimeOut);
            }

            this.scrollTimeOut = setTimeout(() => {
                this.$refs.todoItem.forEach(elem => {
                    elem.rootTodoRotate = 0;
                })
            }, 30);
        }
    },
    created(){
        
    },
    mounted(){

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
                flex: none;
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

                /* p{
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap;
                } */
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
        z-index: 120;
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

        transition: transform .1s, bottom .1s, visibility 0s linear .3s;

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
        display: block;
        position: relative;
        list-style-type: none;
        width: 100%;
        height:700px;
        overflow-x: scroll;
        overflow-y: hidden;
        text-wrap: nowrap;
        left: 0px;

        &::-webkit-scrollbar{
            display: none;
        }
    }

    /* .fade-move{
        transition: .1s;
    }

    .fade-enter-active{
        transition: opacity .1s linear .2s, left .2s linear .2s;
        opacity: 0;
        left: 100px;
    }

    .fade-enter{
        transform: scale(2);
        opacity: 0;
        left: 100px;
    }

    .fade-enter-to{
        transform: scale(1);
        opacity: 1;
        left: 0px;
    }

    .fade-leave-active {
        transition: opacity .2s, right .2s;
        opacity: 1;
        right: 0px;
    }
    
    .fade-leave{
        opacity: 1;
        right: 0px;
    }
    
    .fade-leave-to{
        opacity: 0;
        right: 100px;
    } */


    .fade-move,
    .fade-enter-active,
    .fade-leave-active {
        transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
        transform: translate(30px, 0px);
    }

    .fade-leave-active {
        position: absolute;
    }

    .upDown-leave-active {
        transition: all 0.2s;
        opacity: 1;
        top: 100px;
    }

    .upDown-leave-to {
        opacity: 0;
        top: 120px;
    }

    .upDown-enter-active{
        transition: all 0.2s linear 0.2s;
        opacity: 0;
        top: 40px;
    }
    
    .upDown-enter{
        top: 40px;
    }

    .upDown-enter-to{
        opacity: 1;
        top: 100px;
    }

    .mod_modal{
        z-index: 110;
        position: absolute;

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-content: center;

        width: 800px;
        height: 30px;

        transform: translateY(1200px) rotate(-30deg);
        transition-property: transform;
        transition-duration: .8s;
        transition-timing-function: ease;

        &.activated{
            transform: translateY(-180px) rotate(3deg);
        }

        .mod_modal_color_set{
                position: absolute;
                z-index: 100;
                top: -40px;
                right: 20px;
                display: flex;
                gap: 20px;
                flex-direction: row-reverse;

                label{
                    width:60px;
                    height: 70px;
                    box-shadow: 10px 10px rgba(0,0,0, .3);
                    border: 10px solid #fff;

                    transition-property: transform;
                    transition-duration: .1s;
                    transition-timing-function: ease-in-out;
                    cursor: pointer;
                    
                    &.activated{
                        transform: translateY(-30px);
                    }

                    &:hover{
                        transform: translateY(-30px);
                    }
                }

                input[type=radio]{
                    display: none;
                }
            }

        .mod_modal_group_name{
            position: absolute;
            z-index: 110;
            width:800px;
            height:200px;
            background-color: #fff;
            border-radius: 6px;
            box-shadow: 10px 10px rgba(0,0,0,.3);

            .mod_modal_outer_box{
                border: 1px solid #f00;
                height: 158px;
                margin: 20px;

                &::before{
                    pointer-events : none;
                    position: absolute;
                    top: 12px;
                    left: 12px;
                    content: '';
                    width: 96.8%;
                    height: 87%;
                    border: 1px solid #f00;
                }

                &>span{
                    height:100%;
                    display: flex;
                    justify-content: center;
                }

                .mod_modal_input_grp_nm{
                    border: none;
                    min-width: 600px;
                    cursor: text;
                    overflow: hidden;
                    text-overflow: ellipsis;

                    font-size: 30px;
                    font-family: "Gowun Dodum", sans-serif;
                    text-align: center;
                    outline: none;
                }
            }
        }

        .mod_modal_btns{
            position: absolute;
            z-index: 110;
            top: 180px;

            button{
                position: absolute;
                border:none;
                font-size: 20px;
                font-family: "Gowun Dodum", sans-serif;
                font-weight: bold;
                cursor: pointer;
            }

            &.left{
                left: 20px;

                button{
                    &.btn_delete{
                        width: 80px;
                        height: 80px;
                        transform: rotate(-3deg);
                        top: -20px;
                        left: 20px;
                        background-color: #fff;

                        &:hover{
                            transform: translateY(-10px) rotate(-3deg);
                            box-shadow: 10px 16px rgba(0,0,0,.3);
                        }

                        .btn_delete_icon{
                            color: #f00;
                        }
                    }
                }
            }

            &.right{
                right: 20px;

                button{
                    width: 200px;
                    height: 80px;
                    bottom: -60px;

                    &.btn_yes{
                        right: 16px;
                        transform: rotate(2deg);
                        background-color: #eee;
                        box-shadow: 6px 6px rgba(0,0,0, .3);

                        &:hover{
                            transform: translateY(-10px) rotate(2deg);
                            box-shadow: 10px 16px rgba(0,0,0,.3);
                        }
                    }   

                    &.btn_no{
                        right: 250px;
                        transform: rotate(-6deg);
                        background-color: #eee;
                        box-shadow: 6px 6px rgba(0,0,0, .3);

                        &:hover{
                            transform: translateY(-10px) rotate(-6deg);
                            box-shadow: 10px 16px rgba(0,0,0,.3);
                        }
                    }
                }
            }
        }
    }

    .del_modal{
        z-index: 110;
        position: absolute;

        width: 500px;
        height: 280px;

        background-color: #fff;
        box-shadow: 10px 10px rgba(0,0,0,.3);

        transform: translateY(1200px) rotate(20deg);
        transition-property: transform;
        transition-duration: .8s;
        transition-timing-function: ease;

        &.activated{
            transform: translateY(-130px) rotate(-1deg);
        }

        .del_modal_title{
            position: absolute;
            top: -50px;
            left: -50px;
            padding: 40px;
            height: 30px;
            font-weight: bold;
            font-size: 20px;
            font-family: "Gowun Dodum", sans-serif;
            background-color: rgba(255, 244,79, 1);
            transform: rotate(-10deg);
            box-shadow: 6px 6px rgba(0,0,0,.3);
        }

        .del_modal_content{
            font-family: "Gowun Dodum", sans-serif;
            margin-top: 90px;
            text-align: center;
        }

        .del_modal_btns{
            position: absolute;
            bottom: 100px;

            button{
                position: absolute;
                width: 120px;
                height: 50px;
                border: none;
                padding: 10px;

                font-size: 30px;
                /* font-weight: bold; */
                font-family: "Gowun Dodum", sans-serif;

                background-color: transparent;

                cursor: pointer;

                &:hover{
                    color: #f00;
                }

                &.btn_no{
                    left: 10px;
                    transform: rotate(2deg);
                }

                &.btn_yes{
                    top:4px;
                    left: 370px;
                    transform: rotate(-2deg);
                }
            }
        }
    }

    .alert_modal{
        z-index: 110;
        position: absolute;

        display: flex;
        flex: none;
        align-items: center;
        justify-content: center;

        width: 300px;
        height: 320px;

        background-color: rgba(255, 244,79, 1);
        box-shadow: 10px 10px rgba(0,0,0,.3);

        transform: translateY(1200px) rotate(20deg);
        transition-property: transform;
        transition-duration: .8s;
        transition-timing-function: ease;

        font-size: 24px;
        font-family: "Gowun Dodum", sans-serif;

        &.activated{
            transform: translateY(-130px) rotate(-4deg);
        }

        button{
            cursor: pointer;

            &.btn_no{
                position: absolute;
                top: 24px;
                right: 30px;
                background-color: transparent;
                border: none;

                font-size: 20px;
                font-family: "Gowun Dodum", sans-serif;
                font-weight: bold;

                &:hover{
                    color: '#f00';
                }
            }
        }
    }

    .modal_bg{
        z-index: 109;
        display: none;
        position: absolute;
        width: 100%;
        height: 100%;
        top:0px;
        left: 0px;
        background-color: #000;
        opacity: 0;

        transition: opacity .3s linear 1s;
        transition-timing-function:ease-in-out;

        &.activated{
            display: block;
            opacity: .3;
            /* backdrop-filter: blur(2px); */ /*눈 피로감이 심각해서 사용할 수 없음..*/
        }
    }
</style>