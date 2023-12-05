const mobile = [
  {
    path: '/',
    redirect: '/home',
    meta: {
      keepAlive: false
    }
  },

  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/mobile/Main.vue'),
    meta: {
      keepAlive: false
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/mobile/Home.vue'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/promotion',
        name: 'promotion',
        component: () => import('@/views/mobile/Promotion.vue'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/vip',
        name: 'vip',
        component: () => import('@/views/mobile/Vip.vue'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/invite',
        name: 'invite',
        component: () => import('@/views/mobile/Invite.vue'),
        meta: {
          keepAlive: false
        }
      },
      {
        path: '/game',
        name: 'game',
        component: () => import('@/views/mobile/Game.vue'),
        meta: {
          keepAlive: false
        }
      },

      {
        path: '/transficationHistory',
        name: 'transficationHistory',
        component: () => import('@/views/mobile/TransficationHistory.vue'),
        meta: {
          keepAlive: false
        }
      },
      {
        path: '/wallet',
        name: 'wallet',
        component: () => import('@/views/mobile/Wallet.vue'),
        meta: {
          keepAlive: false
        }
      },
      {
        path: '/personalInfo',
        name: 'personalInfo',
        component: () => import('@/views/mobile/PersonalInfo.vue'),
        meta: {
          keepAlive: false
        }
      }
    ]
  },

  {
    path: '/startGame',
    name: 'startGame',
    component: () => import('@/views/mobile/startGame.vue'),
    meta: {
      keepAlive: false
    }
  },

  {
    path: '/description',
    name: 'description',
    component: () => import('@/views/mobile/Description.vue'),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/deposit',
    name: 'deposit',
    component: () => import('@/views/mobile/Deposit.vue'),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/pgslot',
    name: 'pgslot',
    component: () => import('@/views/pgslot.vue'),
    meta: {
      keepAlive: false
    }
  }
]

export default mobile
