import { createStore } from 'vuex'
import common from './modules/common'
import permission from './modules/permission'
import game from './modules/game'

export default createStore({
  modules: {
    common,
    permission,
    game
  }
})


