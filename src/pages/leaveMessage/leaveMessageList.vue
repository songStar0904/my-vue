<template>
  <div class="panel">
  <panel-title :title="$route.meta.title">
      <el-button @click.stop="on_refresh" size="small">
        <i class="fa fa-refresh"></i>
      </el-button>
    </panel-title>
    <div class="panel-body">
      <my-table
        :data="leaveMsg"
        :col-configs="colConfigs"
        :loading="load_data"
        @selectionChange="on_batch_select"
        style="width: 100%;">
        <el-table-column
          type="selection"
          width="55"
          slot="selection">
        </el-table-column>
        <el-table-column
          prop="id"
          label="id"
          width="80"
          sortable>
        </el-table-column>
        <el-table-column
          prop="name"
          label="留言人"
          sortable>
        </el-table-column>
        <el-table-column
          prop="phone"
          label="留言人电话"
          sortable>
        </el-table-column>
        <el-table-column
          prop="email"
          label="留言人邮箱">
        </el-table-column>
        <el-table-column
          label="留言时间"
          width="150"
          prop="date"
          sortable
          slot="date">
           <template scope="props">
        <el-icon name="time"></el-icon>
        <span style="margin-left: 10px">{{ props.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="content"
          label="留言内容">
        </el-table-column>
        <el-table-column
          label="操作"
          width="180"
          slot="opt">
          <template scope="props">
              <el-button type="primary" size="small" icon="edit">回复</el-button>
            <el-button type="danger" size="small" icon="delete" @click="delete_data(props.row)">删除</el-button>
          </template>
        </el-table-column>
      </my-table>
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
  import {panelTitle, bottomToolBar, myTable} from '@/components'

  export default{
    data () {
      return {
        colConfigs: [{
          slot: 'selection'
        }, {
          prop: 'id',
          label: 'id'
        }, {
          prop: 'name',
          label: '留言人'
        }, {
          prop: 'phone',
          label: '留言人电话'
        }, {
          prop: 'email',
          label: '留言人邮箱'
        }, {
          prop: 'content',
          label: '留言内容'
        }, {
          slot: 'opt'
        }],
        leaveMsg: null,
        // 当前页码
        currentPage: 1,
        // 数据总条目
        total: 0,
        // 每页显示多少条数据
        length: 5,
        // 分类 0为全部
        type: 0,
        // 请求时的loading效果
        load_data: true,
        // 批量选择数组
        batch_select: []
      }
    },
    components: {
      panelTitle,
      bottomToolBar,
      myTable
    },
    created () {
      this.get_table_data()
    },
    methods: {
      // 刷新
      on_refresh () {
        this.get_table_data()
      },
      // 获取数据
      get_table_data () {
        this.load_data = true
        console.log(this.$fetch)
        this.$fetch.leaveMsg.get({
          page: this.currentPage,
          length: this.length,
          type: 0
        })
          .then((res) => {
            console.log(res)
            this.leaveMsg = res.data
            this.currentPage = res.page
            this.total = res.total
            this.load_data = false
          })
          .catch(() => {
            this.load_data = false
          })
      },
      // 修改status
      changeStatus (item) {
        console.log(item)
        // item.status = item.status ? 0 : 1
        this.editGoods(item)
      },
      // 修改spread
      changeSpread (item) {
        // item.spread = item.spread ? 0 : 1
        this.editGoods(item)
      },
      // 修改商品
      editGoods (item) {
        this.$fetch.getPro.edit(item)
          .then((res) => {
            if (res.status) {
              this.$message({
                message: res.msg,
                type: 'success'
              })
            } else {
              this.$message({
                type: 'error',
                message: res.msg
              })
            }
            this.on_submit_loading = false
          })
          .catch(() => {
            this.on_submit_loading = false
          })
      },
      // 单个删除
      delete_data (item) {
        // 后台哥哥硬要我加个数组
        let data = []
        data[0] = item
        this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.load_data = true
            this.$fetch.leaveMsg.del(data)
              .then((res) => {
                console.log(res)
                if (res.status) {
                  this.get_table_data()
                  this.$message.success(res.msg)
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
            this.$fetch.leaveMsg.del(this.batch_select)
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
