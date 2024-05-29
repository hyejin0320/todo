<template lang="">
    <div>
        <form @submit.prevent="" class="flex-column">
            <label>
                <input title="이메일" type="text" placeholder="이메일" v-model="userId" class="input_box_type_1"/>
            </label>
            <label>
                <input title="비밀번호" type="password" placeholder="비밀번호" v-model="password" class="input_box_type_1"/>
            </label>
            <button type="submit" @click="signIn" class="btn btn_type_1">접속</button>
            <button type="submit" @click="signUp" class="btn btn_type_2">계정 등록</button>
        </form>
    </div>
</template>
<script>
export default {
    data(){
        return{
            userId: '',
            password: '',
            userIdSeen: false,
            passwordSeen: false,
        }
    },
    methods:{
        signIn(){

        },
        signUp(){

        },
        async submitForm(){
            try{
                const userData = {
                    userId: this.userId,
                    password: this.password,
                };

                await this.$store.dispatch('LOGIN', userData);
                this.$router.push('/group/list');
            }catch(error){
                console.log(error);
            }
        }
    }
}
</script>
<style lang="scss">
    html{}
</style>