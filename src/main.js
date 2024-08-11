import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import axios from 'axios'
import '@mdi/font/css/materialdesignicons.css'


const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(vuetify)
app.component('VueDatePicker', VueDatePicker)

app.config.globalProperties.$axios = axios

app.mount('#app')