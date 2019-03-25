<template>
  <div>
    <hello-world></hello-world>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import HelloWorld from "@/form/components/helloworld";
import { test } from "../service/page";

@Component({
  name: "form-module",
  components: {
    HelloWorld // 怎么设置参数
  }
})
export default class FormModule extends Vue {
  created() {
    let data = test("123");
    console.log(data);
  }
}
</script>
<style lang='less' scoped>
</style>