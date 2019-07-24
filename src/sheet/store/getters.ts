import { GetterTree } from 'vuex';
import { DemoState } from './index';
import { GlobalState } from '@/wrapper/store';

const getters: GetterTree<DemoState, GlobalState> = {
  bar(state) {
    return state.testfoo;
  }
};

export default getters;
