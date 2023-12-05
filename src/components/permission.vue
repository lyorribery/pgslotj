<template>
  <transition
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
  >
    <div class="modal" :class="user_device == 'h5' ? 'h5' : 'pc'" v-if="show_modal.show">
      <div class="modal-header">
        <span style="color: #fff; font-size: 15px; font-weight: 600;">
          {{
            show_modal.type == "login" ? $t("index.login") : $t("index.register")
          }}</span
        >
        <div class="header-btn-box">
          <i
            class="iconfont icon-guanbi"
            style="font-size: 20px; color: #fff"
            @click="closePermission()"
          ></i>
        </div>
      </div>

      <div class="form-content" v-if="show_modal.type == 'login'">
        <nut-form
          :model-value="loginForm"
          :rules="{
            username: [
              {
                validator: validname,
              },
            ],
            password: [
              {
                validator: validpassword,
              },
            ],
            verifyCode: [
              {
                validator: validverify,
              },
            ],
          }"
          ref="ruleLoginForm"
        >
          <nut-form-item prop="username" label-width="0px">
            <div
              class="form-row"
              :class="valid.loginValid.username.focus ? 'ipt-focus-login' : ''"
            >
              <nut-input
                :border="false"
                v-model="loginForm.username"
                :placeholder="$t('common.username')"
                class="ipt"
                type="text"
                @focus="iptFocus('username')"
                @blur="iptBlur('username')"
              />
            </div>
          </nut-form-item>
          <nut-form-item prop="password" label-width="0px">
            <div
              class="form-row"
              :class="valid.loginValid.password.focus ? 'ipt-focus-login' : ''"
            >
              <nut-input
                :border="false"
                v-model="loginForm.password"
                :placeholder="$t('common.password')"
                class="ipt"
                type="password"
                @focus="iptFocus('password')"
                @blur="iptBlur('password')"
              />
            </div>
          </nut-form-item>
          <nut-form-item prop="verifyCode" label-width="0px">
            <div
              class="form-row"
              :class="valid.loginValid.verifyCode.focus ? 'ipt-focus-login' : ''"
              style="padding: 0 0 0 15px"
            >
              <nut-input
                max-length="4"
                :border="false"
                v-model="loginForm.verifyCode"
                :placeholder="$t('common.random')"
                class="ipt"
                type="number"
                @focus="iptFocus('verifyCode')"
                @blur="iptFocus('verifyCode')"
              />
              <div style="padding-left: 10px">
                <img v-if="virefyImg" :src="virefyImg" @click="getRandom()" height="40" />
              </div>
            </div>
          </nut-form-item>
        </nut-form>

        <div class="submit-btn" @click="submitLogin">
          <span v-if="!isLoading">{{ $t("index.login") }}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            v-else
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
      <div class="form-content" v-if="show_modal.type == 'register'">
        <nut-form
          :model-value="registerForm"
          :rules="{
            email: [
              {
                validator: validemail,
              },
            ],
            username: [
              {
                validator: validname,
              },
            ],
            password: [
              {
                validator: validpassword,
              },
            ],
            phone: [
              {
                validator: validphone,
              },
            ],
            verifyCode: [
              {
                validator: validverify,
              },
            ],
          }"
          ref="ruleRegisterForm"
        >
          <nut-form-item prop="email" label-width="0px">
            <div
              class="form-row"
              :class="valid.registerValid.email.focus ? 'ipt-focus' : ''"
            >
              <nut-input
                :border="false"
                v-model="registerForm.email"
                :placeholder="$t('common.email')"
                class="ipt"
                type="text"
                @focus="iptFocusRegister('email')"
                @blur="iptBlurRegister('email')"
              />
            </div>
          </nut-form-item>
          <nut-form-item prop="username" label-width="0px">
            <div
              class="form-row"
              :class="valid.registerValid.username.focus ? 'ipt-focus' : ''"
            >
              <nut-input
                :border="false"
                v-model="registerForm.username"
                :placeholder="$t('common.username')"
                class="ipt"
                type="text"
                @focus="iptFocusRegister('username')"
                @blur="iptBlurRegister('username')"
              />
            </div>
          </nut-form-item>
          <nut-form-item prop="password" label-width="0px">
            <div
              class="form-row"
              :class="valid.registerValid.password.focus ? 'ipt-focus' : ''"
            >
              <nut-input
                :border="false"
                v-model="registerForm.password"
                :placeholder="$t('common.password')"
                class="ipt"
                type="password"
                @focus="iptFocusRegister('password')"
                @blur="iptBlurRegister('password')"
              />
            </div>
          </nut-form-item>
          <nut-form-item prop="phone" label-width="0px">
            <div
              class="form-row"
              :class="valid.registerValid.phone.focus ? 'ipt-focus' : ''"
            >
              <div style="padding-right: 10px">+55</div>
              <nut-input
                max-length="11"
                :border="false"
                v-model="registerForm.phone"
                :placeholder="$t('common.mobile')"
                class="ipt"
                type="phone"
                @focus="iptFocusRegister('phone')"
                @blur="iptBlurRegister('phone')"
              />
            </div>
          </nut-form-item>
          <nut-form-item prop="verifyCode" label-width="0px">
            <div
              class="form-row"
              style="padding: 0 0 0 15px"
              :class="valid.registerValid.verifyCode.focus ? 'ipt-focus' : ''"
            >
              <nut-input
                max-length="4"
                :border="false"
                v-model="registerForm.verifyCode"
                :placeholder="$t('common.random')"
                class="ipt"
                type="number"
                @focus="iptFocusRegister('verifyCode')"
                @blur="iptBlurRegister('verifyCode')"
              />
              <div style="padding-left: 10px">
                <img v-if="virefyImg" :src="virefyImg" @click="getRandom()" height="40" />
              </div>
            </div>
          </nut-form-item>
        </nut-form>
        <div class="submit-btn" @click="submitRegister">
          <span v-if="!isLoading">{{ $t("index.register") }}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            v-else
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
    </div>
  </transition>
</template>

<script>
import { computed, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import apiConfig from "@/utils/apiConfig";
import { login, register, get_random } from "@/apis/user";
import { _validname, _validemail, _validphone, _validpassword } from "@/utils/utils";
import { showNotify } from "@nutui/nutui";

let registerTimer = null;

export default {
  name: "permission",
  setup() {
    const { t } = useI18n();
    const base_img_url = apiConfig.fileURL;
    const { state, commit, dispatch } = useStore();
    const isLoading = ref(false);
    const ruleLoginForm = ref(null);
    const ruleRegisterForm = ref(null);
    const loginForm = reactive({
      username: "",
      password: "",
      random: "",
      verifyCode: "",
    });
    const registerForm = reactive({
      username: "",
      password: "",
      phone: "",
      random: "",
      email: "",
      verifyCode: "",
    });
    const valid = reactive({
      loginValid: {
        username: {
          focus: false,
        },
        password: {
          focus: false,
        },
        verifyCode: {
          focus: false,
        },
      },
      registerValid: {
        username: {
          focus: false,
        },
        password: {
          focus: false,
        },
        phone: {
          focus: false,
        },
        email: {
          focus: false,
        },
        verifyCode: {
          focus: false,
        },
      },
    });
    const show_modal = computed(() => {
      return state.permission.permission_modal;
    });
    watch(
      show_modal,
      (newval, oldval) => {
        if (newval) {
          if (newval.show) getRandom();
        }
      },
      { immediate: true, deep: true }
    );
    const user_device = computed(() => {
      return state.permission.user_device;
    });
    const validname = (val) => {
      if (_validname(val)) {
        return Promise.resolve();
      } else {
        return Promise.reject(t("common.validname"));
      }
    };
    const validpassword = (val) => {
      if (_validpassword(val)) {
        return Promise.resolve();
      } else {
        return Promise.reject(t("common.validpwd"));
      }
    };
    const validemail = (val) => {
      if (_validemail(val)) {
        return Promise.resolve();
      } else {
        return Promise.reject(t("common.validemail"));
      }
    };
    const validphone = (val) => {
      if (_validphone(val)) {
        return Promise.resolve();
      } else {
        return Promise.reject(t("common.validmobile"));
      }
    };
    const validverify = (val) => {
      if (val) {
        return Promise.resolve();
      } else {
        return Promise.reject(t("common.validverifycode"));
      }
    };
    const submitLogin = () => {
      if (isLoading.value) return;
      ruleLoginForm.value.validate().then((res) => {
        if (res.valid) {
          isLoading.value = true;
          login
            .post("", {
              ...loginForm,
              username: loginForm.username.replace(/\s*/g, ""),
              isFront: 1,
              loginIp: localStorage.getItem("l_ip") || "",
              deviceInfo: localStorage.getItem("d_id") || "",
            })
            .then((res) => {
              isLoading.value = false;
              if (res.code == "000000") {
                localStorage.setItem("token", res.data);
                dispatch("permission/GET_USER_INFO");
                closePermission();
              } else {
                showNotify.danger(res.msg);
                getRandom();
              }
            })
            .catch((err) => {
              getRandom();
              isLoading.value = false;
              showNotify.danger(t("common.servererror"));
            });
        }
      });
    };
    const submitRegister = () => {
      if (isLoading.value) return;
      ruleRegisterForm.value.validate().then((req) => {
        if (req.valid) {
          isLoading.value = true;
          register
            .post("", {
              ...registerForm,
              username: registerForm.username.replace(/\s*/g, ""),
              phone: "55" + registerForm.phone,
              registerIp: localStorage.getItem("l_ip") || "",
              deviceInfo: localStorage.getItem("d_id") || "",
              inviteCode: localStorage.getItem("r_code") || "",
            })
            .then((res) => {
              isLoading.value = false;
              if (res.code == "000000") {
                localStorage.setItem("token", res.data);
                dispatch("permission/GET_USER_INFO");
                closePermission();
              } else {
                showNotify.danger(res.msg);
                getRandom();
              }
            })
            .catch((err) => {
              isLoading.value = false;
              showNotify.danger(t("common.servererror"));
              getRandom();
            });
        }
      });
    };
    const closePermission = () => {
      valid.loginValid = {
        username: {
          focus: false,
        },
        password: {
          focus: false,
        },
        verifyCode: {
          focus: false,
        },
      };
      valid.registerValid = {
        username: {
          focus: false,
        },
        password: {
          focus: false,
        },
        phone: {
          focus: false,
        },
        email: {
          focus: false,
        },
        verifyCode: {
          focus: false,
        },
      };

      loginForm.password = "";
      loginForm.username = "";
      loginForm.random = "";
      loginForm.verifyCode = "";
      registerForm.username = "";
      registerForm.password = "";
      registerForm.phone = "";
      registerForm.random = "";
      registerForm.email = "";
      registerForm.verifyCode = "";
      isLoading.value = false;

      if (state.permission.permission_modal.type == "login") ruleLoginForm.value.reset();

      if (state.permission.permission_modal.type == "register")
        ruleRegisterForm.value.reset();

      commit("permission/show_permission_modal", { type: "", show: false });
    };
    const changePageType = (type) => {
      if (type == state.permission.permission_modal.type) return;
      if (isLoading.value) return;
      if (type == "login") ruleRegisterForm.value.reset();
      if (type == "register") ruleLoginForm.value.reset();
      commit("permission/show_permission_modal", { type, show: true });
    };
    const iptFocus = (e) => {
      for (let i in valid.loginValid) {
        if (i == e) {
          valid.loginValid[i].focus = true;
        } else {
          valid.loginValid[i].focus = false;
        }
      }
    };
    const iptBlur = (e) => {
      valid.loginValid[e].focus = false;
    };
    const iptFocusRegister = (e) => {
      for (let i in valid.registerValid) {
        if (i == e) {
          valid.registerValid[i].focus = true;
        } else {
          valid.registerValid[i].focus = false;
        }
      }
    };
    const iptBlurRegister = (e) => {
      valid.registerValid[e].focus = false;
    };
    const virefyImg = ref("");
    const getRandom = () => {
      const random = new Date().getTime();
      get_random
        .post("", {
          random: random,
        })
        .then((res) => {
          if (res.code == "000000") {
            loginForm.random = random;
            registerForm.random = random;
            loginForm.verifyCode = "";
            registerForm.verifyCode = "";
            virefyImg.value = "data:image/jpg;base64," + res.data.iamgeData;
          }
        });
    };
    return {
      virefyImg,
      getRandom,
      isLoading,
      base_img_url,
      show_modal,
      loginForm,
      registerForm,
      valid,
      ruleLoginForm,
      ruleRegisterForm,
      user_device,
      closePermission,
      changePageType,
      validname,
      validpassword,
      submitLogin,
      submitRegister,
      iptFocus,
      iptBlur,
      iptFocusRegister,
      iptBlurRegister,
      validemail,
      validphone,
      validverify,
    };
  },
};
</script>

<style scoped lang="scss">
.form-content {
  width: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  background:#1A44B0;

  .submit-btn {
    margin: 10px 0 0 10px;
    width: calc(100% - 20px);
    border-radius: 6px;
    background: #A0C4FD;
    color: #e2e8e3;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
  }

  .ipt-focus {
    border-color: #A0C4FD !important;
  }

  .ipt-focus-login {
    border-color: #A0C4FD !important;
  }

  .form-row {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-radius: 6px;
    box-sizing: border-box;
    padding: 8px 15px;
    border: 2px solid #fff;
    transition: border-color 0.36s cubic-bezier(0.4, 0, 0.2, 1);

    .ipt {
      border: 0px;
      outline: none;
      background-color: #1A44B0;
      color: #e2e8e3;
      font-size: 16px;
      font-weight: 400;
      flex: 1;
    }
  }
}
</style>
