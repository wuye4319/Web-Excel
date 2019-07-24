import { GetterTree } from 'vuex';
import { GlobalState } from '.';

const getters: GetterTree<GlobalState, GlobalState> = {
  foo(state) {
    return state.foo;
  },
  data(state) {
    return state.data
  },
  buffer(state) {
    return state.buffer
  }
};

export default getters;
