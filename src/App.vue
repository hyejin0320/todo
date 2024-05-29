<template>
  <AppHeader v-if="isLogin"></AppHeader>
  <router-view></router-view>
</template>

<script>
import AppHeader from '@/components/common/AppHeader.vue'

export default {
  name: 'App',
  components: {
    AppHeader
  },
  data(){
    return{
      isLogin: this.$store.getters.isLogin,
    }
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
