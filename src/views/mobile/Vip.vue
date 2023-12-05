<template>
    <div class="vip">
        <div class="vip-content" v-if="!show_level">
            <div class="icon-row">
                <i class="iconfont icon-vip"></i><span>{{ $t('vip.text7') }}</span>
            </div>
        </div>
        <div class="vip-content" v-if="show_level">
            <div class="icon-row">
                <i class="iconfont icon-vip"></i><span>{{ $t('vip.text1') }}:VIP{{ vip_info.name }}</span>
            </div>

            <div class="label">
                {{ $t('vip.text3') }}
            </div>
            <div class="table-box">
                <div class="row">
                    <div class="col">
                        {{ $t('vip.label4') }}
                    </div>
                    <div class="col">
                        {{ $t('vip.label1') }}
                    </div>
                    <div class="col">
                        {{ $t('vip.label2') }}
                    </div>
                    <div class="col">
                        {{ $t('vip.label3') }}
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        {{ cur_level.dayRedPaper.toFixed(2) }}%
                    </div>
                    <div class="col">
                        {{ cur_level.weekRedPaper }}
                    </div>
                    <div class="col">
                        {{ cur_level.monthRedPaper }}
                    </div>
                    <div class="col">
                        {{ cur_level.upgradeRedPaper }}
                    </div>
                </div>
            </div>
            <div class="label">
                {{ $t('vip.text2') }}
            </div>
            <nut-progress style="width: 100%;" stroke-color="#A0C4FD" text-color="#fff"
                :percentage="vip_info.needMultiple == 0 ? 100 : (Number(vip_info.hasMultiple) / (Number(vip_info.needMultiple) + Number(vip_info.hasMultiple)) * 100).toFixed(2)" />
            <div class="go-level-box">
                <div class="level-left">
                    <i class="iconfont icon-vip-level"></i> <span style="padding: 0 5px;">VIP{{ vip_info.name }}</span>
                    <span>{{ $t('vip.text4') }}：R$ {{ Number(vip_info.hasMultiple).toFixed(2) }}</span>
                </div>
                <div class="level-right">
                    <i class="iconfont icon-vip-level"></i> <span style="padding-left: 5px;">VIP{{ vip_info.name + 1
                    }}</span>
                </div>
            </div>
            <div class="des">
                {{ $t('vip.text5') }}
            </div>
            <div class="tip">
                <i class="iconfont icon-info"></i><span style="padding-left: 5px;">{{ $t('vip.text6') }}</span>
            </div>
        </div>
        <div class="vip-content">
            <div class="label">
                {{ $t('vip.text3') }}
            </div>
            <div class="table-box">
                <div class="row">
                    <div class="col2">
                        {{ $t('vip.text1') }}
                    </div>
                    <div class="col2">
                        {{ $t('vip.label4') }}
                    </div>
                    <div class="col2">
                        {{ $t('vip.label1') }}
                    </div>
                    <div class="col2">
                        {{ $t('vip.label2') }}
                    </div>
                    <div class="col2">
                        {{ $t('vip.label3') }}
                    </div>
                </div>
                <div class="row" v-for="(item, index) in list.data" :key='index'>
                    <div class="col2">
                        {{ item.vipName }}
                    </div>
                    <div class="col2">
                        {{ item.dayRedPaper.toFixed(2) }}%
                    </div>
                    <div class="col2">
                        {{ item.weekRedPaper }}
                    </div>
                    <div class="col2">
                        {{ item.monthRedPaper }}
                    </div>
                    <div class="col2">
                        {{ item.upgradeRedPaper }}
                    </div>
                </div>

            </div>
        </div>
        <div class="vip-content" style="margin-bottom: 10px;">
            <div class="label">
                {{ $t('vip.label5') }}
            </div>
            <div class="table-box">
                <div class="row">
                    <div class="col2">
                        {{ $t('vip.text1') }}
                    </div>
                    <div class="col2">
                        {{ $t('vip.text8') }}
                    </div>
                    <div class="col2">
                        {{ $t('vip.text9') }}
                    </div>
                    <div class="col2">
                        {{ $t('vip.text10') }}
                    </div>
                    <div class="col2">
                        {{ $t('vip.text11') }}
                    </div>
                </div>
                <div class="row" v-for="(item, index) in listGrade.data" :key="index">
                    <div class="col2">
                        {{ item.name }}
                    </div>
                    <div class="col2">
                        {{ item.upgradeFlow }}
                    </div>
                    <div class="col2">
                        {{ item.relegationFlow }}
                    </div>
                    <div class="col2">
                        {{ $t('vip.text12') }}
                    </div>
                    <div class="col2">
                        {{ $t('vip.text13') }}
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

import vip from '@/mixin/vip'

const { show_level, vip_info, list, cur_level, listGrade } = vip()

</script>


<style scoped lang="scss">
.vip {
    width: 100%;

    .vip-content {
        width: 100%;
        box-sizing: border-box;
        padding: 0 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .icon-row {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            box-sizing: border-box;
            padding-top: 15px;
            color: #fff;
            font-weight: 700;

            i {
                color: #A0C4FD;
                font-size: 25px;
            }

            span {
                padding-left: 10px;
                font-size: 15px;
            }
        }

        .tip {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            box-sizing: border-box;
            padding-top: 10px;
            color: #A0C4FD;
            font-size: 11px;
            font-weight: 600;

            i {
                font-size: 18px;
            }
        }

        .des {
            width: 100%;
            box-sizing: border-box;
            padding-top: 10px;
            color: #fff;
            text-align: left;
            font-size: 11px;
            font-weight: bold;
        }

        .go-level-box {
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-sizing: border-box;
            padding-top: 10px;
            width: 100%;
            font-size: 11px;
            font-weight: bold;

            i {
                font-size: 16px;
            }

            .level-left {
                color: #A0C4FD;
                display: flex;
                justify-content: flex-start;
                align-items: center;
            }

            .level-right {
                color: #fff;
            }
        }

        .label {
            width: 100%;
            text-align: left;
            font-size: 12px;
            color: #fff;
            font-weight: 600;
            box-sizing: border-box;
            padding: 25px 0 10px 0;
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

                .col3 {
                    width: calc(100% / 3);
                    box-sizing: border-box;
                    padding: 5px 10px;
                    color: #fff;
                    font-size: 11px;
                    font-weight: bold;
                    border-right: 1px solid #fff;
                    word-break: break-all;

                    &:last-child {
                        border-right: 0;
                    }
                }

                .col2 {
                    width: 20%;
                    box-sizing: border-box;
                    padding: 5px 10px;
                    color: #fff;
                    font-size: 11px;
                    font-weight: bold;
                    border-right: 1px solid #fff;
                    word-break: break-all;

                    &:last-child {
                        border-right: 0;
                    }
                }

                .col {
                    width: 25%;
                    box-sizing: border-box;
                    padding: 5px 10px;
                    color: #fff;
                    font-size: 11px;
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