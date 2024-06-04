<template lang="">
    <button class="back_control" @click="backLogin">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-250 -960 960 960" fill="#5f6368"><path d="M400-80 0-480l400-400 56 57-343 343 343 343-56 57Z"/></svg>
        <p>뒤로 가기</p>
    </button>
    <div class="wrapper">
        <SignupForm></SignupForm>
    </div>
</template>
<script>
import SignupForm from '@/components/SignupForm.vue';
export default {
    components:{
        SignupForm,
    },
    methods:{
        backLogin(){
            this.$router.go(-1);
        }
    }
}
</script>
<style lang="scss">
      html{
        background-color: #058FFF;
    }
</style>