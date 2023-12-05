import { get_home_game_list } from '@/apis/game'

const game = {
    namespaced: true,
    state: () => ({
        game_company: [
            {
                icon: 'https://vencer77.com/images/pg1.png',
                id: 27,
                name: "PG"
            }, 
            // {
            //     icon: 'https://vencer77.com/images/pp1.png',
            //     id: 26,
            //     name: "PRAGMATIC PLAY",
            // }, 
            // {
            //     icon: 'https://vencer77.com/images/FC_Logo.png',
            //     id: 28,
            //     name: "FC"
            // },
            // {
            //     icon: 'https://vencer77.com/images/JILI.png',
            //     id: 29,
            //     name: "JILI"
            // }
        ],
        home_game_list: []
    }),
    mutations: {
        set_home_game_list(state, val) {
            state.home_game_list = val
        },
    },
    actions: {
        GET_HOME_GAME_LIST(ctx) {
            get_home_game_list.post("", {})
                .then(res => {
                    if (res.code == "000000") {
                        ctx.commit('set_home_game_list', res.data.gameList)
                    }
                })
        }
    }
}

export default game