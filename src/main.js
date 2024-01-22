import { createApp } from 'vue'
// import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import "@/assets/scss/global.scss";
import router from '@/router';
import App from './App.vue'

const app = createApp(App)

app
.use(router)
.mount('#app')
