<template>
  <div
    class="pg-slot"
    :style="{ height: user_device == 'h5' ? '100vh' : 'calc(100vh - 60px)' }"
  >
    <img
      v-show="game_type == '0'"
      src="@/assets/images/slot1/mais_icon28.png"
      width="200"
    />
    <span
      v-show="game_type == '0'"
      style="color: #fff; font-size: 14px; padding-top: 25px"
      >PERBEDAAN YANG MEMBUAT PERBEDAAN</span
    >
    <slot1 v-if="game_type == '1'" />
    <slot2 v-if="game_type == '2'" />
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import slot1 from "@/components/slot1.vue";
import slot2 from "@/components/slot2.vue";

export default {
  name: "pgslot",
  components: { slot1, slot2 },
  setup() {
    const route = useRoute();
    const { state } = useStore();
    const game_type = ref("0");
    const user_device = computed(() => {
      return state.permission.user_device;
    });
    onMounted(() => {
      setTimeout(() => {
        const range = Math.random();
        if (range > 0.5) {
          game_type.value = "2";
        } else {
          game_type.value = "1";
        }
      }, 3000);
    });
    return {
      game_type,
      user_device,
    };
  },
};
</script>

<style lang="scss" scoped>
.pg-slot {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000;
  flex-direction: column;
}
</style>
