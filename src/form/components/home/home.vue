<template>
  <div>
    Hello World! home
    <hello2></hello2>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Hello2 from "../index/hello2.vue";

@Component({
  name: "form-module",
  components: {
    Hello2
  }
})
export default class HelloWorld extends Vue {
  created() {
    // this.$utils
  }
}
</script>
<style lang='less' scoped>
</style>
