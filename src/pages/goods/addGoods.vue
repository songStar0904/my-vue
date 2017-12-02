<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body"
         v-loading="load_data"
         element-loading-text="拼命加载中">
      <el-row>
        <el-col :span="20">
          <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="商品名称:" prop="name">
              <el-input v-model="form.name" placeholder="请输入内容" style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="选择分类" prop="type">
    <el-select v-model="form.type" placeholder="请选择分类">
      <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
    </el-select>
  </el-form-item>
            <el-form-item label="价格:">
              <el-input-number
                placeholder="请输入内容"
                :min="1"
                :value="20"
                :controls="false"
                v-model="form.price"
                style="width: 250px;">
              </el-input-number>
            </el-form-item> 
            <el-form-item label="库存:">
             <el-input-number v-model="form.stock"  :min="1" :max="10000"></el-input-number>
            </el-form-item>
            <el-form-item label="创建日期:">
              <el-date-picker
                v-model="form.date"
                type="datetime"
                :editable="false"
                @change="on_change_date"
                placeholder="选择日期"
                style="width: 250px;">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="是否上架:">
              <el-switch
                v-model="form.status"
                on-color="#13ce66"
                off-color="#ff4949"
                :on-value="1"
                :off-value="0">
              </el-switch>
            </el-form-item>
            <el-form-item label="是否推广:">
              <el-switch
                v-model="form.spread"
                on-color="#13ce66"
                off-color="#ff4949"
                :on-value="1"
                :off-value="0">
              </el-switch>
            </el-form-item>
            <el-form-item label="商品图片:">
           <el-upload
  class="upload-demo"
  action="/api/tm/ifile/upload"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :on-success="handleSuccess"
  :file-list="form.img"
  :data="parms"
  :before-upload="beforeAvatarUpload"
  list-type="picture-card">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1MB</div>
</el-upload>
</el-form-item>
<el-form-item label="商品详情">
  <v-editor
        :content="form.detail"
        :path="path"
        :parms="parms2"
        v-model="form.detail"></v-editor>
</el-form-item>
            <el-form-item>
              <el-button type="primary" @click="on_submit_form" :loading="on_submit_loading">立即提交</el-button>
              <el-button @click="$router.back()">取消</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <el-dialog v-model="dialogVisible" size="tiny">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
  </div>
  
</template>
<script type="text/javascript">
  import {panelTitle, vEditor} from '@/components'
  export default{
    data () {
      return {
        form: {
          id: null,
          name: null,
          type: null,
          price: null,
          stock: 1,
          date: null,
          detail: null,
          status: 1,
          spread: 0,
          img: []
        },
        typeList: null,
        parms: {
          id: this.$route.params.id,
          type: 'goods'
        },
        route_id: this.$route.params.id,
        load_data: false,
        on_submit_loading: false,
        rules: {
          name: [{required: true, message: '商品名称不能为空', trigger: 'blur'}],
          date: [{type: 'date', required: true, message: '请选择日期', trigger: 'change'}],
          type: [{type: 'number', required: true, message: '请选择分类', trigger: 'blur'}]
        },
       // 设置初始内容
        content: '',
      // 上传图片地址
        path: '/api/tm/ifile/upload',
        // 参数
        parms2: {
          id: this.$route.params.id,
          type: 'detail'
        },
        dialogImageUrl: '',
        dialogVisible: false
      }
    },
    created () {
      this.getType()
      if (this.route_id) {
        this.get_form_data()
      } else {
        this.new_good()
      }
    },
    methods: {
      //  获取数据
      get_form_data () {
        this.load_data = true
        this.$fetch.getPro.list({
          id: this.route_id
        })
          .then((res) => {
            this.form = res.data[0]
            this.$message(res.msg)
            this.content = this.form.detail
            this.form.type = this.form.type.tid
            this.load_data = false
          })
          .catch(() => {
            this.load_data = false
          })
      },
      // 获得分类
      getType () {
        this.$fetch.getType.list({
        })
          .then((res) => {
            this.typeList = res.data
          })
          .catch(() => {

          })
      },
      new_good () {
        this.$fetch.getPro.add()
          .then((res) => {
            this.form.id = res.id
            this.parms.id = res.id
          })
          .catch(() => {
          })
      },
      //  时间选择改变时
      on_change_date (val) {
        this.$set(this.form, 'date', val)
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
        this.$fetch.upload.del({
          url: file.url,
          id: this.parms.id
        }).then((res) => {
          if (res.status) {
            this.$message.success(res.msg)
            this.form.img = fileList
          } else {
            this.$message.error(res.msg)
          }
        }).catch(() => {
          this.$message.error('访问失败')
        })
      },
      handlePreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      // 上传成功时，添加img数列
      handleSuccess (response, file, fileList) {
        console.log(response, file, fileList)
        let newImg = {
          name: file.name,
          url: response.info.url // file.url
        }
        this.form.img.push(newImg)
      },
      // 设置上传要求
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
        const isLt1M = file.size / 1024 / 1024 < 1

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt1M) {
          this.$message.error('上传头像图片大小不能超过 1MB!')
        }
        return isJPG && isLt1M
      },
      //  提交
      on_submit_form () {
        console.log(this.form)
        this.$refs.form.validate((valid) => {
          if (!valid) return false
          this.on_submit_loading = true
          this.$fetch.getPro.edit(this.form)
          .then((res) => {
            if (res.status) {
              this.$message({
                message: res.msg,
                type: 'success'
              })
              this.$router.push({ path: '/goods/goodsList' })
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
        })
      }
    },
    components: {
      panelTitle,
      vEditor
    }
  }
  
</script>
