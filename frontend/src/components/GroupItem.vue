<template lang="">
    <li :style="{'background-color': grpColor}" :class="{selected: grpItem.selected === true}" @click="openGroup">
        <v-icon :icon="iconNm" size="small"></v-icon>
        <p>
            {{grpItem.grpNm}}
        </p>
        <v-icon v-if="grpItem.key !== -1" icon="mdi-pencil" size="small" class="btn_mod_group" @click="modGroup"></v-icon>
    </li>
</template>
<script>
import { getRandomColor } from '@/utils/colorSet';
export default {
    props:{
        grpItem: {
            type: Object,
            require: true,
        }
    },
    data(){
        return{
            iconNm: this.grpItem.grpIcon ? 'mdi-' + this.grpItem.grpIcon : null,
            selectedItem: this.grpItem.selected === true,
        }
    },
    computed: {
        grpColor(){
            return this.grpItem.grpColor ? this.grpItem.grpColor : getRandomColor();
        },
    },
    watch: {
        selectedItem(oldVal, newVal){
            console.log(this.selectedItem)
            console.log(oldVal, newVal);
        },
    },
    methods: {
        openGroup(){
            this.$emit('selectedItem', this.grpItem.key);
        },
        modGroup(){
            this.$emit('modGroup', this.grpItem.key);
        },
    },
    mounted() {
         //초기 값 배경 화면 색 변경
        if(this.selectedItem){
            document.body.style.backgroundColor = this.grpColor;
        }
    },
}
</script>
<style lang="scss">
    /*  */
</style>