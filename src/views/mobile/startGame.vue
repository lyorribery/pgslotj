<template>
  <div class="start-game">
    <div class="box" v-if="!game_url">
      <div class="box-header">
        <div class="title-row">
          <span>{{ cur_data.name }}</span>
          <i
            class="iconfont"
            :class="isCollection == 1 ? 'icon-collection' : 'icon-no-collection'"
            @click="changeCollection"
          ></i>
        </div>
      </div>
      <img :src="cur_data.mobileIcon" />
      <div
        style="
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <div class="back-btn" @click="back">
          <i class="iconfont icon-leftarrow" style="font-size: 16px"></i>
          <span style="padding-left: 10px">Back</span>
        </div>
        <div class="play-btn" @click="start">
          <i v-if="!loading" class="iconfont icon-bofang" style="font-size: 16px"></i>
          <span v-if="!loading" style="padding-left: 10px">Play</span>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="25px"
            height="25px"
            viewBox="0 0 50 50"
            style="enable-background: new 0 0 50 50"
            xml:space="preserve"
          >
            <path
              fill="#fff"
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
  </div>
</template>

<script setup>
import startGame from "@/mixin/startGame";
const {
  cur_data,
  loading,
  game_url,
  isCollection,
  changeCollection,
  back,
  start,
} = startGame();
</script>

<style scoped lang="scss">
.start-game {
  width: 100%;
  box-sizing: border-box;
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .back-btn {
    margin-top: 20px;
    width: calc((100% - 15px) / 2);
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 15px;
    border-radius: 6px;
    background: #1A44B0;
  }

  .play-btn {
    margin-top: 20px;
    width: calc((100% - 15px) / 2);
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 15px;
    border-radius: 6px;
    background: #A0C4FD;
  }
  .box {
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    img {
        width: 100%;
        height: auto;
        border-radius: 16px;
        margin-top:20px;
      }

    .box-header {
      width: 100%;
      border-radius: 6px;
      background-color: #1A44B0;
      box-sizing: border-box;
      padding: 20px 10px;
      display: flex;
      justify-content: space-between;
      border-bottom: 2px solid #fff;

      .title-row {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #fff;

        span {
          font-size: 15px;
        }

        i {
          font-size: 25px;
          color: #A0C4FD;
        }
      }

    
    }
  }
}
</style>
