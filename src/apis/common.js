import baseApiServer from '@/utils/apiServer'

export const getBanner = new baseApiServer('/system/banner/list')

export const getHorse = new baseApiServer('/system/horse/list')

export const getPromotionList = new baseApiServer('/system/activity/list')

export const getFirstRechargeConfig = new baseApiServer('/system/activityOption/firstRecharge/list')

export const getSecondRechargeConfig = new baseApiServer('/system/activityOption/secondRecharge/list')

export const getRechargeConfig = new baseApiServer('/system/activityOption/thirdRecharge/list')

export const getVipGrade = new baseApiServer('/system/vipgrade/list')

