import { createApp } from 'vue'
import { store } from './store'
import { List, PullRefresh, Button, RadioGroup, Radio, Field, CellGroup, Uploader, Image as VanImage, Toast } from 'vant'
import 'vant/lib/index.css'
// normalize.css
import 'normalize.css/normalize.css'
// 全局样式
import './styles/index.less'
// tailwindcss
import './styles/tailwind.css'
// svg icon
import 'virtual:svg-icons-register'

import App from './App.vue'
import router from './router'
import '@/assets/nomarl.css'
const app = createApp(App)
app.use(store)
app.use(router)
app.use(List)
app.use(PullRefresh)
app.use(Button)
app.use(Radio)
app.use(RadioGroup)
app.use(Field)
app.use(CellGroup)
app.use(Uploader)
app.use(VanImage)
app.use(Toast)
app.mount('#app')
