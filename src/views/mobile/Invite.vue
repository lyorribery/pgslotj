<template>
  <div class="agent">
    <div class="mobile-container">
      <div class="mobile-content">
        <div class="tab-box">
          <div
            class="item"
            :class="activeIndex == 1 ? 'hover' : ''"
            @click="changeTab(1)"
          >
            <img
              :src="base_img_url + 'agent/invite.png'"
              style="margin-bottom: 10px; width: 20px; height: auto"
            />
            <span>{{ $t("agent.label1") }}</span>
          </div>
          <div
            class="item"
            :class="activeIndex == 2 ? 'hover' : ''"
            @click="changeTab(2)"
          >
            <img
              :src="base_img_url + 'agent/data.png'"
              style="margin-bottom: 10px; width: 20px; height: auto"
            />
            <span>{{ $t("agent.label2") }}</span>
          </div>
        </div>

        <div class="box" v-if="activeIndex == 1">
          <div class="left-content">
            <div
              style="
                width: 100%;
                color: #e2e8e3;
                font-weight: 700;
                font-size: 20px;
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;
              "
            >
              {{ $t("agent.label4") }}
            </div>
            <div
              style="
                width: 100%;
                color: #e2e8e3;
                font-weight: 600;
                font-size: 13px;
                display: flex;
                justify-content: flex-start;
                margin: 15px 0 5px 0;
              "
            >
              {{ $t("agent.label5") }}
            </div>
            <div class="ipt-box">
              <div class="ipt-container">{{ inviteLink }}</div>
              <div class="ipt-btn" @click="copyContent">
                <i class="iconfont icon-copy" style="color: #e2e8e3; font-size: 20px"></i>
              </div>
            </div>
            <div
              style="
                width: 100%;
                color: #e2e8e3;
                font-weight: 600;
                font-size: 13px;
                display: flex;
                justify-content: flex-start;
                margin: 15px 0 5px 0;
              "
            >
              {{ $t("agent.label6") }}
            </div>
            <div
              style="
                display: flex;
                width: 100%;
                justify-content: flex-start;
                align-items: center;
              "
            >
              <img
                :src="base_img_url + 'agent/facebook.png'"
                style="margin-right: 10px; width: 40px"
                @click="shareFb"
              />
              <img
                :src="base_img_url + 'agent/twitter.png'"
                style="margin-right: 10px; width: 40px"
              />
              <img
                :src="base_img_url + 'agent/telegram.png'"
                style="margin-right: 10px; width: 40px"
              />
              <img
                :src="base_img_url + 'agent/whats.png'"
                style="margin-right: 10px; width: 40px"
              />
            </div>
          </div>
          <div class="right-box-top" style="margin-top: 12px">
            <div class="mobile-right-box-item">
              <div class="label">{{ $t("agent.label7") }}</div>
              <div class="date-item">
                {{ inviteMemberCount }}
              </div>
            </div>
            <div class="mobile-right-box-item">
              <div class="label">{{ $t("agent.label8") }}</div>
              <div class="date-item">
                {{ inviteMemberRechargeCount }}
              </div>
            </div>
            <!-- <div class="mobile-right-box-item">
              <div class="label">{{ $t("agent.label14") }}</div>
              <div class="date-item">
                {{ registerMoney }}
              </div>
            </div>
            <div class="mobile-right-box-item">
              <div class="label">{{ $t("agent.label15") }}</div>
              <div class="date-item">
                {{ betMoney }}
              </div>
            </div>
            <div class="mobile-right-box-item">
              <div class="label">{{ $t("agent.label9") }}</div>
              <div class="date-item">
                {{ todayMoney }}
              </div>
            </div> -->
          </div>
          <div class="right-box-bottom" style="margin-top: 12px">
            <img
              :src="base_img_url + 'agent/agent4.png'"
              style="margin: 0 20px; width: 50px"
            />
            <div style="width: calc(100% - 100px)">
              <div
                style="
                  color: #e2e8e3;
                  font-weight: bold;
                  font-size: 18px;
                  width: 100%;
                  text-align: left;
                "
              >
                {{ $t("agent.label11") }}
              </div>
              <div
                style="
                  color: #ffeb3b;
                  font-weight: bold;
                  font-size: 16px;
                  width: 100%;
                  text-align: left;
                "
              >
                R$2,920
              </div>
              <div style="color: #b1bad3; font-size: 12px; width: 100%; text-align: left">
                {{ $t("agent.label12") }}
              </div>
            </div>
          </div>
          <div class="small-box">
            <div style="color: #e2e8e3; font-size: 16px; font-weight: 700">
              {{ $t("agent.label17") }}
            </div>
            <div
              style="
                color: #b1bad3;
                font-weight: 700;
                font-size: 15px;
                margin: 16px 0;
                text-align: left;
              "
            >
              Convide os clientes a fazerem sua primeira recarga com sucesso e recebam um
              bônus imediato 20% sobre o valor da recarga. (Até R$ 1.000)
            </div>
          </div>
          <div style="margin: 20px 0; color: #e2e8e3; font-weight: 700; font-size: 20px">
            {{ $t("agent.label21") }}
          </div>
          <div class="small-box2">
            <div
              style="
                width: 100%;
                color: #b1bad3;
                font-size: 16px;
                font-weight: 700;
                text-align: left;
              "
            >
              {{ $t("agent.label22") }}
            </div>
            <div
              style="
                width: 100%;
                color: #b1bad3;
                font-size: 16px;
                font-weight: 700;
                text-align: left;
              "
            >
              {{ $t("agent.label23") }}
            </div>
            <div
              style="
                width: 100%;
                color: #b1bad3;
                font-size: 16px;
                font-weight: 700;
                text-align: left;
              "
            >
              {{ $t("agent.label24") }}
            </div>
            <div
              style="
                width: 100%;
                color: #b1bad3;
                font-size: 16px;
                font-weight: 700;
                text-align: left;
                padding-left: 20px;
              "
            >
              {{ $t("agent.label25") }}
            </div>
            <div
              style="
                width: 100%;
                color: #b1bad3;
                font-size: 16px;
                font-weight: 700;
                text-align: left;
                padding-left: 20px;
              "
            >
              {{ $t("agent.label26") }}
            </div>
            <div
              style="
                width: 100%;
                color: #b1bad3;
                font-size: 16px;
                font-weight: 700;
                text-align: left;
                padding-left: 20px;
              "
            >
              {{ $t("agent.label27") }}
            </div>
            <div style="width: 100%; display: flex; justify-content: center">
              <img
                :src="base_img_url + 'agent/image_agent_people.png'"
                style="margin: 12px 0; width: 300px"
              />
            </div>
            <div class="small-box2-bottom-item">
              <div
                style="
                  color: #e2e8e3;
                  font-size: 16px;
                  font-weight: 700;
                  margin-bottom: 8px;
                "
              >
                {{ $t("agent.label28") }}
              </div>
              <div
                style="
                  color: #ffeb3b;
                  font-size: 16px;
                  font-weight: 700;
                  margin-bottom: 8px;
                "
              >
                <span>{{ 50 * 1200 }}</span>
              </div>
              <div
                style="
                  color: #b1bad3;
                  font-size: 13px;
                  font-weight: 600;
                  margin-bottom: 8px;
                "
              >
                {{ $t("agent.label44") }}
              </div>
            </div>
          </div>
        </div>
        <div class="box" v-if="activeIndex == 2">
          <div class="right-item-box">
            <div
              style="
                width: 100%;
                display: flex;
                justify-content: space-around;
                align-items: center;
              "
            >
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                "
              >
                <div style="color: #e2e8e3; font-size: 16px; font-weight: 700">
                  R$
                  {{ registerMoney }}
                </div>
                <div style="color: #A0C4FD; font-size: 13px; font-weight: 600">
                  {{ $t("agent.label31") }}
                </div>
              </div>
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                "
              >
                <div style="color: #e2e8e3; font-size: 16px; font-weight: 700">
                  R$ {{ betMoney }}
                </div>
                <div style="color: #A0C4FD; font-size: 13px; font-weight: 600">
                  {{ $t("agent.label32") }}
                </div>
              </div>
            </div>
            <div
              style="
                color: #e2e8e3;
                font-size: 13px;
                font-weight: 600;
                margin: 20px 0;
                width: 100%;
                text-align: left;
              "
            >
              {{ $t("agent.label33") }}
            </div>
            <div
              style="
                color: #e2e8e3;
                font-size: 13px;
                font-weight: 600;
                width: 100%;
                text-align: left;
              "
            >
              {{ $t("agent.label34") }}
            </div>
            <div
              style="
                color: #e2e8e3;
                font-size: 13px;
                font-weight: 600;
                width: 100%;
                text-align: left;
              "
            >
              {{ $t("agent.label35") }}
            </div>
            <div
              style="
                color: #e2e8e3;
                font-size: 13px;
                font-weight: 600;
                width: 100%;
                text-align: left;
                margin-top: 20px;
              "
            ></div>
            <div
              style="
                color: #e2e8e3;
                font-size: 13px;
                font-weight: 600;
                width: 100%;
                text-align: left;
              "
            >
              {{ $t("agent.label36") }}
            </div>
          </div>
          <div
            style="
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
            "
          >
            <div
              style="color: #A0C4FD; font-size: 15px; font-weight: 700; margin-top: 16px"
            >
              R$
              {{ totalMoney }}
            </div>
            <div
              style="color: #e2e8e3; font-size: 13px; font-weight: 600; margin-top: 5px"
            >
              {{ $t("agent.label37") }}
            </div>
          </div>
          <div class="right-item-box" style="margin-top: 12px">
            <div
              style="
                color: #e2e8e3;
                font-size: 13px;
                font-weight: 600;
                width: 100%;
                text-align: left;
              "
            >
              {{ $t("agent.label38") }}
            </div>
            <div
              style="
                color: #e2e8e3;
                font-size: 13px;
                font-weight: 600;
                width: 100%;
                text-align: left;
                margin: 20px 0;
              "
            >
              {{ $t("agent.label39") }}
            </div>
            <div
              style="
                color: #e2e8e3;
                font-size: 13px;
                font-weight: 600;
                width: 100%;
                text-align: left;
              "
            >
              {{ $t("agent.label24") }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <pageFooter />
  </div>
</template>

<script>
import pageFooter from "@/components/pageFooter.vue";
export default {
  components: {
    pageFooter,
  },
};
</script>

<script setup>
import invite from "@/mixin/invite";

const {
  base_img_url,
  activeIndex,
  inviteLink,
  inviteMemberCount,
  inviteMemberRechargeCount,
  registerMoney,
  betMoney,
  todayMoney,
  totalMoney,
  echartsBetMoney,
  echartsRegisterMoney,
  changeTab,
  copyContent,
  shareFb,
  currentTab,
} = invite();
</script>

<style scoped lang="scss">
.agent {
  width: 100%;

  .mobile-container {
    width: 100%;
    box-sizing: border-box;
    padding: 12px;

    img {
      height: auto;
    }

    .mobile-content {
      width: 100%;

      .tab-box {
        width: 100%;
        margin-bottom: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #1A44B0;
        border-radius: 13px;
        overflow: hidden;

        .hover {
          background: linear-gradient(180deg, #1A44B0, #1A44B0);
          opacity: 1;
        }

        .item {
          width: 50%;
          align-items: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow: hidden;
          padding: 8px 12px;
          position: relative;
          text-decoration: none;
          font-weight: 600;
          white-space: nowrap;
          z-index: 1;
          color: #e2e8e3;
          font-size: 13px;
          cursor: pointer;
          width: calc(100% / 3);

          &:hover {
            background: linear-gradient(180deg, #1A44B0, #1A44B0);
            opacity: 1;
          }
        }
      }

      .box {
        border-radius: 20px;
        display: flex;
        flex-wrap: nowrap;
        flex-direction: column;
        box-sizing: border-box;
        padding: 12px;
        margin-bottom: 25px;
        background-color: #1A44B0;

        .more-btn {
          margin: 15px 0 calc(env(safe-area-inset-bottom)) 0;
          border-radius: 6px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #1A44B0;
          color: #e2e8e3;
          font-size: 11px;
          width: 100px;
          height: 25px;
        }

        .loading {
          width: 16em;
          height: 16em;
          position: relative;

          .left {
            border-radius: 16em 0 0 16em;
          }

          .right {
            border-radius: 0 16em 16em 0;
          }

          .left,
          .right {
            width: 8em;
            height: 16em;
            overflow: hidden;
            position: relative;
            float: left;
            background-color: #A0C4FD;
          }

          .left:after,
          .right:after {
            content: "";
            position: absolute;
            display: block;
            width: 8em;
            height: 16em;
            border-radius: 16em 0 0 16em;
            background-color: #A0C4FD;
          }

          .right:after {
            content: "";
            position: absolute;
            display: block;
            border-radius: 0 16em 16em 0;
          }

          .left:after {
            transform-origin: right center;
          }

          .right:after {
            transform-origin: left center;
            transform: rotateZ(180deg);
          }

          .progress {
            color: #e2e8e3;
            position: absolute;
            width: 13em;
            height: 13em;
            background-color: #20262d;
            border-radius: 50%;
            left: 1.5em;
            top: 1.5em;
            line-height: 13em;
            text-align: center;
          }
        }

        .list-table {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 30px;

          .head2 {
            box-sizing: border-box;
            padding: 10px 0;
            display: flex;
            justify-content: center;
            align-items: center;
            width: calc(100% / 3);
            color: #e2e8e3;
            font-size: 11px;
            font-weight: 600;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }

          .head {
            border-bottom: 1px solid #888;
            box-sizing: border-box;
            padding: 10px 0;
            display: flex;
            justify-content: center;
            align-items: center;
            width: calc(100% / 3);
            color: #e2e8e3;
            font-size: 16px;
            font-weight: 600;
          }
        }

        .list-box {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .item {
            width: calc(100% / 3);
            box-sizing: border-box;
            padding: 8px 0;
            text-align: center;
            font-size: 15px;
            font-weight: 700;
            color: #e2e8e3;
          }
        }

        .bottom-left-box {
          width: calc((100% - 16px) / 2);
          height: 1330px;
          background: linear-gradient(180deg, #1e2024, #A0C4FD);
          border-radius: 16px;

          .bottom-left-box-item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: calc(100% / 3);
          }
        }

        .small-box2 {
          width: 100%;
          border-radius: 16px;
          background: linear-gradient(180deg, #1e2024, #A0C4FD);
          box-sizing: border-box;
          padding: 16px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;

          .small-box2-bottom-item {
            border-radius: 16px;
            width: 100%;
            box-sizing: border-box;
            padding: 16px;
            background-color: #1A44B0;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
          }
        }

        .small-box {
          width: 100%;
          border-radius: 16px;
          background: linear-gradient(180deg, #1e2024, #A0C4FD);
          box-sizing: border-box;
          padding: 16px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .right-box-bottom {
          background: linear-gradient(180deg, #1e2024, #A0C4FD);
          border-radius: 16px;
          box-sizing: border-box;
          padding: 16px;
          margin-top: 8px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }

        .right-box-top {
          font-weight: 700;
          background-color: #1A44B0;
          border-radius: 16px;
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          width: 100%;
          flex-wrap: wrap;

          .mobile-right-box-item {
            width: calc(100% / 3);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            padding: 8px 3px;

            .label {
              color: #e2e8e3;
              font-weight: 700;
              font-size: 11px;
              width: 100%;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            }

            .date-item {
              border-radius: 50%;
              width: 50px;
              height: 50px;
              color: #e2e8e3;
              font-size: 13px;
              font-weight: 600;
              background-color: #20262d;
              display: flex;
              justify-content: center;
              align-items: center;
              margin-top: 5px;
            }
          }
        }

        .left-content {
          background: linear-gradient(180deg, #1e2024, #A0C4FD);
          box-sizing: border-box;
          padding: 16px;
          border-radius: 16px;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;

          .ipt-box {
            width: 100%;
            height: 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .ipt-btn {
              border-radius: 6px;
              background-color: #1A44B0;
              width: 45px;
              height: 40px;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
            }

            .ipt-container {
              margin-right: 10px;
              width: calc(100% - 15px);
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              height: 40px;
              line-height: 40px;
              box-sizing: border-box;
              padding: 0 12px;
              border-radius: 6px;
              background-color: #1A44B0;
              color: #e2e8e3;
              font-size: 13px;
              font-weight: 600;
              text-align: left;
            }
          }
        }
      }
    }
  }

  .right-box-item {
    width: calc(100% / 4);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding: 8px 0;
  }
}
</style>
