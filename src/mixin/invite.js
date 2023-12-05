import { reactive, ref, onMounted, computed, onUnmounted, watch } from 'vue'
import { useStore } from "vuex"
import { useI18n } from 'vue-i18n'
import apiConfig from "@/utils/apiConfig"
import { getAgentData } from '@/apis/user'
import { showNotify } from '@nutui/nutui'

let AgentTimer = null

export default function () {
    const { state, dispatch } = useStore()
    const { t } = useI18n()
    const base_img_url = apiConfig.fileURL
    const activeIndex = ref(1)
    const inviteLink = ref('')
    const inviteMemberCount = ref(0)
    const inviteMemberRechargeCount = ref(0)
    const registerMoney = ref(0)
    const betMoney = ref(0)
    const todayMoney = ref(0)
    const totalMoney = ref(0)
    const echartsBetMoney = ref(0)
    const echartsRegisterMoney = ref(0)
    const changeTab = (index) => {
        activeIndex.value = index
    }
    const is_login = computed(() => {
        return state.permission.is_login
    })
    const initData = () => {
        inviteLink.value = state.permission.user_infos.inviteCode ? `pgslotj.com/?code=${state.permission.user_infos.inviteCode}#/home` : 'pgslotj.com'
        if (state.permission.is_login) {
            getAgentData.post("", {})
                .then(res => {
                    if (res.code == '000000') {
                        inviteMemberCount.value = res.data.inviteNum
                        inviteMemberRechargeCount.value = res.data.rechargeNum
                        registerMoney.value = res.data.inviteBonus
                        betMoney.value = res.data.betBonus
                        todayMoney.value = res.data.today
                        totalMoney.value = Number(res.data.inviteBonus) + Number(res.data.betBonus)
                    } else if (res.code == '888888') {
                        dispatch('permission/RESET_PERMISSION')
                    }
                })
        }
    }
    const copyContent = () => {
        if (!state.permission.is_login) {
            showNotify.danger('Por favor faça login primeiro')
            return
        }
        var cInput = document.createElement("input")
        cInput.value = inviteLink.value
        document.body.appendChild(cInput)
        cInput.select()
        document.execCommand("copy")
        showNotify.text('O link de compartilhamento foi copiado', { color: '#fff', background: '#A0C4FD' });
        document.body.removeChild(cInput)
    }
    const shareFb = () => {

    }


    const currentTab = ref(0)

    watch(is_login, (newval, oldval) => {
        if (newval) initData()
    }, { immediate: true, deep: true })
    onMounted(() => {
        initData()
    })
    onUnmounted(() => {
        clearInterval(AgentTimer)
        AgentTimer = null
    })
    return {
        base_img_url,
        activeIndex,
        inviteLink,
        inviteMemberCount,
        inviteMemberRechargeCount,
        registerMoney,
        betMoney,
        todayMoney,
        totalMoney,
        echartsBetMoney,
        echartsRegisterMoney,
        changeTab,
        copyContent,
        shareFb,
        currentTab
    }
}