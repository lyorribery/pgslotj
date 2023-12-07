<template>
  <transition
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
  >
    <div
      class="modal"
      :class="user_device == 'h5' ? 'h5' : 'pc'"
      v-if="show_withdraw_tip"
    >
      <div class="modal-header">
        <span style="color: #fff; font-size: 15px; font-weight: 600">RETIRAR</span>
        <div class="header-btn-box">
          <i
            class="iconfont icon-guanbi"
            style="font-size: 20px; color: #fff"
            @click="closeWithdrawtip()"
          ></i>
        </div>
      </div>
      <div class="tip-box" v-if="withdraw_tip_data.code == '000010'">
        <div class="tip-content">
          <div class="tip-row">{{ $t("withdraw.tiptitle") }}</div>
          <!-- <div class="tip-row">
            1.Você precisa de um valor de aposta R${{ withdraw_tip_data.needFlow }} para
            sacar.
          </div> -->
          <div class="tip-row">
            Ou você precisa convidar {{ withdraw_tip_data.needAllInvete }} pessoas para
            se registrar antes de poder se retirar ({{
              Number(withdraw_tip_data.hasInvete)
            }}
            pessoas foram convidadas)
          </div>
        </div>
      </div>
      <div class="tip-box" v-if="withdraw_tip_data.code == '000020'">
        <div class="tip-content">
          <div class="tip-row" style="font-size: 15px">
            Você precisa depositar até
            <span>R${{ withdraw_tip_data.needRechargeAmount }}</span> para sacar
            (depositados <span>R${{ withdraw_tip_data.hasRechargeAmount }}</span> )
          </div>
        </div>
      </div>
      <div
        class="play-btn"
        @click="goPage('/deposit')"
        v-if="withdraw_tip_data.code == '000020'"
      >
        Vá para depositar
      </div>
      <!-- <div
        class="play-btn"
        @click="goPage('/home')"
        v-if="withdraw_tip_data.code == '000010'"
      >
        Aposta completa de R${{ withdraw_tip_data.needFlow }}
      </div> -->
      <div
        class="invite-btn"
        @click="goPage('/invite')"
        v-if="withdraw_tip_data.code == '000010'"
      >
        Convide {{ withdraw_tip_data.needInvete }} pessoas
      </div>
    </div>
  </transition>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import apiConfig from "@/utils/apiConfig";
import { useRouter } from "vue-router";
import { showNotify } from "@nutui/nutui";

export default {
  setup() {
    const router = useRouter();
    const base_img_url = apiConfig.fileURL;
    const { state, commit } = useStore();
    const show_withdraw_tip = computed(() => {
      return state.common.show_withdraw_tip;
    });
    const withdraw_tip_data = computed(() => {
      return state.common.withdraw_tip_data;
    });
    const user_device = computed(() => {
      return state.permission.user_device;
    });
    const closeWithdrawtip = () => {
      commit("common/set_show_withdraw_tip", false);
    };
    const goPage = (path) => {
      closeWithdrawtip();
      if (path == "/invite") copyContent();
      router.push({
        path: path,
      });
    };
    const copyContent = () => {
      var cInput = document.createElement("input");
      cInput.value = `pgslotj.com/?code=${state.permission.user_infos.inviteCode}#/home`;
      document.body.appendChild(cInput);
      cInput.select();
      document.execCommand("copy");
      showNotify.text("O link de compartilhamento foi copiado", {
        color: "#fff",
        background: "#A0C4FD",
      });
      document.body.removeChild(cInput);
    };
    return {
      base_img_url,
      user_device,
      show_withdraw_tip,
      closeWithdrawtip,
      withdraw_tip_data,
      goPage,
    };
  },
};
</script>

<style lang="scss" scoped>
.play-btn {
  margin: 15px 0;
  width: 100%;
  border-radius: 6px;
  background: #A0C4FD;
  color: #fff;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
}
.invite-btn {
  width: 100%;
  border-radius: 6px;
  background: #1A44B0;
  color: #fff;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
}
.tip-box {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  .tip-content {
    width: 100%;
    border-radius: 6px;
    background-color: #1A44B0;
    box-sizing: border-box;
    padding: 15px 10px;
    .tip-row {
      width: 100%;
      text-align: left;
      font-size: 13px;
      color: #fff;
      margin-bottom: 10px;
      span {
        color: #A0C4FD;
        font-size: 18px;
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
