<template lang="">
    <li 
        class="ctg_item" 
        :class="{btn_add_category: ctgItem.key === -1}"
        :draggable="isReadMode && isShowDeleteBtn && ctgItem.key !== -1" 
        @mouseenter="mouseEnterEvent"
        @mouseleave="mouseLeaveEvent"
        @dragstart="dragStartEvent"
    >
        <div class="category_tag_wrap">
            <div class="category_tag_content">
                <div 
                    class="category_tag_text read_mode" 
                    @click="toggleMode"
                    v-if="isReadMode"
                >
                    {{this.ctgNm}}
                </div>
                <input 
                    class="category_tag_text write_mode" 
                    v-model="ctgNm"
                    v-if="!isReadMode"
                    ref="categoryTextInput"
                    @focusout="changeCategoryText"
                >
                <div class="category_tag_color"></div>
                <div 
                    class="btn_x" 
                    v-if="isReadMode && isShowDeleteBtn && ctgItem.key !== -1"
                    @click="delCategoryItem"
                >X</div>
            </div>
        </div>

        <!-- <ul class="category_tag_color_list">
            <li 
                v-for="color of colorList"
                :key="color"
                class="category_tag_color_item"
                :style="{'background-color': color.color}"
            >
            </li>
        </ul> -->
    </li>
</template>
<script>
import { getColorSet } from '@/utils/colorSet';
export default {
    props: {
        ctgItem: {
            type: Object,
            required: true,
        }
    },
    data(){
        return{
            isReadMode: true,
            ctgSeq: this.ctgItem.key,
            ctgNm: this.ctgItem.ctgNm,
            isShowDeleteBtn: false,
            colorList: [],
        } 
    },
    methods: {
        toggleMode(){
            if(this.ctgSeq !== -1){
                this.isReadMode = !this.isReadMode;
                this.$nextTick(()=>{
                if (!this.isReadMode && this.$refs.categoryTextInput) {
                    this.$refs.categoryTextInput.focus();
                }
            });
            }
        },
        async changeCategoryText(){
            this.isReadMode = true;
            if(this.ctgItem.ctgNm !== this.ctgNm){
                try{    
                    const res = await this.$axios.post('/api/group/category/modify', {
                        ctgSeq: this.ctgSeq,
                        ctgNm: this.ctgNm,
                    });

                    if(res.data.success){
                        console.log(res.data.ctgInfo)
                        this.$emit('setCategoryItem', this.ctgSeq, res.data.ctgInfo);
                    }else{  
                        console.log(res);
                    }
                }catch(err){
                    console.error(err);
                }
            }
        },
        mouseEnterEvent(){
            this.isShowDeleteBtn = true;
        },
        dragStartEvent(){
            this.isShowDeleteBtn = false;
        },
        mouseLeaveEvent(){
            this.isShowDeleteBtn = false;
        },
        async delCategoryItem(){
            try{
                const res = await this.$axios.post('/api/group/category/delete', {
                    ctgSeq: this.ctgSeq,
                });

                if(res.data.success){
                    this.$emit('delCategoryItem', res.data.ctgSeq);
                }else{
                    console.log(res.data.message);
                }
            }catch(err){
                console.error(err);
            }
        }
    },
    mounted(){
        this.colorList = getColorSet();
    }
}
</script>
<style lang="scss">
    .ctg_item{
        display: inline-block;
        margin-left: 30px;
        border-radius: 6px;

        font-size: 0px;
        vertical-align: bottom;

        &:nth-child(1){
            margin-left: 0px;
        }


        &:nth-last-child(1){
            margin-right: 30px;
        }

        &.btn_add_category{
            opacity: .5;
            
            .category_tag_content > .read_mode{
                cursor: pointer;
            }

            &:hover{
                opacity: 1;
            }
        } 

        &:not(.btn_add_category){
            .category_tag_content > .read_mode{
                cursor: text;
            }
        }

        .category_tag_wrap{
            display: inline-block;
        }

        .category_tag_content{
            position: relative;
            width: 140px;
            display: flex;
            flex-direction: row;

            .category_tag_text{
                padding: 0px;
                margin: 0px;

                &.read_mode{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-grow: 2.5;

                    width: 102px;
                    max-width: 102px;
                    height: 50px;

                    background-color: #eee;
                    border-radius: 6px 0px 0px 6px;
                    overflow: hidden;

                    font-family: "Gowun Dodum", sans-serif;
                    font-size: 16px;
                }

                &.write_mode{
                    flex-grow: 2.5;
                    padding: 0px;
                    margin: 0px;

                    width: min-content;
                    max-width: 102px;
                    height: 50px;

                    background-color: #eee;
                    border-radius: 6px 0px 0px 6px;
                    overflow: hidden;

                    font-family: "Gowun Dodum", sans-serif;
                    font-size: 16px;
                    text-align: center;

                    resize: none;
                    overflow: hidden;
                    box-sizing: border-box;
                    border: none;

                    &:focus{
                        outline: none;
                        border: none;
                    }
                }

                box-shadow: 4px 4px rgba(0,0,0, .3);
            }

            .category_tag_color{
                height: 50px;
                flex-grow: 1;
                background-color: #ff4949;
                border-radius: 0px 6px 6px 0px;
                box-shadow: 4px 4px rgba(0,0,0, .3);

                cursor: pointer;
            }

            .category_tag_icon{
                color: #3d0808;
            }

            .btn_x{
                position: absolute;
                top: -10px;
                right: -10px;
                font-size: 14px;
                background-color: #eee;
                width: 22px;
                text-align: center;
                height: 22px;
                border-radius: 100%;
                cursor: pointer;
            }
        }

        .category_tag_color_list{
            position: absolute;
            top: 30px;
            background-color: #fff;
            border-radius: 10px;
            padding: 10px;
            transform: translateX(-50%);

            .category_tag_color_item{
                display: inline-block;
                width: 30px;
                height: 30px;
                border-radius: 100%;
                list-style-type: none;
            }
        }
    }


    .category_tag_close{
        float:right;
        color: #eee;
        position: relative;
        top: 10px;
        width: 30;
        height: 30px;
        top: 10px;
        margin-left: 20px;
        background-color: transparent;

    }

</style>