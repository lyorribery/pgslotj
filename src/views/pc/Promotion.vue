<template>
    <div class="promotion">
        <div style="box-sizing: border-box;padding: 15px 10px;color:#fff;font-size: 20px;text-align: left;width: 100%;">
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
                    <div class="more">
                        <div class="text">
                            <span style="padding-right: 5px;">{{ $t('common.more') }}</span>
                            <i class="iconfont icon-rightarrow"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <pageFooter />
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
    box-sizing: border-box;

    @media screen and (min-width: 1441px) {
        padding: 0 15%;
    }

    @media screen and (max-width: 1440px) {
        padding: 0 7.5%;
    }

    .activity-content {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;

        .activity-item {
            width: calc((100% - 30px) / 2);
            color: #1A44B0;
            border-radius: 12px;
            overflow: hidden;
            margin-bottom: 15px;

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

                .more {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    .text {
                        display: flex;
                        align-items: center;
                        background-color: #A0C4FD;
                        color: #fff;
                        font-size: 13px;
                        border-radius: 6px;
                        box-sizing: border-box;
                        padding: 0 12px;
                        height: 32px;
                    }
                }
            }
        }
    }
}
</style>