import { createRouter, createWebHashHistory } from 'vue-router'
import mobile from './mobile/mobile'
import pc from './pc/pc'
import { loopNotice } from '@/utils/utils'
// import { sockets } from '@/utils/socket'

const isMobile = () => {
  const flag = navigator.userAgent.match(
    /(phone|iPhone|iPod|ios|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows phone)/i
  )
  return flag
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: isMobile() ? mobile : pc
})

router.beforeEach((to, from, next) => {
  if (from.path == '/startGame') {
    loopNotice(true)
    // sockets.openWs()
  }
  if (to.path == '/startGame') {
    loopNotice(false)
    // sockets.closeWs()
  }
  const token = localStorage.getItem('token')
  if (!token) {
    if (to.path == '/startGame' || to.path == '/partnerDetail') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
