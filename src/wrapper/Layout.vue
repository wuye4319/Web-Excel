<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { State } from 'vuex-class';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Layout extends Vue {
}
</script>

<style lang="less">
@import '../common/styles/class.less';
@import '../common/styles/base.less';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
