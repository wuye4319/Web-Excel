<template>
  <div>
    <div class="cell" :style="{top:celltop+'px'}">
      <div v-for="(r,i) in data.rows" :key="'tr'+i">
        <div class="cols">
          <h-cell :data="r" :index="i"></h-cell>
        </div>
      </div>
    </div>
    <div class="buffer" :style="{top:buffertop+'px'}" v-if="buffer">
      <div v-for="(r,i) in buffer.rows" :key="'tr'+i">
        <div class="cols">
          <h-cell :data="r" :index="i"></h-cell>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { getUserInfo } from "../../service";
import cell from "./cell.vue";
import { State, Getter, Action } from "vuex-class";

@Component({
  name: "c-table",
  components: {
    HCell: cell
  }
})
export default class ComponenTtable extends Vue {
  @Prop() bottom: number;
  @Prop() top;
  @Prop() pageheight;

  currbottom: number = 0;
  currtop: number = 0;
  celltop: number = 0;
  buffertop: number = 0;

  @Getter("data") data: any;
  @Getter("buffer") buffer: any;
  currbuffer: number = 0;
  currdata: number = 0;

  datastroe: any = [];

  mounted() {
    this.setpagedata(this.bottom);
  }

  async getdatabypage(page) {
    if (this.datastroe[page]) {
      return this.datastroe[page];
    } else {
      let result = await getUserInfo(page, 30);
      if (result) {
        this.datastroe.push(result);
      }
      return result;
    }
  }

  // creater ：Gaia
  creator() { }

  // Destroyer ：Hades
  Destroyer() { }

  // 改变容器1
  @Action("setdata") setdata;
  async setpagedata(val) {
    // console.log("datapage:" + val);
    this.setdata(null);
    let data = await this.getdatabypage(val);
    this.setdata(data);
  }

  // 容器2
  @Action("setbuffer") setbuffer;
  async setpagebuffer(val) {
    if (this.currbuffer !== val) {
      // console.log("buffer:" + val);
      this.setbuffer(null);
      let data = await this.getdatabypage(val);
      this.setbuffer(data);
      this.currbuffer = val;
    }
  }

  @Watch("bottom")
  bottomHandler(val) {
    if (this.currbottom < this.bottom) {
      if (val % 2 === 0) {
        this.setpagedata(val);
        this.celltop = val * this.pageheight;
      } else {
        this.setpagebuffer(val);
        this.buffertop = val * this.pageheight;
      }
    } else {
      // console.log("bottom-up");
    }
    this.currbottom = this.bottom;
  }

  @Watch("top")
  topHandler(val) {
    if (this.currtop < this.top) {
      // console.log("top-down");
    } else if (this.top > 0) {
      if (val % 2 === 0) {
        val -= 1;
        this.setpagebuffer(val);
        this.buffertop = val * this.pageheight;
      } else {
        val -= 1;
        this.setpagedata(val);
        this.celltop = val * this.pageheight;
      }
    }
    this.currtop = this.top;
  }
}
</script>
<style lang='less' scoped>
@import "../../../common/styles/class.less";
.cell,
.buffer {
  position: absolute;
}
</style>
