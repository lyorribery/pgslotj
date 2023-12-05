import { getUserInfo, exit, getWallet, payConfig, getCoupon, getMailList } from '@/apis/user'
import { loopNotice } from '@/utils/utils'
// import { sockets } from '@/utils/socket'

const permission = {
    namespaced: true,
    state: () => ({
        user_device: 'h5',
        is_login: false,
        show_spin: false,
        roulette_num: 0,
        permission_modal: {
            show: false,
            type: ''
        },
        user_infos: {},
        wallet_infos: {
            bcAvailableBalance: 0,
            bcFreezeBalance: 0,
            fundAvailableBalance: 0,
            fundFreezeBalance: 0
        },
        coupon_list: [],
        mail_list: [],
        pay_config: [],
        fund_list: []
    }),
    mutations: {
        set_user_device(state, val) {
            state.user_device = val
        },
        set_is_login(state, val) {
            // if (!val) sockets.closeWs()
            state.is_login = val
        },
        set_show_spin(state, val) {
            state.show_spin = val
        },
        set_roulette_num(state, val) {
            state.roulette_num = val
        },
        show_permission_modal(state, val) {
            state.permission_modal = val
        },
        set_user_infos(state, val) {
            state.user_infos = val
        },
        set_wallet_infos(state, val) {
            state.wallet_infos = val
        },
        set_coupon_list(state, val) {
            state.coupon_list = val
        },
        set_mail_list(state, val) {
            state.mail_list = val
        },
        set_pay_config(state, val) {
            state.pay_config = val
        },
        set_fund_list(state, val) {
            state.fund_list = val
        }
    },
    actions: {
        GET_WALLET_INFO(ctx) {
            getWallet.post("", {})
                .then(res => {
                    if (res.code == '000000') {
                        ctx.commit('set_wallet_infos', res.data)
                    } else {
                        ctx.dispatch('RESET_PERMISSION')
                    }
                })
        },
        GET_USER_INFO(ctx) {
            getUserInfo.post("", {})
                .then(res => {
                    if (res.code == "000000") {
                        ctx.commit('set_user_infos', res.data)
                        ctx.commit('set_is_login', true)
                        loopNotice(true)
                        // sockets.openWs()
                        ctx.commit('set_roulette_num', Number(res.data.rouletteTimes))
                        if (Number(res.data.rouletteTimes) > 0) ctx.commit('set_show_spin', true)
                        // ctx.dispatch('GET_COUPON_LIST')
                        // ctx.dispatch('GET_MAIL_LIST')
                    } else {
                        ctx.dispatch('RESET_PERMISSION')
                    }
                }).catch(err => {
                    ctx.dispatch('RESET_PERMISSION')
                })
        },
        GET_PAY_CONFIG(ctx) {
            payConfig.post("", {})
                .then(res => {
                    if (res.code == "000000") {
                        ctx.commit('set_pay_config', res.data)
                    } else {
                        ctx.dispatch('RESET_PERMISSION')
                    }
                }).catch(err => {
                    ctx.dispatch('RESET_PERMISSION')
                })
        },
        GET_COUPON_LIST(ctx) {
            getCoupon.post("", {})
                .then(res => {
                    if (res.code == "000000") {
                        ctx.commit('set_coupon_list', res.data.list)
                    } else {
                        ctx.dispatch('RESET_PERMISSION')
                    }
                })
        },
        GET_MAIL_LIST(ctx) {
            getMailList.post("", {})
                .then(res => {
                    if (res.code == "000000") {
                        ctx.commit('set_mail_list', res.data.list)
                    } else {
                        ctx.dispatch('RESET_PERMISSION')
                    }
                })
        },
        EXIT_LOGIN(ctx) {
            exit.post("", {})
                .then(() => {
                    ctx.dispatch('RESET_PERMISSION')
                })
        },
        RESET_PERMISSION(ctx) {
            if (localStorage.getItem('token')) localStorage.removeItem('token')
            ctx.commit('set_is_login', false)
            ctx.commit('set_user_infos', {})
            loopNotice(false)
        }
    }
}

export default permission

