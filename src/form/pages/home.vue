<template>
  <div>
    <home :key="11"></home>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import home from "@/form/components/home";
import { test } from "../service";

@Component({
  name: "form-module",
  components: {
    home // 怎么设置参数
  }
})
export default class FormModule extends Vue {
  created() {
    const data = test("123");
    console.log(data);
  }
}
</script>
<style lang='less' scoped>
</style>
