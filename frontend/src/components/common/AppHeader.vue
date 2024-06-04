<template lang="">
    <div class="header">
        <div class="logo">
            <p>TODO PICK</p>
        </div>
        <button class="logout" @click="logout">
            <v-icon icon="mdi-logout-variant"></v-icon>
            <p>LOGOUT</p>
        </button>
    </div>
</template>
<script>
export default {
    methods:{
        logout(){
            this.$router.replace('/');
        },
    }
}
</script>
<style lang="scss">
    .logo{
        margin-left: 20px;
        margin-bottom: 0px !important;
        margin-top: 10px;
    }

    .logout{
        display: flex;
        gap: 4px;
        
        position: absolute;
        top: 30px;
        right: 20px;
        font-size: 20px;
        font-weight: bold;
        color: #fff;

        background-color: transparent;
        border: 0px;
        cursor: pointer;

        &:hover{
            color:rgba(255,255,255, .5);
        }
    }

    .header{
        position: absolute;
        top: 0;
        width:100%;
    }
</style>