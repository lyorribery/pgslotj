import baseApiServer from '@/utils/apiServer'

export const getGameList = new baseApiServer('/custom/game/getSearchGameList')

export const startAWC = new baseApiServer('/third/awc/doLoginAndLaunchGame')

export const checkIsCollection = new baseApiServer('/custom/game/checkHasCollected')

export const collectionGame = new baseApiServer('/custom/game/addGameCollection')

export const cancelCollection = new baseApiServer('/custom/game/removeGameCollection')

export const getCollectionGame = new baseApiServer('/custom/game/getGameCollection')

export const get_home_game_list = new baseApiServer('/custom/game/getIndexGameList')

export const startGS = new baseApiServer('/third/gs/doLoginAndLaunchGame')

export const slot1_play = new baseApiServer('/custom/user/userPlayGame')

