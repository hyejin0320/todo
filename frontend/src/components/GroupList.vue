<template lang="">
    <ul>
        <GroupItem v-for="group in groupList" :grpItem="group" :key="group.key" @selectedItem="selectedItem"  @modGroup="modGroup"></GroupItem>
        <GroupItem :grpItem="addBtn" :key="1" @selectedItem="selectedItem" ref="addBtn"></GroupItem>
    </ul>
</template>
<script>
import GroupItem from '@/components/GroupItem.vue';
import { getRandomColor } from '@/utils/colorSet';
import { getSession } from '@/utils/session';
export default {
    components:{
        GroupItem,
    },
    data(){
        return{
            groupList: [
                // {
                //     key: 0,
                //     grpColor: '#058FFF',
                //     grpNm: '나의 TODO',
                //     grpIcon: 'alpha-m-box',
                //     selected: true,
                // },
                // {
                //     key: 1,
                //     grpColor: '#B1DD92',
                //     grpNm: '100자 정도 입력할 수 있는 TODO 리스트 제목. 솔직히 100자는 좀 너무함. 50자',
                //     grpIcon: 'alpha-m-box',
                //     selected: false,
                // }
            ],
            addBtn: {
                key: -1,
                grpColor: '#94afc5',
                grpNm: '새 그룹',
                grpIcon: 'plus',
                selected: false,
            },
        }
    },
    watch: {
        groupList(oldVal, newVal){
            console.log(oldVal, newVal);
        }
    },
    methods: {
        async selectedItem(key){
            //이전에 선택된 그룹 선택 해제
            const beforeSelectedIndex = this.groupList.findIndex(item => item.selected === true);
            if(beforeSelectedIndex > -1) this.groupList[beforeSelectedIndex].selected = false;

           //선택한 그룹이 추가 버튼일 경우
            if(key === -1){
                const newGrpSeq = await this.addGroup(this.addBtn);

                if(newGrpSeq){
                    let newItem = {...this.addBtn};
                    newItem.key = newGrpSeq;
                    newItem.grpIcon = 'alpha-n-box';
                    this.groupList.push(newItem);

                    this.addBtn.grpColor = getRandomColor(this.addBtn.grpColor);
                    this.addBtn.selected = false;

                    console.log(key)
                    key = newGrpSeq;
                    console.log(key)
                }
            }

            //그룹 선택 처리
            console.log(this.groupList)
            console.log(key)
            const selectedIndex = this.groupList.findIndex(item => item.key === key);
            this.groupList[selectedIndex].selected = true;

            const result = this.groupList.filter(item => item.key === key);
            const bgColor = result[0].grpColor;
            document.body.style.backgroundColor = bgColor;
        },
        async addGroup(newGroupData){
            try{
                const res = await this.$axios.post("http://localhost:3000/api/group/add", {
                    grpColor: newGroupData.grpColor,
                    grpNm: newGroupData.grpNm,
                    userId: getSession('userId')
                });

                if(res.data.success){
                    return res.data.response[0].GRP_SEQ;
                }else{
                    alert(res.data.response);
                    return null;
                }
            }catch(err){
                console.error(err);
                return null;
            }
        },
        modGroup(key){
            this.$emit('modGroup', key);
        },
        getGroupList(){
            const url = '/api/group/list';
            this.$axios(url, {
                params: {
                    userId: getSession('userId'),
                },
            }).then((res) => {
                if(res.data.success){
                    let groupList = res.data.response.groupList;
                    groupList[0].selected = true;
                    this.groupList = groupList;
                }
            }).catch((err) => {
                console.error(err);
            });
        },
    },
    mounted(){
        this.getGroupList();
    },
}
</script>
<style lang="">
    /*  */
</style>