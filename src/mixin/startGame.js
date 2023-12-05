import { reactive, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { startAWC, checkIsCollection, collectionGame, cancelCollection, startGS } from '@/apis/game'
import { showNotify } from '@nutui/nutui'

export default function () {
    const route = useRoute()
    const router = useRouter()
    const { state, dispatch } = useStore()
    const gameCompanyId = ref('')
    const cur_data = reactive({
        name: '',
        id: '',
        mobileIcon: '',
        gameCode: "",
        gameType: "",
        memberId: "",
        mobileLogin: "",
        platform: ""
    })
    const loading = ref(false)
    const iframe_loading = ref(false)
    const game_url = ref('')
    const iframe_height = ref(0)
    const isCollection = ref(0)
    onMounted(() => {
        iframe_height.value = state.permission.user_device == 'h5' ? document.documentElement.clientHeight : document.documentElement.clientHeight - 180
        gameCompanyId.value = JSON.parse(route.query.gameOptions).gameCompanyId
        cur_data.name = JSON.parse(route.query.gameOptions).name
        cur_data.id = JSON.parse(route.query.gameOptions).id
        cur_data.gameCode = JSON.parse(route.query.gameOptions).gameCode
        cur_data.gameType = JSON.parse(route.query.gameOptions).gameType
        cur_data.mobileIcon = JSON.parse(route.query.gameOptions).mobileIcon
        cur_data.platform = JSON.parse(route.query.gameOptions).gameCode.split('-')[0]
        cur_data.mobileLogin = state.permission.user_device == 'h5' ? true : false
        cur_data.memberId = state.permission.user_infos.id
        checkCollection()
    })
    const collectionLoading = ref(false)
    const checkCollection = () => {
        checkIsCollection.post("", { gameId: cur_data.id, way: 'C' })
            .then(res => {
                collectionLoading.value = false
                if (res.code == "000000") {
                    isCollection.value = res.data
                } else if (res.code == "888888") {
                    dispatch('permission/RESET_PERMISSION')
                    back()
                }
            })
    }
    const changeCollection = () => {
        if (collectionLoading.value) return
        collectionLoading.value = true
        if (isCollection.value == 1) {
            cancelCollection.post("", { gameId: cur_data.id, way: 'C' })
                .then(res => {
                    if (res.code == "000000") {
                        checkCollection()
                    } else if (res.code == "888888") {
                        dispatch('permission/RESET_PERMISSION')
                        back()
                    }
                })
        } else {
            collectionGame.post("", { gameId: cur_data.id, way: 'C' })
                .then(res => {
                    if (res.code == "000000") {
                        checkCollection()
                    } else if (res.code == "888888") {
                        dispatch('permission/RESET_PERMISSION')
                        back()
                    }
                })
        }

    }
    const back = () => {
        router.go(-1)
    }
    const start = () => {
        // const game_arr = [
        //     "https://m.pgsoft-games.com/89/index.html?l=id&ot=ca7094186b309ee149c55c8822e7ecf2&btt=2&from=https://&language=id-ID&__refer=m.pg-redirect.net&or=static.pgsoft-games.com&utm_medium=social",
        //     "https://m.pgsoft-games.com/98/index.html?l=id&ot=82b8b0f88e17ae53611e6dd7f167bc38&btt=2&from=&language=id-ID&__refer=m.pg-redirect.net&or=static.pgsoft-games.com",
        //     "https://m.pgsoft-games.com/68/index.html?l=id&ot=82b8b0f88e17ae53611e6dd7f167bc38&btt=2&from=&language=id-ID&__refer=m.pg-redirect.net&or=static.pgsoft-games.com",
        //     "https://m.pgsoft-games.com/130/index.html?l=id&ot=82b8b0f88e17ae53611e6dd7f167bc38&btt=2&from=&language=id-ID&__refer=m.pg-redirect.net&or=static.pgsoft-games.com",
        //     "https://m.pgsoft-games.com/26/index.html?l=id&ot=ca7094186b309ee149c55c8822e7ecf2&btt=2&from=https://&language=id-ID&__refer=m.pg-redirect.net&or=static.pgsoft-games.com&utm_medium=social",
        //     "https://m.pgsoft-games.com/103/index.html?l=id&ot=ca7094186b309ee149c55c8822e7ecf2&btt=2&from=https://&language=id-ID&__refer=m.pg-redirect.net&or=static.pgsoft-games.com",
        //     "https://m.pgsoft-games.com/65/index.html?l=id&ot=ca7094186b309ee149c55c8822e7ecf2&btt=2&from=https://&language=id-ID&__refer=m.pg-redirect.net&or=static.pgsoft-games.com&utm_medium=social"
        // ]

        // const i = Math.floor((Math.random() * game_arr.length))

        // if (state.permission.user_device == 'h5') {
        //     location.href = game_arr[i]
        // } else {
        //     game_url.value = game_arr[i]
        // }
        // return

        if (loading.value) return
        loading.value = true
        // startAWC.post("", {
        //     ...cur_data
        // }).then(res => {
        //     loading.value = false
        //     if (res.code == "000000") {
        //         collectionGame.post("", { gameId: cur_data.id, way: 'N' })
        //         if (state.permission.user_device == 'h5') {
        //             location.href = res.data
        //         } else {
        //             game_url.value = res.data
        //         }
        //     } else if (res.code == "888888") {
        //         dispatch('permission/RESET_PERMISSION')
        //         back()
        //     } else if (res.code == "999999") {
        //         showNotify.danger('El juego no está disponible temporalmente, juega otro juego.')
        //     }
        // })


        startGS.post("", {
            gameID: cur_data.gameCode,
            gameType: Number(cur_data.gameType),
            platform: state.permission.user_device == 'h5' ? 1 : 0,
            productID: gameCompanyId.value == 1 ? 1006 : 1007
        }).then(res => {
            loading.value = false
            if (res.code == "000000") {
                collectionGame.post("", { gameId: cur_data.id, way: 'N' })
                if (state.permission.user_device == 'h5') {
                    location.href = res.data
                } else {
                    game_url.value = res.data
                }
            } else if (res.code == "888888") {
                dispatch('permission/RESET_PERMISSION')
                back()
            } else if (res.code == "999999") {
                showNotify.danger('El juego no está disponible temporalmente, juega otro juego.')
            }
        })
    }

    const iframeRef = ref(null)
    const iframeLoad = () => {
        const iframe = iframeRef
        iframe.onload = () => { iframe_loading.value = false }
    }
    return {
        cur_data,
        loading,
        iframe_loading,
        game_url,
        iframe_height,
        iframeRef,
        isCollection,
        changeCollection,
        back,
        start,
    }
}