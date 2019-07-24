export default [{
  path: '/excel',
  name: 'excel',
  meta: {
    title: '工作表'
  },
  component: () => import('@/excel/pages/index.vue')
}];
