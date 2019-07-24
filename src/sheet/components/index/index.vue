<template>
  <div>
    header component
    <div class="table" @scroll="scroller">
      <div class="header">header header header header header header header header</div>
      <div class="body" ref="scrollbody">
        <div class="leftside">
          <ul>
            <li v-for="i in leftbox" :key="i">{{i+1}}</li>
          </ul>
        </div>
        <div class="rightside">
          <h-table :bottom="bottom" :top="top" :pageheight="pageheight"></h-table>
        </div>
      </div>
      <div class="footer">footer footer footer footer footer footer footer footer</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Provide } from "vue-property-decorator";
import table from "@/sheet/components/table";

@Component({
  name: "component-index",
  components: {
    HTable: table
  }
})
export default class Componentindex extends Vue {
  leftbox: any = [];
  mounted() {
    for (let i = 0; i < 1000; i++) {
      this.leftbox.push(i);
    }
  }

  // row 21 * height 30
  rowheight = 30;
  viewheight = 21 * this.rowheight;
  pageheight = 30 * this.rowheight;
  // 缓冲区的距离
  delayheight = 3 * this.rowheight;
  bottom: number = 0;
  top: number = 0;
  scroller(e) {
    let scrolltop = e.target.scrollTop;
    let maxheight = scrolltop + this.viewheight + this.delayheight;
    let minheight = scrolltop - this.delayheight;
    this.bottom = Math.floor(maxheight / this.pageheight);
    this.top = Math.ceil(minheight / this.pageheight);
    console.log(this.bottom);
  }
}
</script>
<style lang='less' scoped>
@import "../../../common/styles/class.less";
.table {
  border: 1px solid #000;
  position: relative;
  width: 100%;
  height: 730px;
  overflow: scroll;
  .header {
    width: 3289px;
    height: 40px;
    border: 1px solid green;
    background-color: green;
    color: #fff;
    position: sticky;
    top: 0px;
    z-index: 11;
  }
  .body {
    .leftside {
      width: 30px;
      height: 100%;
      border: 1px solid blue;
      background-color: blue;
      color: #fff;
      position: sticky;
      left: 0;
      float: left;
      z-index: 8;
      margin-top: 1px;
      ul li {
        height: 29px;
        line-height: 29px;
        border-bottom: 1px solid red;
      }
    }
    .rightside {
      border: 1px solid red;
      margin-left: 32px;
      position: absolute;
      width: 3215px;
      height: 30001px;
    }
    width: 3289px;
    height: 30003px;
  }
  .footer {
    width: 3289px;
    height: 40px;
    border: 1px solid green;
    position: sticky;
    bottom: 0px;
    background-color: green;
    color: #fff;
    z-index: 11;
  }
}
</style>
