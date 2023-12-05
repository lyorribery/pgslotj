<template>
    <div class="promotion">
        <div style="box-sizing: border-box;padding: 15px 10px;color:#fff;font-size: 18px;text-align: left;width: 100%;">
            {{ $t('index.promotion') }}
        </div>

        <div class="activity-content">
            <div class="activity-item" v-for="(item, index) in promotion_list" :key='index' @click="goPromotionDetail(item)">
                <div style="width: 100%;border-radius: 12px;overflow: hidden;">
                    <nut-image :src="item.imgs" width="100%" height="auto" fit="contain" round :radius="12" lazy-load />
                </div>
                <div class="des-box">
                    <div class="title">
                        {{ item.name }}
                    </div>
                </div>
            </div>
        </div>
        <pageFooter />
    </div>
</template>

<script>
import pageFooter from '@/components/pageFooter.vue'
export default {
    components: {
        pageFooter
    }
}
</script>

<script setup>

import promotion from '@/mixin/promotion'

const { promotion_list, goPromotionDetail } = promotion()

</script>

<style scoped lang="scss">
.promotion {
    width: 100%;

    .activity-content {
        width: 100%;
        box-sizing: border-box;
        padding: 0 10px;

        .activity-item {
            width: 100%;
            color: #1A44B0;
            border-radius: 12px;
            overflow: hidden;

            .des-box {
                width: 100%;
                box-sizing: border-box;
                padding: 10px 10px 25px 10px;

                .title {
                    width: 100%;
                    color: #fff;
                    font-size: 12px;
                    padding-bottom: 10px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                }

             
            }
        }
    }
}
</style>