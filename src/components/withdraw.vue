<template>
  <transition
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
  >
    <div
      class="modal"
      :class="user_device == 'h5' ? 'h5' : 'pc'"
      v-if="show_withdraw_modal"
    >
      <div class="modal-header">
        <span style="color: #fff; font-size: 15px; font-weight: 600">RETIRAR</span>
        <div class="header-btn-box">
          <i
            class="iconfont icon-guanbi"
            style="font-size: 22px; color: #fff"
            @click="closeWithdraw()"
          ></i>
        </div>
      </div>
      <div class="deposit-box">
        <div class="deposit-title">
          {{ $t("withdraw.label1") }}
        </div>
        <div class="activity-row" v-if="payconfig.length > 0">
          <nut-radio-group v-model="formData.payConfigId" direction="horizontal">
            <nut-radio v-for="(item, index) in payconfig" :key="index" :label="item.id">{{
              item.payName
            }}</nut-radio>
          </nut-radio-group>
        </div>
        <div class="deposit-title">
          {{ $t("withdraw.label3") }}
        </div>
        <div class="activity-row">
          <div class="bank-account-box" @click="openAccount">
            <span>{{ formData.bankAccount }}</span>
            <i class="iconfont icon-downarrow" style="font-size: 12px"></i>
          </div>
          <transition
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
          >
            <div class="bank-account-option-box" v-if="show_account">
              <div
                class="options"
                v-for="(item, index) in memberBanks.data"
                :key="index"
                @click="changeAccount(item)"
                :style="{
                  color: item.bankAccount == formData.bankAccount ? '#A0C4FD' : '',
                }"
              >
                {{ item.bankAccount }}
              </div>
            </div>
          </transition>
        </div>
        <div class="deposit-title">
          {{ $t("withdraw.label2") }}
        </div>

        <div class="quick-amount-box">
          <div
            class="quick-amount-item"
            v-for="(item, index) in quickAmountList"
            :key="index"
            @click="changeQuickAmount(item.toString())"
            :style="{ background: item == formData.amount ? '#A0C4FD' : '#1A44B0' }"
          >
            <div class="item-row">
              <div>R${{ item }}</div>
            </div>
          </div>
        </div>

        <div class="deposit-btn active-btn" @click="submit()">
          <span v-if="!loading">{{ $t("personal.tixian") }}</span>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="25px"
            height="25px"
            viewBox="0 0 50 50"
            style="enable-background: new 0 0 50 50"
            xml:space="preserve"
          >
            <path
              fill="#fff"
              d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"
              transform="rotate(275.098 25 25)"
            >
              <animateTransform
                attributeType="xml"
                attributeName="transform"
                type="rotate"
                from="0 25 25"
                to="360 25 25"
                dur="0.6s"
                repeatCount="indefinite"
              ></animateTransform>
            </path>
          </svg>
        </div>
      </div>
      <nut-dialog
        footer-direction="vertical"
        teleport="#app"
        title="Tip"
        :noCancelBtn="true"
        :content="$t('withdraw.noaccount')"
        :okText="$t('common.confirm')"
        v-model:visible="show_no_account"
        @ok="goAccount"
      >
      </nut-dialog>
    </div>
  </transition>
</template>

<script>
import { ref, reactive, computed, watch } from "vue";
import { useStore } from "vuex";
import apiConfig from "@/utils/apiConfig";
import { getBankList, withdraw } from "@/apis/user";
import { showNotify } from "@nutui/nutui";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const base_img_url = apiConfig.fileURL;
    const { t } = useI18n();
    const { state, commit, dispatch } = useStore();
    const loading = ref(false);
    const show_account = ref(false);
    const show_no_account = ref(false);
    const placeHolderText = ref("");
    const quickAmountList = [10, 20, 30, 50, 100, 200, 300, 500, 1000, 3000, 5000, 8000];
    const payconfig = computed(() => {
      let arr = [];
      if (state.permission.pay_config.length > 0) {
        arr = state.permission.pay_config.filter((item) => {
          return item.isDrawDisable == "1";
        });
        formData.payConfigId = arr[0].id;
      }
      return arr;
    });
    const show_withdraw_modal = computed(() => {
      return state.common.show_withdraw_modal;
    });
    watch(
      show_withdraw_modal,
      (newval, oldval) => {
        if (newval) {
          get_bank_list();
          dispatch("permission/GET_PAY_CONFIG");
          placeHolderText.value = `Seu valor máximo atual de saque é de R$${state.permission.wallet_infos.bcAvailableBalance}`;
        }
      },
      { immediate: true, deep: true }
    );
    const memberBanks = reactive({
      data: [],
    });
    const get_bank_list = () => {
      getBankList
        .post("", { pageNum: 1, pageSize: 100 })
        .then((res) => {
          if (res.code == "000000") {
            if (res.data.list.length > 0) {
              res.data.list.map((item) => {
                item.name = item.bankAccount;
              });
              memberBanks.data = res.data.list;
              formData.bankCode = memberBanks.data[0].bankCode;
              formData.bankAccount = memberBanks.data[0].bankAccount;
              formData.bankName = memberBanks.data[0].bankName;
              formData.realName = memberBanks.data[0].realName;
            } else {
              show_no_account.value = true;
            }
          } else if (res.code == "888888") {
            closeWithdraw();
            dispatch("permission/RESET_PERMISSION");
          }
        })
        .catch((err) => {
          closeWithdraw();
          dispatch("permission/RESET_PERMISSION");
        });
    };
    const user_device = computed(() => {
      return state.permission.user_device;
    });
    const formData = reactive({
      amount: 10,
      bankAccount: "",
      payConfigId: "",
      type: "",
      bankName: "",
      realName: "",
      bankCode: "",
    });
    const changeQuickAmount = (data) => {
      formData.amount = data;
    };
    const closeWithdraw = () => {
      formData.amount = 10;
      formData.bankAccount = "";
      formData.payConfigId = "";
      formData.type = "";
      formData.bankName = "";
      formData.realName = "";
      formData.bankCode = "";
      commit("common/set_show_withdraw_modal", false);
    };
    const openAccount = () => {
      show_account.value = !show_account.value;
    };
    const changeAccount = (data) => {
      formData.bankAccount = data.bankAccount;
      formData.bankName = data.bankName;
      formData.realName = data.realName;
      formData.bankCode = data.bankCode;
      openAccount();
    };
    const submit = () => {
      if (loading.value) return;
      if (!formData.amount) return showNotify.danger(t("withdraw.valid1"));
      if (!formData.bankAccount) return showNotify.danger(t("withdraw.valid2"));
      loading.value = true;
      withdraw
        .post("", {
          ...formData,
          type: state.common.withdraw_type,
        })
        .then((res) => {
          loading.value = false;
          if (res.code == "000000") {
            showNotify.text(t("withdraw.valid3"), {
              color: "#fff",
              background: "#A0C4FD",
            });
            closeWithdraw();
          } else if (res.code == "888888") {
            closeWithdraw();
            dispatch("permission/RESET_PERMISSION");
          } else if (res.code == "000010" || res.code == "000020") {
            closeWithdraw();
            commit("common/set_withdraw_tip_data", {
              code: res.code,
              ...res.data,
            });
            commit("common/set_show_withdraw_tip", true);
          } else {
            showNotify.danger(res.msg);
          }
        })
        .catch((err) => {
          loading.value = false;
          closeWithdraw();
          dispatch("permission/RESET_PERMISSION");
        });
    };
    const goAccount = () => {
      closeWithdraw();
      router.push({
        path: "/wallet",
      });
    };

    return {
      base_img_url,
      show_withdraw_modal,
      user_device,
      formData,
      payconfig,
      memberBanks,
      loading,
      placeHolderText,
      show_account,
      show_no_account,
      closeWithdraw,
      openAccount,
      changeAccount,
      goAccount,
      submit,
      changeQuickAmount,
      quickAmountList,
    };
  },
};
</script>

<style lang="scss" scoped>
.quick-amount-box {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  margin-top: 5px;

  .quick-amount-item {
    width: calc((100% - 30px) / 3);
    height: 40px;
    box-sizing: border-box;
    padding: 0 10px;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 12px;
    font-weight: 700;
    margin-right: 15px;
    margin-bottom: 15px;
    cursor: pointer;
    border: 2px solid #A0C4FD;
    color: #fff;
    .item-row {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      .icon {
        margin-right: 5px;
      }
    }

    &:nth-child(3n + 3) {
      margin-right: 0;
    }
  }
}

.deposit-box {
  width: 100%;
  box-sizing: border-box;
  padding: 0 15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  .activity-row {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    position: relative;

    .bank-account-box {
      background-color: #1A44B0;
      color: #e2e8e3;
      font-size: 15px;
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      padding: 0 10px;
    }

    .bank-account-option-box {
      z-index: 12;
      position: absolute;
      left: 0;
      top: 40px;
      width: 100%;
      border-radius: 6px;
      background-color: #fff;

      .options {
        width: 100%;
        box-sizing: border-box;
        padding: 0 10px;
        height: 40px;
        display: flex;
        align-items: center;
        color: #fff;
        font-size: 15px;
        justify-content: flex-start;

        &:last-child {
          border-bottom: 0;
        }
      }
    }

    .tickets {
      display: flex;
      padding: 10px;
      width: 100%;
      height: 90px;
      box-sizing: border-box;

      .l-tickets-1 {
        width: 70%;
        position: relative;
        background: radial-gradient(
              circle at right top,
              transparent 8px,
              #A0C4FD 0,
              #A0C4FD 100%
            )
            right top / 100% 50% no-repeat,
          radial-gradient(
              circle at right bottom,
              transparent 8px,
              #A0C4FD 0,
              #A0C4FD 100%
            )
            right bottom / 100% 50% no-repeat;
        filter: drop-shadow(-3px 0 3px rgba(0, 0, 0, 0.3));
        display: flex;
        justify-content: flex-start;
        align-items: center;
        box-sizing: border-box;
        padding-left: 15px;

        i {
          color: #fff;
          font-size: 40px;
        }

        .tickets-data {
          margin-left: 10px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;

          .amount {
            color: #fff;
            font-size: 25px;
            font-weight: bold;
          }

          .date {
            font-size: 12px;
            color: #fff;
          }
        }
      }

      .l-tickets-1::after {
        content: "";
        position: absolute;
        height: 100%;
        width: 4px;
        top: 0;
        left: -4px;
        background: radial-gradient(circle at left center, transparent 4px, #A0C4FD 0)
          left center / 4px 10px;
      }

      .l-tickets-2 {
        width: 70%;
        position: relative;
        background: radial-gradient(
              circle at right top,
              transparent 8px,
              #fb604a 0,
              #fb604a 100%
            )
            right top / 100% 50% no-repeat,
          radial-gradient(
              circle at right bottom,
              transparent 8px,
              #fb604a 0,
              #fb604a 100%
            )
            right bottom / 100% 50% no-repeat;
        filter: drop-shadow(-3px 0 3px rgba(0, 0, 0, 0.3));
        display: flex;
        justify-content: flex-start;
        align-items: center;
        box-sizing: border-box;
        padding-left: 15px;

        i {
          color: #fff;
          font-size: 40px;
        }

        .tickets-data {
          margin-left: 10px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;

          .amount {
            color: #fff;
            font-size: 25px;
            font-weight: bold;
          }

          .date {
            font-size: 12px;
            color: #fff;
          }
        }
      }

      .l-tickets-2::after {
        content: "";
        position: absolute;
        height: 100%;
        width: 4px;
        top: 0;
        left: -4px;
        background: radial-gradient(circle at left center, transparent 4px, #fb604a 0)
          left center / 4px 10px;
      }

      .l-tickets-3 {
        width: 70%;
        position: relative;
        background: radial-gradient(
              circle at right top,
              transparent 8px,
              #999999 0,
              #999999 100%
            )
            right top / 100% 50% no-repeat,
          radial-gradient(
              circle at right bottom,
              transparent 8px,
              #999999 0,
              #999999 100%
            )
            right bottom / 100% 50% no-repeat;
        filter: drop-shadow(-3px 0 3px rgba(0, 0, 0, 0.3));
        display: flex;
        justify-content: flex-start;
        align-items: center;
        box-sizing: border-box;
        padding-left: 15px;

        i {
          color: #fff;
          font-size: 40px;
        }

        .tickets-data {
          margin-left: 10px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;

          .amount {
            color: #fff;
            font-size: 25px;
            font-weight: bold;
          }

          .date {
            font-size: 12px;
            color: #fff;
          }
        }
      }

      .l-tickets-3::after {
        content: "";
        position: absolute;
        height: 100%;
        width: 4px;
        top: 0;
        left: -4px;
        background: radial-gradient(circle at left center, transparent 4px, #999999 0)
          left center / 4px 10px;
      }

      .r-tickets-1 {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        background: radial-gradient(
              circle at left top,
              transparent 8px,
              #A0C4FD 0,
              #A0C4FD 100%
            )
            right top / 100% 50% no-repeat,
          radial-gradient(circle at left bottom, transparent 8px, #A0C4FD 0, #A0C4FD 100%)
            right bottom / 100% 50% no-repeat;
        filter: drop-shadow(3px 0 3px rgba(0, 0, 0, 0.3));

        .tickets-btn {
          box-sizing: border-box;
          padding: 5px;
          border-radius: 32px;
          font-size: 12px;
          color: #fff;
          border: 2px solid #fff;
          font-weight: bold;
        }
      }

      .r-tickets-1::before {
        content: "";
        width: 0.5px;
        background: linear-gradient(to top, #fff 0%, #fff 50%, transparent 50%) top
          left / 0.5px 10px repeat-y;
        position: absolute;
        left: 0;
        top: 8px;
        bottom: 8px;
      }

      .r-tickets-1::after {
        content: "";
        position: absolute;
        height: 100%;
        width: 4px;
        top: 0;
        right: -4px;
        background: radial-gradient(circle at right center, transparent 4px, #A0C4FD 0)
          right center / 4px 10px;
      }

      .r-tickets-2 {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        background: radial-gradient(
              circle at left top,
              transparent 8px,
              #fb604a 0,
              #fb604a 100%
            )
            right top / 100% 50% no-repeat,
          radial-gradient(circle at left bottom, transparent 8px, #fb604a 0, #fb604a 100%)
            right bottom / 100% 50% no-repeat;
        filter: drop-shadow(3px 0 3px rgba(0, 0, 0, 0.3));

        .tickets-btn {
          box-sizing: border-box;
          padding: 5px;
          border-radius: 32px;
          font-size: 12px;
          color: #fff;
          border: 2px solid #fff;
          font-weight: bold;
        }
      }

      .r-tickets-2::before {
        content: "";
        width: 0.5px;
        background: linear-gradient(to top, #fff 0%, #fff 50%, transparent 50%) top
          left / 0.5px 10px repeat-y;
        position: absolute;
        left: 0;
        top: 8px;
        bottom: 8px;
      }

      .r-tickets-2::after {
        content: "";
        position: absolute;
        height: 100%;
        width: 4px;
        top: 0;
        right: -4px;
        background: radial-gradient(circle at right center, transparent 4px, #fb604a 0)
          right center / 4px 10px;
      }

      .r-tickets-3 {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        background: radial-gradient(
              circle at left top,
              transparent 8px,
              #999999 0,
              #999999 100%
            )
            right top / 100% 50% no-repeat,
          radial-gradient(circle at left bottom, transparent 8px, #999999 0, #999999 100%)
            right bottom / 100% 50% no-repeat;
        filter: drop-shadow(3px 0 3px rgba(0, 0, 0, 0.3));

        .tickets-btn {
          box-sizing: border-box;
          padding: 5px;
          border-radius: 32px;
          font-size: 12px;
          color: #fff;
          border: 2px solid #fff;
          font-weight: bold;
        }
      }

      .r-tickets-3::before {
        content: "";
        width: 0.5px;
        background: linear-gradient(to top, #fff 0%, #fff 50%, transparent 50%) top
          left / 0.5px 10px repeat-y;
        position: absolute;
        left: 0;
        top: 8px;
        bottom: 8px;
      }

      .r-tickets-3::after {
        content: "";
        position: absolute;
        height: 100%;
        width: 4px;
        top: 0;
        right: -4px;
        background: radial-gradient(circle at right center, transparent 4px, #999999 0)
          right center / 4px 10px;
      }
    }
  }

  .active-btn {
    background: #A0C4FD;
  }

  .disabled-btn {
    background: #A0C4FD;
    opacity: 0.5;
  }

  .deposit-btn {
    margin-top: 15px;
    color: #e2e8e3;
    font-weight: 700;
    font-size: 15px;
    border-radius: 6px;
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .ipt {
    transition: border-color 0.36s cubic-bezier(0.4, 0, 0.2, 1);
    outline: none;
    background-color: #1A44B0;
    color: #e2e8e3;
    font-size: 15px;
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0 10px;
  }

  .deposit-title {
    width: 100%;
    color: #e2e8e3;
    font-size: 13px;
    box-sizing: border-box;
    padding: 15px 0 10px 0;
  }

  .activity-des-box {
    margin-top: 10px;
    width: 100%;
    border-radius: 6px;
    background: #A0C4FD;
    font-size: 16px;
    font-weight: 800;
    color: #e2e8e3;
    box-sizing: border-box;
    padding: 15px 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
}
</style>
