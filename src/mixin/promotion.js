import { computed } from 'vue'
import { useStore } from "vuex"
import { useRouter } from 'vue-router'

export default function () {
    const { state, commit } = useStore()
    const router = useRouter()
    const promotion_list = computed(() => {
        return state.common.promotion_list
    })
    const goPromotionDetail = (data) => {
        commit('common/set_parse', data.content)
        router.push({
            path: '/description'
        })
    }
    return {
        promotion_list,
        goPromotionDetail
    }
}