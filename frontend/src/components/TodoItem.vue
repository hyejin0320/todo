<template lang="">
    <li 
        class="todo_item" 
        :key="todoItem.key" 
        :style="{transform: 'rotate('+rootTodoRotate+'deg)'}"
    >
        <!-- 핀 랜덤 배치.. -->
        <!-- <label class="chk_pin" :style="{left: randomDistance(0, 200)+'px', top: randomDistance(-60, -40)+'px'}"> -->
        <div draggable="true"
            class="category_tag" 
            :class="{isMoved: isMovedCategory}"
            :style="{transform: 'rotate('+categoryTagRotate+'deg)'}" 
            v-if="todoItem.category"
            @dragstart="categoryTagDragStartEvent($event)"
            @dragend="categoryTagDragEndEvent($event)"
        >
            <div class="category_tag_content">
                <div class="category_tag_text">
                    {{todoItem.category}}
                </div>
                <div class="category_tag_color">
                    
                </div>
            </div>
        </div>
        <label class="chk_pin" :style="{left: chkPinDistance+'px'}" @click.prevent="setCompTodo">
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
        <div class="todo_is_comp_label_2" style="display: none;">
            파격세일
        </div>
        <div class="todo_is_comp_label" style="display: none;">
            <div class="todo_is_comp_label_title">
                결재선
            </div>
            <div class="todo_is_comp_label_content" 
                :style="{transform: 'rotate('+nameTagRotate+'deg)'}">
                {{todoItem.chkoutLine}}
            </div>
        </div>
        <div class="name_tag style_2 ps_2" :style="{transform: 'rotate('+nameTagRotate+'deg)'}">
            <div class="name_tag_content">
                {{todoItem.userId}}
            </div>
        </div>
        <p class="todo_text read_mode" v-if="isReadMode" @click="toggleMode">
            {{todoItem.text}}
        </p>
        <textarea class="todo_text write_mode" v-if="!isReadMode" v-model="todoText" @focusout="changeTodoText" ref="todoTextInput" maxlength="72"></textarea>
        <p class="todo_regDt">
            2024.06.12 (수) 00:00
            <!-- {{todoItem.regDt}} -->
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
            todoSeq: this.todoItem.key,
            // rootTodoRotate: this.randomDeg(4),
            rootTodoRotate: 0,
            categoryTagRotate: this.randomDeg(2),
            chkPinDistance: this.randomDistance(110, 130),
            nameTagRotate: this.randomDeg(4),
            todoText: this.todoItem.text,
            isReadMode: true,
            isMovedCategory: false,
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
        },
        async setCompTodo(){
            try{
                const res = await this.$axios.post('/api/todo/delete', {
                    todoSeq: this.todoSeq,
                });

                console.log(res)
                if(res.data.success){
                    this.$emit('delTodoItem', this.todoSeq);
                }else{
                    console.log(res.data.message)
                }
            }catch(err){
                console.error(err);
            }
        },
        toggleMode(){
            this.isReadMode = !this.isReadMode;
            this.$nextTick(()=>{
                if (!this.isReadMode && this.$refs.todoTextInput) {
                    this.$refs.todoTextInput.focus();
                }
            });
        },
        async changeTodoText(){
            if(this.todoItem.text !== this.todoText){
                try{
                    const res = await this.$axios.post('/api/todo/modify', {
                        todoSeq: this.todoSeq,
                        todoText: this.todoText,
                    });

                    console.log(res)
                    if(res.data.success){
                        this.$emit('setTodoItem', this.todoSeq, this.todoText);
                    }else{
                        console.log(res.data.message);
                    }
                }catch(err){
                    console.error(err);
                }
            }

            this.toggleMode();
        },
        categoryTagDragStartEvent(){
            this.isMovedCategory = true;
        },
        categoryTagDragEndEvent(){
            this.isMovedCategory = false;
        },
    }
}
</script>
<style lang="scss">
    .todo_item{
        display: inline-block;
        background-color: #fff;
        margin-left: 100px;
        padding: 40px;
        min-width: 240px;
        width: 240px;
        height:340px;
        position:relative;
        top:100px;
        box-shadow: 10px 10px rgba(0,0,0, .3);
        transition-property: transform;
        transition-duration: .2s;

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

        &:hover{
            i:not(:nth-last-child(-n+4)){
                transform: translateY(-6px);
            }

            i:nth-last-child(5){
                height:66px;
            }

            i:nth-last-child(3){
                transform: scale(.9);
            }
        }

        i{
            display: block;
            position: absolute;
            pointer-events: none;
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

        white-space: pre-wrap;

        &.read_mode{
            font-family: "Gowun Dodum", sans-serif;
            font-size: 20px;
            position:relative;
            top: 54px;
            left:0px;
            height: 174px;
            overflow: hidden;
            overflow-wrap: anywhere;
            cursor: text;
        }

        &.write_mode{
            font-family: "Gowun Dodum", sans-serif;
            font-size: 20px;
            position:relative;
            top: 51px;
            left:-3px;
            width: calc(100% + 10px);
            height: 174px;
            resize: none;
            overflow: hidden;
            box-sizing: border-box;

            &:focus{
                outline: none;
                border: 1px double #f00;
            }
        }
    }

    .todo_regDt{
        display: block;
        position: absolute;
        bottom: 40px;
        right: 40px;
        font-size: 14px;
        font-family: "Gowun Dodum", sans-serif;
    }

    .name_tag{

        &.ps_1{
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: absolute;
            top: -30px;
            right: -30px;
        }

        &.ps_2{
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: absolute;
            bottom: 72px;
            right: 36px; 
        }

        &.style_1{
            height: 60px;

            background-color: #ccc;
            box-shadow: 4px 4px rgba(0,0,0, .3);
            border-radius: 6%;
            transform: rotate(10deg);
        }

        &.style_2{
            height: 40px;

            background-color: #fff;
            box-shadow: 2px 2px rgba(0,0,0, .3);
            border: 4px solid #ff4949;
            border-radius: 6%;
            transform: rotate(10deg);

            &::before{
                position: absolute;
                left: 3px;
                top: 3px;
                content: '';
                border: 1px solid #ff4949;
                height: 32px;
                width: 122px;
                pointer-events: none;
            }
        }
        

        .name_tag_content{
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
            width: 90px;
            height: 0px;
            background-color: #fff;
            overflow: hidden;

            font-size: 16px;
            font-family: "Gowun Dodum", sans-serif;
        }
    }

    .category_tag{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 20px;
        right: -40px;
        width: 140px;
        height: 50px;

        background-color: #fff;
        box-shadow: 4px 4px rgba(0,0,0, .3);
        border-radius: 6px;
        transform: rotate(10deg);
        cursor: grab;

        &.isMoved{
            opacity: .5;
            cursor: grab;

            &:active{
                cursor: grabbing;
            }
        }

        .category_tag_content{
            width: 100%;
            display: flex;
            flex-direction: row;

            .category_tag_text{
                display: flex;
                justify-content: center;
                align-items: center;
                flex-grow: 2.5;

                width: min-content;
                height: 50px;

                background-color: #eee;
                border-radius: 6px 0px 0px 6px;
                overflow: hidden;

                font-family: "Gowun Dodum", sans-serif;
            }

            .category_tag_color{
                height: 50px;
                flex-grow: 1;
                background-color: #ff4949;
                border-radius: 0px 6px 6px 0px;
            }

            .category_tag_icon{
                color: #3d0808;
            }
        }
    }

    .todo_is_comp_label{
        display: flex;
        align-items: center;
        flex-direction: column;

        position: absolute;
        bottom: 40px;
        left: 40px;

        width: 80px;
        height: 80px;

        border: 1px solid #684f4f;

        .todo_is_comp_label_title{
            width: 100%;
            text-align: center;
            border-bottom: 1px solid #684f4f;

            font-size: 14px;
            color: #684f4f;
        }

        .todo_is_comp_label_content{
            flex-grow: 1;
            display: flex;
            justify-content: center;
            align-items: center;

            font-family: "Gowun Dodum", sans-serif;
            font-size: 18px;
            color: #684f4f;
        }   
    }

    .todo_is_comp_label_2{
        display: flex;
        align-items: center;

        position: absolute;
        bottom: 46px;
        left: 40px;

        width: 70px;
        height: 70px;

        border-radius: 100%;
        border: 8px solid #ff4949;

        color: #ff4949;
        font-size: 28px;
        font-family: "Black Han Sans", sans-serif;;
        line-height: 28px;
        text-align: center;
    }
</style>