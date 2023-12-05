<template>
  <div class="card-item" :style="{ width: cardWidth + 'px' }" @click="goDetail(cardInfo)">
    <div class="card-image-box">
      <div
        class="mask"
        :style="{
          width: (cardWidth - 10).toString() + 'px',
          height: ((cardWidth - 10) / 1).toString() + 'px',
        }"
      >
        <i class="iconfont icon-bofang" style="font-size: 16; font-weight: 500"></i>
      </div>
      <nut-image
        :src="cardInfo.mobileIcon"
        :width="(cardWidth - 10).toString()"
        :height="((cardWidth - 10) / 1).toString()"
        show-loading
        show-error
        round
        :radius="8"
        lazy-load
      >
        <template #loading>
          <img
            class="img-loading"
            src="../assets/images/img-loading.jpg"
            :style="{ width: cardWidth - 10 + 'px', height: (cardWidth - 10) / 1 + 'px' }"
          />
        </template>
        <template #error>
          <img
            class="img-loading"
            src="../assets/images/img-loading.jpg"
            :style="{ width: cardWidth - 10 + 'px', height: (cardWidth - 10) / 1 + 'px' }"
          />
        </template>
      </nut-image>
    </div>
    <div
      class="card-name"
      :class="overflowText ? 'line-text-overflow' : ''"
      v-html="highLight(cardInfo.name)"
    ></div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  name: "imgCard",
  props: {
    cardInfo: {
      type: Object,
      default: {
        name: "",
        mobileIcon: "",
      },
    },
    cardWidth: {
      type: Number,
      default: 120,
    },
    overflowText: {
      type: Boolean,
      default: true,
    },
    searchKey: {
      type: String,
      default: "",
    },
  },
  setup(props, ctx) {
    const router = useRouter();
    const { state, commit } = useStore();
    const goDetail = (data) => {
      if (state.permission.is_login) {
        if (data.gameCompanyName == "PP") {
          router.push({
            path: "/startGame",
            query: {
              gameOptions: JSON.stringify(data),
            },
          });
        } else {
          router.push({
            path: "/pgslot",
          });
        }
      } else {
        commit("permission/show_permission_modal", { type: "login", show: true });
      }
    };
    const highLight = (text) => {
      if (text.includes(props.searchKey)) {
        text = text.replace(
          props.searchKey,
          '<font style="color:#A0C4FD!important;">' + props.searchKey + "</font>"
        );
        return text;
      } else {
        return text;
      }
    };
    return {
      highLight,
      goDetail,
    };
  },
};
</script>

<style scoped lang="scss">
.card-item {
  display: inline-block;
  box-sizing: border-box;
  padding-left: 10px;
  padding-top: 10px;

  .card-name {
    text-align: center;
    color: #fff;
    font-size: 11px;
    width: 100%;
    box-sizing: border-box;
    padding: 5px 5px 0 5px;
  }

  .line-text-overflow {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .card-image-box {
    border-radius: 8px;
    width: 100%;
    height: 0;
    position: relative;
    padding-bottom: 100%;
    overflow: hidden;
    cursor: pointer;

    &:hover {
      .mask {
        transition: all 0.5s ease-in-out;
        opacity: 1;
      }
    }

    .mask {
      position: absolute;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.7);
      z-index: 2;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      transition: all 0.5s ease-in-out;
      opacity: 0;

      i {
        color: #A0C4FD;
        font-size: 38px;
      }
    }

    .img-loading {
      // animation: lighter 2.5s linear infinite;

      @keyframes lighter {
        0% {
          opacity: 1;
        }

        25% {
          opacity: 0.9;
        }

        50% {
          opacity: 0.8;
        }

        75% {
          opacity: 0.9;
        }

        100% {
          opacity: 1;
        }
      }

      @-webkit-keyframes lighter {
        0% {
          opacity: 1;
        }

        25% {
          opacity: 0.9;
        }

        50% {
          opacity: 0.8;
        }

        75% {
          opacity: 0.9;
        }

        100% {
          opacity: 1;
        }
      }
    }
  }
}
</style>
