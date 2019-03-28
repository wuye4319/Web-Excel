import { GetterTree } from 'vuex';
import { DemoState } from './index';

const getters: GetterTree<DemoState, GlobalState> = {
  bar(state) {
    return state.foo;
  }
};

export default getters;