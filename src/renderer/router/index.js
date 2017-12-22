export default [
  {
    path: '/',
    name: 'MainView',
    redirect: '/setting',
    component: require('@/components/MainView').default,
    children: [
      {path: 'setting', title: {i18n: 'setting'}, name: 'setting', component: require('@/components/SettingView').default},
      {path: 'add', title: {i18n: 'add'}, name: 'add', component: require('@/components/AddFriend').default},
      {path: 'send', title: {i18n: 'send'}, name: 'send', component: require('@/components/SendMessage').default},
      {path: 'help', title: {i18n: 'help'}, name: 'help', component: require('@/components/HelpView').default}
    ]
  },
  {
    path: '/login',
    name: 'LoginView',
    component: require('@/components/LoginView').default
  },
  {
    path: '*',
    redirect: '/'
  }
]
