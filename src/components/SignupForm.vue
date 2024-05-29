<template lang="">
    <div>
        <form @submit.prevent="submitSignup">
            <table>
                <tr>
                    <td>이메일</td>
                    <td>
                        <label>
                            <input type="text" v-model="userId" placeholder="이메일">
                        </label>
                        <button type="button" @click="chkDuplicated">중복검사</button>
                    </td>
                </tr>
                <tr>
                    <td>이름</td>
                    <td>
                        <label>
                            <input type="text" v-model="userName" placeholder="이름">
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>비밀번호</td>
                    <td>
                        <label>
                            <input type="text" v-model="password" placeholder="비밀번호">
                        </label>
                    </td>
                </tr>
                <tr aria-rowspan="2">
                    <button type="submit" class="btn btn_type_1">계정등록</button>
                </tr>
            </table>
        </form>
    </div>
</template>
<script>
export default {
    data(){
        return{
            userId: '',
            userName: '',
            password: '',
        }
    },
    methods: {
        chkDuplicated(){
            alert('click');
        },
        submitSignup(){
            alert('signup');
        }
    },
}
</script>
<style lang="scss">
    
</style>