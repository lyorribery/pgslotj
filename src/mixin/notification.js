import { computed, ref } from 'vue'
import { useStore } from "vuex"
import { readMail, delMail } from '@/apis/user'
import { showNotify } from '@nutui/nutui'

export default function () {
    const show_del = ref(false)
    const show_detail = ref(false)
    const detail_content = ref('')
    const { state, dispatch } = useStore()

    const mail_list = computed(() => {
        return state.permission.mail_list
    })
    const goDetail = (data) => {
        detail_content.value = data.content
        show_detail.value = true
        if (data.hasRead == 0) {
            readMail.post("", { id: data.id })
                .then(res => {
                    if (res.code == "000000") {
                        dispatch('permission/GET_MAIL_LIST')
                    } else if (res.code == "888888") {
                        dispatch('permission/RESET_PERMISSION')
                    }
                })
        }
    }
    const del_id = ref('')
    const deleteItem = (data) => {
        del_id.value = data.id
        show_del.value = true
    }
    const confirmDel = () => {
        delMail.post("", { id: del_id.value })
            .then(res => {
                if (res.code == "000000") {
                    showNotify.text("successfully deleted", {
                        color: "#fff",
                        background: "#A0C4FD",
                    });
                    dispatch('permission/GET_MAIL_LIST')
                } else if (res.code == "888888") {
                    dispatch('permission/RESET_PERMISSION')
                }
            })
    }
    return {
        mail_list,
        show_del,
        show_detail,
        detail_content,
        confirmDel,
        deleteItem,
        goDetail
    }
}