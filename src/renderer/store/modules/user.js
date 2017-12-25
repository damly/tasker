const Store = require('electron-store')
const store = new Store()

const user = {
  state: {
    login: '',
    token: '',
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
        console.log('settings', store.get('settings', []))
        resolve()
      })
    },
    // 登出
    Logout ({commit}) {
    },

    SaveSettings ({commit}, settings) {
      commit('SET_SETTINGS', JSON.stringify(settings))
      console.log('save', settings)
      store.set('settings', JSON.stringify(settings))
    },

    GetSettings ({commit}) {
      return new Promise((resolve, reject) => {
        if (store.has('settings')) {
          let settings = store.get('settings', [])
          resolve(settings)
        } else {
          let error = 'has not settings'
          reject(error)
        }
      })
    }
  }
}

export default user
