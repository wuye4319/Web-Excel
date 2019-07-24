import { ActionTree } from 'vuex';
import { GlobalState } from '.';
import { GlobalMutation } from './types';

const actions: ActionTree<GlobalState, GlobalState> = {
  foo(state, data) {
    console.log(state, data)
  },
  setdata(state, data) {
    state.commit(GlobalMutation.data, data)
  },
  setbuffer(state, data) {
    state.commit(GlobalMutation.buffer, data)
  }
};

export default actions;
