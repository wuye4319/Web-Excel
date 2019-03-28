import { Store } from 'vuex';
import actions from './actions';
import mutations from './mutations';
import Form from '@/form/store';
import getters from './getters';

export class GlobalState {
  foo: string = '';
}

export default new Store<GlobalState>({
  modules: {
    Form,
  },
  state: new GlobalState(),
  mutations,
  actions,
  getters,
});
