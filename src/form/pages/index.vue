<template>
  <div>
    <hello-world></hello-world>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import HelloWorld from '@/form/components/helloworld';
import { test } from '../service/page';

@Component({
  name: 'form-module',
  components: {
    HelloWorld, // 怎么设置参数
  },
})
export default class FormModule extends Vue {
  foo: string = '';

  created() {
    this.foo = 'test';
  }
}
</script>
<style lang='less' scoped>
</style>
