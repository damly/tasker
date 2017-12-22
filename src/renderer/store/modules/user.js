const user = {
  state: {
    login: '',
    token: 'ddddd',
    nickname: '',
    type: 0,
    settings: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NICKNAME: (state, nickname) => {
      state.nickname = nickname
    },
    SET_SETTINGS: (state, settings) => {
      state.settings = settings
    }
  },

  actions: {

    Login ({commit}, data) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '11111111')
        resolve()
      })
    },
    // 登出
    Logout ({commit}) {
    },

    SaveSettings ({commit}, settings) {
      commit('SET_SETTINGS', JSON.stringify(settings))
      console.log('save', settings)
    },

    UserUpdate ({commit}, userInfo) {

    }
  }
}

export default user
