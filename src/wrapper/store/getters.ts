import { GetterTree } from 'vuex';
import { GlobalState } from './index';

const getters: GetterTree<GlobalState, GlobalState> = {
  bar(state) {
    return state.foo;
  },
};

export default getters;
