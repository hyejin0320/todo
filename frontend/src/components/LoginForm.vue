<template lang="">
    <div>
        <form @submit.prevent="submitForm" class="flex-column">
            <div class="logo flex-column">
                <p class="">TALK TODO</p>
            </div>
            <label>
                <input title="이메일" type="text" placeholder="이메일" v-model="userId" class="input_box_type_1"/>
            </label>
            <label class="icon_inside_input_root">
                <input title="비밀번호" :type="pwType" placeholder="비밀번호" v-model="password" class="input_box_type_1"/>
                <v-icon class="input_inner_icon" :icon="isSeenPw" @click="togglePwSeen"></v-icon>
            </label>
            <button type="submit" class="btn btn_type_1" :disabled="isDisabled">접속</button>
            <div>
                <button type="button" @click="signUp" class="btn btn_type_2">계정 등록</button>
                <div class="flex-row remember_id_checkbox">
                    <label class="flex-row input_checkbox">
                        <input type="checkbox" v-model="saveId">
                        <i></i>
                        <span>ID 기억하기</span>
                    </label>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
import { getSession } from '@/utils/session';
import { validationEmail } from '@/utils/validations';
export default {
    data(){
        return{
            userId: getSession('isAfterCreateAccount') ? getSession('userId') : '',
            password: '',
            passwordSeen: false,
            saveId: false,
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
            return this.isValidUserId() && this.password !== '' ? false : true;
        }
    },
    methods:{
        togglePwSeen(){
            this.passwordSeen = !this.passwordSeen;
        },
        signUp(){
            this.$router.push('/signup');
        },
        async submitForm(){
            try{
                const userData = {
                    userId: this.userId,
                    password: this.password,
                };

                await this.$store.dispatch('login', userData);
                this.$router.push('/group');
            }catch(error){
                console.log(error);
            }
        },
        isValidUserId(){
            return this.userId && validationEmail(this.userId);
        },
    },
    mounted(){
        const isAfterCreateAccount = getSession('isAfterCreateAccount');
        if(isAfterCreateAccount) this.userId = getSession('userId');
    }
}
</script>
<style lang="scss">
    .remember_id_checkbox{
        margin-top: 30px;
    }
</style>