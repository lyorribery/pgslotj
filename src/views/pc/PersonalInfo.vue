<template>
  <div class="personal-info">
    <div class="label">Personal</div>
    <div class="head-box">
      <div class="type-box">
        <div
          class="type"
          :style="{ background: type == 0 ? '#A0C4FD' : '' }"
          @click="changePageType(0)"
        >
          {{ $t("personalinfos.list1") }}
        </div>
        <div
          class="type"
          :style="{ background: type == 1 ? '#A0C4FD' : '' }"
          @click="changePageType(1)"
        >
          {{ $t("personalinfos.list2") }}
        </div>
      </div>
    </div>
    <div class="form-content" v-if="type == 0">
      <div class="account-box">
        <i class="iconfont icon-touxiang" style="color: #fff"></i>
        <div style="margin-left: 12px">
          <div style="color: #fff; font-size: 13px">
            {{ user_infos.name }}
          </div>
          <div style="color: #fff; font-size: 12px; font-weight: 400">
            {{ $t("personal.id") }}
            {{ user_infos.userAccount }}
          </div>
        </div>
      </div>
      <div class="basic-box">
        <div class="label">Email</div>
        <div class="val">
          {{ user_infos.email }}
        </div>
      </div>
      <div class="basic-box">
        <div class="label">
          {{ $t("common.mobile") }}
        </div>
        <div class="val">+{{ user_infos.phone }}</div>
      </div>

      <div class="user-tip">
        <span>{{ $t("wallet.text") }}</span>
      </div>
    </div>
    <div class="form-content" v-if="type == 1">
      <div class="form-box">
        <div class="form-title">
          {{ $t("personalinfos.title2") }}
        </div>
        <nut-form
          :model-value="loginForm"
          :rules="{
            oldPwd: [
              {
                validator: validoldPwd,
              },
            ],
            newPwd: [
              {
                validator: validnewPwd,
              },
            ],
            passAgain: [
              {
                validator: validpassAgain,
              },
            ],
          }"
          ref="ruleLoginForm"
        >
          <nut-form-item prop="oldPwd" label-width="0px">
            <div class="label">
              {{ $t("personalinfos.label1") }}
            </div>
            <div class="ipt-box">
              <nut-input
                :border="false"
                v-model="loginForm.oldPwd"
                :placeholder="$t('personalinfos.label1')"
                class="ipt"
                type="password"
              />
            </div>
          </nut-form-item>
          <nut-form-item prop="newPwd" label-width="0px">
            <div class="label">
              {{ $t("personalinfos.label2") }}
            </div>
            <div class="ipt-box">
              <nut-input
                :border="false"
                v-model="loginForm.newPwd"
                :placeholder="$t('personalinfos.label2')"
                class="ipt"
                type="password"
              />
            </div>
          </nut-form-item>
          <nut-form-item prop="passAgain" label-width="0px">
            <div class="label">
              {{ $t("personalinfos.label3") }}
            </div>
            <div class="ipt-box">
              <nut-input
                :border="false"
                v-model="loginForm.passAgain"
                :placeholder="$t('personalinfos.label3')"
                class="ipt"
                type="password"
              />
            </div>
          </nut-form-item>
        </nut-form>
        <div style="width: 100%; display: flex; justify-content: center">
          <div class="submit-btn" @click="submitLogin">
            <span v-if="!loginFormLoading">{{ $t("common.next") }}</span>
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
      </div>
    </div>
  </div>
</template>

<script setup>
import personalInfo from "@/mixin/personalInfo";

const {
  user_infos,
  type,
  ruleLoginForm,
  loginForm,
  loginFormLoading,
  submitLogin,
  changePageType,
  validoldPwd,
  validnewPwd,
  validpassAgain,
} = personalInfo();
</script>

<style scoped lang="scss">
.personal-info {
  width: 100%;
  box-sizing: border-box;
  padding: 45px 15px 15px 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  .label {
    width: 100%;
    text-align: left;
    font-size: 16px;
    color: #fff;
    font-weight: bold;
    padding-bottom: 10px;
  }

  .form-content {
    width: 412px;
    flex: 1;
    overflow-y: auto;
    box-sizing: border-box;
    padding-bottom: calc(env(safe-area-inset-bottom) + 50px);
    border-radius: 12px;
    border: 2px solid #fff;
    background-color: #1A44B0;

    .form-box {
      width: 100%;
      box-sizing: border-box;
      padding: 10px;
      background-color: #1A44B0;

      .submit-btn {
        margin: 10px 0;
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

      .label {
        width: 100%;
        font-size: 11px;
        color: #fff;
        box-sizing: border-box;
        padding-bottom: 5px;
      }

      .ipt-box {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-radius: 6px;
        box-sizing: border-box;
        padding: 8px 15px;
        border: 2px solid #fff;
        .ipt {
          border: 0px;
          outline: none;
          color: #fff;
          font-size: 12px;
          width: 100%;
          background-color: #1A44B0;
        }
      }

      .form-title {
        width: 100%;
        font-size: 13px;
        color: #fff;
        margin-bottom: 8px;
      }

      .form-sub-title {
        width: 100%;
        font-size: 11px;
        color: #fff;
        margin-bottom: 8px;
      }
    }

    .user-tip {
      width: 100%;
      box-sizing: border-box;
      padding: 10px 10px 0 10px;
      font-size: 11px;
      color: #fff;
      text-align: center;
    }

    .basic-box {
      width: 100%;
      border-radius: 12px;
      background-color: #1A44B0;
      box-sizing: border-box;
      padding: 10px;
      .label {
        font-size: 12px;
        color: #fff;
        box-sizing: border-box;
        padding-bottom: 10px;
      }

      .val {
        font-size: 15px;
        color: #fff;
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        box-sizing: border-box;
        padding: 0 10px;
        border-radius: 6px;
        margin-bottom: 10px;
        background-color: #1A44B0;
        border: 2px solid #fff;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    .account-box {
      width: 100%;
      border-radius: 6px;
      background-color: #1A44B0;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      box-sizing: border-box;
      padding: 10px;

      i {
        font-size: 40px;
        color: #fff;
      }
    }
  }
}
</style>
