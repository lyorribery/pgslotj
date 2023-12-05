import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useStore } from "vuex"
import { useRouter } from 'vue-router'
import apiConfig from "@/utils/apiConfig"
import { deposit, getRechargeCount } from '@/apis/user'
import { getPromotionList, getFirstRechargeConfig, getSecondRechargeConfig, getRechargeConfig } from '@/apis/common'
import { useI18n } from "vue-i18n"
import { showNotify } from '@nutui/nutui'

export default function () {
    const { t } = useI18n()
    const base_img_url = apiConfig.fileURL
    const { state, dispatch } = useStore()
    const minAmount = ref(30)
    const router = useRouter()
    const recharge_count = ref(0)
    const getActivityList = () => {
        getPromotionList.post("", { activityType: "cz" })
            .then(res => {
                if (res.code == "000000") {
                    getRechargeCount.post("", {})
                        .then(res2 => {
                            if (res2.code == "000000") {
                                recharge_count.value = res2.data
                                if (res2.data == 0) {
                                    activityList.data = res.data.filter(item => {
                                        return item.categoryCode == 1 && item.isEnable == '1'
                                    })
                                    if (activityList.data.length > 0)
                                        depositForm.rechargeActivityId = activityList.data[0].id
                                } else if (res2.data == 1) {
                                    activityList.data = res.data.filter(item => {
                                        return item.categoryCode != 1 && item.categoryCode != 4 && item.isEnable == '1'
                                    })
                                } else {
                                    activityList.data = res.data.filter(item => {
                                        return item.categoryCode == 3 && item.isEnable == '1'
                                    })
                                }
                            } else if (res2.code == "888888") {
                                closeDeposit()
                                dispatch('permission/RESET_PERMISSION')
                            }
                        })
                }
            })
    }
    const payconfig = computed(() => {
        let arr = []
        if (state.permission.pay_config.length > 0) {
            arr = state.permission.pay_config.filter(item => {
                return item.isRechargeDisable == '1'
            })
            activeType.value = arr[0].id
        }
        return arr
    })
    const quickAmountList = [30, 58, 100, 200, 300, 500, 1000, 2000, 3000, 5000, 8000]
    const couponList = computed(() => {
        const list = state.permission.coupon_list.filter(item => {
            return item.giveType == 2 && item.status == 0
        })
        return list
    })
    const activityList = reactive({
        data: []
    })
    const getCode = ref(false)
    const depositLoading = ref(false)
    const activeType = ref('')
    const payurl = ref('')
    const placeText = ref('')
    const depositForm = reactive({
        amount: 58,
        rechargeActivityId: "",
        activityId: "",
        ip: ""
    })

    watch(
        () => depositForm.rechargeActivityId,
        (val) => {
            if (val == 1) {
                getFirstRechargeConfig.post("", {})
                    .then(res => {
                        if (res.code == "000000") {
                            handleGift(res.data.data)
                        } else if (res.code == "888888") {
                            closeDeposit()
                            dispatch('permission/RESET_PERMISSION')
                        }
                    }).catch(err => {
                        closeDeposit()
                        dispatch('permission/RESET_PERMISSION')
                    })
            } else if (val == 2) {
                getSecondRechargeConfig.post("", {})
                    .then(res => {
                        if (res.code == "000000") {
                            handleGift(res.data.data)
                        } else if (res.code == "888888") {
                            closeDeposit()
                            dispatch('permission/RESET_PERMISSION')
                        }
                    }).catch(err => {
                        closeDeposit()
                        dispatch('permission/RESET_PERMISSION')
                    })
            } else if (val == 3) {
                getRechargeConfig.post("", {})
                    .then(res => {
                        if (res.code == "000000") {
                            handleGift(res.data.data)
                        } else if (res.code == "888888") {
                            closeDeposit()
                            dispatch('permission/RESET_PERMISSION')
                        }
                    }).catch(err => {
                        closeDeposit()
                        dispatch('permission/RESET_PERMISSION')
                    })
            }
        }
    )

    const closeDeposit = () => {
        resetDeposit()
        router.go(-1)
    }
    const changeQuickAmount = (data) => {
        depositForm.amount = data
    }
    const changeCoupon = (id) => {
        if (id == depositForm.activityId) return depositForm.activityId = ''
        depositForm.activityId = id
    }
    const goDeposit = () => {
        if (depositLoading.value) return
        depositLoading.value = true
        deposit.post("", { ...depositForm, payConfigId: activeType.value, ip: localStorage.getItem('l_ip') || '' })
            .then(res => {
                depositLoading.value = false
                if (res.code == '000000') {
                    location.href = res.data.targetUrl
                    // payurl.value = res.data.targetUrl
                } else if (res.code == "888888") {
                    closeDeposit()
                    dispatch('permission/RESET_PERMISSION')
                } else {
                    showNotify.danger(res.msg)
                }
            }).catch(err => {
                depositLoading.value = false
                showNotify.danger(t('common.servererror'))
            })
    }
    const giftType = ref('')
    const giftRatio = ref('')
    const giftMultiple = ref('')
    const giftRange = reactive({
        data: []
    })
    const resetDeposit = () => {
        getCode.value = false
        depositLoading.value = false
        activeType.value = ''
        payurl.value = ''
        depositForm.amount = 58
        depositForm.rechargeActivityId = ""
        depositForm.activityId = ""
        giftType.value = ''
        giftRatio.value = ''
        giftMultiple.value = ''
        giftRange.data = []
    }
    const handleGift = (data) => {
        giftType.value = data[0].giveType
        if (giftType.value == '2') {
            giftRatio.value = data[0].giveRatio * 100
            giftMultiple.value = data[0].multiple
        } else if (giftType.value == '1') {
            giftRange.data = data
        }
    }

    onMounted(() => {
        dispatch('permission/GET_PAY_CONFIG')
        getActivityList()
        placeText.value = `Depósito mínimo R$${minAmount.value}`
    })
    return {
        base_img_url,
        payconfig,
        quickAmountList,
        getCode,
        depositLoading,
        activeType,
        depositForm,
        couponList,
        activityList,
        payurl,
        placeText,
        closeDeposit,
        changeQuickAmount,
        changeCoupon,
        goDeposit,
        giftType,
        giftRatio,
        giftMultiple,
        giftRange,
        recharge_count
    }
}