<template>
  <div class="search-box" :style="{ width: isSimple ? '' : '100%' }">
    <div class="search-contnet" @click="showSearch()" v-if="!isSimple">
      <i class="iconfont icon-search"></i>
      <span>{{ $t("index.search") }}</span>
    </div>
    <i
      v-else
      style="font-size: 20px; color: #fff"
      class="iconfont icon-search"
      @click="showSearch()"
    ></i>
    <transition
      enter-active-class="animate__animated animate__fadeInUp"
      leave-active-class="animate__animated animate__fadeOutDown"
    >
      <div class="serach-ipt-box" v-if="search_show">
        <div class="search-ipt">
          <i class="iconfont icon-search"></i>
          <nut-input
            :border="false"
            v-model="searchKey"
            confirm-type="search"
            clearable
            clearSize="16"
            class="ipt"
            :placeholder="$t('index.search')"
            @update:model-value="getkey"
          />
          <span
            style="padding: 0 8px; font-size: 13px; color: #fff"
            @click="closeSearch()"
            >Cancel</span
          >
        </div>
        <div
          style="
            width: 100%;
            box-sizing: border-box;
            padding: 15px 10px;
            font-size: 13px;
            color: #fff;
            text-align: center;
          "
        >
          A pesquisa requer pelo menos 3 caracteres
        </div>
        <div class="seggested-game-box">
          <div class="seggested-title">
            {{ $t("search.seggested") }}
          </div>
          <div class="seggested-game-list">
            <imgCard
              style="margin-bottom: 10px"
              v-for="(item, index) in suggestedList.data"
              :key="index"
              :cardInfo="item"
              :cardWidth="(window_width - 66) / 3"
              :overflowText="false"
              :searchKey="searchKey"
            />
          </div>

          <div
            v-if="!showSearchLoading && suggestedList.data.length == 0"
            style="
              width: 100%;
              box-sizing: border-box;
              padding: 30px 0;
              text-align: center;
            "
          >
            <i class="iconfont icon-nodata" style="color: #fff; font-size: 32px"></i>
          </div>

          <div
            style="
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              box-sizing: border-box;
              padding: 10px;
            "
            v-if="showSearchLoading"
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
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import imgCard from "@/components/imgCard.vue";
export default {
  name: "search",
  components: { imgCard },
  props: {
    isSimple: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<script setup>
import search from "@/mixin/search";
const {
  suggestedList,
  searchKey,
  search_show,
  showSearchLoading,
  window_width,
  showSearch,
  closeSearch,
  getkey,
} = search();
</script>

<style scoped lang="scss">
.search-box {
  box-sizing: border-box;
  padding: 10px;

  .serach-ipt-box {
    z-index: 6;
    position: fixed;
    top: env(safe-area-inset-top);
    left: 0;
    background-color: #1A44B0;
    width: 100%;
    height: calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom));
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    box-sizing: border-box;
    padding: 15px 10px;

    .seggested-game-box {
      width: 100%;
      height: calc(80vh - 100px);
      overflow-y: auto;
      box-sizing: border-box;
      padding: 0 15px;

      .seggested-game-list {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
      }

      .seggested-title {
        font-size: 12px;
        color: #fff;
        margin: 10px 0;
      }
    }

    .search-ipt {
      width: 100%;
      border-radius: 16px;
      box-sizing: border-box;
      padding: 10px 15px;
      border: 2px solid #fff;
      background-color: #1A44B0;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      i {
        color: #fff;
        font-size: 16px;
      }

      .ipt {
        flex: 1;
        padding: 0 10px;
        border: 0px;
        outline: none;
        background-color: #1A44B0;
        color: #fff;
        font-size: 16px;
        font-weight: 400;
      }
    }
  }

  .search-contnet {
    width: 100%;
    height: 45px;
    border-radius: 16px;
    box-sizing: border-box;
    padding: 0 15px;
    border: 2px solid #fff;
    background-color: #1A44B0;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    i {
      color: #fff;
      font-size: 16px;
    }

    span {
      padding-left: 15px;
      color: #fff;
      font-size: 11px;
    }
  }
}
</style>
