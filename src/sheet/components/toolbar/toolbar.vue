<template>
  <div>bottom component</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "component-toolbar",
  components: {}
})
export default class Componenttoolbar extends Vue {
  created() {}
}
</script>
<style lang='less' scoped>
@import "../../../common/styles/class.less";
</style>
