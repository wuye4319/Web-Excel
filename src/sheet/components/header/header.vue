<template>
  <div>
    header component
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'component-header',
  components: {}
})
export default class Componentheader extends Vue {
  created() {}
}
</script>
<style lang='less' scoped>
@import '../../../common/styles/class.less';

</style>
