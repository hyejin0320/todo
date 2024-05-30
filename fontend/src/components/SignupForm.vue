<template lang="">
    <div>
        <form @submit.prevent="submitSignup" class="flex-column">
            <div class="logo flex-column">
                <p class="">계정 등록</p>
            </div>
            <div class="icon_inside_input_root">
                <label>
                    <input type="text" v-model="userId" placeholder="이메일" class="input_box_type_1 input_userid">
                </label>
                <button type="button" @click="chkDuplicated" class="btn btn_type_1 chk_btn">중복검사</button>
            </div>
            <div>
                <label>
                    <input type="text" v-model="userName" placeholder="이름" class="input_box_type_1">
                </label>
            </div>
            <div>
                <label class="icon_inside_input_root">
                    <input title="비밀번호" :type="pwType" placeholder="비밀번호" v-model="password" class="input_box_type_1"/>
                    <v-icon class="input_inner_icon" :icon="isSeenPw" @click="togglePwSeen"></v-icon>
                </label>
            </div>
            <button type="submit" class="btn btn_type_1">계정등록</button>        
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
            passwordSeen: false,
        }
    },
    computed:{
        isSeenPw(){
            return this.passwordSeen ? 'mdi-eye-outline' : 'mdi-eye-off-outline';
        },
        pwType(){
            return this.passwordSeen ? 'text' : 'password';
        }
    },
    methods: {
        togglePwSeen(){
            this.passwordSeen = !this.passwordSeen;
        },
        chkDuplicated(){
            
        },
        submitSignup(){
            alert('signup');
        }
    },
}
</script>
<style lang="scss">
    html{
        background-color: #3988ff;
    }

    .chk_btn{
        width: unset !important;
        padding: 10px 20px !important;
    }

    .input_userid{
        width:300px;
        padding-right: 120px;
    }
</style>