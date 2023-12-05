<template>
  <div class="home">
    <pcSearch />

    <div class="banner-box">
      <nut-swiper
        pagination-color="#A0C4FD"
        :loop="true"
        auto-play="3000"
        direction="vertical"
        :pagination-visible="true"
        style="width: 800px; height: 363px"
      >
        <nut-swiper-item v-for="(item, index) in banner" :key="index">
          <img :src="item" style="width: 100%; height: 363px" />
        </nut-swiper-item>
      </nut-swiper>
    </div>

    <div
      v-for="(item, index) in home_game_list"
      :key="index"
      style="
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 20px 0;
      "
    >
      <div class="title-row">
        <div class="title-content">
          <div style="display: flex; align-items: center">
            <img
              style="width: 25px; margin-right: 8px"
              src="@/assets/images/new.svg"
              v-if="item.categoryName == 'New'"
            />
            <img
            style="width: 25px; margin-right: 8px"
              src="@/assets/images/recommend.svg"
              v-if="item.categoryName == 'Recommend'"
            />
            <img
            style="width: 25px; margin-right: 8px"
              src="@/assets/images/hot.svg"
              v-if="item.categoryName == 'Hot'"
            />
            <span>{{ item.categoryName }}</span>
          </div>
          <div style="display: flex; align-items: center">
            <div class="more-btn" @click="goGame(item.categoryId, item.categoryName)">
              <nut-animate type="ripple" :loop="true">
                <span style="color:#A0C4FD;">Mais</span>
                <svg
                  t="1698518956451"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="4564"
                  width="12"
                  height="12"
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
          v-for="(items, indexs) in item.game"
          :key="indexs"
          :cardInfo="items"
          :cardWidth="(pc_width - 10) / 6"
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
import pcSearch from "@/components/pcSearch.vue";
export default {
  components: {
    imgCard,
    pageFooter,
    pcSearch,
  },
};
</script>

<script setup>
import home from "@/mixin/home";
const {
  banner,
  game_company,
  home_game_list,
  pc_width,
  goGame,
  goProviderGame,
  goGroup,
} = home();
</script>

<style lang="scss" scoped>
@media screen and (min-width: 1441px) {
  .game-provider-list {
    width: 70%;
  }

  .title-row {
    width: 70%;
  }

  .content-item {
    width: 70%;
  }
}

@media screen and (max-width: 1440px) {
  .game-provider-list {
    width: 85%;
  }

  .title-row {
    width: 85%;
  }

  .content-item {
    width: 85%;
  }
}

.home {
  width: 100%;
  box-sizing: border-box;
  padding: 15px 0 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .service-btn {
    cursor: pointer;
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
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;

    .provider-item {
      width: calc(100% / 6);
      display: flex;
      justify-content: center;
      box-sizing: border-box;
      padding: 5px 20px;
      cursor: pointer;

      img {
        width: 100%;
        height: auto;
      }
    }
  }

  .title-row {
    margin-bottom: 10px;
    .title-content {
      width: 100%;
      box-sizing: border-box;
      padding: 0 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 6px;

      @keyframes FlashingAnimation {
        0% {
          opacity: 0.5;
          transform: scale(1);
        }

        10% {
          opacity: 0.6;
        }

        20% {
          opacity: 0.7;
        }

        30% {
          opacity: 0.8;
        }

        40% {
          opacity: 0.9;
        }

        50% {
          opacity: 1;
          transform: scale(1.1);
        }

        60% {
          opacity: 0.9;
        }

        70% {
          opacity: 0.8;
        }

        80% {
          opacity: 0.7;
        }

        90% {
          opacity: 0.6;
        }

        100% {
          opacity: 0.5;
          transform: scale(1);
        }
      }

      @-webkit-keyframes FlashingAnimation {
        0% {
          opacity: 0.5;
          transform: scale(1);
        }

        10% {
          opacity: 0.6;
        }

        20% {
          opacity: 0.7;
        }

        30% {
          opacity: 0.8;
        }

        40% {
          opacity: 0.9;
        }

        50% {
          opacity: 1;
          transform: scale(1.1);
        }

        60% {
          opacity: 0.9;
        }

        70% {
          opacity: 0.8;
        }

        80% {
          opacity: 0.7;
        }

        90% {
          opacity: 0.6;
        }

        100% {
          opacity: 0.5;
          transform: scale(1);
        }
      }

      span {
        color: #fff;
        font-size: 16px;
        font-weight: 600;
      }

      .more-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #A0C4FD;
        font-weight: bold;
        cursor: pointer;
        span {
          font-size: 12px;
          padding-right: 5px;
        }
      }
    }
  }

  .banner-box {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
