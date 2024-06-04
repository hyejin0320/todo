<template lang="">
    <ul>
        <GroupItem v-for="group in groupList" :grpItem="group" :key="group.key" @selectedItem="selectedItem"></GroupItem>
        <GroupItem :grpItem="addBtn" :key="1"></GroupItem>
    </ul>
</template>
<script>
import GroupItem from '@/components/GroupItem.vue';
export default {
    components:{
        GroupItem,
    },
    data(){
        return{
            groupList: [
                {
                    key: 0,
                    grpColor: '#058FFF',
                    grpNm: '나의 TODO',
                    grpIcon: 'alpha-m-box',
                    selected: true,
                },
                {
                    key: 1,
                    grpColor: '#B1DD92',
                    grpNm: '나의 TODO 2',
                    grpIcon: 'alpha-m-box',
                    selected: false,
                }
            ],
            addBtn: {
                key: -1,
                grpColor: '#6bb3ee',
                grpNm: '새 그룹',
                grpIcon: 'plus',
                selected: false,
            },
        }
    },
    methods: {
        selectedItem(key){
            //배열에서 선택 내용 변경
            const beforeSelectedIndex = this.groupList.findIndex(item => item.selected === true);
            const selectedIndex = this.groupList.findIndex(item => item.key === key);
            this.groupList[beforeSelectedIndex].selected = false;
            this.groupList[selectedIndex].selected = true;

            const result = this.groupList.filter(item => item.key === key);
            const bgColor = result[0].grpColor;
            document.body.style.backgroundColor = bgColor;
        }
    }
}
</script>
<style lang="">
    /*  */
</style>