<template>
 <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body" id="panel">
   <el-row  :gutter="50">
  <el-col :span="8" v-for="item in list" :key="item"><div  class="grid-content" :class="item.bg">
    <div class="name">{{item.name}}</div>
    <div class="num">{{item.num}}</div>
  </div></el-col>
</el-row>
    </div>
  </div>
</template>
<script type="text/javascript">
import {panelTitle} from '../index.js'
export default{
  data () {
    return {
      msg: 'home',
      list: [
        {
          'name': '用户数',
          'num': 0,
          'bg': 'bg-blue'
        },
        {
          'name': '商品数',
          'num': 0,
          'bg': 'bg-warning'
        },
        {
          'name': '新闻数',
          'num': 0,
          'bg': 'bg-success'
        },
        {
          'name': '订单数',
          'num': 0,
          'bg': 'bg-danger'
        },
        {
          'name': '留言数',
          'num': 0,
          'bg': 'bg-light-blue'
        },
        {
          'name': '浏览数',
          'num': 0,
          'bg': 'bg-light-black'
        }
      ]
    }
  },
  created: function () {
    this.get()
  },
  methods: {
    init (data) {
      // 用户数
      this.list[0].num = data.user
      // 商品数
      this.list[1].num = data.good
      // 新闻数
      this.list[2].num = data.article
      // 订单数
      this.list[3].num = data.order
      // 留言数
      this.list[4].num = data.board
      // 浏览数
      this.list[5].num = 567
    },
    get () {
      this.$fetch.statistic.get()
        .then((res) => {
          this.init(res.data)
        })
    }
  },
  components: {
    panelTitle
  }
}
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss" scope>
  #panel{
    .grid-content{
      margin:30px 0;
      padding:30px;
    }
    .num{
      margin-top: 10px;
      font-size:25px;
    }
  }
</style>
