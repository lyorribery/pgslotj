<template>
  <div
    style="
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: column;
      background-color: #1A44B0;
      box-sizing: border-box;
      padding-bottom: 20px;
      margin-top: 20px;
    "
  >
    <img src="@/assets/images/logo.png" style="width: 30px" />

    <div class="description-box">
      This site offers games with a risky experience. To be a user of our website, you
      must be at least 18 years old. We are not responsible for violating your local laws
      regarding online gambling. Play responsibly and have fun in pgslotj.com.
    </div>

    <div
      style="
        width: 100%;
        font-size: 13px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        margin: 10px 0;
        font-weight: 500;
      "
    >
      Telegram:<span
        style="color: #fff; padding-left: 5px; text-decoration: underline"
        @click="goTelegram"
        >https://t.me/+Nw4yxAsTvD44YzMx</span
      >
    </div>

    <div class="game-company-list">
      <img
        :src="base_img_url + 'agent/facebook.png'"
        style="margin-right: 10px; width: 25px"
      />
      <img
        :src="base_img_url + 'agent/twitter.png'"
        style="margin-right: 10px; width: 25px"
      />
      <img
        :src="base_img_url + 'agent/telegram.png'"
        style="margin-right: 10px; width: 25px"
      />
      <img
        :src="base_img_url + 'agent/whats.png'"
        style="margin-right: 10px; width: 25px"
      />
    </div>

    <div
      style="
        width: 100%;
        text-align: center;
        color: #fff;
        font-size: 12px;
        box-sizing: border-box;
        padding-bottom: 15px;
      "
    >
      {{ $t("footer.text2") }}
    </div>
  </div>
</template>

<script>
import apiConfig from "@/utils/apiConfig.js";
import { useStore } from "vuex";
export default {
  name: "pageFooter",
  setup() {
    const base_img_url = apiConfig.fileURL;
    const { state } = useStore();
    const goTelegram = () => {
      location.href = "https://t.me/+Nw4yxAsTvD44YzMx";
    };
    const game_company = state.game.game_company;
    return {
      base_img_url,
      game_company,
      goTelegram,
    };
  },
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 1441px) {
  .game-company-list {
    width: 60%;
    padding: 0 20%;
  }

  .description-box {
    width: 50%;
  }
}

@media screen and (max-width: 1440px) {
  .game-company-list {
    width: 40%;
    padding: 0 25px;
  }

  .description-box {
    width: 70%;
  }
}

@media screen and (max-width: 768px) {
  .game-company-list {
    width: 80%;
    padding: 0 25px;
  }

  .description-box {
    width: 80%;
  }
}

.icon-row {
  width: 100%;
  box-sizing: border-box;
  padding: 0 0 15px 0;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 24px;
    height: auto;
    margin-right: 5px;

    &:last-child {
      margin-right: 0;
    }
  }
}

.description-box {
  text-align: center;
  box-sizing: border-box;
  padding: 15px 10px 0 10px;
  font-size: 11px;
  color: #fff;
}

.game-company-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin-bottom: 15px;

  .company-item {
    width: calc(100% / 4);
    box-sizing: border-box;
    padding: 0 5px;
  }
}
</style>
