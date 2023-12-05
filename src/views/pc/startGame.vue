<template>
  <div class="start-game">
    <div class="game-content-box">
      <div class="game-title">
        <div style="display: flex; align-items: center">
          <div class="back-btn" @click="back()">
            <i
              class="iconfont icon-leftarrow"
              style="font-size: 20px; font-weight: 700"
            ></i
            ><span style="padding-right: 5px">Back</span>
          </div>
          <span class="label">
            {{ cur_data.name }}
          </span>
        </div>
        <i
          class="iconfont"
          :class="isCollection == 1 ? 'icon-collection' : 'icon-no-collection'"
          @click="changeCollection"
          style="font-size: 25px"
        ></i>
      </div>
      <div class="game-box" :style="{ height: iframe_height + 'px' }">
        <div class="btn-box" v-if="!game_url && !loading">
          <div class="real-btn" @click="start">
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
        <svg
          v-if="!game_url && loading"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="32px"
          height="40px"
          viewBox="0 0 24 30"
          style="enable-background: new 0 0 50 50"
          xml:space="preserve"
        >
          <rect x="0" y="7.6416" width="4" height="10" fill="#fff" opacity="0.2">
            <animate
              attributeName="opacity"
              attributeType="XML"
              values="0.2; 1; .2"
              begin="0s"
              dur="0.6s"
              repeatCount="indefinite"
            ></animate>
            <animate
              attributeName="height"
              attributeType="XML"
              values="10; 20; 10"
              begin="0s"
              dur="0.6s"
              repeatCount="indefinite"
            ></animate>
            <animate
              attributeName="y"
              attributeType="XML"
              values="10; 5; 10"
              begin="0s"
              dur="0.6s"
              repeatCount="indefinite"
            ></animate>
          </rect>
          <rect x="8" y="5.1416" width="4" height="10" fill="#fff" opacity="0.2">
            <animate
              attributeName="opacity"
              attributeType="XML"
              values="0.2; 1; .2"
              begin="0.15s"
              dur="0.6s"
              repeatCount="indefinite"
            ></animate>
            <animate
              attributeName="height"
              attributeType="XML"
              values="10; 20; 10"
              begin="0.15s"
              dur="0.6s"
              repeatCount="indefinite"
            ></animate>
            <animate
              attributeName="y"
              attributeType="XML"
              values="10; 5; 10"
              begin="0.15s"
              dur="0.6s"
              repeatCount="indefinite"
            ></animate>
          </rect>
          <rect x="16" y="7.3584" width="4" height="10" fill="#fff" opacity="0.2">
            <animate
              attributeName="opacity"
              attributeType="XML"
              values="0.2; 1; .2"
              begin="0.3s"
              dur="0.6s"
              repeatCount="indefinite"
            ></animate>
            <animate
              attributeName="height"
              attributeType="XML"
              values="10; 20; 10"
              begin="0.3s"
              dur="0.6s"
              repeatCount="indefinite"
            ></animate>
            <animate
              attributeName="y"
              attributeType="XML"
              values="10; 5; 10"
              begin="0.3s"
              dur="0.6s"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </svg>
        <div
          v-if="game_url"
          style="width: 100%"
          :style="{ height: iframe_height + 'px' }"
        >
          <iframe
            ref="Iframe"
            :src="game_url"
            width="100%"
            :height="iframe_height + 'px'"
            frameborder="0"
          ></iframe>
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
  iframe_height,
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
  padding: 15px;

  .game-content-box {
    width: 100%;
    margin-top: 15px;
    border-radius: 12px;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.5);

    .game-box {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      .btn-box {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .real-btn {
          opacity: 0.5;
          cursor: pointer;
          color: #fff;
          background-color: #A0C4FD;
          font-weight: 600;
          font-size: 13px;
          border-radius: 6px;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 120px;
          height: 30px;
          border: 2px solid #A0C4FD;

          i {
            font-size: 18px;
          }

          span {
            padding-left: 5px;
          }

          &:hover {
            opacity: 1;
          }
        }
      }
    }

    .game-title {
      width: 100%;
      box-sizing: border-box;
      padding: 10px 15px;
      color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.8);

      .back-btn {
        margin-right: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 30px;
        border-radius: 6px;
        cursor: pointer;
        border: 2px solid #A0C4FD;
        color: #A0C4FD;
        font-weight: 700;
        font-size: 13px;

        &:hover {
          color: #fff;
          background-color: #A0C4FD;
          i {
            color: #fff;
          }
        }
      }

      .label {
        font-size: 13px;
        font-weight: 800;
        padding-right: 8px;
      }

      i {
        color: #A0C4FD;
        font-size: 20px;
        cursor: pointer;
      }
    }
  }

  .records-box {
    width: 100%;
    margin: 30px 0 15px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .more-btn {
      cursor: pointer;
      margin: 15px 0;
      border-radius: 6px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #1A44B0;
      color: #fff;
      font-size: 13px;
      font-weight: 600;
      box-sizing: border-box;
      padding: 8px 15px;
    }

    .records-label {
      width: 100%;
      text-align: left;
      font-size: 16px;
      color: #fff;
      font-weight: bold;
      padding-bottom: 10px;
    }

    .table-box {
      width: 100%;
      border: 1px solid #fff;
      border-radius: 6px;

      .row {
        width: 100%;
        border-bottom: 1px solid #fff;
        display: flex;
        flex-wrap: wrap;

        &:last-child {
          border-bottom: 0;
        }

        .col {
          width: calc(100% / 3);
          box-sizing: border-box;
          padding: 8px;
          color: #fff;
          font-size: 13px;
          font-weight: bold;
          border-right: 1px solid #fff;

          &:last-child {
            border-right: 0;
          }
        }
      }
    }
  }
}
</style>
