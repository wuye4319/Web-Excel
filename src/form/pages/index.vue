<template>
  <div>
    <hello-world></hello-world>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import HelloWorld from '@/form/components/helloworld';
@Component({
  name: 'form-module',
  components: {
    HelloWorld
  }
})
export default class FormModule extends Vue {
}

</script>
<style lang='less' scoped>
</style>