const pc = [
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
        component: () => import('@/views/pc/Main.vue'),
        meta: {
            keepAlive: false
        },
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('@/views/pc/Home.vue'),
                meta: {
                    keepAlive: true
                }
            },
            {
                path: '/promotion',
                name: 'promotion',
                component: () => import('@/views/pc/Promotion.vue'),
                meta: {
                    keepAlive: true
                }
            },
            {
                path: '/vip',
                name: 'vip',
                component: () => import('@/views/pc/Vip.vue'),
                meta: {
                    keepAlive: true
                }
            },
            {
                path: '/invite',
                name: 'invite',
                component: () => import('@/views/pc/Invite.vue'),
                meta: {
                    keepAlive: false
                }
            },
            {
                path: '/game',
                name: 'game',
                component: () => import('@/views/pc/Game.vue'),
                meta: {
                    keepAlive: false
                }
            },
            {
                path: '/startGame',
                name: 'startGame',
                component: () => import('@/views/pc/startGame.vue'),
                meta: {
                    keepAlive: false
                }
            },

            {
                path: '/transficationHistory',
                name: 'transficationHistory',
                component: () => import('@/views/pc/TransficationHistory.vue'),
                meta: {
                    keepAlive: false
                }
            },
            {
                path: '/wallet',
                name: 'wallet',
                component: () => import('@/views/pc/Wallet.vue'),
                meta: {
                    keepAlive: false
                }
            },
            {
                path: '/personalInfo',
                name: 'personalInfo',
                component: () => import('@/views/pc/PersonalInfo.vue'),
                meta: {
                    keepAlive: false
                }
            },
            {
                path: '/description',
                name: 'description',
                component: () => import('@/views/pc/Description.vue'),
                meta: {
                    keepAlive: false
                }
            },
            {
                path: '/deposit',
                name: 'deposit',
                component: () => import('@/views/pc/Deposit.vue'),
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
    }
]
export default pc
