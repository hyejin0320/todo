<template lang="">
    <li :style="{'background-color': bgColor}" :class="{selected: grpItem.selected}" @click="openGroup">
        <v-icon :icon="iconNm" size="small"></v-icon>
        <p>
            {{grpItem.grpNm}}
        </p>
    </li>
</template>
<script>
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
            bgColor: this.grpItem.grpColor,
            selectedItem: this.grpItem.selected,
        }
    },
    watch: {
        selectedItem(oldVal, newVal){
            console.log(this.selectedItem)
            console.log(oldVal, newVal);
        }
    },
    methods: {
        openGroup(){
            this.$emit('selectedItem', this.grpItem.key);
        }
    },
    mounted() {
        if(this.selectedItem){ //초기 값
            document.body.style.backgroundColor = this.bgColor;
        }
    },
}
</script>
<style lang="scss">
    /*  */
</style>