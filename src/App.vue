<template>
  <div id="app">
    <router-view />
    <nut-backtop :distance="200" :bottom="100" :right="20"></nut-backtop>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useStore } from "vuex"
import axios from 'axios'
const uuid = require('uuid')
export default {
  name: "App",
  setup() {
    let { commit, dispatch } = useStore()
    onMounted(() => {
      const flag = navigator.userAgent.match(
        /(phone|iPhone|iPod|ios|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows phone)/i
      )
      commit('permission/set_user_device', flag ? 'h5' : 'pc')

      if (localStorage.getItem('token')) dispatch('permission/GET_USER_INFO')

      localStorage.setItem('d_id', uuid.v1())

      dispatch('common/GET_COMMON_INFO')

      dispatch('game/GET_HOME_GAME_LIST')

      axios({
        url: 'https://api.ipify.org',
      })
        .then(response => {
          localStorage.setItem('l_ip', response.data)
        })
    })
  }
};
</script>
<style>
::-webkit-scrollbar {
  width: 0;
}

::-webkit-scrollbar-track {
  background-color: transparent;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background-color: #717171;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
}
</style>
