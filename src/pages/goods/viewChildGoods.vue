<template>
	 <div class="panel">
    <panel-title :title="$route.meta.title">
    	<el-button @click.stop="on_refresh" size="small">
        <i class="fa fa-refresh"></i>
      </el-button>
        <el-button type="primary" icon="plus" size="small" @click="openDialog()">添加数据</el-button>
    </panel-title>
    <div class="panel-body">
    <h3 style="marginBottom:30px;">父商品名称:{{fatherGoods.name}}</h3>
    <el-table
        :data="childGoods"
        v-loading="load_data"
        element-loading-text="拼命加载中"
        border
        @selection-change="on_batch_select"
        style="width: 100%;">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="sid"
          label="sid"
          sortable>
        </el-table-column>
        <el-table-column
          prop="name"
          label="子商品名称"
          show-overflow-tooltip
          sortable>
        </el-table-column>
        <el-table-column
          prop="price"
          label="子商品价格"
          sortable>
        </el-table-column>
        <el-table-column
          label="操作">
          <template scope="props">
              <el-button type="primary" size="small" icon="edit" @click="openDialog(props.row)">修改</el-button>
            <el-button type="danger" size="small" icon="delete" @click="delete_data(props.row)">删除</el-button>
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
      </bottom-tool-bar>
    </div>
    <el-dialog :title="title" :visible.sync="dialog">
  <el-form :model="form">
  <el-form-item label="父商品id:">
      <el-input v-model="form.gid" :disabled="true" auto-complete="off" style="width: 250px;"></el-input>
    </el-form-item>
    <el-form-item label="子商品名称:">
      <el-input v-model="form.name" auto-complete="off" style="width: 250px;"></el-input>
    </el-form-item>
    <el-form-item label="子商品价格:">
              <el-input-number
                placeholder="请输入内容"
                :min="0"
                :value="20"
                :controls="false"
                v-model="form.price"
                style="width: 250px;">
              </el-input-number>
            </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialog = false">取 消</el-button>
    <el-button type="primary" @click="submit">确 定</el-button>
  </div>
</el-dialog>

    </div>
</template>
<script>
import {panelTitle, bottomToolBar} from '@/components'
export default {
  data () {
    return {
      childGoods: [],
      fatherGoods: [],
      form: {
        gid: this.$route.params.gid
      },
      title: '',
      load_data: false,
      dialog: false,
      // 批量选择数组
      batch_select: []
    }
  },
  mounted () {
    this.getChildGoods()
  },
  methods: {
    getChildGoods () {
      this.load_data = true
      this.$fetch.getPro.list({
        id: this.$route.params.gid
      }).then((res) => {
        this.load_data = false
        if (res.status) {
          this.fatherGoods = res.data[0]
          this.childGoods = res.data[0].sub
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 刷新
    on_refresh () {
      this.getChildGoods()
    },
    // 打开对话框
    openDialog (val) {
      this.dialog = true
      if (val) {
        this.form = val
        this.form.gid = this.$route.params.gid
        this.title = '修改子商品'
      } else {
        this.form = {
          gid: this.$route.params.gid
        }
        this.title = '添加子商品'
      }
    },
    // 提交表单
    submit () {
      this.$fetch.getPro.cGoods(this.form)
        .then((res) => {
          if (res.status) {
            this.$message.success(res.msg)
            this.getChildGoods()
            this.dialog = false
          } else {
            this.$message.error(res.msg)
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
        this.$fetch.getPro.sDel(data)
          .then((res) => {
            console.log(res)
            if (res.status) {
              this.getChildGoods()
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
          this.$fetch.getPro.sDel(this.batch_select)
            .then((res) => {
              this.load_data = false
              if (res.status) {
                this.$message.success(res.msg)
                this.getChildGoods()
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
  },
  components: {
    panelTitle,
    bottomToolBar
  }
}
</script>
