<template lang="">
    <div class="wrapper login">
        //
        {{newUserId}}
        //
        <LoginForm :newUserId="isChangedUserId"></LoginForm>
        <v-snackbar
        :timeout="1000"
        v-model="isShowSnackbar">
            계정이 등록되었습니다.
            <template v-slot:actions>
                <v-btn variant="text" @click="isShowSnackbar=false">Close</v-btn>
            </template>
        </v-snackbar>
    </div>
</template>
<script>
import LoginForm from '@/components/LoginForm.vue';
export default {
    components:{
        LoginForm,
    },
    data(){
        return{
            newUserId: '123',
            isShowSnackbar: false,
        }
    },
    computed:{
        isChangedUserId(){
            console.log(this.newUserId);
            return this.newUserId ? this.newUserId : '';
        }
    },
    mounted() {
        const setUserId = (userId) => {
            console.log(userId);
            this.newUserId = userId;
            console.log(this.newUserId)
            this.emitter.off('signupCompleted', setUserId);
        };

        this.emitter.on('signupCompleted', setUserId);
    },
}
</script>
<style lang="scss">
    
</style>