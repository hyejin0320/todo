<template lang="">
    <div class="wrapper login">
        <LoginForm></LoginForm>
        <v-snackbar
        v-model="isShowSnackbar"
        :timeout="3000"
        >
            회원가입이 완료되었습니다.
            <template v-slot:actions>
                <v-btn variant="text" @click="setHidden">Close</v-btn>
            </template>
        </v-snackbar>
    </div>
</template>
<script>
import LoginForm from '@/components/LoginForm.vue';
import { getSession, deleteSession } from '@/utils/session';
export default {
    components:{
        LoginForm,
    },
    data(){
        return{
            isShowSnackbar: false,
        }
    },
    watch:{
        isShowSnackbar(oldVal, newVal){
            if(newVal === false){
                deleteSession('isAfterCreateAccount');
            }
        }
    },
    methods: {
        setHidden(){
            this.isShowSnackbar = false;
        },
    },
    mounted(){
        const isAfterCreateAccount = getSession('isAfterCreateAccount');
        if(isAfterCreateAccount) this.isShowSnackbar = isAfterCreateAccount;
    }
}
</script>
<style lang="scss">
      html{
        background-color: #058FFF;
    }
</style>