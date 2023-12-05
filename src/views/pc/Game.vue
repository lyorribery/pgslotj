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
        margin-top: 15px;
      "
    >
      <div style="display: flex; align-items: center; margin-right: 50px">
        <span
          style="font-size: 18px; color: #fff; font-weight: 600; padding-left: 15px"
          >{{ companyName ? companyName : "" }}</span
        >
        <span
          style="font-size: 18px; color: #fff; font-weight: 600; padding: 0 5px"
          v-if="companyName && categoryName"
          >/</span
        >
        <span style="font-size: 18px; color: #fff; font-weight: 600">{{
          categoryName ? categoryName : ""
        }}</span>
      </div>
      <pcSearch style="flex: 1" />
    </div>

    <i
      class="iconfont icon-nodata"
      v-if="gameList.data.length == 0 && !showLoading"
      style="font-size: 30px; color: #fff; margin: 20px 0"
    ></i>
    <div class="game-list">
      <imgCard
        v-for="(items, indexs) in gameList.data"
        :key="indexs"
        :cardInfo="items"
        :cardWidth="(pc_width - 10) / 6"
        :overflowText="true"
      />
    </div>
    <div
      v-if="showLoading"
      style="width: 100%; display: flex; justify-content: center; margin: 20px 0"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="35px"
        height="35px"
        viewBox="0 0 50 50"
        style="enable-background: new 0 0 50 50"
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
    </div>
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
  <pageFooter />
</template>

<script>
import pcSearch from "@/components/pcSearch.vue";
import imgCard from "@/components/imgCard.vue";
import pageFooter from "@/components/pageFooter.vue";
export default {
  components: {
    pcSearch,
    imgCard,
    pageFooter,
  },
};
</script>
<script setup>
import game from "@/mixin/game";
const {
  pc_width,
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
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 1441px) {
    padding: 0 15%;
  }

  @media screen and (max-width: 1440px) {
    padding: 0 7.5%;
  }

  .page-box {
    margin-top: 30px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 15px;

    .page-count {
      font-size: 12px;
      color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 600;
    }

    .page-btn {
      margin-left: 15px;
      border-radius: 6px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 2px solid #fff;
      color: #fff;
      font-size: 13px;
      font-weight: 600;
      box-sizing: border-box;
      padding: 8px 15px;
      cursor: pointer;
    }
  }

  .game-list {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
  }
}
</style>
