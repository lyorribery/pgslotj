<template>
  <div class="label">{{ $t("personal.wallet") }}</div>
  <div class="account-box">
    <div class="basic-box">
      <div class="item-row" v-for="(item, index) in memberBanks.data" :key="index">
        <div class="item">{{ $t("common.username") }}:{{ item.realName }}</div>
        <div class="item" style="padding-left: 5px">CPF:{{ item.bankAccount }}</div>
        <!-- <div class="item-btn">
                    <i class="iconfont icon-trash" style="font-size: 20px;color:#fff;font-weight: 400;"
                        @click="del(item.id)"></i>
                </div> -->
      </div>
      <div class="no-data" v-if="memberBanks.data.length == 0">
        <i
          class="iconfont icon-nodata"
          style="color: #fff; font-size: 30px; font-weight: 400"
        ></i>
      </div>
    </div>
    <div class="add-btn" @click="addData()" v-show="!showform">
      {{ $t("wallet.addbtn1") }}
    </div>
    <div class="form-box" v-if="showform">
      <view class="form-title">
        {{ $t("wallet.addbtn1") }}
      </view>
      <nut-form
        :model-value="walletForm"
        :rules="{
          realName: [
            {
              validator: validrealname,
            },
          ],
          bankAccount: [
            {
              validator: validbankAccount,
            },
          ],
        }"
        ref="rulewalletForm"
      >
        <nut-form-item prop="realName" label-width="0px">
          <div class="label">
            {{ $t("common.username") }}
          </div>
          <div class="ipt-box">
            <nut-input
              :border="false"
              v-model="walletForm.realName"
              :disabled="memberBanks.data.length > 0"
              class="ipt"
              type="text"
            />
          </div>
        </nut-form-item>
        <nut-form-item prop="bankAccount" label-width="0px">
          <div class="label">CPF</div>
          <div class="ipt-box">
            <nut-input
              :border="false"
              v-model="walletForm.bankAccount"
              class="ipt"
              type="number"
              max-length="11"
            />
          </div>
        </nut-form-item>
      </nut-form>
      <div
        style="
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-sizing: border-box;
          padding: 10px;
        "
      >
        <div class="back-btn" @click="reset">
          {{ $t("common.cancel") }}
        </div>
        <div class="submit-btn" @click="submit">
          <span v-if="!loading">{{ $t("common.next") }}</span>
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
  <div class="tip">
    <span>{{ $t("wallet.text") }}</span>
  </div>
  <nut-dialog
    footer-direction="vertical"
    teleport="#app"
    title="Tip"
    :content="$t('wallet.tip')"
    :cancelText="$t('common.cancel')"
    :okText="$t('common.confirm')"
    v-model:visible="show_del"
    @ok="confirmDel"
  >
  </nut-dialog>
</template>

<script setup>
import wallet from "@/mixin/wallet";

const {
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
  acceptKey,
} = wallet();
</script>

<style lang="scss" scoped>


.tip {
  width: 100%;
  box-sizing: border-box;
  padding: 15px 10px 0 10px;
  font-size: 11px;
  color: #fff;
  text-align: center;
}

.label {
  margin-top: 45px;
  width: 100%;
  text-align: left;
  font-size: 16px;
  color: #fff;
  font-weight: bold;
  box-sizing: border-box;
  padding: 0 15px 10px 15px;
}

.account-box {
  width: 100%;
  box-sizing: border-box;
  padding: 15px calc((100% - 400px) / 2) 0 calc((100% - 400px) / 2);

  .form-box {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    border-radius: 12px;
    border: 2px solid #fff;
    background-color: #1A44B0;

    .submit-btn {
      width: calc((100% - 15px) / 2);
      height: 35px;
      border-radius: 6px;
      background: #A0C4FD;
      border: 1px solid #A0C4FD;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 13px;
      cursor: pointer;
    }

    .back-btn {
      width: calc((100% - 15px) / 2);
      height: 35px;
      border-radius: 6px;
      border: 1px solid #A0C4FD;
      color: #A0C4FD;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 13px;
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
        background-color: #1A44B0;
        border: 0px;
        outline: none;
        color: #fff;
        font-size: 12px;
        width: 100%;
      }
    }

    .form-title {
      width: 100%;
      font-size: 13px;
      color: #fff;
      margin-bottom: 8px;
    }
  }

  .add-btn {
    margin-top: 15px;
    width: 100%;
    height: 35px;
    border-radius: 6px;
    background: #A0C4FD;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    cursor: pointer;
  }

  .basic-box {
    width: 100%;
    background-color: #1A44B0;
    border-radius: 6px;
    box-sizing: border-box;
    padding: 0 10px;

    .no-data {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      box-sizing: border-box;
      padding: 10px 0;
    }

    .item-row {
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1rpx solid rgba(255, 255, 255, 0.1);

      &:last-child {
        border-bottom: 0;
      }

      .item {
        width: calc((100% - 30px) / 2);
        font-size: 11px;
        color: #fff;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        box-sizing: border-box;
        padding-right: 8px;
      }

      .item-btn {
        width: 50px;
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
    }
  }
}
</style>
