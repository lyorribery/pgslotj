<template>
  <div class="serach-box">
    <div class="serach-ipt-box">
      <i class="iconfont icon-search"></i>
      <input
        type="text"
        @focus="showSearch"
        v-model="searchKey"
        :placeholder="$t('index.search')"
        class="ipt"
      />
    </div>
    <transition
      enter-active-class="animate__animated animate__fadeInUp"
      leave-active-class="animate__animated animate__fadeOutDown"
    >
      <div class="serch-res-box" v-if="search_show">
        <div class="seggested-game-box">
          <div class="seggested-title">
            <span>{{ $t("search.seggested") }}</span>
            <div class="close-icon">
              <i class="iconfont icon-guanbi" @click="closeSearch"></i>
            </div>
          </div>
          <div class="seggested-game-list">
            <imgCard
              v-for="(items, indexs) in suggestedList.data"
              :key="indexs"
              :cardInfo="items"
              :cardWidth="(pc_width - 5) / 6"
              :overflowText="true"
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
              padding: 15px;
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
};
</script>

<script setup>
import search from "@/mixin/search";
const {
  suggestedList,
  searchKey,
  search_show,
  showSearchLoading,
  pc_width,
  showSearch,
  closeSearch,
  getkey,
} = search();
</script>

<style scoped lang="scss">
@media screen and (min-width: 1441px) {
  .serach-box {
    width: 50%;
  }
}

@media screen and (max-width: 1440px) {
  .serach-box {
    width: 50%;
  }
}

.serach-box {
  margin: 20px 0;
  z-index: 3;
  position: relative;

  .serch-res-box {
    position: absolute;
    top: 50px;
    left: 0;
    width: 100%;
    background-color: rgba(26, 68, 176, 0.85);
    border:1px solid #fff;
    box-sizing: border-box;
    padding-top: 15px;
    border-radius: 12px;
    height: 45vh;
    overflow: auto;

    .seggested-game-box {
      width: 100%;
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
        font-size: 14px;
        font-weight: 600;
        color: #fff;
        margin-bottom: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .close-icon {
          cursor: pointer;

          i {
            font-size: 22px;
          }
        }
      }

      .quicklink-box {
        width: 100%;
        border-left: 1px solid #2b2b2b;

        .quicklink-item {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          width: 100%;
          box-sizing: border-box;
          padding: 8px;
          color: #fff;
          font-size: 13px;
          cursor: pointer;

          &:first-child {
            padding-top: 0;
          }

          span {
            padding-left: 8px;
          }
        }
      }
    }
  }

  .serach-ipt-box {
    background-color: #1a44b0;
    width: 100%;
    border-radius: 32px;
    box-sizing: border-box;
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 2px solid #fff;
    i {
      color: #fff;
      font-size: 20px;
    }

    .ipt {
      border: 0px;
      outline: none;
      background-color: #1a44b0;
      color: #fff;
      font-size: 16px;
      font-weight: 400;
      width: calc(100% - 30px);
    }
  }
}
</style>
