<template>
  <div class="deposit">
    <div class="label">{{ $t("tabbar.deposit") }}</div>
    <div class="deposit-content" v-if="!payurl">
      <div class="deposit-box">
        <div class="deposit-title">
          {{ $t("deposit.chanel") }}
        </div>
        <div class="activity-row" v-if="payconfig.length > 0">
          <nut-radio-group v-model="activeType" direction="horizontal">
            <nut-radio v-for="(item, index) in payconfig" :key="index" :label="item.id">{{
              item.payName
            }}</nut-radio>
          </nut-radio-group>
        </div>
        <div class="deposit-title">
          {{ $t("deposit.amount") }}
        </div>
        <!-- <nut-input :border="false" v-model="depositForm.amount" :placeholder="placeText" class="ipt"
                    type="number" /> -->
        <div class="quick-amount-box">
          <div
            class="quick-amount-item"
            v-for="(item, index) in quickAmountList"
            :key="index"
            @click="changeQuickAmount(item.toString())"
            :style="{ background: item == depositForm.amount ? '#A0C4FD' : '#1A44B0' }"
          >
            <div class="item-row">
              <div>R${{ item }}</div>
            </div>

            <div
              class="item-row"
              v-if="giftType == '2'"
              style="padding-top: 3px; font-size: 10px"
            >
              +{{ giftRatio }}%Bonus
            </div>
          </div>
        </div>

        <div class="deposit-title"  v-if="activityList.data.length > 0">
          {{ $t("deposit.activity") }}
        </div>

        <div class="activity-row" v-if="activityList.data.length > 0">
          <nut-radio-group
            v-model="depositForm.rechargeActivityId"
            direction="horizontal"
            :disabled="recharge_count == 0"
          >
            <nut-radio
              v-for="(item, index) in activityList.data"
              :key="index"
              :label="item.id"
              >{{ item.name }}</nut-radio
            >
          </nut-radio-group>
        </div>

        <div
          v-if="giftType == '1'"
          style="width: 100%; word-break: break-all; margin-top: 5px"
        >
          <i
            class="iconfont icon-promotion"
            style="font-size: 15px; color: #A0C4FD; padding-right: 5px"
          ></i>
          <span
            v-for="(item, index) in giftRange.data"
            :key="index"
            style="font-size: 11px; color: #A0C4FD; padding-right: 5px; font-weight: bold"
          >
            Deposit ${{ item.min }}-${{ item.max }} get ${{ item.giveAmount }}
          </span>
        </div>

        <div class="activity-des-box" v-if="giftType == '2'">
          <i class="iconfont icon-promotion" style="font-size: 18px"></i>
          <div style="flex: 1; box-sizing: border-box; padding-left: 10px">
            <div style="font-size: 11px">
              Minimum Deposit $100 Get {{ giftRatio }}% Bonus
            </div>
            <div style="font-size: 10px">
              Need to bet {{ giftMultiple }} times the deposit amount to withdraw
            </div>
          </div>
        </div>

        <div class="deposit-title" v-if="couponList.length > 0">Coupon</div>

        <div class="activity-row">
          <div
            class="tickets"
            v-for="(item, index) in couponList"
            :key="index"
            @click="changeCoupon(item.id)"
          >
            <div class="l-tickets-1">
              <i class="iconfont icon-promotion" style="font-size: 20px"></i>
              <div class="tickets-data">
                <div class="amount">
                  <span style="font-size: 20px">$</span>{{ item.amount }}
                </div>
                <div class="date">
                  {{ item.createAt.split(" ")[0] }} To {{ item.endAt.split(" ")[0] }}
                </div>
              </div>
            </div>
            <div class="r-tickets-1">
              <i
                class="iconfont icon-check"
                style="font-size: 25px; color: #fff"
                v-if="item.id == depositForm.activityId"
              ></i>
              <i
                class="iconfont icon-nocheck"
                style="font-size: 25px; color: #fff"
                v-else
              ></i>
            </div>
          </div>
        </div>

        <div class="deposit-btn active-btn" @click="goDeposit()">
          <span v-if="!depositLoading">{{ $t("index.deposit") }}</span>
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
    <div v-else class="pc-iframe">
      <iframe
        :src="payurl"
        frameborder="0"
        scrolling="no"
        style="width: 100%; height: 100%"
      ></iframe>
    </div>
  </div>
</template>

<script setup>
import deposit from "@/mixin/deposit";

const {
  payconfig,
  quickAmountList,
  depositLoading,
  activeType,
  depositForm,
  couponList,
  activityList,
  payurl,
  placeText,
  changeQuickAmount,
  changeCoupon,
  goDeposit,
  giftType,
  giftRatio,
  giftMultiple,
  giftRange,
  recharge_count,
} = deposit();
</script>

<style lang="scss" scoped>
.deposit {
  width: 100%;
  box-sizing: border-box;
  padding: 45px 15px 15px 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  .pc-iframe {
    width: 60%;
    height: calc(100vh - 100px);
  }

  .label {
    width: 100%;
    text-align: left;
    font-size: 16px;
    color: #fff;
    font-weight: bold;
    padding-bottom: 10px;
  }

  .deposit-content {
    width: 412px;
    overflow-y: auto;

    .deposit-box {
      width: 100%;
      box-sizing: border-box;
      padding: 0 15px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: column;

      .quick-amount-box {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
        margin-top: 15px;

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
          color: #e2e8e3;
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

      .activity-row {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
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
            font-size: 20px;
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
            radial-gradient(
                circle at left bottom,
                transparent 8px,
                #A0C4FD 0,
                #A0C4FD 100%
              )
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
          background: linear-gradient(to top, #fff 0%, #fff 50%, transparent 50%)
            top left / 0.5px 10px repeat-y;
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
            radial-gradient(
                circle at left bottom,
                transparent 8px,
                #fb604a 0,
                #fb604a 100%
              )
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
          background: linear-gradient(to top, #fff 0%, #fff 50%, transparent 50%)
            top left / 0.5px 10px repeat-y;
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
            radial-gradient(
                circle at left bottom,
                transparent 8px,
                #999999 0,
                #999999 100%
              )
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
          background: linear-gradient(to top, #fff 0%, #fff 50%, transparent 50%)
            top left / 0.5px 10px repeat-y;
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

      .active-btn {
        background: #A0C4FD;
      }

      .disabled-btn {
        background: #A0C4FD;
        opacity: 0.5;
      }

      .deposit-btn {
        cursor: pointer;
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
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}
</style>
