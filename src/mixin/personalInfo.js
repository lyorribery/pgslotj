import { computed, reactive, ref } from 'vue'
import { useStore } from "vuex"
import { useI18n } from "vue-i18n"
import {
    _validpassword,
    _validfuncpassword
} from '@/utils/utils'
import { editLoginPwd } from '@/apis/user'
import { showNotify } from '@nutui/nutui'

export default function () {
    const { t } = useI18n()
    const { state, dispatch } = useStore()
    const user_infos = computed(() => {
        return state.permission.user_infos
    })
    const loginFormLoading = ref(false)
    const ruleLoginForm = ref(null)
    const loginForm = reactive({
        oldPwd: '',
        newPwd: '',
        passAgain: ''
    })
    const validoldPwd = (val) => {
        if (_validpassword(val)) {
            return Promise.resolve()
        } else {
            return Promise.reject(t('common.validpwd'))
        }
    }
    const validnewPwd = (val) => {
        if (_validpassword(val)) {
            return Promise.resolve()
        } else {
            return Promise.reject(t('common.validpwd'))
        }
    }
    const validpassAgain = (val) => {
        if (!_validpassword(val)) {
            return Promise.reject(t('common.validpwd'))
        } else if (val != loginForm.newPwd) {
            return Promise.reject(t('personalinfos.valid2'))
        } else {
            return Promise.resolve()
        }
    }
    const submitLogin = () => {
        if (loginFormLoading.value) return
        ruleLoginForm.value.validate().then(res => {
            if (res.valid) {
                loginFormLoading.value = true
                editLoginPwd.post("", { ...loginForm })
                    .then(res => {
                        loginFormLoading.value = false
                        if (res.code == '000000') {
                            showNotify.text(t('personalinfos.valid5'), {
                                color: "#fff",
                                background: "#A0C4FD",
                            });
                            ruleLoginForm.value.reset()
                            loginForm.oldPwd = ''
                            loginForm.newPwd = ''
                            loginForm.passAgain = ''
                            dispatch('permission/RESET_PERMISSION')
                        } else if (res.code == "888888") {
                            dispatch('permission/RESET_PERMISSION')
                        } else {
                            showNotify.danger(t('personalinfos.valid6'))
                        }
                    }).catch(err => {
                        loginFormLoading.value = false
                        showNotify.danger(t('common.servererror'))
                    })
            }
        })
    }
    const type = ref(0)
    const changePageType = (index) => {
        type.value = index
    }
    return {
        user_infos,
        type,
        ruleLoginForm,
        loginForm,
        loginFormLoading,
        submitLogin,
        changePageType,
        validoldPwd,
        validnewPwd,
        validpassAgain
    }
}