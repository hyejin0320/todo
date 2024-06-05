<template lang="">
    <div>
        <form @submit.prevent="submitSignup" class="flex-column">
            <div class="logo flex-column">
                <p class="">계정 등록</p>
            </div>
            <div class="icon_inside_input_root">
                <label>
                    <input type="text" v-model="userId" placeholder="이메일" class="input_box_type_1 input_userid" :class="{input_userid_checked: isChkedDupl}">
                </label>
                <button type="button" :disabled="isDisabled" @click="chkDuplicated" 
                class="btn btn_type_1 chk_btn"
                :class="{btn_checked_icon: isChkedDupl}">
                <v-icon v-if="isChkedDupl" icon="mdi-checkbox-marked-circle-outline" size="small" class="chk_btn_icon"></v-icon>
                중복검사
            </button>
            </div>
            <div>
                <label>
                    <input type="text" v-model="userNm" placeholder="이름" class="input_box_type_1">
                </label>
            </div>
            <div>
                <label class="icon_inside_input_root">
                    <input title="비밀번호" :type="pwType" placeholder="비밀번호" v-model="password" class="input_box_type_1"/>
                    <v-icon class="input_inner_icon" :icon="isSeenPw" @click="togglePwSeen"></v-icon>
                </label>
            </div>
            <button type="submit" class="btn btn_type_1" :disabled="isValid">계정등록</button>        
        </form>
        <v-snackbar
        color="blue-lighten-4"
        v-model="isShowSnackbar">
            {{ snakbarUserId }}는(은) 사용할 수 없는 이메일 입니다.
            <template v-slot:actions>
                <v-btn variant="text" @click="isShowSnackbar=false">닫기</v-btn>
            </template>
        </v-snackbar>
    </div>
</template>
<script>
import { validationEmail } from '@/utils/validations';
import { setSession } from '@/utils/session';
export default {
    data(){
        return{
            userId: '',
            userNm: '',
            password: '',
            passwordSeen: false,
            isChkedDupl: false,
            isShowSnackbar: false,
            snakbarUserId: '',
        }
    },
    computed:{
        isSeenPw(){
            return this.passwordSeen ? 'mdi-eye-outline' : 'mdi-eye-off-outline';
        },
        pwType(){
            return this.passwordSeen ? 'text' : 'password';
        },
        isDisabled(){
            return this.isValidUserId() && !this.isChkedDupl ? false : true;
        },
        isValid(){
            return this.userId !== '' && this.userNm !== '' && this.password !== '' && this.isChkedDupl ? false : true;
        },
    },
    watch:{
        userId(newVal, oldVal){
            if( newVal !== oldVal) this.isChkedDupl = false;
        }
    },
    methods: {
        togglePwSeen(){
            this.passwordSeen = !this.passwordSeen;
        },
        chkDuplicated(){
            this.$axios.get('http://localhost:3000/api/user/duplicated', {
                params: {
                    userId: this.userId,
                },
            }).then((res) => {
                if(res.data.success && !(res.data.response[0].cnt > 0)) this.isChkedDupl = true;
                else {
                    this.isShowSnackbar = true;
                    this.snakbarUserId = this.userId;
                }
            }).catch((err) => {
                console.error(err);
            });
        },
        submitSignup(){
            this.$axios.post('http://localhost:3000/api/user/add', {
                userId: this.userId,
                userNm: this.userNm,
                password: this.password,
            }).then((res) => {
                if(res.data.success){
                    setSession('userId', this.userId);
                    setSession('isAfterCreateAccount', true);
                    this.$router.go(-1);
                }
            }).catch((err) => {
                console.error(err);
            });
        },
        isValidUserId(){
            return this.userId && validationEmail(this.userId);
        },
    },
}
</script>
<style lang="scss">
    .chk_btn{
        width: unset !important;
        padding: 10px 20px !important;
    }

    .chk_btn_icon{
        top: -1px;
        fill:  #1d72f2;
        width:6px;
        height:6px;
    }

    .input_userid{
        width:306px;
        padding-right: 114px;
    }

    .input_userid_checked{
        width: 288px;
        padding-right: 132px;
    }
</style>