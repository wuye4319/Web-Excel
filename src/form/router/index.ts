export default [{
  path: '/form',
  name: 'form',
  meta: {
    title: '表单'
  },
  component: () => import('@/form/pages/index.vue')
}, {
  path: '/home',
  name: 'home',
  meta: {
    title: '首页'
  },
  component: () => import('@/form/pages/home.vue')
}];
