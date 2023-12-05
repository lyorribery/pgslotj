<template>
  <div class="game">
    <div
      style="
        width: 100%;
        box-sizing: border-box;
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      "
    >
      <div style="display: flex; align-items: center;box-sizing:border-box;padding:10px 0;">
        <i
          class="iconfont icon-leftarrow"
          style="font-size: 20px; color: #fff; font-weight: bold"
          @click="goBack"
        ></i>

        <span
          style="font-size: 16px; color: #fff; font-weight: 600; padding-left: 15px"
          >{{ companyName ? companyName : "" }}</span
        >
        <span
          style="font-size: 16px; color: #fff; font-weight: 600; padding: 0 5px"
          v-if="companyName && categoryName"
          >/</span
        >
        <span style="font-size: 16px; color: #fff; font-weight: 600">{{
          categoryName ? categoryName : ""
        }}</span>
      </div>
    </div>

    <i
      class="iconfont icon-nodata"
      v-if="gameList.data.length == 0 && !showLoading"
      style="font-size: 30px; color: #fff; margin: 20px 0"
    ></i>

    <div class="game-list-box">
      <imgCard
        v-for="(items, indexs) in gameList.data"
        :key="indexs"
        :cardInfo="items"
        :cardWidth="(window_width - 10) / 3"
        :overflowText="true"
      />
    </div>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      v-if="showLoading"
      width="32px"
      height="32px"
      viewBox="0 0 50 50"
      style="enable-background: new 0 0 50 50;margin-top:20px;"
      xml:space="preserve"
    >
      <path
        fill="#A0C4FD"
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

    <div class="page-box" v-if="pageInfos.totalEntities > 0">
      <div class="page-count">
        <span
          >Show {{ gameList.data.length }} of {{ pageInfos.totalEntities }} games</span
        >
      </div>
      <div class="page-btn" @click="loadMore()" v-if="pageInfos.hasNext != 0">
        <span>{{ $t("common.getmore") }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import imgCard from "@/components/imgCard.vue";
import pageFooter from "@/components/pageFooter.vue";
export default {
  components: {
    imgCard,
    pageFooter,
  },
};
</script>
<script setup>
import game from "@/mixin/game";
const {
  window_width,
  companyName,
  categoryName,
  showLoading,
  gameList,
  pageInfos,
  provider_show,
  category_show,
  providers,
  categories,
  cur_provider,
  cur_catogory,
  loadCompanyGame,
  loadCategoryGame,
  goBack,
  loadMore,
  openProvider,
  openCategory,
} = game();
</script>
<style scoped lang="scss">
.game {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .select-box {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    box-sizing: border-box;
    padding: 15px 10px;
    position: relative;

    .option-box {
      z-index: 3;
      width: calc(100% - 20px);
      background-color: #fff;
      border-radius: 6px;
      position: absolute;
      left: 10px;
      top: 60px;

      .option-item {
        width: 100%;
        height: 35px;
        box-sizing: border-box;
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left {
          display: flex;
          align-items: center;
          color: #fff;
          font-size: 11px;

          .check-box {
            margin-right: 10px;
            width: 20px;
            height: 35px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }

        .right {
          box-sizing: border-box;
          padding: 6px;
          border-radius: 6px;
          background: #A0C4FD;
          color: #fff;
          font-size: 12px;
        }
      }
    }

    .select-row {
      width: 100%;
      // box-sizing: border-box;
      // padding: 0 0 10px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .select-item {
        // width: calc((100% - 15px) / 2);
        width: 100%;
        border-radius: 6px;
        background-color: #1A44B0;
        height: 32px;
        border: 1px solid #fff;
        color: #fff;
        font-size: 11px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 0 10px;
        font-weight: bold;
        margin-right: 15px;

        &:last-child {
          margin-right: 0;
        }

        .select-content {
          display: flex;
          justify-content: flex-start;
          align-items: center;

          .label {
            color: #fff;
          }

          .data {
            padding-left: 5px;
          }
        }
      }
    }
  }

  .game-list-box {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .page-box {
    margin-top: 30px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 10px;

    .page-count {
      font-size: 12px;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .page-btn {
      border-radius: 6px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 2px solid #fff;
      color: #fff;
      font-size: 13px;
      box-sizing: border-box;
      padding: 8px 15px;
      font-weight: 700;
    }
  }
}
</style>
