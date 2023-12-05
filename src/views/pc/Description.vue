<template>
    <div
        style="display: flex;justify-content: center;align-items: center;flex-direction: column;width: 100%;box-sizing: border-box;padding: 15px;">
        <div style="width: 100%;display: flex;justify-content: flex-start;">
            <div class="back-btn" @click="closeParse()"><i class="iconfont icon-leftarrow"></i> <span>Back</span></div>
        </div>
        <div class="parse-detail" v-html="parse"></div>
    </div>
</template>


<script setup>

import description from '@/mixin/description'

const {
    parse,
    closeParse
} = description()

</script>

<style lang="scss" scoped>
@media screen and (min-width: 1441px) {
    .parse-detail {
        width: 70%;
        color: #fff !important;
    }
}

@media screen and (max-width: 1440px) {
    .parse-detail {
        width: 85%;
        color: #fff !important;
    }
}

.back-btn {
    margin-bottom: 15px;
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
    cursor: pointer;

    i {
        font-size: 22px;
        font-weight: 800;
    }

    span {
        padding-left: 5px;
    }
}
</style>