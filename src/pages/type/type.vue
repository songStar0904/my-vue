<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
      <el-button @click.stop="on_refresh" size="small">
        <i class="fa fa-refresh"></i>
      </el-button>
        <el-button type="primary" icon="plus" size="small" @click="openType()">添加数据</el-button>
    </panel-title>
    <div class="panel-body">
      <my-table
        :data="type"
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
          label="操作"
          slot="opt">
          <template scope="props">
              <el-button type="primary" size="small" icon="edit" @click="openType(props.row)">修改</el-button>
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
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            :current-page="currentPage"
            :page-size="length"
            :page-sizes="[5, 10, 15, 20]"
            layout="total, sizes, prev, pager, next"
            :total="total">
          </el-pagination>
        </div>
      </bottom-tool-bar>
    </div>
   <el-dialog :title="dialogTitle" size="tiny" :visible.sync="dialogFormVisible">
  <el-form :model="form" :rules="rules" ref="ruleForm">
    <el-form-item label="分类名称" prop="name">
      <el-input v-model="form.name" auto-complete="off"></el-input>
    </el-form-item>
  
  <el-form-item>
    <el-col :span="4" :offset="6">
    <el-button type="primary" @click="editType('ruleForm')">确 定</el-button>
    </el-col>
    <el-col :span="4" :offset="4">
     <el-button  @click="dialogFormVisible = false">取 消</el-button>
    </el-col>
  </el-form-item>
  </el-form>
</el-dialog>
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
          label: '分类名称'
        }, {
          slot: 'opt'
        }],
        type: [],
        // 当前页码
        currentPage: 1,
        // 数据总条目
        total: 0,
        // 每页显示多少条数据
        length: 5,
        // 请求时的loading效果
        load_data: true,
        // 批量选择数组
        batch_select: [],
        dialogFormVisible: false,
        dialogTitle: '',
        form: {},
        rules: {
          name: [
            { required: true, message: '请输入分类名称', trigger: 'change' },
            { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'change' }
          ]
        }
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
    watch: {
      type: {
        handler (newtype) {
          console.log(newtype)
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
        console.log(this.$fetch)
        this.$fetch.getType.list({
          page: this.currentPage,
          length: this.length
        })
          .then((res) => {
            console.log(res)
            this.type = res.data
            // this.currentPage = res.page
            this.total = res.total
            this.load_data = false
          })
          .catch(() => {
            this.load_data = false
          })
      },
      // 修改增加type
      openType (item) {
        console.log(item)
        if (item) {
          this.dialogTitle = '修改分类'
          this.form = item
        } else {
          this.form = {}
          this.dialogTitle = '添加分类'
        }
        this.dialogFormVisible = true
      },
      // 添加修改Type
      editType (item) {
        this.$refs[item].validate((valid) => {
          if (valid) {
            this.dialogFormVisible = false
            this.$fetch.getType.edit(this.form)
            .then((res) => {
              if (res.status) {
                this.get_table_data()
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
          } else {
            console.log('error submit!!')
            return false
          }
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
            this.$fetch.getType.del(data)
              .then((res) => {
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
      // 批量选择
      on_batch_select (val) {
        this.batch_select = val
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
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
            this.$fetch.getType.del(this.batch_select)
              .then((res) => {
                if (res.status) {
                  this.$message.success(res.msg)
                } else {
                  this.$message.error(res.msg)
                }
                this.get_table_data()
              })
              .catch(() => {
              })
          })
          .catch(() => {
          })
      }
    }
  }
</script>
