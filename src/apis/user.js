import baseApiServer from '@/utils/apiServer'

export const register = new baseApiServer('/custom/user/register')

export const getSMS = new baseApiServer('/common/sms/sendVerifyCode')

export const login = new baseApiServer('/custom/user/login')

export const exit = new baseApiServer('/custom/user/loginout')

export const getUserInfo = new baseApiServer(`/custom/user/getUserInfo?${new Date().getTime()}`)

export const getWallet = new baseApiServer(`/custom/wallet/getBalance?${new Date().getTime()}`)

export const editLoginPwd = new baseApiServer('/custom/user/updatePwd')

export const getBankList = new baseApiServer('/custom/bank/getBankList')

export const addBank = new baseApiServer('/custom/bank/addUserBank')

export const delBank = new baseApiServer('/custom/bank/deleteUserBank')

export const deposit = new baseApiServer('/custom/pay/payInCreate')

export const withdraw = new baseApiServer('/custom/pay/payOutCreate')

export const payConfig = new baseApiServer('/system/pay/configList')

export const getRechargeCount = new baseApiServer('/custom/pay/getRechargeCount')

export const getCoupon = new baseApiServer('/custom/wallet/getCoupon')

export const getVipMutiple = new baseApiServer('/custom/user/getMultiple')

export const getTransficationList = new baseApiServer('/custom/wallet/getMemberRechageAndDraw')

export const receiveBonus = new baseApiServer('/custom/wallet/memberRedPacket')

export const spin = new baseApiServer('/custom/activity/roulette/join')

export const getAgentData = new baseApiServer('/custom/user/userStatistic')

export const getAgentBetList = new baseApiServer('/custom/user/userStatisticBetList')

export const getAgentInviteList = new baseApiServer('/custom/user/userStatisticInviteList')

export const getMailList = new baseApiServer('/common/mail/list')

export const readMail = new baseApiServer('/common/mail/read')

export const delMail = new baseApiServer('/common/mail/userDel')

export const apply_to_agent = new baseApiServer('/custom/user/userApplyAgent')

export const get_apply_progress = new baseApiServer('/custom/user/userApplyAgentStatus')

export const get_random = new baseApiServer('/custom/captcha/getCaptcha')

export const get_withdraw_enable = new baseApiServer('/custom/pay/checkPayOutPermisson')