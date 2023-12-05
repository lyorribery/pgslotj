import { reactive, onActivated, computed, watch } from 'vue'
import { useStore } from "vuex"
import { getVipGrade } from '@/apis/common'
import { getVipMutiple } from '@/apis/user'

export default function () {

    const { state } = useStore()
    const show_level = computed(() => {
        return state.permission.is_login
    })

    const vip_info = reactive({
        name: '',
        hasMultiple: 0,
        needMultiple: 0,
        nextMultiple: 0
    })
    const list = reactive({
        data: []
    })
    const cur_level = reactive({
        dayRedPaper: 0,
        weekRedPaper: '',
        monthRedPaper: '',
        upgradeRedPaper: ''
    })
    const listGrade = reactive({
        data: []
    })
    const getFormatDate = () => {
        const myDate = new Date()
        const cur_date = myDate.toLocaleDateString().split('/').join('-')

        myDate.setDate(1)
        const cTime = new Date(new Date(myDate).toLocaleDateString()).getTime()
        let date1 = new Date(cTime)
        let year = date1.getFullYear()
        let month = date1.getMonth() + 1
        let day = date1.getDate()
        month = month < 10 ? "0" + month : month
        day = day < 10 ? "0" + day : day
        const cur_month_start = year + '-' + month + '-' + day
        return {
            startDate: cur_month_start,
            endDate: cur_date
        }

    }
    const getUserVipInfo = () => {
        getVipMutiple.post("", getFormatDate())
            .then(res => {
                vip_info.hasMultiple = res.data.vipInfo.hasMultiple
                vip_info.needMultiple = res.data.vipInfo.needMultiple
                vip_info.nextMultiple = res.data.vipInfo.nextMultiple
                vip_info.name = state.permission.user_infos.vipLevelId
                res.data.vipReadPaper.map((item, index) => {
                    for (let i in res.data.vipRakeback) {
                        if (i == index) {
                            item.dayRedPaper = res.data.vipRakeback[i].ratio * 100
                            break
                        }
                    }
                })
                list.data = res.data.vipReadPaper
                for (let i in list.data) {
                    if (list.data[i].vipName == 'VIP' + vip_info.name) {
                        cur_level.dayRedPaper = list.data[i].dayRedPaper
                        cur_level.weekRedPaper = list.data[i].weekRedPaper
                        cur_level.monthRedPaper = list.data[i].monthRedPaper
                        cur_level.upgradeRedPaper = list.data[i].upgradeRedPaper
                        break
                    }
                }
            })
    }
    onActivated(() => {
        if (state.permission.is_login) getUserVipInfo()
        if (listGrade.data.length == 0) {
            getVipGrade.post("", {})
                .then(res => {
                    if (res.code == "000000") {
                        listGrade.data = res.data.data
                    }
                })
        }
    })
    watch(show_level, (newval, oldval) => {
        if (newval) getUserVipInfo()
    }, { immediate: true, deep: true })
    return {
        show_level,
        vip_info,
        list,
        cur_level,
        listGrade,
    }
}