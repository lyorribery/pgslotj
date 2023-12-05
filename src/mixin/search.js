import { ref, reactive, onMounted, nextTick, watch, computed } from 'vue'
import { useStore } from "vuex"
import { getGameList } from '@/apis/game'

export default function () {
    onMounted(() => {
        window_width.value = window.innerWidth
    })
    const window_width = ref(0)
    const pc_width = ref(0)
    const { state } = useStore()
    const searchKey = ref('')
    watch(searchKey, (newval, oldval) => {
        if (newval) getkey(newval)
    }, { immediate: true, deep: true })
    const search_show = ref(false)
    const showSearchLoading = ref(false)
    const showSearch = () => {
        search_show.value = !search_show.value
        if (search_show.value) {
            nextTick(() => {
                pc_width.value = document.getElementsByClassName("seggested-game-list")[0].offsetWidth
            })
        }
    }
    const closeSearch = () => {
        showSearch()
        searchKey.value = ''
        showSearchLoading.value = false
    }
    const getkey = (val) => {
        if (showSearchLoading.value) return
        if (val.length >= 3) {
            showSearchLoading.value = true
            getGameList.post("", {
                pageNum: 1,
                pageSize: 100,
                name: searchKey.value
            }).then(res => {
                showSearchLoading.value = false
                if (res.code == "000000") {
                    suggestedList.data = res.data.list
                }
            }).catch(err => {
                showSearchLoading.value = false
            })
        } else {
            suggestedList.data = state.game.home_game_list[1].game.filter((item, index) => {
                return index < 6
            })
        }
    }
    const suggestedList = reactive({
        data: []
    })
    const home_game_list = computed(() => {
        return state.game.home_game_list
    })
    watch(home_game_list, (newval, oldval) => {
        if (newval.length > 0) suggestedList.data = state.game.home_game_list[1].game.filter((item, index) => {
            return index < 6
        })
    }, { immediate: true, deep: true })
    return {
        suggestedList,
        searchKey,
        search_show,
        showSearchLoading,
        window_width,
        pc_width,
        showSearch,
        closeSearch,
        getkey
    }
}