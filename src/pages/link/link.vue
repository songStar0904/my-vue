<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
      <el-button @click.stop="on_refresh" size="small">
        <i class="fa fa-refresh"></i>
      </el-button>
      <router-link :to="{name: 'linkAdd'}" tag="span">
        <el-button type="primary" icon="plus" size="small">添加数据</el-button>
      </router-link>
    </panel-title>
    <div class="panel-body">
      <my-table
        :data="link"
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
          label="链接图片"
          slot="img">
           <template scope="props">
           <img :src="props.row.img" alt="" />
          </template>
        </el-table-column>
        <el-table-column
          label="链接"
          slot="link">
           <template scope="props">
           <a :href="props.row.url">点击浏览(可为空)</a>
          </template>
        </el-table-column>
        <el-table-column
          label="是否发布"
          slot="status">
           <template scope="props">
           <el-switch
            v-model="props.row.status"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeStatus(props.row)">
          </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          slot="opt">
          <template scope="props">
            <router-link :to="{name: 'linkEdit', params: {id: props.row.id}}" tag="span">
              <el-button type="primary" size="small" icon="edit">修改</el-button>
            </router-link>
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
          prop: 'title',
          label: '链接名称'
        }, {
          slot: 'img'
        }, {
          slot: 'link'
        }, {
          slot: 'status'
        }, {
          slot: 'opt'
        }],
        link: null,
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
        this.$fetch.link.get({
          page: this.currentPage,
          length: this.length,
          type: 0
        })
          .then((res) => {
            console.log(res)
            this.link = res.data
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
        this.editlink(item)
      },
      // 修改spread
      changeSpread (item) {
        this.editlink(item)
      },
      // 修改商品
      editlink (item) {
        this.$fetch.link.edit(item)
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
            this.$fetch.link.del(data)
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
            this.$fetch.link.del(this.batch_select)
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
