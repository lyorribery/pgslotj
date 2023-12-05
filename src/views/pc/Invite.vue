<template>
  <div class="pc-container">
    <div class="content">
      <div class="tab-box">
        <div class="item" :class="activeIndex == 1 ? 'hover' : ''" @click="changeTab(1)">
          <img
            :src="base_img_url + 'agent/invite.png'"
            width="40"
            alt=""
            style="margin-bottom: 10px"
          />
          <span>{{ $t("agent.label1") }}</span>
        </div>
        <div class="item" :class="activeIndex == 2 ? 'hover' : ''" @click="changeTab(2)">
          <img
            :src="base_img_url + 'agent/data.png'"
            width="40"
            alt=""
            style="margin-bottom: 10px"
          />
          <span>{{ $t("agent.label2") }}</span>
        </div>
      </div>
      <div class="box" v-if="activeIndex == 1">
        <div class="row">
          <div class="left-box">
            <div class="left-content">
              <div
                style="
                  width: 100%;
                  color: #fff;
                  font-weight: 700;
                  font-size: 22px;
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
                  color: #fff;
                  font-weight: 600;
                  font-size: 14px;
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
                  <i
                    class="iconfont icon-copy"
                    style="color: #fff; font-size: 20px"
                  ></i>
                </div>
              </div>
              <div
                style="
                  width: 100%;
                  color: #fff;
                  font-weight: 600;
                  font-size: 14px;
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
                  @click="shareFb()"
                  :src="base_img_url + 'agent/facebook.png'"
                  width="40"
                  alt=""
                  style="margin-right: 10px; cursor: pointer"
                />
                <img
                  :src="base_img_url + 'agent/twitter.png'"
                  width="40"
                  alt=""
                  style="margin-right: 10px; cursor: pointer"
                />
                <img
                  :src="base_img_url + 'agent/telegram.png'"
                  width="40"
                  alt=""
                  style="margin-right: 10px"
                />
                <img :src="base_img_url + 'agent/whats.png'" width="40" alt="" />
              </div>
            </div>
          </div>
          <div class="right-box">
            <div class="right-box-top" style="justify-content: flex-start;">
              <div class="right-box-item">
                <div
                  class="label"
                  style="color: #fff; justify-content: center; font-size: 12px"
                >
                  {{ $t("agent.label7") }}
                </div>
                <div class="date-item">
                  {{ inviteMemberCount }}
                </div>
              </div>

              <div class="right-box-item">
                <div
                  class="label"
                  style="color: #fff; justify-content: center; font-size: 12px"
                >
                  {{ $t("agent.label8") }}
                </div>
                <div class="date-item">
                  {{ inviteMemberRechargeCount }}
                </div>
              </div>

              <!-- <div class="right-box-item">
                <div
                  class="label"
                  style="color: #fff; justify-content: center; font-size: 12px"
                >
                  {{ $t("agent.label14") }}
                </div>
                <div class="date-item">
                  {{ registerMoney }}
                </div>
              </div>
              <div class="right-box-item">
                <div
                  class="label"
                  style="color: #fff; justify-content: center; font-size: 12px"
                >
                  {{ $t("agent.label15") }}
                </div>
                <div class="date-item">
                  {{ betMoney }}
                </div>
              </div>
              <div class="right-box-item">
                <div
                  class="label"
                  style="color: #fff; justify-content: center; font-size: 12px"
                >
                  {{ $t("agent.label9") }}
                </div>
                <div class="date-item">
                  {{ todayMoney }}
                </div>
              </div> -->
            </div>
            <div class="right-box-bottom">
              <img
                :src="base_img_url + 'agent/agent4.png'"
                width="80"
                alt=""
                style="margin: 0 50px"
              />
              <div class="right-box-bottom-right">
                <div
                  style="
                    color: #fff;
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
                <div
                  style="color: #b1bad3; font-size: 12px; width: 100%; text-align: left"
                >
                  {{ $t("agent.label12") }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="small-box">
          <div style="color: #fff; font-size: 16px; font-weight: 700">
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
        <div style="margin: 22px 0; color: #fff; font-weight: 700; font-size: 20px">
          {{ $t("agent.label21") }}
        </div>
        <div class="small-box2">
          <div
            style="
              width: 80%;
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
              width: 80%;
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
              width: 80%;
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
              width: 80%;
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
              width: 80%;
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
              width: 80%;
              color: #b1bad3;
              font-size: 16px;
              font-weight: 700;
              text-align: left;
              padding-left: 20px;
            "
          >
            {{ $t("agent.label27") }}
          </div>
          <div class="small-box2-bottom">
            <div class="small-box2-bottom-item">
              <img
                :src="base_img_url + 'agent/image_agent_people.png'"
                height="200"
                alt=""
              />
            </div>
            <div class="small-box2-bottom-item">
              <div
                style="
                  color: #fff;
                  font-size: 18px;
                  font-weight: 700;
                  margin-bottom: 8px;
                "
              >
                {{ $t("agent.label28") }}
              </div>
              <div
                style="
                  color: #ffeb3b;
                  font-size: 18px;
                  font-weight: 700;
                  margin-bottom: 8px;
                "
              >
                R$ <span>{{ 50 * 1200 }}</span>
              </div>
              <div
                style="
                  color: #b1bad3;
                  font-size: 14px;
                  font-weight: 600;
                  margin-bottom: 8px;
                "
              >
                {{ $t("agent.label44") }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="box" v-if="activeIndex == 2">
        <div
          style="
            width: 100%;
            text-align: left;
            font-size: 16px;
            font-weight: bold;
            color: #fff;
            margin-bottom: 16px;
          "
        >
          {{ $t("agent.label30") }}
        </div>
        <div class="estatic-content" style="justify-content: center">
          <div
            style="
              width: 400px;
              height: 300px;
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
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
              <div style="color: #fff; font-size: 16px; font-weight: 700">
                R$ {{ registerMoney }}
              </div>
              <div style="color: #A0C4FD; font-size: 14px; font-weight: 600">
                {{ $t("agent.label31") }}
              </div>
            </div>
            <div
              style="
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin-top: 30px;
              "
            >
              <div style="color: #fff; font-size: 16px; font-weight: 700">
                R$ {{ betMoney }}
              </div>
              <div style="color: #A0C4FD; font-size: 14px; font-weight: 600">
                {{ $t("agent.label32") }}
              </div>
            </div>
          </div>
          <div class="right-item-box">
            <div
              style="
                color: #fff;
                font-size: 16px;
                font-weight: 600;
                margin: 22px 0;
                width: 100%;
                text-align: left;
              "
            >
              {{ $t("agent.label33") }}
            </div>
            <div
              style="
                color: #fff;
                font-size: 16px;
                font-weight: 600;
                width: 100%;
                text-align: left;
              "
            >
              {{ $t("agent.label34") }}
            </div>
            <div
              style="
                color: #fff;
                font-size: 16px;
                font-weight: 600;
                width: 100%;
                text-align: left;
              "
            >
              {{ $t("agent.label35") }}
            </div>
            <div
              style="
                color: #fff;
                font-size: 16px;
                font-weight: 600;
                width: 100%;
                text-align: left;
                margin-top: 22px;
              "
            >
              {{ $t("agent.label36") }}
            </div>
            <div
              style="
                color: #fff;
                font-size: 16px;
                font-weight: 600;
                width: 100%;
                text-align: left;
              "
            >
              {{ $t("agent.label37") }}
            </div>
          </div>
        </div>
        <div
          style="
            width: 100%;
            text-align: left;
            font-size: 16px;
            font-weight: bold;
            color: #fff;
            margin-bottom: 16px;
          "
        >
          {{ $t("agent.label37") }}
        </div>
        <div class="estatic-content">
          <div
            style="
              width: 400px;
              height: 300px;
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
            "
          >
            <div
              style="color: #A0C4FD; font-size: 18px; font-weight: 700; margin-top: 16px"
            >
              R$ {{ totalMoney }}
            </div>
            <div
              style="color: #fff; font-size: 16px; font-weight: 600; margin-top: 5px"
            >
              {{ $t("agent.label37") }}
            </div>
          </div>
          <div class="right-item-box">
            <div
              style="
                color: #fff;
                font-size: 16px;
                font-weight: 600;
                width: 100%;
                text-align: left;
              "
            >
              {{ $t("agent.label38") }}
            </div>
            <div
              style="
                color: #fff;
                font-size: 16px;
                font-weight: 600;
                width: 100%;
                text-align: left;
                margin: 22px 0;
              "
            >
              {{ $t("agent.label39") }}
            </div>
            <div
              style="
                color: #fff;
                font-size: 16px;
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
  </div>
  <pageFooter />
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

<style lang="scss" scoped>
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
  cursor: pointer;
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
    color: #fff;
    position: absolute;
    width: 13em;
    height: 13em;
    background-color: #1f1f1f;
    border-radius: 50%;
    left: 1.5em;
    top: 1.5em;
    line-height: 13em;
    text-align: center;
  }
}

.right-box-top {
  font-weight: 700;
  background-color: #1A44B0;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
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

.right-box-item {
  width: calc(100% / 5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 8px 0;
}

.list-table {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
}

.list-table .head {
  border-bottom: 1px solid #888;
  box-sizing: border-box;
  padding: 16px 0 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% / 3);
  color: #fff;
  font-size: 16px;
  font-weight: 600;
}

.list-table .head2 {
  box-sizing: border-box;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% / 3);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
}

.options-row {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 15px;
}

.estatic-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.estatic-content .right-item-box {
  width: calc(100% - 400px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.bottom-right-box {
  width: calc((100% - 16px) / 2);
  height: 680px;
  border-radius: 16px;
  position: relative;
}

.list-box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.list-box .item {
  width: calc(100% / 3);
  box-sizing: border-box;
  padding: 8px 0;
  text-align: center;
  font-size: 15px;
  font-weight: 700;
  color: #fff;
}

.bottom-left-box {
  width: calc((100% - 16px) / 2);
  height: 680px;
  background: linear-gradient(180deg, #1e2024, #A0C4FD);
  border-radius: 16px;
}

.bottom-left-box .bottom-left-box-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(100% / 3);
}

@media screen and (min-width: 1441px) {
  .pc-container {
    width: 100%;
    box-sizing: border-box;
    padding: 30px calc((100% - 1200px) / 2);
  }
}

@media screen and (max-width: 1440px) {
  .pc-container {
    width: 100%;
    box-sizing: border-box;
    padding: 30px 0;
  }
}

.pc-container .content {
  width: 100%;
}

.pc-container .content .box {
  border-radius: 20px;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  box-sizing: border-box;
  padding: 16px;
  margin-bottom: 48px;
  background-color: #1A44B0;
}

.pc-container .content .box .row {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
}

.small-box2 .small-box2-bottom {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}

.small-box2 .small-box2-bottom .small-box2-bottom-item {
  border-radius: 16px;
  width: calc((100% - 16px) / 2);
  height: 235px;
  box-sizing: border-box;
  padding: 16px;
  background-color: #1A44B0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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

.small-box .small-box-row {
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.small-box-row-item {
  background-color: #1A44B0;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  width: calc((100% - 220px) / 15);
  height: 79px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.small-box-row-item2 {
  background-color: #1A44B0;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  width: calc((100% - 220px) / 15);
  height: 79px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.pc-container .content .box .row .left-box {
  box-sizing: border-box;
  padding-right: 16px;
  width: calc(100% / 3);
}

.pc-container .content .box .row .right-box {
  box-sizing: border-box;
  padding-right: 8px 16px;
  width: calc(100% / 3 * 2);
}

.pc-container .content .box .row .right-box .right-box-top .right-box-item .label,
.ipt-box {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ipt-container {
  width: calc(100% - 55px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 40px;
  line-height: 40px;
  box-sizing: border-box;
  padding: 0 12px;
  border-radius: 6px;
  background-color: #1A44B0;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  text-align: left;
}

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

.ipt-btn:hover {
  background: linear-gradient(180deg, #1A44B0, #1a2c38);
  opacity: 1;
}

.pc-container .content .box .row .left-box .left-content {
  background: linear-gradient(180deg, #1e2024, #A0C4FD);
  box-sizing: border-box;
  padding: 16px;
  border-radius: 16px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.pc-container .content .box .row .right-box .right-box-top .right-box-item .date-item,
.mobile-right-box-item .date-item {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  background-color: #171717;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
}

.pc-container .content .tab-box {
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  background: #1A44B0;
  border-radius: 14px;
  overflow: hidden;
}

.pc-container .content .tab-box .item {
  align-items: center;
  display: flex;
  flex: 1 1;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  padding: 15px 25px;
  position: relative;
  text-decoration: none;
  font-weight: 600;
  white-space: nowrap;
  z-index: 1;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

.pc-container .content .tab-box .hover {
  background: linear-gradient(180deg, #1A44B0, #171717);
  opacity: 1;
}

.pc-container .content .tab-box .item:hover {
  background: linear-gradient(180deg, #1A44B0, #171717);
  opacity: 1;
}
</style>
