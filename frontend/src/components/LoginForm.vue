<template lang="">
    <div>
        아무값 : {{newUserId}}
        <form @submit.prevent="" class="flex-column">
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
            <button type="submit" @click="signIn" class="btn btn_type_1">접속</button>
            <button type="submit" @click="signUp" class="btn btn_type_2">계정 등록</button>
        </form>
    </div>
</template>
<script>
export default {
    props: {
        newUserId: {
            type: String,
            default: '아무값이나..',
            required: false,
        }
    },
    data(){
        return{
            userId: this.newUserId,
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
    methods:{
        togglePwSeen(){
            this.passwordSeen = !this.passwordSeen;
        },
        signIn(){
            this.userId = this.newUserId;
            console.log(this.newUserId, this.userId)
            alert('signIn');
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
    html{
        background-color: #3988ff;
    }
</style>