import { reactive, ref, onMounted } from 'vue'
import { useStore } from "vuex"
import { useI18n } from "vue-i18n"
import { addBank, getBankList, delBank } from '@/apis/user'
import { useRouter } from 'vue-router'
import apiConfig from "@/utils/apiConfig"
import { showNotify } from '@nutui/nutui'

export default function () {
    const base_img_url = apiConfig.fileURL
    const { t } = useI18n()
    const { state, dispatch } = useStore()
    const router = useRouter()
    onMounted(() => {
        elevator_height.value = window.innerHeight - 100
        getList()
    })
    const showform = ref(false)
    const loading = ref(false)
    const show_del = ref(false)
    const del_id = ref('')
    const rulewalletForm = ref(null)
    const memberBanks = reactive({
        data: []
    })
    const walletForm = reactive({
        bankAccount: "",
        realName: ""
    })
    const getList = () => {
        getBankList.post("", { pageNum: 1, pageSize: 100 })
            .then(res => {
                if (res.code == "000000") {
                    memberBanks.data = res.data.list
                } else if (res.code == "888888") {
                    router.push({
                        path: '/home'
                    })
                    dispatch('permission/RESET_PERMISSION')
                }
            }).catch(err => {

            })
    }
    const del = (id) => {
        del_id.value = id
        show_del.value = true
    }
    const confirmDel = () => {
        delBank.post("", { id: del_id.value, memberId: state.permission.user_infos.id })
            .then(res => {
                if (res.code == '000000') {
                    getList()
                } else if (res.code == "888888") {
                    router.push({
                        path: '/home'
                    })
                    dispatch('permission/RESET_PERMISSION')
                } else {
                    showNotify.danger(t('common.servererror'))
                }
            })
    }
    const addData = () => {
        if (memberBanks.data.length > 0) {
            walletForm.realName = memberBanks.data[0].realName
        }
        showform.value = true
    }
    const validrealname = (val) => {
        if (!val) {
            return Promise.reject(t('common.validname'))
        } else {
            return Promise.resolve()
        }
    }
    const validbankAccount = (val) => {
        if (!val) {
            return Promise.reject('Por favor insira o número do CPF')
        } else if (val.length != 11) {
            return Promise.reject('Por favor insira o número correto do CPF')
        } else {
            return Promise.resolve()
        }
    }
    const submit = () => {
        if (loading.value) return
        rulewalletForm.value.validate().then(valid => {
            if (valid.valid) {
                loading.value = true
                addBank.post("", {
                    ...walletForm,
                    bankCode: 'brl',
                    bankName: 'brl',
                    memberId: state.permission.user_infos.id
                }).then(res => {
                    loading.value = false
                    if (res.code == "000000") {
                        showform.value = false
                        walletForm.bankAccount = ''
                        walletForm.realName = ''
                        getList()
                    } else if (res.code == "888888") {
                        reset()
                        router.push({
                            path: '/home'
                        })
                        dispatch('permission/RESET_PERMISSION')
                    } else {
                        showNotify.danger(t('common.servererror'))
                    }
                }).catch(err => {
                    loading.value = false
                    showNotify.danger(t('common.servererror'))
                })
            }
        })
    }
    const reset = () => {
        loading.value = false
        rulewalletForm.value.reset()
        showform.value = false
        walletForm.bankAccount = ''
        walletForm.realName = ''
    }
    const show_popup_bank = ref(false)
    const goBank = () => {
        show_popup_bank.value = !show_popup_bank.value
    }
    const elevator_height = ref(0)
    const acceptKey = ref('title')
    return {
        base_img_url,
        memberBanks,
        showform,
        loading,
        walletForm,
        rulewalletForm,
        show_del,
        del,
        addData,
        validrealname,
        validbankAccount,
        submit,
        reset,
        confirmDel,
        goBank,
        show_popup_bank,
        elevator_height,
        acceptKey
    }
}