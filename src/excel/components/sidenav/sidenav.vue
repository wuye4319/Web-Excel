<template>
  <div>
    sidenav component
    <input v-model="msg">
    <p>computed msg: {{ computedMsg }}</p>
    <button @click="greet">Greet</button>
    <p>{{$store.state.stateFoo}}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Provide } from 'vue-property-decorator';
import Vuex from 'vuex';
import { create } from 'domain';

import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'

const store = new Vuex.Store({
  state: {
    count: 3
  },
  mutations: {
    increment(state) {
      state.count++
    }
  }
})

@Component({
  name: 'component-sidenav',
  components: {}
})
export default class Componentsidenav extends Vue {
  @Provide() msg: string = 'hello world' // inject
  @Provide() numb: number = 0
  @Prop() mykey!: string
  @State('foo') stateFoo: any
  @State('table') teststatefoo: any
  @Getter('foo') getterFoo: any
  @Action('foo') actionFoo: any
  @Mutation('foo') mutationFoo: any

  mounted() {
    console.log(this.mykey)
    console.log(this.teststatefoo.testfoo)
  }

  get computedMsg(): string {
    return 'computed ' + this.msg + store.state.count + ' ' + this.stateFoo
  }

  greet() {
    alert('greeting: ' + this.msg)
    store.commit('increment')
    this.$emit('test', this.msg)
    this.mutationFoo({ value: 'asdfasdfasdfasdfsdf' })
    this.actionFoo({ value: 'asdfasdfasdfasdfsdf' })
  }
}
</script>
<style lang='less' scoped>
@import "../../../common/styles/class.less";
</style>
