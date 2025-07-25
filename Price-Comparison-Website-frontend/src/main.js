import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import store from './stores/store'
import axios from 'axios'

import 'element-plus/dist/index.css'

const app = createApp(App)

axios.defaults.baseURL = 'http://localhost:3000';
app.use(createPinia())
app.use(router)
app.use(store)

app.mount('#app')
