import { createApp } from 'vue';
import App from './App.vue'
import router from '@/routes/index';
import store from '@/store/index';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import "@mdi/font/css/materialdesignicons.css";

const vuetify = createVuetify({
    components,
    directives,
    icons: 'mdi',
});


createApp(App).use(vuetify).use(router).use(store).mount('#app');