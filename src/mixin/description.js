import { computed } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import apiConfig from "@/utils/apiConfig"

export default function () {
    const base_img_url = apiConfig.fileURL
    const router = useRouter()
    const { state } = useStore()
    const parse = computed(() => {
        return state.common.parse
    })
    const closeParse = () => {
        router.go(-1)
    }
    return {
        base_img_url,
        closeParse,
        parse
    }
}