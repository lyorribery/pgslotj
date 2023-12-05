import { createApp } from 'vue'
import './utils/noscale.js'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
// import Vconsole from 'vconsole'

import { Locale, Tabbar, TabbarItem, Noticebar, Popup, Badge, Animate, Popover, Swiper, SwiperItem, Input, Image, Backtop, Form, FormItem, Notify, Picker, Dialog, Progress, Radio, RadioGroup, Tabs, TabPane, Elevator, Grid, GridItem } from "@nutui/nutui"
import "@nutui/nutui/dist/style.css"

import './assets/iconfont/iconfont.css'
import './assets/styles/common.scss'
import animated from 'animate.css'

import enUS from '@nutui/nutui/dist/packages/locale/lang/en-US'
Locale.use('en-US', enUS)
// let vConsole = new Vconsole()
const app = createApp(App)

app.use(Tabbar)
app.use(TabbarItem)
app.use(Noticebar)
app.use(Popup)
app.use(Badge)
app.use(Animate)
app.use(Popover)
app.use(Swiper)
app.use(SwiperItem)
app.use(Input)
app.use(Image)
app.use(Backtop)
app.use(Form)
app.use(FormItem)
app.use(Notify)
app.use(Picker)
app.use(Dialog)
app.use(Progress)
app.use(RadioGroup)
app.use(Radio)
app.use(Tabs)
app.use(TabPane)
app.use(Elevator)
app.use(Grid)
app.use(GridItem)
// app.use(vConsole)

app.use(router).use(store).use(i18n).mount('#app')
