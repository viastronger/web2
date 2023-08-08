import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/index.scss'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import directive from '@/directives'

const app = createApp(App)

directive(app)

app.use(ElementPlus)
app.use(store)
app.use(router)
app.mount('#app')

