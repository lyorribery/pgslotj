<template>
  <div class="home">
    <nut-swiper
      pagination-color="#A0C4FD"
      :loop="true"
      auto-play="3000"
      direction="vertical"
      height="200"
      :pagination-visible="true"
      style="height: 200px"
    >
      <nut-swiper-item v-for="(item, index) in banner" :key="index">
        <img :src="item" style="width: 100%; height: 200px" />
      </nut-swiper-item>
    </nut-swiper>

    <nut-noticebar
      :text="horse_info"
      :scrollable="true"
      :background="`#1A44B0`"
      :color="`#A0C4FD`"
    ></nut-noticebar>

    <div style="width: 100%" v-for="(item, index) in home_game_list" :key="index">
      <div class="content-title" :style="{ paddingTop: index == 0 ? 0 : '' }">
        <div class="title">
          <div class="title-left">
            <img
              style="width: 22px; margin-right: 8px"
              src="@/assets/images/new.svg"
              v-if="item.categoryName == 'New'"
            />
            <img
              style="width: 22px; margin-right: 8px"
              src="@/assets/images/recommend.svg"
              v-if="item.categoryName == 'Recommend'"
            />
            <img
              style="width: 22px; margin-right: 8px"
              src="@/assets/images/hot.svg"
              v-if="item.categoryName == 'Hot'"
            />
            <span>{{ item.categoryName }}</span>
          </div>
          <div style="display: flex; align-items: center">
            <div class="more-btn" @click="goGame(item.categoryId, item.categoryName)">
              <nut-animate type="ripple" :loop="true">
                <span>Mais</span>
                <svg
                  t="1698518956451"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="4564"
                  width="10"
                  height="10"
                >
                  <path
                    d="M556.8 535.893333L170.666667 149.76c-13.226667-13.226667-13.226667-34.986667 0-48.213333 13.226667-13.226667 34.986667-13.226667 48.213333 0l386.133333 386.133333c13.226667 13.226667 13.226667 34.986667 0 48.213333-13.226667 13.226667-34.986667 13.226667-48.213333 0z"
                    fill="#A0C4FD"
                    p-id="4565"
                  ></path>
                  <path
                    d="M170.666667 873.813333l386.133333-386.133333c13.226667-13.226667 34.986667-13.226667 48.213333 0 13.226667 13.226667 13.226667 34.986667 0 48.213333l-386.133333 386.133334c-13.226667 13.226667-34.986667 13.226667-48.213333 0a33.493333 33.493333 0 0 1 0-48.213334z"
                    fill="#A0C4FD"
                    p-id="4566"
                  ></path>
                  <path
                    d="M825.173333 536.32l-386.133333-386.133333c-13.226667-13.226667-13.226667-34.986667 0-48.213334 13.226667-13.226667 34.986667-13.226667 48.213333 0l386.133334 386.133334c13.226667 13.226667 13.226667 34.986667 0 48.213333a33.493333 33.493333 0 0 1-48.213334 0z"
                    fill="#A0C4FD"
                    p-id="4567"
                  ></path>
                  <path
                    d="M439.04 874.24l386.133333-386.133333c13.226667-13.226667 34.986667-13.226667 48.213334 0 13.226667 13.226667 13.226667 34.986667 0 48.213333l-386.133334 386.133333c-13.226667 13.226667-34.986667 13.226667-48.213333 0-13.226667-13.226667-13.226667-34.56 0-48.213333z"
                    fill="#A0C4FD"
                    p-id="4568"
                  ></path>
                </svg>
              </nut-animate>
            </div>
          </div>
        </div>
      </div>
      <div class="content-item">
        <imgCard
          v-for="(items, indexs) in item.game.filter((t, i) => {
            return i < 9;
          })"
          :key="indexs"
          :cardInfo="items"
          :cardWidth="(window_width - 10) / 3"
          :overflowText="true"
        />
      </div>
    </div>

    <pageFooter />
    <div class="service-btn" @click="goGroup()">
      <i class="iconfont icon-kefu"></i>
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
import home from "@/mixin/home";

const {
  banner,
  game_company,
  home_game_list,
  window_width,
  goGame,
  goProviderGame,
  goGroup,
  horse_info,
} = home();
</script>

<style lang="scss" scoped>
.home {
  width: 100%;

  .service-btn {
    z-index: 5;
    position: fixed;
    bottom: 300px;
    right: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #A0C4FD;
    display: flex;
    justify-content: center;
    align-items: center;
    i {
      font-size: 22px;
      color: #fff;
    }
  }

  .content-item {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;

    .provider-item {
      width: calc(100% / 3);
      display: flex;
      justify-content: center;
      box-sizing: border-box;
      padding: 0 20px;

      img {
        width: 100%;
        height: auto;
      }
    }
  }

  .content-title {
    width: 100%;
    box-sizing: border-box;
    padding-top: 10px;

    .title {
      width: 100%;
      height: 40px;
      color: #fff;
      box-sizing: border-box;
      padding: 0 10px;
      font-size: 15px;
      font-weight: 700;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .title-left {
        display: flex;
        align-items: center;

        i {
          font-size: 18px;
          color: #fff;
          padding-right: 8px;
        }
      }

      .more-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #A0C4FD;
        font-weight: bold;
        span {
          font-size: 11px;
          padding-right: 5px;
        }
      }
    }
  }
}
</style>
