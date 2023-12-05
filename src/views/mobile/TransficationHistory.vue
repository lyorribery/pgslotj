<template>
  <div class="transfication-history">
    <div class="head-box">
      <div class="type-box">
        <div
          class="type"
          :style="{ background: type == 0 ? '#A0C4FD' : '' }"
          @click="changePageType(0)"
        >
          {{ $t("index.deposit") }}
        </div>
        <div
          class="type"
          :style="{ background: type == 1 ? '#A0C4FD' : '' }"
          @click="changePageType(1)"
        >
          {{ $t("personal.tixian") }}
        </div>
      </div>
    </div>
    <div class="list-container" v-if="type == 0 && historyList.data.length > 0">
      <div class="list-cell" v-for="(item, index) in historyList.data" :key="index">
        <div class="cell-item">
          <span class="label">{{ $t("transfer.label5") }}</span
          ><span class="data">{{ item.orderNo }}</span>
        </div>
        <div class="cell-item">
          <span class="label">{{ $t("transfer.label1") }}</span
          ><span class="data">{{ item.payConfigName }}</span>
        </div>
        <div class="cell-item">
          <span class="label">{{ $t("transfer.label2") }}</span
          ><span class="data">R${{ item.amount }}</span>
        </div>
        <div class="cell-item">
          <span class="label">{{ $t("transfer.label3") }}</span
          ><span class="data">{{
            item.orderStatus == 1
              ? $t("transfer.statu1")
              : item.orderStatus == 2
              ? $t("transfer.statu2")
              : item.orderStatus == 3
              ? $t("transfer.statu3")
              : ""
          }}</span>
        </div>
        <div class="cell-item">
          <span class="label">{{ $t("transfer.label4") }}</span
          ><span class="data">{{ item.createAt }}</span>
        </div>
      </div>
    </div>
    <div class="list-container" v-if="type == 1 && historyList.data.length > 0">
      <div class="list-cell" v-for="(item, index) in historyList.data" :key="index">
        <div class="cell-item">
          <span class="label">{{ $t("transfer.label5") }}</span
          ><span class="data">{{ item.orderNo }}</span>
        </div>
        <div class="cell-item">
          <span class="label">{{ $t("transfer.label6") }}</span
          ><span class="data">{{ item.payConfigName }}</span>
        </div>
        <div class="cell-item">
          <span class="label">{{ $t("transfer.label7") }}</span
          ><span class="data">R${{ item.amount }}</span>
        </div>
        <div class="cell-item">
          <span class="label">{{ $t("transfer.label3") }}</span
          ><span class="data">{{
            item.orderStatus == 1
              ? $t("transfer.statu1")
              : item.orderStatus == 2
              ? $t("transfer.statu2")
              : item.orderStatus == 3
              ? $t("transfer.statu3")
              : ""
          }}</span>
        </div>
        <div class="cell-item">
          <span class="label">{{ $t("transfer.label9") }}</span
          ><span class="data">{{ item.createAt }}</span>
        </div>
      </div>
    </div>
    <div style="width: 100%; display: flex; justify-content: center">
      <svg
        v-if="isLoading"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="35px"
        height="35px"
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
      <div class="no-data" v-if="historyList.data.length == 0 && !isLoading">
        <i class="iconfont icon-nodata" style="color: #fff; font-size: 30px"></i>
      </div>
    </div>
    <div
      v-if="hasNext == 1 && !isLoading"
      style="width: 100%; display: flex; justify-content: center"
    >
      <div class="more-btn" @click="loadmore()">
        {{ $t("common.getmore") }}
      </div>
    </div>
  </div>
</template>
<script setup>
import transficationHistory from "@/mixin/transficationHistory";

const {
  type,
  isLoading,
  historyList,
  hasNext,
  changePageType,
  loadmore,
} = transficationHistory();
</script>
<style lang="scss" scoped>
.transfication-history {
  width: 100%;
  box-sizing: border-box;
  padding-top: 20px;
  .more-btn {
    margin: 15px 0 calc(env(safe-area-inset-bottom) + 15px) 0;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    color: #fff;
    font-size: 11px;
    box-sizing: border-box;
    padding: 8px 15px;
    cursor: pointer;
  }

  .list-container {
    width: 100%;
    box-sizing: border-box;
    padding: 0 10px;
    display: flex;
    align-items: center;
    flex-direction: column;

    .list-cell {
      width: 100%;
      box-sizing: border-box;
      padding: 0 15px;
      border-radius: 6px;
      background-color: #fff;
      margin-bottom: 10px;

      .cell-item {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 11px;
        height: 30px;

        .label {
          color: #fff;
        }

        .data {
          color: #fff;
        }

        i {
          font-size: 23px;
        }
      }
    }
  }

  .no-data {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    box-sizing: border-box;
    padding: 10px 0;
  }
}
</style>
