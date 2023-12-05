<template>
  <div class="roller-content">
    <div class="rowup" :style="[{ animation: roll_animation }]">
      <div
        class="img-box"
        :class="col_number == 3 ? 'img-style-3' : 'img-style-4'"
        v-for="(item, index) in imgArr"
        :key="index"
      >
        <div class="img-back" v-if="item.selected"></div>
        <img
          :src="base_img_url + 'slot1/' + item.resource"
          style="height: 95%; z-index: 3"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import apiConfig from "@/utils/apiConfig";
export default {
  name: "roller",
  props: {
    imgArr: {
      type: Array,
      default: [],
    },
    col: {
      type: Number,
      dafault: 3,
    },
    isRoll: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    const base_img_url = apiConfig.fileURL;
    watch(
      () => props.isRoll,
      (newVal, oldVal) => {
        if (newVal) {
          start();
        } else {
          end();
        }
      }
    );
    const start = () => {
      roll_height.value = document.getElementsByClassName("img-box")[0].offsetHeight * 7;
      const rule = `@keyframes roll {
              0% {
                  -webkit-transform: translate3d(0, -${roll_height.value}px, 0);
                  transform: translate3d(0, -${roll_height.value}px, 0);
              }
              100% {
                  -webkit-transform: translate3d(0, 0, 0);
                  transform: translate3d(0, 0, 0);
              }
          }`;
      const sheet = document.styleSheets[0];
      sheet.insertRule(rule, 0);
      roll_animation.value = `roll .6s linear infinite normal`;
    };
    const end = () => {
      roll_animation.value = "";
    };
    const roll_height = ref("");

    const { state } = useStore();
    const user_device = computed(() => {
      return state.permission.user_device;
    });
    const col_number = props.col;
    const roll_animation = ref("");
    return {
      base_img_url,
      user_device,
      col_number,
      roll_animation,
    };
  },
};
</script>

<style lang="scss" scoped>
.rowup {
  width: 100%;
  height: 100%;
}
.roller-content {
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  .img-box {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .img-back {
      position: absolute;
      top: 3%;
      right: 3%;
      width: 100%;
      height: 100%;
      z-index: 2;
      background-image: url("https://vencer77.com/images/slot1/mais_icon29.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
  }
  .img-style-3 {
    height: calc(100% / 3);
  }
  .img-style-4 {
    height: calc(100% / 4);
  }
}
</style>
