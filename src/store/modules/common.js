import { getBanner, getHorse, getPromotionList } from '@/apis/common'

const common = {
    namespaced: true,
    state: () => ({
        show_withdraw_modal: false,
        show_promotion_modal: false,
        recomend_promotion: [],
        promotion_list: [],
        bc_banner: [],
        horse_info: "Bem-vindo ao pgslotj.com, esperamos que você tenha uma ótima experiência de jogo aqui.",
        withdraw_type: 1,
        parse: '',
        show_withdraw_tip: false,
        withdraw_tip_data: {}
    }),

    mutations: {
        set_withdraw_tip_data(state, val) {
            state.withdraw_tip_data = val
        },
        set_show_withdraw_tip(state, val) {
            state.show_withdraw_tip = val
        },
        set_show_withdraw_modal(state, val) {
            state.show_withdraw_modal = val
        },
        set_show_promotion_modal(state, val) {
            state.show_promotion_modal = val
        },
        set_recomend_promotion(state, val) {
            state.recomend_promotion = val
        },
        set_promotion_list(state, val) {
            state.promotion_list = val
        },
        set_bc_banner(state, val) {
            state.bc_banner = val
        },
        set_horse_info(state, val) {
            state.horse_info = val
        },
        set_parse(state, val) {
            state.parse = val
        },
        set_withdraw_type(state, val) {
            state.withdraw_type = val
        },
    },
    actions: {
        GET_COMMON_INFO(ctx) {
            getPromotionList.post("", {})
                .then(res => {
                    if (res.code == "000000") {
                        let arr = res.data.filter(item => {
                            return item.isEnable == '1'
                        })
                        ctx.commit('set_promotion_list', arr)
                        let recomend_promotion = []
                        arr.map(item => {
                            if (item.isRecommend == '1') {
                                item.type = 'promotion'
                                recomend_promotion.push(item)
                            }
                        })
                        ctx.commit('set_recomend_promotion', ctx.state.recomend_promotion.concat(recomend_promotion))
                        if (ctx.state.recomend_promotion.length > 0) ctx.commit('set_show_promotion_modal', true)
                    }
                })
            getBanner.post("", {})
                .then(res => {
                    if (res.code == "000000") {
                        const temp1 = []
                        const temp2 = []
                        res.data.map(item => {
                            if (item.location == 'BC') {
                                temp1.push(item.img)
                            } 
                        })
                        ctx.commit('set_bc_banner', temp1)
                    }
                })
            getHorse.post("", {})
                .then(res => {
                    if (res.code == "000000") {
                        if (res.data.length > 0) {
                            ctx.commit('set_horse_info', res.data[0].content)
                        }
                    }
                })

        }
    }
}

export default common

