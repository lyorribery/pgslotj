<template>
  <div :class="user_device == 'h5' ? 'slot-box-h5' : 'slot-box-pc'">
    <div :class="user_device == 'h5' ? 'game-content-mobile' : 'game-content'">
      <transition
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
      >
        <div class="msg-box" v-if="msg_show">{{ msg }}</div>
      </transition>
      <div class="game-main">
        <div class="roller-box">
          <roller :imgArr="img_arr.img1" :col="4" :isRoll="is_roll" />
        </div>
        <div class="roller-box">
          <roller :imgArr="img_arr.img2" :col="4" :isRoll="is_roll" />
        </div>
        <div class="roller-box">
          <roller :imgArr="img_arr.img3" :col="4" :isRoll="is_roll" />
        </div>
        <div class="roller-box">
          <roller :imgArr="img_arr.img4" :col="4" :isRoll="is_roll" />
        </div>
        <div class="roller-box">
          <roller :imgArr="img_arr.img5" :col="4" :isRoll="is_roll" />
        </div>
        <div class="roller-box">
          <roller :imgArr="img_arr.img6" :col="4" :isRoll="is_roll" />
        </div>
      </div>
      <div class="tip-box">
        <p class="tip-label" v-if="tip_text == 'Ganhe até 2.000x vezes a recompensa'">
          {{ tip_text }}
        </p>
        <span v-else> {{ tip_text }}</span>
      </div>
      <div class="data-box">
        <div class="func-item">
          <img :src="base_img_url + 'slot1/dinh_ico_1car.png'" />
          <span>{{ dataObj.total.toFixed(2) }}</span>
        </div>
        <div class="func-item">
          <img :src="base_img_url + 'slot1/dinh_ico_2dh.png'" />
          <span>{{ dataObj.betAmount.toFixed(2) }}</span>
        </div>
        <div class="func-item">
          <img :src="base_img_url + 'slot1/dinh_ico_3win.png'" />
          <span>{{ dataObj.winAmount.toFixed(2) }}</span>
        </div>
      </div>

      <div class="func-box">
        <img
          :src="base_img_url + 'slot1/pag_ico_turbo.png'"
          style="margin-right: 10px"
          @click="betAmountFunc(3)"
        />
        <img :src="base_img_url + 'slot1/pag_ico_mais.png'" @click="betAmountFunc(1)" />
        <div class="play-btn-back">
          <div class="play-btn" @click="play()" :style="[{ animation: animation_value }]">
            <img :src="base_img_url + 'slot2/mais_icon28_1.png'" />
          </div>
        </div>
        <img
          :src="base_img_url + 'slot1/pag_ico_reduzir.png'"
          @click="betAmountFunc(2)"
          style="margin-right: 10px"
        />
        <img :src="base_img_url + 'slot1/pag_ico_auto.png'" @click="betAmountFunc(4)" />
      </div>
    </div>
    <transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div
        :class="user_device == 'h5' ? 'loading-box' : 'loading-box-pc'"
        v-if="is_loading"
      >
        <div class="loading-progress">
          <nut-progress
            v-if="loadingProgress < 100"
            :percentage="loadingProgress"
            :show-text="false"
            stroke-color="#F6D878"
            stroke-width="10"
          />
          <div v-else class="init-btn" @click="initStart()">Começar</div>
        </div>
      </div>
    </transition>
    <transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div class="auto-box" v-if="auto_show" @click="closeAutoBox()"></div>
    </transition>
    <transition
      enter-active-class="animate__animated animate__fadeInUp"
      leave-active-class="animate__animated animate__fadeOutDown"
    >
      <div class="auto-content" v-if="auto_show">
        <div class="auto-content-header">
          <span>Rotação automática</span>
          <img
            :src="base_img_url + 'slot1/tc_ico_cancelar.png'"
            @click="closeAutoBox()"
          />
        </div>
        <div class="auto-amount-box">
          <div class="label">Relógio giratório automático</div>
          <div class="choose-box">
            <div
              class="item"
              v-for="(item, index) in auto_amount_box"
              :key="index"
              :style="{ color: item == auto_amount ? '#FFC824' : '' }"
              @click="chooseAutoAmount(item)"
            >
              {{ item }}
            </div>
          </div>
        </div>
        <div class="auto-btn-box">
          <div
            class="auto-btn"
            :style="{
              color: auto_amount ? '#FFF4C3' : '',
              background: auto_amount ? '#FFC824' : '',
            }"
            @click="startAuto()"
          >
            Iniciar rotação automática
          </div>
        </div>
        <div class="auto-data-box">
          <div class="item">
            <img :src="base_img_url + 'slot1/dinh_ico_1car.png'" />
            <span>{{ dataObj.total.toFixed(2) }}</span>
          </div>
          <div class="item">
            <img :src="base_img_url + 'slot1/dinh_ico_2dh.png'" />
            <span>{{ dataObj.betAmount.toFixed(2) }}</span>
          </div>
          <div class="item">
            <img :src="base_img_url + 'slot1/dinh_ico_3win.png'" />
            <span>{{ dataObj.winAmount.toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </transition>
    <audio ref="audioRefBack" :src="base_img_url + 'slot2/back.mp3'" loop />
    <audio ref="audioRefBet" :src="base_img_url + 'slot1/bet.mp3'" />
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted, nextTick } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import roller from "@/components/roller.vue";
import { slot1_play } from "@/apis/game";
import apiConfig from "@/utils/apiConfig";
import { getWallet } from "@/apis/user";
let progressTimer = null;

export default {
  name: "slot2",
  components: { roller },
  setup(props, ctx) {
    const base_img_url = apiConfig.fileURL;
    const audioRefBack = ref(null);
    const audioRefBet = ref(null);
    const handlePlayBack = () => {
      nextTick(() => {
        audioRefBack.value.play();
      });
    };
    const hackPlayBet = () => {
      nextTick(() => {
        audioRefBet.value.play();
      });
    };
    const { state } = useStore();
    const router = useRouter();
    const user_device = computed(() => {
      return state.permission.user_device;
    });
    const msg = ref("");
    const msg_show = ref(false);
    const init_img_arr = {
      img1: [
        {
          resource: "slot2/img1.png",
          id: 1,
          selected: false,
        },
        {
          resource: "slot2/img2.png",
          id: 2,
          selected: false,
        },
        {
          resource: "slot2/img3.png",
          id: 3,
          selected: false,
        },
        {
          resource: "slot2/img4.png",
          id: 4,
          selected: false,
        },
        {
          resource: "slot2/img5.png",
          id: 5,
          selected: false,
        },
        {
          resource: "slot2/img6.png",
          id: 6,
          selected: false,
        },
        {
          resource: "slot2/img7.png",
          id: 7,
          selected: false,
        },
        {
          resource: "slot2/img8.png",
          id: 8,
          selected: false,
        },
        {
          resource: "slot2/img9.png",
          id: 9,
          selected: false,
        },
        {
          resource: "slot2/img10.png",
          id: 10,
          selected: false,
        },
        {
          resource: "slot2/img11.png",
          id: 11,
          selected: false,
        },
        {
          resource: "slot2/img12.png",
          id: 12,
          selected: false,
        },
        {
          resource: "slot2/img1.png",
          id: 1,
          selected: false,
        },
        {
          resource: "slot2/img2.png",
          id: 2,
          selected: false,
        },
        {
          resource: "slot2/img3.png",
          id: 3,
          selected: false,
        },
        {
          resource: "slot2/img4.png",
          id: 4,
          selected: false,
        },
        {
          resource: "slot2/img5.png",
          id: 5,
          selected: false,
        },
        {
          resource: "slot2/img6.png",
          id: 6,
          selected: false,
        },
        {
          resource: "slot2/img7.png",
          id: 7,
          selected: false,
        },
        {
          resource: "slot2/img8.png",
          id: 8,
          selected: false,
        },
        {
          resource: "slot2/img9.png",
          id: 9,
          selected: false,
        },
        {
          resource: "slot2/img10.png",
          id: 10,
          selected: false,
        },
        {
          resource: "slot2/img11.png",
          id: 11,
          selected: false,
        },
        {
          resource: "slot2/img12.png",
          id: 12,
          selected: false,
        },
      ],
      img2: [
        {
          resource: "slot2/img4.png",
          id: 4,
          selected: false,
        },
        {
          resource: "slot2/img5.png",
          id: 5,
          selected: false,
        },
        {
          resource: "slot2/img9.png",
          id: 9,
          selected: false,
        },
        {
          resource: "slot2/img1.png",
          id: 1,
          selected: false,
        },
        {
          resource: "slot2/img7.png",
          id: 7,
          selected: false,
        },
        {
          resource: "slot2/img10.png",
          id: 10,
          selected: false,
        },
        {
          resource: "slot2/img11.png",
          id: 11,
          selected: false,
        },
        {
          resource: "slot2/img3.png",
          id: 3,
          selected: false,
        },
        {
          resource: "slot2/img6.png",
          id: 6,
          selected: false,
        },
        {
          resource: "slot2/img12.png",
          id: 12,
          selected: false,
        },
        {
          resource: "slot2/img2.png",
          id: 2,
          selected: false,
        },
        {
          resource: "slot2/img8.png",
          id: 8,
          selected: false,
        },
        {
          resource: "slot2/img4.png",
          id: 4,
          selected: false,
        },
        {
          resource: "slot2/img5.png",
          id: 5,
          selected: false,
        },
        {
          resource: "slot2/img9.png",
          id: 9,
          selected: false,
        },
        {
          resource: "slot2/img1.png",
          id: 1,
          selected: false,
        },
        {
          resource: "slot2/img7.png",
          id: 7,
          selected: false,
        },
        {
          resource: "slot2/img10.png",
          id: 10,
          selected: false,
        },
        {
          resource: "slot2/img11.png",
          id: 11,
          selected: false,
        },
        {
          resource: "slot2/img3.png",
          id: 3,
          selected: false,
        },
        {
          resource: "slot2/img6.png",
          id: 6,
          selected: false,
        },
        {
          resource: "slot2/img12.png",
          id: 12,
          selected: false,
        },
        {
          resource: "slot2/img2.png",
          id: 2,
          selected: false,
        },
        {
          resource: "slot2/img8.png",
          id: 8,
          selected: false,
        },
      ],
      img3: [
        {
          resource: "slot2/img10.png",
          id: 10,
          selected: false,
        },
        {
          resource: "slot2/img3.png",
          id: 3,
          selected: false,
        },
        {
          resource: "slot2/img1.png",
          id: 1,
          selected: false,
        },
        {
          resource: "slot2/img8.png",
          id: 8,
          selected: false,
        },
        {
          resource: "slot2/img6.png",
          id: 6,
          selected: false,
        },
        {
          resource: "slot2/img4.png",
          id: 4,
          selected: false,
        },
        {
          resource: "slot2/img12.png",
          id: 12,
          selected: false,
        },
        {
          resource: "slot2/img7.png",
          id: 7,
          selected: false,
        },
        {
          resource: "slot2/img9.png",
          id: 9,
          selected: false,
        },
        {
          resource: "slot2/img11.png",
          id: 11,
          selected: false,
        },
        {
          resource: "slot2/img2.png",
          id: 2,
          selected: false,
        },
        {
          resource: "slot2/img5.png",
          id: 5,
          selected: false,
        },
        {
          resource: "slot2/img10.png",
          id: 10,
          selected: false,
        },
        {
          resource: "slot2/img3.png",
          id: 3,
          selected: false,
        },
        {
          resource: "slot2/img1.png",
          id: 1,
          selected: false,
        },
        {
          resource: "slot2/img8.png",
          id: 8,
          selected: false,
        },
        {
          resource: "slot2/img6.png",
          id: 6,
          selected: false,
        },
        {
          resource: "slot2/img4.png",
          id: 4,
          selected: false,
        },
        {
          resource: "slot2/img12.png",
          id: 12,
          selected: false,
        },
        {
          resource: "slot2/img7.png",
          id: 7,
          selected: false,
        },
        {
          resource: "slot2/img9.png",
          id: 9,
          selected: false,
        },
        {
          resource: "slot2/img11.png",
          id: 11,
          selected: false,
        },
        {
          resource: "slot2/img2.png",
          id: 2,
          selected: false,
        },
        {
          resource: "slot2/img5.png",
          id: 5,
          selected: false,
        },
      ],
      img4: [
        {
          resource: "slot2/img9.png",
          id: 9,
          selected: false,
        },
        {
          resource: "slot2/img6.png",
          id: 6,
          selected: false,
        },
        {
          resource: "slot2/img1.png",
          id: 1,
          selected: false,
        },
        {
          resource: "slot2/img7.png",
          id: 7,
          selected: false,
        },
        {
          resource: "slot2/img11.png",
          id: 11,
          selected: false,
        },
        {
          resource: "slot2/img4.png",
          id: 4,
          selected: false,
        },
        {
          resource: "slot2/img12.png",
          id: 12,
          selected: false,
        },
        {
          resource: "slot2/img3.png",
          id: 3,
          selected: false,
        },
        {
          resource: "slot2/img2.png",
          id: 2,
          selected: false,
        },
        {
          resource: "slot2/img11.png",
          id: 11,
          selected: false,
        },
        {
          resource: "slot2/img5.png",
          id: 5,
          selected: false,
        },
        {
          resource: "slot2/img8.png",
          id: 8,
          selected: false,
        },
        {
          resource: "slot2/img9.png",
          id: 9,
          selected: false,
        },
        {
          resource: "slot2/img6.png",
          id: 6,
          selected: false,
        },
        {
          resource: "slot2/img1.png",
          id: 1,
          selected: false,
        },
        {
          resource: "slot2/img7.png",
          id: 7,
          selected: false,
        },
        {
          resource: "slot2/img11.png",
          id: 11,
          selected: false,
        },
        {
          resource: "slot2/img4.png",
          id: 4,
          selected: false,
        },
        {
          resource: "slot2/img12.png",
          id: 12,
          selected: false,
        },
        {
          resource: "slot2/img3.png",
          id: 3,
          selected: false,
        },
        {
          resource: "slot2/img2.png",
          id: 2,
          selected: false,
        },
        {
          resource: "slot2/img11.png",
          id: 11,
          selected: false,
        },
        {
          resource: "slot2/img5.png",
          id: 5,
          selected: false,
        },
        {
          resource: "slot2/img8.png",
          id: 8,
          selected: false,
        },
      ],
      img5: [
        {
          resource: "slot2/img3.png",
          id: 3,
          selected: false,
        },
        {
          resource: "slot2/img5.png",
          id: 5,
          selected: false,
        },
        {
          resource: "slot2/img7.png",
          id: 7,
          selected: false,
        },
        {
          resource: "slot2/img9.png",
          id: 9,
          selected: false,
        },
        {
          resource: "slot2/img11.png",
          id: 11,
          selected: false,
        },
        {
          resource: "slot2/img1.png",
          id: 1,
          selected: false,
        },
        {
          resource: "slot2/img2.png",
          id: 2,
          selected: false,
        },
        {
          resource: "slot2/img4.png",
          id: 4,
          selected: false,
        },
        {
          resource: "slot2/img6.png",
          id: 6,
          selected: false,
        },
        {
          resource: "slot2/img8.png",
          id: 8,
          selected: false,
        },
        {
          resource: "slot2/img10.png",
          id: 10,
          selected: false,
        },
        {
          resource: "slot2/img12.png",
          id: 12,
          selected: false,
        },
        {
          resource: "slot2/img3.png",
          id: 3,
          selected: false,
        },
        {
          resource: "slot2/img5.png",
          id: 5,
          selected: false,
        },
        {
          resource: "slot2/img7.png",
          id: 7,
          selected: false,
        },
        {
          resource: "slot2/img9.png",
          id: 9,
          selected: false,
        },
        {
          resource: "slot2/img11.png",
          id: 11,
          selected: false,
        },
        {
          resource: "slot2/img1.png",
          id: 1,
          selected: false,
        },
        {
          resource: "slot2/img2.png",
          id: 2,
          selected: false,
        },
        {
          resource: "slot2/img4.png",
          id: 4,
          selected: false,
        },
        {
          resource: "slot2/img6.png",
          id: 6,
          selected: false,
        },
        {
          resource: "slot2/img8.png",
          id: 8,
          selected: false,
        },
        {
          resource: "slot2/img10.png",
          id: 10,
          selected: false,
        },
        {
          resource: "slot2/img12.png",
          id: 12,
          selected: false,
        },
      ],
      img6: [
        {
          resource: "slot2/img2.png",
          id: 2,
          selected: false,
        },
        {
          resource: "slot2/img4.png",
          id: 4,
          selected: false,
        },
        {
          resource: "slot2/img6.png",
          id: 6,
          selected: false,
        },
        {
          resource: "slot2/img8.png",
          id: 8,
          selected: false,
        },
        {
          resource: "slot2/img10.png",
          id: 10,
          selected: false,
        },
        {
          resource: "slot2/img12.png",
          id: 12,
          selected: false,
        },
        {
          resource: "slot2/img1.png",
          id: 1,
          selected: false,
        },
        {
          resource: "slot2/img3.png",
          id: 3,
          selected: false,
        },
        {
          resource: "slot2/img5.png",
          id: 5,
          selected: false,
        },
        {
          resource: "slot2/img7.png",
          id: 7,
          selected: false,
        },
        {
          resource: "slot2/img9.png",
          id: 9,
          selected: false,
        },
        {
          resource: "slot2/img11.png",
          id: 11,
          selected: false,
        },
        {
          resource: "slot2/img2.png",
          id: 2,
          selected: false,
        },
        {
          resource: "slot2/img4.png",
          id: 4,
          selected: false,
        },
        {
          resource: "slot2/img6.png",
          id: 6,
          selected: false,
        },
        {
          resource: "slot2/img8.png",
          id: 8,
          selected: false,
        },
        {
          resource: "slot2/img10.png",
          id: 10,
          selected: false,
        },
        {
          resource: "slot2/img12.png",
          id: 12,
          selected: false,
        },
        {
          resource: "slot2/img1.png",
          id: 1,
          selected: false,
        },
        {
          resource: "slot2/img3.png",
          id: 3,
          selected: false,
        },
        {
          resource: "slot2/img5.png",
          id: 5,
          selected: false,
        },
        {
          resource: "slot2/img7.png",
          id: 7,
          selected: false,
        },
        {
          resource: "slot2/img9.png",
          id: 9,
          selected: false,
        },
        {
          resource: "slot2/img11.png",
          id: 11,
          selected: false,
        },
      ],
    };
    const img_arr = reactive({
      img1: [
        {
          resource: "slot2/img1.png",
          id: 1,
          selected: false,
        },
        {
          resource: "slot2/img2.png",
          id: 2,
          selected: false,
        },
        {
          resource: "slot2/img3.png",
          id: 3,
          selected: false,
        },
        {
          resource: "slot2/img4.png",
          id: 4,
          selected: false,
        },
        {
          resource: "slot2/img5.png",
          id: 5,
          selected: false,
        },
        {
          resource: "slot2/img6.png",
          id: 6,
          selected: false,
        },
        {
          resource: "slot2/img7.png",
          id: 7,
          selected: false,
        },
        {
          resource: "slot2/img8.png",
          id: 8,
          selected: false,
        },
        {
          resource: "slot2/img9.png",
          id: 9,
          selected: false,
        },
        {
          resource: "slot2/img10.png",
          id: 10,
          selected: false,
        },
        {
          resource: "slot2/img11.png",
          id: 11,
          selected: false,
        },
        {
          resource: "slot2/img12.png",
          id: 12,
          selected: false,
        },
        {
          resource: "slot2/img1.png",
          id: 1,
          selected: false,
        },
        {
          resource: "slot2/img2.png",
          id: 2,
          selected: false,
        },
        {
          resource: "slot2/img3.png",
          id: 3,
          selected: false,
        },
        {
          resource: "slot2/img4.png",
          id: 4,
          selected: false,
        },
        {
          resource: "slot2/img5.png",
          id: 5,
          selected: false,
        },
        {
          resource: "slot2/img6.png",
          id: 6,
          selected: false,
        },
        {
          resource: "slot2/img7.png",
          id: 7,
          selected: false,
        },
        {
          resource: "slot2/img8.png",
          id: 8,
          selected: false,
        },
        {
          resource: "slot2/img9.png",
          id: 9,
          selected: false,
        },
        {
          resource: "slot2/img10.png",
          id: 10,
          selected: false,
        },
        {
          resource: "slot2/img11.png",
          id: 11,
          selected: false,
        },
        {
          resource: "slot2/img12.png",
          id: 12,
          selected: false,
        },
      ],
      img2: [
        {
          resource: "slot2/img4.png",
          id: 4,
          selected: false,
        },
        {
          resource: "slot2/img5.png",
          id: 5,
          selected: false,
        },
        {
          resource: "slot2/img9.png",
          id: 9,
          selected: false,
        },
        {
          resource: "slot2/img1.png",
          id: 1,
          selected: false,
        },
        {
          resource: "slot2/img7.png",
          id: 7,
          selected: false,
        },
        {
          resource: "slot2/img10.png",
          id: 10,
          selected: false,
        },
        {
          resource: "slot2/img11.png",
          id: 11,
          selected: false,
        },
        {
          resource: "slot2/img3.png",
          id: 3,
          selected: false,
        },
        {
          resource: "slot2/img6.png",
          id: 6,
          selected: false,
        },
        {
          resource: "slot2/img12.png",
          id: 12,
          selected: false,
        },
        {
          resource: "slot2/img2.png",
          id: 2,
          selected: false,
        },
        {
          resource: "slot2/img8.png",
          id: 8,
          selected: false,
        },
        {
          resource: "slot2/img4.png",
          id: 4,
          selected: false,
        },
        {
          resource: "slot2/img5.png",
          id: 5,
          selected: false,
        },
        {
          resource: "slot2/img9.png",
          id: 9,
          selected: false,
        },
        {
          resource: "slot2/img1.png",
          id: 1,
          selected: false,
        },
        {
          resource: "slot2/img7.png",
          id: 7,
          selected: false,
        },
        {
          resource: "slot2/img10.png",
          id: 10,
          selected: false,
        },
        {
          resource: "slot2/img11.png",
          id: 11,
          selected: false,
        },
        {
          resource: "slot2/img3.png",
          id: 3,
          selected: false,
        },
        {
          resource: "slot2/img6.png",
          id: 6,
          selected: false,
        },
        {
          resource: "slot2/img12.png",
          id: 12,
          selected: false,
        },
        {
          resource: "slot2/img2.png",
          id: 2,
          selected: false,
        },
        {
          resource: "slot2/img8.png",
          id: 8,
          selected: false,
        },
      ],
      img3: [
        {
          resource: "slot2/img10.png",
          id: 10,
          selected: false,
        },
        {
          resource: "slot2/img3.png",
          id: 3,
          selected: false,
        },
        {
          resource: "slot2/img1.png",
          id: 1,
          selected: false,
        },
        {
          resource: "slot2/img8.png",
          id: 8,
          selected: false,
        },
        {
          resource: "slot2/img6.png",
          id: 6,
          selected: false,
        },
        {
          resource: "slot2/img4.png",
          id: 4,
          selected: false,
        },
        {
          resource: "slot2/img12.png",
          id: 12,
          selected: false,
        },
        {
          resource: "slot2/img7.png",
          id: 7,
          selected: false,
        },
        {
          resource: "slot2/img9.png",
          id: 9,
          selected: false,
        },
        {
          resource: "slot2/img11.png",
          id: 11,
          selected: false,
        },
        {
          resource: "slot2/img2.png",
          id: 2,
          selected: false,
        },
        {
          resource: "slot2/img5.png",
          id: 5,
          selected: false,
        },
        {
          resource: "slot2/img10.png",
          id: 10,
          selected: false,
        },
        {
          resource: "slot2/img3.png",
          id: 3,
          selected: false,
        },
        {
          resource: "slot2/img1.png",
          id: 1,
          selected: false,
        },
        {
          resource: "slot2/img8.png",
          id: 8,
          selected: false,
        },
        {
          resource: "slot2/img6.png",
          id: 6,
          selected: false,
        },
        {
          resource: "slot2/img4.png",
          id: 4,
          selected: false,
        },
        {
          resource: "slot2/img12.png",
          id: 12,
          selected: false,
        },
        {
          resource: "slot2/img7.png",
          id: 7,
          selected: false,
        },
        {
          resource: "slot2/img9.png",
          id: 9,
          selected: false,
        },
        {
          resource: "slot2/img11.png",
          id: 11,
          selected: false,
        },
        {
          resource: "slot2/img2.png",
          id: 2,
          selected: false,
        },
        {
          resource: "slot2/img5.png",
          id: 5,
          selected: false,
        },
      ],
      img4: [
        {
          resource: "slot2/img9.png",
          id: 9,
          selected: false,
        },
        {
          resource: "slot2/img6.png",
          id: 6,
          selected: false,
        },
        {
          resource: "slot2/img1.png",
          id: 1,
          selected: false,
        },
        {
          resource: "slot2/img7.png",
          id: 7,
          selected: false,
        },
        {
          resource: "slot2/img11.png",
          id: 11,
          selected: false,
        },
        {
          resource: "slot2/img4.png",
          id: 4,
          selected: false,
        },
        {
          resource: "slot2/img12.png",
          id: 12,
          selected: false,
        },
        {
          resource: "slot2/img3.png",
          id: 3,
          selected: false,
        },
        {
          resource: "slot2/img2.png",
          id: 2,
          selected: false,
        },
        {
          resource: "slot2/img11.png",
          id: 11,
          selected: false,
        },
        {
          resource: "slot2/img5.png",
          id: 5,
          selected: false,
        },
        {
          resource: "slot2/img8.png",
          id: 8,
          selected: false,
        },
        {
          resource: "slot2/img9.png",
          id: 9,
          selected: false,
        },
        {
          resource: "slot2/img6.png",
          id: 6,
          selected: false,
        },
        {
          resource: "slot2/img1.png",
          id: 1,
          selected: false,
        },
        {
          resource: "slot2/img7.png",
          id: 7,
          selected: false,
        },
        {
          resource: "slot2/img11.png",
          id: 11,
          selected: false,
        },
        {
          resource: "slot2/img4.png",
          id: 4,
          selected: false,
        },
        {
          resource: "slot2/img12.png",
          id: 12,
          selected: false,
        },
        {
          resource: "slot2/img3.png",
          id: 3,
          selected: false,
        },
        {
          resource: "slot2/img2.png",
          id: 2,
          selected: false,
        },
        {
          resource: "slot2/img11.png",
          id: 11,
          selected: false,
        },
        {
          resource: "slot2/img5.png",
          id: 5,
          selected: false,
        },
        {
          resource: "slot2/img8.png",
          id: 8,
          selected: false,
        },
      ],
      img5: [
        {
          resource: "slot2/img3.png",
          id: 3,
          selected: false,
        },
        {
          resource: "slot2/img5.png",
          id: 5,
          selected: false,
        },
        {
          resource: "slot2/img7.png",
          id: 7,
          selected: false,
        },
        {
          resource: "slot2/img9.png",
          id: 9,
          selected: false,
        },
        {
          resource: "slot2/img11.png",
          id: 11,
          selected: false,
        },
        {
          resource: "slot2/img1.png",
          id: 1,
          selected: false,
        },
        {
          resource: "slot2/img2.png",
          id: 2,
          selected: false,
        },
        {
          resource: "slot2/img4.png",
          id: 4,
          selected: false,
        },
        {
          resource: "slot2/img6.png",
          id: 6,
          selected: false,
        },
        {
          resource: "slot2/img8.png",
          id: 8,
          selected: false,
        },
        {
          resource: "slot2/img10.png",
          id: 10,
          selected: false,
        },
        {
          resource: "slot2/img12.png",
          id: 12,
          selected: false,
        },
        {
          resource: "slot2/img3.png",
          id: 3,
          selected: false,
        },
        {
          resource: "slot2/img5.png",
          id: 5,
          selected: false,
        },
        {
          resource: "slot2/img7.png",
          id: 7,
          selected: false,
        },
        {
          resource: "slot2/img9.png",
          id: 9,
          selected: false,
        },
        {
          resource: "slot2/img11.png",
          id: 11,
          selected: false,
        },
        {
          resource: "slot2/img1.png",
          id: 1,
          selected: false,
        },
        {
          resource: "slot2/img2.png",
          id: 2,
          selected: false,
        },
        {
          resource: "slot2/img4.png",
          id: 4,
          selected: false,
        },
        {
          resource: "slot2/img6.png",
          id: 6,
          selected: false,
        },
        {
          resource: "slot2/img8.png",
          id: 8,
          selected: false,
        },
        {
          resource: "slot2/img10.png",
          id: 10,
          selected: false,
        },
        {
          resource: "slot2/img12.png",
          id: 12,
          selected: false,
        },
      ],
      img6: [
        {
          resource: "slot2/img2.png",
          id: 2,
          selected: false,
        },
        {
          resource: "slot2/img4.png",
          id: 4,
          selected: false,
        },
        {
          resource: "slot2/img6.png",
          id: 6,
          selected: false,
        },
        {
          resource: "slot2/img8.png",
          id: 8,
          selected: false,
        },
        {
          resource: "slot2/img10.png",
          id: 10,
          selected: false,
        },
        {
          resource: "slot2/img12.png",
          id: 12,
          selected: false,
        },
        {
          resource: "slot2/img1.png",
          id: 1,
          selected: false,
        },
        {
          resource: "slot2/img3.png",
          id: 3,
          selected: false,
        },
        {
          resource: "slot2/img5.png",
          id: 5,
          selected: false,
        },
        {
          resource: "slot2/img7.png",
          id: 7,
          selected: false,
        },
        {
          resource: "slot2/img9.png",
          id: 9,
          selected: false,
        },
        {
          resource: "slot2/img11.png",
          id: 11,
          selected: false,
        },
        {
          resource: "slot2/img2.png",
          id: 2,
          selected: false,
        },
        {
          resource: "slot2/img4.png",
          id: 4,
          selected: false,
        },
        {
          resource: "slot2/img6.png",
          id: 6,
          selected: false,
        },
        {
          resource: "slot2/img8.png",
          id: 8,
          selected: false,
        },
        {
          resource: "slot2/img10.png",
          id: 10,
          selected: false,
        },
        {
          resource: "slot2/img12.png",
          id: 12,
          selected: false,
        },
        {
          resource: "slot2/img1.png",
          id: 1,
          selected: false,
        },
        {
          resource: "slot2/img3.png",
          id: 3,
          selected: false,
        },
        {
          resource: "slot2/img5.png",
          id: 5,
          selected: false,
        },
        {
          resource: "slot2/img7.png",
          id: 7,
          selected: false,
        },
        {
          resource: "slot2/img9.png",
          id: 9,
          selected: false,
        },
        {
          resource: "slot2/img11.png",
          id: 11,
          selected: false,
        },
      ],
    });
    const is_loading = ref(true);
    const loadingProgress = ref(0);
    const initStart = () => {
      is_loading.value = false;
      handlePlayBack();
    };
    onMounted(() => {
      progressTimer = setInterval(() => {
        if (loadingProgress.value < 100) {
          loadingProgress.value += 1;
        } else {
          clearInterval(progressTimer);
          progressTimer = null;
        }
      }, 150);
      getWallet.post("", {}).then((res) => {
        if (res.code == "000000") {
          dataObj.total =
            Number(res.data.bcAvailableBalance) + Number(res.data.bcFreezeBalance);
        }
      });
    });
    const is_roll = ref(false);
    const is_win = ref(false);
    const calc_win = ref(0);
    const calc_win_id = ref(0);
    const auto_amount_box = [10, 30, 50, 80, 1000];
    const first_index = ref(0);
    const second_index = ref(0);
    const third_index = ref(0);
    const fourth_index = ref(0);
    const fifth_index = ref(0);
    const sixth_index = ref(0);
    const chooseAutoAmount = (data) => {
      auto_amount.value = data;
    };
    const tip_text = ref("Ganhe até 2.000x vezes a recompensa");
    const auto_show = ref(false);
    const auto_amount = ref("");
    const closeAutoBox = () => {
      auto_amount.value = "";
      auto_show.value = false;
    };
    const dataObj = reactive({
      total: 0,
      betAmount: 3,
      winAmount: 0,
    });
    const animation_value = ref("rotation 2.5s linear infinite");
    const betAmountFunc = (type) => {
      if (type == 1) {
        if (dataObj.betAmount > 1) {
          dataObj.betAmount -= 1;
        }
      } else if (type == 2) {
        dataObj.betAmount += 1;
      } else if (type == 4) {
        auto_show.value = true;
      } else if (type == 3) {
        isFlash.value = !isFlash.value;
      }
    };
    const showMsg = (label) => {
      msg.value = "Current balance is insufficient";
      msg_show.value = true;
      setTimeout(() => {
        msg_show.value = false;
      }, 3000);
    };

    const is_auto = ref(false);
    const isFlash = ref(false);
    const auto_times = ref(10);

    const startAuto = () => {
      if (!auto_amount.value) return;
      is_auto.value = true;
      dataObj.betAmount = Number(auto_amount.value) / 10;
      closeAutoBox();
      play();
    };

    const postSpinResult = () => {
      tip_text.value = is_win.value
        ? `GANHE ${Number(calc_win.value) * Number(dataObj.betAmount)} !`
        : "";
      dataObj.winAmount = is_win.value
        ? Number(calc_win.value) * Number(dataObj.betAmount)
        : 0;
      dataObj.total = is_win.value
        ? (Number(calc_win.value) - 1) * Number(dataObj.betAmount) + Number(dataObj.total)
        : Number(dataObj.total) - Number(dataObj.betAmount);
      slot1_play.post("", {
        banlance: Number(dataObj.total),
        amount: Number(dataObj.betAmount),
      });
    };

    const play = () => {
      if (is_roll.value) return;
      if (Number(dataObj.total) < Number(dataObj.betAmount)) {
        showMsg("O saldo atual é insuficiente");
        return;
      }
      animation_value.value = "rotation .5s linear infinite";
      is_roll.value = true;
      isWin();
      if (is_win.value) {
        winIndex();
        calcWin();
      }

      setTimeout(
        () => {
          animation_value.value = "rotation 2.5s linear infinite";
          is_roll.value = false;
          postSpinResult();
          if (is_win.value) {
            //中奖
            hackPlayBet();
            ranSort(
              calc_win_id.value,
              first_index.value,
              JSON.parse(JSON.stringify(img_arr.img1)),
              1
            );
            ranSort(
              calc_win_id.value,
              second_index.value,
              JSON.parse(JSON.stringify(img_arr.img2)),
              2
            );
            ranSort(
              calc_win_id.value,
              third_index.value,
              JSON.parse(JSON.stringify(img_arr.img3)),
              3
            );
            ranSort(
              calc_win_id.value,
              fourth_index.value,
              JSON.parse(JSON.stringify(img_arr.img4)),
              4
            );
            ranSort(
              calc_win_id.value,
              fifth_index.value,
              JSON.parse(JSON.stringify(img_arr.img5)),
              5
            );
            ranSort(
              calc_win_id.value,
              sixth_index.value,
              JSON.parse(JSON.stringify(img_arr.img6)),
              6
            );
          } else {
            dataObj.winAmount = 0;
            tip_text.value = "Ganhe até 2.000x vezes a recompensa";
            //未中奖
            img_arr.img1 = init_img_arr.img1;
            img_arr.img2 = init_img_arr.img2;
            img_arr.img3 = init_img_arr.img3;
            img_arr.img4 = init_img_arr.img4;
            img_arr.img5 = init_img_arr.img5;
            img_arr.img6 = init_img_arr.img6;
          }
          if (is_auto.value && auto_times.value > 0) {
            play();
            auto_times.value -= 1;
          } else {
            is_auto.value = false;
            auto_times.value = 10;
          }
        },
        isFlash.value ? 1200 : 2400
      );
    };

    const winIndex = () => {
      first_index.value = Math.floor(Math.random() * 4);
      if (first_index.value == 0) {
        second_index.value = 1;
        third_index.value = 2;
        fourth_index.value = 3;
        fifth_index.value = 3;
        sixth_index.value = 3;
      } else if (first_index.value == 1) {
        second_index.value = 0;
        third_index.value = 1;
        fourth_index.value = 2;
        fifth_index.value = 3;
        sixth_index.value = 2;
      } else if (first_index.value == 2) {
        second_index.value = 3;
        third_index.value = 2;
        fourth_index.value = 1;
        fifth_index.value = 2;
        sixth_index.value = 1;
      } else if (first_index.value == 3) {
        second_index.value = 2;
        third_index.value = 1;
        fourth_index.value = 0;
        fifth_index.value = 1;
        sixth_index.value = 2;
      }
      return;
    };

    const isWin = () => {
      calc_win.value = 0;
      calc_win_id.value = 0;
      //是否中奖
      if (Math.floor(Math.random() * 10) > 7) {
        is_win.value = true;
      } else {
        is_win.value = false;
      }
    };

    const calcWin = () => {
      calc_win_id.value = Math.floor(Math.random() * 13);
      switch (calc_win_id.value) {
        case 1:
          calc_win.value = 3;
          break;
        case 2:
          calc_win.value = 5;
          break;
        case 3:
          calc_win.value = 10;
          break;
        case 4:
          calc_win.value = 15;
          break;
        case 5:
          calc_win.value = 20;
          break;
        case 6:
          calc_win.value = 30;
          break;
        case 7:
          calc_win.value = 40;
          break;
        case 8:
          calc_win.value = 50;
          break;
        case 9:
          calc_win.value = 60;
          break;
        case 10:
          calc_win.value = 70;
          break;
        case 11:
          calc_win.value = 80;
          break;
        case 12:
          calc_win.value = 100;
          break;
      }
    };

    const ranSort = (selectedId, selectedIndex, arr, colNum) => {
      let new_temp = [];
      let temp_1 = arr.slice(0, 12);
      let temp_2 = arr.slice(12, 24);
      while (temp_1.length > 0) {
        let ranIndex = Math.floor(Math.random() * temp_1.length);
        new_temp.push(temp_1[ranIndex]);
        temp_1.splice(ranIndex, 1);
      }
      while (temp_2.length > 0) {
        let ranIndex = Math.floor(Math.random() * temp_2.length);
        new_temp.push(temp_2[ranIndex]);
        temp_2.splice(ranIndex, 1);
      }
      let choose_arr = new_temp.slice(0, 12);
      let target_index = "";
      for (let i in choose_arr) {
        if (choose_arr[i].id == selectedId) {
          target_index = i;
          break;
        }
      }
      [choose_arr[target_index], choose_arr[selectedIndex]] = [
        choose_arr[selectedIndex],
        choose_arr[target_index],
      ];
      choose_arr[selectedIndex].selected = true;
      if (colNum == 1) {
        img_arr.img1 = choose_arr.concat(new_temp.slice(12, 24));
      } else if (colNum == 2) {
        img_arr.img2 = choose_arr.concat(new_temp.slice(12, 24));
      } else if (colNum == 3) {
        img_arr.img3 = choose_arr.concat(new_temp.slice(12, 24));
      } else if (colNum == 4) {
        img_arr.img4 = choose_arr.concat(new_temp.slice(12, 24));
      } else if (colNum == 5) {
        img_arr.img5 = choose_arr.concat(new_temp.slice(12, 24));
      } else if (colNum == 6) {
        img_arr.img6 = choose_arr.concat(new_temp.slice(12, 24));
      }
    };

    return {
      loadingProgress,
      is_loading,
      base_img_url,
      audioRefBack,
      audioRefBet,
      user_device,
      img_arr,
      auto_show,
      auto_amount,
      dataObj,
      animation_value,
      play,
      betAmountFunc,
      tip_text,
      closeAutoBox,
      auto_amount_box,
      chooseAutoAmount,
      startAuto,
      msg,
      msg_show,
      is_roll,
      handlePlayBack,
      initStart,
    };
  },
};
</script>

<style scoped lang="scss">
.loading-box {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  background-image: url("../assets/images/slot2/bg2.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  justify-content: center;
  align-items: flex-end;
  box-sizing: border-box;
  padding-bottom: 200px;
}
.loading-box-pc {
  width: 482px;
  height: calc(100vh - 60px);
  background-image: url("../assets/images/slot2/bg2.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: fixed;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  box-sizing: border-box;
  padding-bottom: 200px;
}
.loading-progress {
  width: 250px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  .init-btn {
    width: 150px;
    height: 40px;
    border-radius: 6px;
    background: #f6d878;
    color: #fff;
    font-size: 15px;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.slot-box-pc {
  width: 100%;
  height: calc(100vh - 60px);
  background-image: url("https://vencer77.com/images/slot2/bg1.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .auto-box {
    z-index: 9;
    position: absolute;
    bottom: 0;
    left: calc((100% - 482px) / 2);
    width: 482px;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }

  .auto-content {
    z-index: 10;
    position: absolute;
    left: calc((100% - 482px) / 2);
    bottom: 0;
    width: 482px;
    background: #30303c;
    .auto-data-box {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      padding: 0 5px 5px 5px;
      .item {
        width: calc((100% - 16px) / 3);
        height: 35px;
        border-radius: 6px;
        background: #1d1d24;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          color: #fff;
          font-size: 15px;
          font-weight: 700;
        }
        img {
          position: absolute;
          width: 28px;
          top: 3.5px;
          left: 5px;
        }
      }
    }
    .auto-amount-box {
      width: 100%;
      box-sizing: border-box;
      padding: 20px;
      background: #282833;
      .label {
        color: #d4d4d6;
        font-size: 15px;
        margin-bottom: 5px;
      }
      .choose-box {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .item {
          width: calc((100% - 40px) / 5);
          height: 40px;
          border-radius: 6px;
          background: #30303d;
          color: #6e6e78;
          font-size: 18px;
          display: flex;
          justify-content: center;
          align-items: center;
          &:hover {
            color: #665835;
          }
        }
      }
    }
    .auto-btn-box {
      width: 100%;
      box-sizing: border-box;
      padding: 15px 10px;
      .auto-btn {
        width: 100%;
        height: 45px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #665835;
        color: #6e6e78;
        font-size: 18px;
        font-weight: 700;
        border-radius: 6px;
      }
    }
    .auto-content-header {
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      span {
        color: #ffffff;
        font-size: 18px;
        font-weight: 700;
      }
      img {
        width: 30px;
        position: absolute;
        right: 15px;
        top: 10px;
      }
    }
  }

  .game-content {
    width: 482px;
    height: calc(100vh - 60px);
    background-image: url("https://vencer77.com/images/slot2/pag_bg0.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
    .msg-box {
      position: absolute;
      width: 60%;
      height: 50px;
      top: calc((100vh - 50px) / 2);
      left: 20%;
      z-index: 999;
      background: rgba(0, 0, 0, 0.7);
      border-radius: 6px;
      color: #fff;
      font-size: 15px;
      font-weight: 600;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      padding: 10px;
    }
    .game-main {
      height: 33vh;
      position: absolute;
      top: 18vh;
      left: 10px;
      width: calc(100% - 20px);
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      padding: 0 1%;
      .roller-box {
        width: 29%;
        height: 100%;
        position: relative;
      }
      .roller-box-2 {
        width: 29%;
        height: 133.3%;
        position: relative;
      }
    }
    .data-box {
      bottom: 17vh;
      z-index: 2;
      width: 100%;
      height: 40px;
      position: absolute;
      left: 0px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .func-item {
        width: calc(100% / 3);
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 25px;
          margin-right: 15px;
        }
        span {
          color: #84e6f5;
          font-size: 16px;
          font-weight: 600;
        }
      }
    }
    .tip-box {
      // width: calc(100% - 85px);
      width: 375px;
      left: 42.5px;
      top: 64.5vh;
      position: absolute;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      span {
        color: #f6d878;
        font-size: 18px;
        font-weight: 800;
      }
      .tip-label {
        white-space: nowrap;
        color: #f6d878;
        font-size: 18px;
        font-weight: 800;
        animation: fadenum 10s linear infinite normal;
        @keyframes fadenum {
          0% {
            transform: translateX(360px);
          }
          100% {
            transform: translateX(-360px);
          }
        }
      }
    }

    .func-box {
      bottom: 4vh;
      left: calc((100% - 482px) / 2);
      width: 482px;
      position: absolute;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .play-btn-back {
        width: 120px;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: url("https://vencer77.com/images/slot2/mais_icon28_2.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        box-sizing: border-box;
        padding-bottom: 10px;
        .play-btn {
          width: 80px;
          height: 80px;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 50px;

            @keyframes rotation {
              from {
                transform: rotate(0deg);
              }

              to {
                transform: rotate(360deg);
              }
            }

            @-webkit-keyframes rotation {
              from {
                transform: rotate(0deg);
              }

              to {
                transform: rotate(360deg);
              }
            }
          }
        }
      }

      img {
        width: 40px;
      }
    }
  }
}
.slot-box-h5 {
  width: 100%;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
  .msg-box {
    position: absolute;
    width: 60%;
    height: 50px;
    top: calc((100vh - 50px) / 2);
    left: 20%;
    z-index: 999;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 6px;
    color: #fff;
    font-size: 15px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding: 10px;
  }
  .auto-box {
    z-index: 9;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  .auto-content {
    z-index: 10;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background: #30303c;
    box-sizing: border-box;
    padding-bottom: env(safe-area-inset-bottom);
    .auto-data-box {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      padding: 0 5px 5px 5px;
      .item {
        width: calc((100% - 16px) / 3);
        height: 35px;
        border-radius: 6px;
        background: #1d1d24;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          color: #fff;
          font-size: 15px;
          font-weight: 700;
        }
        img {
          position: absolute;
          width: 28px;
          top: 3.5px;
          left: 5px;
        }
      }
    }
    .auto-btn-box {
      width: 100%;
      box-sizing: border-box;
      padding: 15px 10px;
      .auto-btn {
        width: 100%;
        height: 45px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #665835;
        color: #6e6e78;
        font-size: 18px;
        font-weight: 700;
        border-radius: 6px;
      }
    }
    .auto-amount-box {
      width: 100%;
      box-sizing: border-box;
      padding: 20px;
      background: #282833;
      .label {
        color: #d4d4d6;
        font-size: 15px;
        margin-bottom: 5px;
      }
      .choose-box {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .item {
          width: calc((100% - 40px) / 5);
          height: 40px;
          border-radius: 6px;
          background: #30303d;
          color: #6e6e78;
          font-size: 18px;
          display: flex;
          justify-content: center;
          align-items: center;
          &:hover {
            color: #665835;
          }
        }
      }
    }
    .auto-content-header {
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      span {
        color: #ffffff;
        font-size: 18px;
        font-weight: 700;
      }
      img {
        width: 30px;
        position: absolute;
        right: 15px;
        top: 10px;
      }
    }
  }
  .game-content-mobile {
    width: 100%;
    height: 100vh;
    position: relative;
    background-image: url("https://vencer77.com/images/slot2/pag_bg0.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .game-main {
      height: 36vh;
      position: absolute;
      top: 18vh;
      left: 10px;
      width: calc(100% - 20px);
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      padding: 0 1.5%;
      .roller-box {
        width: calc(100% / 6);
        height: 100%;
        position: relative;
      }
      .roller-box-2 {
        width: 29%;
        height: 133.3%;
        position: relative;
      }
    }
    .data-box {
      bottom: 18vh;
      z-index: 2;
      width: 100%;
      height: 40px;
      position: absolute;
      left: 0px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .func-item {
        width: calc(100% / 3);
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 25px;
          margin-right: 15px;
        }
        span {
          color: #84e6f5;
          font-size: 16px;
          font-weight: 600;
        }
      }
    }
    .tip-box {
      // width: calc(100% - 70px);
      width: 330px;
      left: 50px;
      top: 68.8vh;
      position: absolute;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      box-sizing: border-box;
      padding: 0 10px;
      span {
        color: #f6d878;
        font-size: 18px;
        font-weight: 800;
      }
      .tip-label {
        white-space: nowrap;
        color: #f6d878;
        font-size: 18px;
        font-weight: 800;
        animation: fadenum 10s linear infinite normal;
        @keyframes fadenum {
          0% {
            transform: translateX(360px);
          }
          100% {
            transform: translateX(-360px);
          }
        }
      }
    }

    .func-box {
      bottom: 7vh;
      left: 0;
      position: absolute;
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .play-btn-back {
        width: 120px;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: url("https://vencer77.com/images/slot2/mais_icon28_2.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        box-sizing: border-box;
        padding-bottom: 10px;
        .play-btn {
          width: 80px;
          height: 80px;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 50px;

            @keyframes rotation {
              from {
                transform: rotate(0deg);
              }

              to {
                transform: rotate(360deg);
              }
            }

            @-webkit-keyframes rotation {
              from {
                transform: rotate(0deg);
              }

              to {
                transform: rotate(360deg);
              }
            }
          }
        }
      }
      img {
        width: 40px;
      }
    }
  }
}
</style>
