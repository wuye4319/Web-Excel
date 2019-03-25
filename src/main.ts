import Vue from 'vue';
import Router from 'vue-router';
import App from './wrapper/App.vue';
import routes from './wrapper/router';
import store from './wrapper/store';

Vue.config.productionTip = false;

Vue.use(Router);


const router = new Router({
  routes
});
router.beforeEach((from: any, to: any, next: any) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});
new Vue({
  router,
  store, // 此处考虑模块的动态按需加载
  render: h => h(App),
}).$mount('#app');
