<template lang="">
    <li class="ctg_item" :class="{btn_add_category: ctgItem.key === -1}">
        <div class="category_tag_content">
            <div 
                class="category_tag_text read_mode" 
                @click="toggleMode"
                v-if="isReadMode"
            >
                {{ctgItem.ctgNm}}
            </div>
            <input 
                class="category_tag_text write_mode" 
                v-model="ctgNm"
                v-if="!isReadMode"
                ref="categoryTextInput"
                @focusout="changeCategoryText"
            >
            <div class="category_tag_color">
                
            </div>
        </div>
    </li>
</template>
<script>
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
            ctgNm: this.ctgItem.ctgNm
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
        changeCategoryText(){
            if(this.ctgItem.ctgNm !== this.ctgNm){
                try{    
                    const res = this.$axios.post('/api/group/category/modify', {
                        ctgSeq: this.ctgSeq,
                        ctgNm: this.ctgNm,
                    });

                    if(res.data.success){
                        const ctgInfo = {
                            ctgNm: this.ctgNm,
                        }
                        this.$emit('setCategoryItem', this.ctgSeq, ctgInfo);
                    }else{  
                        console.log(res);
                    }
                }catch(err){
                    console.error(err);
                }
            }
        }
    },
    mounted(){

    }
}
</script>
<style lang="scss">
    .ctg_item{
        display: inline-block;
        margin-left: 30px;
        width: 140px;
        height: 50px;

        background-color: #fff;
        box-shadow: 4px 4px rgba(0,0,0, .3);
        border-radius: 6px;

        font-size: 16px;
        vertical-align: bottom;

        &:nth-last-child(1){
            margin-right: 30px;
        }

        &.btn_add_category{
            opacity: .5;

            &:hover{
                opacity: 1;
            }
        }  

        .category_tag_content{
            width: 100%;
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
                    cursor: text;
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
            }

            .category_tag_color{
                height: 50px;
                flex-grow: 1;
                background-color: #ff4949;
                border-radius: 0px 6px 6px 0px;

                cursor: pointer;
            }

            .category_tag_icon{
                color: #3d0808;
            }
        }
    }

    /* .ctg_item{
        display: inline-block;
        background-color: #fff;
        margin-left: 100px;
        padding: 40px;
        min-width: 60px;
        height:340px;
        box-shadow: 10px 10px rgba(0,0,0, .3);
        transition-property: transform;
        transition-duration: .2s;

        &:nth-last-child(1){
            margin-right: 100px;
        }
    } */

</style>