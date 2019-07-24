<template>
  <div>
    <!-- index page -->
    <index mykey="test" @test="getmsg"></index>
    <toolbar></toolbar>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import index from '@/sheet/components/index';
import toolbar from '@/sheet/components/toolbar';
import { api } from '../service';

@Component({
  name: 'page-index',
  components: {
    index,
    toolbar
  }
})
export default class Pageindex extends Vue {
  created() {
    const data = api('123');
    console.log(data);
  }

  getmsg(msg: string) {
    console.log(msg + '11111')
  }
}
</script>
<style lang='less' scoped>
@import "../../common/styles/class.less";
</style>
