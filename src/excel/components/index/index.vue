<template>
  <div>
    <div class="table">
      <div
        class="header"
        :style="{left: this.scrleft + 'px'}"
      >header header header header header header header header</div>
      <!-- <div
        class="header"
        :style="{transform: 'translateX('+this.scrleft + 'px)'}"
      >header header header header header header header header</div>-->
      <div class="body" ref="scrollbody">
        <div class="leftside">
          <ul :style="{transform:'translateY(' + this.scrtop + 'px)'}">
            <li v-for="i in leftbox" :key="i">{{i+1}}</li>
          </ul>
        </div>
        <div class="rightside">
          <h-table :bottom="bottom" :top="top" :pageheight="pageheight"></h-table>
        </div>
      </div>
      <div
        class="footer"
        :style="{left: this.scrleft + 'px'}"
      >footer footer footer footer footer footer footer footer</div>
      <!-- <div
        class="footer"
        :style="{transform:'translateX(' + this.scrleft + 'px)'}"
      >footer footer footer footer footer footer footer footer</div>-->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Provide } from "vue-property-decorator";
import table from "../table";

@Component({
  name: "component-index",
  components: {
    HTable: table
  }
})
export default class Componentindex extends Vue {
  leftbox: any = [];

  // transform
  scrtop: number = 0
  scrleft: number = 0
  preTime: number = new Date().valueOf()

  mounted() {
    for (let i = 0; i < 1000; i++) {
      this.leftbox.push(i);
    }

    // DOMMouseScroll
    document.documentElement.addEventListener('mousewheel', (e) => {
      this.scrleft -= e.deltaX
      this.scrtop -= e.deltaY
      if (this.scrleft > 0) {
        this.scrleft = 0
      }
      if (this.scrtop > 0) {
        this.scrtop = 0
      }
      let interVal = new Date().valueOf() - this.preTime
      console.log(interVal)

      if (interVal > 20) {
        this.scroller(this.scrtop)
        this.preTime = new Date().valueOf()
      }
      document.getElementById('scroller').style.transform = 'translate(' + this.scrleft + 'px,' + this.scrtop + 'px)'
    });
  }

  // row 21 * height 30
  rowheight = 30;
  viewheight = 21 * this.rowheight;
  pageheight = 30 * this.rowheight;
  // 缓冲区的距离
  delayheight = 3 * this.rowheight;
  bottom: number = 0;
  top: number = 0;
  scroller(scrolltop) {
    let maxheight = -scrolltop + this.viewheight + this.delayheight;
    let minheight = -scrolltop - this.delayheight;
    this.bottom = Math.floor(maxheight / this.pageheight);
    this.top = Math.ceil(minheight / this.pageheight);
    // console.log('buttom:' + this.bottom);
  }
}
</script>
<style lang='less' scoped>
@import "../../../common/styles/class.less";
.table {
  border: 1px solid #000;
  position: relative;
  top: 41px;
  .header {
    width: 3289px;
    height: 40px;
    border: 1px solid green;
    background-color: green;
    color: #fff;
    position: fixed;
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
      position: fixed;
      left: 0;
      float: left;
      z-index: 8;
      margin-top: 1px;
      ul {
        li {
          height: 29px;
          line-height: 29px;
          border-bottom: 1px solid red;
        }
      }
    }
    .rightside {
      border: 1px solid red;
      margin-left: 31px;
      position: absolute;
      overflow: hidden;
      width: 912px;
      height: 702px;
      > div {
        width: 3215px;
        height: 30001px;
      }
    }
  }
  .footer {
    width: 3289px;
    height: 40px;
    border: 1px solid green;
    position: fixed;
    bottom: 0px;
    background-color: green;
    color: #fff;
    z-index: 11;
  }
}
</style>
