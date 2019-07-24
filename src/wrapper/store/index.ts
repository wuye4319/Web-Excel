import Vue from 'vue';
import Vuex from 'vuex';
import Form from '@/sheet/store';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

Vue.use(Vuex);

export class GlobalState {
  foo: string = 'wrapperfoo';
  bar: string = 'wrapperbar'
  data: object = {}
  buffer: object = {}
}

export default new Vuex.Store<GlobalState>({
  modules: {
    table: Form,
  },
  state: new GlobalState(),
  mutations,
  actions,
  getters,
});
