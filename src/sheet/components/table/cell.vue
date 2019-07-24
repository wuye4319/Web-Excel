<template>
  <div class="cell-tr">
    <div class="items-td" v-for="(val,k) in cellValues" :key="k">
      <div v-if="k==='productImg'">
        <img v-for="item in val" :src="item" :key="item">
      </div>
      <div v-else-if="k==='expenseDepart333333'">{{val.name}}</div>
      <div v-else-if="k==='storeKeeper'">
        <img :src="val.avatar">
        <span>{{val.name}}</span>
      </div>
      <div v-else-if="k==='onSaleTime'">{{val.date}}</div>
      <div v-else-if="k==='listFile'">{{val.fileName}}</div>
      <div v-else-if="k==='expenseDetail'" class="select">
        <span v-for="title in val.title" :key="title">{{title}}</span>
      </div>
      <div v-else>{{val}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'c-cell',
  components: {}
})
export default class ComponentCell extends Vue {
  @Prop() data: any
  cellValues: any = {}
  @Prop() index: number

  mounted() {
    this.cellValues = this.data.cellValues
  }
}
</script>
<style lang='less' scoped>
@import "../../../common/styles/class.less";
.cell-tr {
  display: flex;
  height: 30px;
  .items-td {
    height: 30px;
    line-height: 30px;
    width: 200px;
    overflow: hidden;
    word-break: keep-all;
    white-space: nowrap;
    text-overflow: ellipsis;
    vertical-align: middle;
    border-bottom: 1px solid red;
    border-right: 1px solid red;
    img {
      width: 30px;
    }
    .select span {
      background: rgb(94, 219, 241);
    }
  }
}
</style>
