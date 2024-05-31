import { createApp } from 'vue';
import App from './App.vue'
import router from '@/routes/index';
import store from '@/store/index';
import axios from 'axios';
import mitt from 'mitt';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import "@mdi/font/css/materialdesignicons.css";

const vuetify = createVuetify({
    components,
    directives,
    icons: 'mdi',
});

const app = createApp(App);
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$foo = 'bar';

const emitter = mitt();
app.config.globalProperties.emitter = emitter;

app.use(vuetify).use(router).use(store).mount('#app');