<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
      <el-button @click.stop="on_refresh" size="small">
        <i class="fa fa-refresh"></i>
      </el-button>
    </panel-title>
    <div class="panel-body">
    <div class="search">
      <search @search="submit_search"></search>
    </div>
      <el-table
        :data="order"
        v-loading="load_data"
        element-loading-text="拼命加载中"
        border
        @selection-change="on_batch_select"
        style="width: 100%;">
        <el-table-column type="expand">
      <template scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
        <div v-for="(item, index) in props.row.goods">
        <el-form-item label="">
           {{index+1}}:
          </el-form-item>
          <el-form-item label="商品名称:">
            <span>{{ item.gname }}[{{item.detail}}]</span>
          </el-form-item>
          <el-form-item label="商品单价:">
            <span class="text-orange">￥{{ item.price }}</span>
          </el-form-item>
          <el-form-item label="购买数量:">
            <span>{{ item.num }}</span>
          </el-form-item>
          </div>
        </el-form>
      </template>
    </el-table-column>
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="id"
          label="id"
          width="80"
          sortable>
        </el-table-column>
        <el-table-column
          label="收货人"
          sortable>
           <template scope="scope">
           <el-popover trigger="hover" placement="top">
          <p>收货人: {{ scope.row.address.name }}</p>
          <p>地址: {{ scope.row.address.addr }}</p>
          <p>电话: {{ scope.row.address.phone }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag>{{ scope.row.address.name }}</el-tag>
          </div>
        </el-popover>
        </template>
        </el-table-column>
        <el-table-column
          prop="remarks"
          label="备注"
          width="200"
          show-overflow-tooltip
          sortable>
        </el-table-column>
        <el-table-column
          label="创建时间"
          prop="date"
          sortable>
           <template scope="props">
        <el-icon name="time"></el-icon>
        <span style="margin-left: 10px">{{ props.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="totalMoney"
          label="总金额"
          sortable>
        </el-table-column>
        <el-table-column
          label="是否付款"
          sortable>
          <template scope="props">
          <el-tag type="success"v-show="props.row.status>-1">已付款</el-tag>
          <el-tag type="warning"v-show="props.row.status===-1">未付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          >
          <template scope="props">
            <el-button  size="small"  v-if="props.row.status===-1" :disabled="true">发货</el-button>
            <el-button  size="small"  v-if="props.row.status>=2" :disabled="true">已发货</el-button>
            <el-button type="danger" size="small"  @click="deliver_goods(props.row)" v-if="props.row.status===1">发货</el-button>
          </template>
        </el-table-column>
      </el-table>
      <bottom-tool-bar>
        <el-button
          type="danger"
          icon="delete"
          size="small"
          :disabled="batch_select.length === 0"
          @click="on_batch_del"
          slot="handler">
          <span>批量删除</span>
        </el-button>
        <div slot="page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="length"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </bottom-tool-bar>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {panelTitle, bottomToolBar, search} from '@/components'

  export default{
    data () {
      return {
        order: null,
        // 当前页码
        currentPage: 1,
        // 数据总条目
        total: 0,
        // 每页显示多少条数据
        length: 5,
        // 分类 0为全部
        type: 0,
        type_data: [{
          name: '全部',
          id: 0
        }, {
          id: 1,
          name: '已付款'
        }, {
          id: -1,
          name: '未付款'
        }, {
          id: 2,
          name: '已发货'
        }, {
          id: 2,
          name: '未发货'
        }],
        // 搜索内容
        str: '',
        // 请求时的loading效果
        load_data: true,
        // 批量选择数组
        batch_select: []
      }
    },
    components: {
      panelTitle,
      bottomToolBar,
      search
    },
    created () {
      this.get_table_data()
      this.$store.commit('SET_TYPE', this.type_data)
    },
    watch: {
      goods: {
        handler (newGoods) {
          // console.log(newGoods)
        },
        deep: true
      }
    },
    methods: {
      // 刷新
      on_refresh () {
        this.get_table_data()
      },
      // 获取数据
      get_table_data () {
        this.load_data = true
        this.$fetch.order.get({
          page: this.currentPage,
          length: this.length,
          type: this.type,
          str: this.str
        })
          .then((res) => {
            console.log(res)
            this.order = res.data
            this.currentPage = res.page
            this.total = res.total
            this.load_data = false
          })
          .catch(() => {
            this.load_data = false
          })
      },
      // 发货
      deliver_goods () {},
      // 搜索
      submit_search (value) {
        this.type = value.type ? value.type : 0
        this.str = value.value
        this.get_table_data()
      },
      // 页码选择
      handleCurrentChange (val) {
        this.currentPage = val
        this.get_table_data()
      },
      // 页码长度
      handleSizeChange (val) {
        this.length = val
        this.get_table_data()
      },
      // 批量选择
      on_batch_select (val) {
        this.batch_select = val
      },
      // 批量删除
      on_batch_del () {
        this.$confirm('此操作将批量删除选择数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.load_data = true
            this.$fetch.getPro.del(this.batch_select)
              .then((res) => {
                this.load_data = false
                if (res.status) {
                  this.$message.success(res.msg)
                  this.get_table_data()
                } else {
                  this.$message.error(res.msg)
                }
              })
              .catch(() => {
                this.load_data = false
              })
          })
          .catch(() => {
          })
      }
    }
  }
</script>
