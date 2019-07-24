import { MutationTree } from 'vuex';
import { GlobalState } from '.';
import { GlobalMutation } from './types';

const mutations: MutationTree<GlobalState> = {
  [GlobalMutation.Example](state, payload) {
    state.foo = payload.value;
  },
  [GlobalMutation.data](state, payload) {
    state.data = Object.assign({}, payload);
  },
  [GlobalMutation.buffer](state, payload) {
    state.buffer = Object.assign({}, payload);
  }
};

export default mutations;
