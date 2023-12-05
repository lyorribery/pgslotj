import { ref, onMounted, computed, nextTick } from 'vue'
import { useStore } from "vuex"
import { useRouter } from "vue-router"

export default function () {
    const { state } = useStore()
    const router = useRouter()
    const window_width = ref(0)
    const pc_width = ref(0)
    onMounted(() => {
        window_width.value = window.innerWidth
        getQueryString()
    })
    const banner = computed(() => {
        return state.common.bc_banner
    })
    const game_company = state.game.game_company
    const home_game_list = computed(() => {
        if (state.game.home_game_list.length > 0 && state.permission.user_device != 'h5') {
            nextTick(() => {
                pc_width.value = document.getElementsByClassName("content-item")[0].offsetWidth
            })
        }
        return state.game.home_game_list
    })
    const goGame = (id, name) => {
        router.push({
            path: '/game',
            query: {
                categoryId: id,
                categoryName: name
            }
        })
    }
    const goProviderGame = (id, name) => {
        router.push({
            path: '/game',
            query: {
                companyId: id,
                companyName: name
            }
        })
    }
    const getQueryString = () => {
        var url = window.location.href
        if (url.indexOf("?") != -1) {
            var dz_url = ''
            if (url.indexOf('#') > -1) {
                dz_url = url.split('#')[0]
            } else {
                dz_url = url
            }
            var cs = dz_url.split('?')[1]
            if (cs.indexOf('code') > -1) {
                localStorage.setItem('r_code', cs.split('=')[1])
            } else {
                var cs_arr = cs.split('&')
                var cs = {}
                for (var i = 0; i < cs_arr.length; i++) {
                    cs[cs_arr[i].split('=')[0]] = cs_arr[i].split('=')[1]
                }
                if (cs.pixel && this.isRealNum(cs.pixel)) {
                    localStorage.setItem('promotionSourceJson', JSON.stringify([{
                        pixel: cs.pixel,
                        fbclid: cs.fbclid,
                        cid: cs.c_id,
                        client_user_agent: navigator.userAgent
                    }]))
                    localStorage.setItem('promotionSource', cs.from)
                }
            }
        }
    }
    const goGroup = () => {
        location.href = 'https://t.me/+Nw4yxAsTvD44YzMx'
    }

    const horse_info = computed(() => {
        return state.common.horse_info;
    })

    return {
        banner,
        game_company,
        home_game_list,
        window_width,
        pc_width,
        horse_info,
        goGame,
        goProviderGame,
        goGroup
    }
}