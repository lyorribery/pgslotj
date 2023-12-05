<template>
  <transition
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
  >
    <div
      class="modal"
      :class="user_device == 'h5' ? 'h5' : 'pc'"
      v-if="show_promotion_modal"
    >
      <div class="modal-header">
        <span style="font-size: 15px; font-weight: 600;color:#fff;">Presentes</span>
        <div class="header-btn-box">
          <i
            class="iconfont icon-guanbi"
            style="font-size: 20px; color: #fff"
            @click="closePromotion()"
          ></i>
        </div>
      </div>
      <div class="promotion-item">
        <img :src="recomend_promotion[currentPage - 1].imgs" />
        <div class="promotion-title">{{ recomend_promotion[currentPage - 1].name }}</div>
      </div>
      <div class="promotion-page">
        <div
          class="page-item"
          :class="index == currentPage - 1 ? 'active-page' : 'page'"
          v-for="(item, index) in recomend_promotion.length"
          :key="index"
          @click="changePage(index)"
        >
          {{ index + 1 }}
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import apiConfig from "@/utils/apiConfig";

export default {
  setup() {
    const base_img_url = apiConfig.fileURL;
    const { state, commit } = useStore();
    const user_device = computed(() => {
      return state.permission.user_device;
    });
    const recomend_promotion = computed(() => {
      return state.common.recomend_promotion;
    });
    const show_promotion_modal = computed(() => {
      return state.common.show_promotion_modal;
    });
    const currentPage = ref(1);
    const closePromotion = () => {
      commit("common/set_show_promotion_modal", false);
    };
    const changePage = (index) => {
      currentPage.value = index + 1;
    };
    const goTelegram = () => [(location.href = "https://t.me/+Nw4yxAsTvD44YzMx")];
    return {
      base_img_url,
      user_device,
      show_promotion_modal,
      recomend_promotion,
      currentPage,
      closePromotion,
      changePage,
      goTelegram,
    };
  },
};
</script>

<style scoped lang="scss">
.promotion-item {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .promotion-btn {
    margin-top: 15px;
    border-radius: 32px;
    box-sizing: border-box;
    padding: 8px 15px;
    background: #A0C4FD;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    .btn-text {
      color: #fff;
      font-size: 12px;
      font-weight: 700;
      margin-left: 5px;
    }
  }

  img {
    width: 100%;
    height: auto;
    margin-bottom: 10px;
    border-radius: 16px;
  }

  .promotion-title {
    width: 100%;
    color: #fff;
    text-align: left;
    font-size: 13px;
  }
}

.promotion-page {
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  box-sizing: border-box;
  padding: 15px 0;

  .active-page {
    background-color: #A0C4FD;
    border: 1px solid #A0C4FD;
    color: #fff;
  }

  .page {
    border: 1px solid #A0C4FD;
    color: #A0C4FD;
  }

  .page-item {
    cursor: pointer;
    border-radius: 6px;
    font-size: 12px;
    font-weight: bold;
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
