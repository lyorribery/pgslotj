import { reactive, ref, onMounted } from 'vue'
import { useStore } from "vuex"
import { getTransficationList } from "@/apis/user"

export default function () {
    const { state, dispatch } = useStore()
    const hasNext = ref(0)
    const params = reactive({
        pageNum: 1,
        pageSize: 10,
        memberId: state.permission.user_infos.id,
        type: ""
    })
    const getList = () => {
        isLoading.value = true
        params.type = type.value == 0 ? 1 : 2
        getTransficationList.post("", { ...params })
            .then(res => {
                isLoading.value = false
                if (res.code == "000000") {
                    historyList.data = historyList.data.concat(res.data.data.list)
                    hasNext.value = res.data.data.hasNextPage ? 1 : 0
                } else if (res.code == "888888") {
                    dispatch('permission/RESET_PERMISSION')
                }
            })
    }
    const isLoading = ref(false)
    const type = ref(0)
    const historyList = reactive({
        data: [

        ]
    })
    const changePageType = (index) => {
        if (index == type.value) return
        type.value = index
        historyList.data = []
        params.pageNum = 1
        getList()
    }
    const loadmore = () => {
        params.pageNum += 1
        getList()
    }
    onMounted(() => {
        getList()
    })
    return {
        type,
        isLoading,
        historyList,
        hasNext,
        changePageType,
        loadmore
    }
}