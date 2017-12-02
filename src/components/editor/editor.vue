<template>
    <div @input='result' id='editor'>
    </div>
</template>

<script>
import WangEditor from 'wangeditor'
export default {
  props: ['content', 'path', 'parms'],
  data () {
    return {
      editor: ''
    }
  },
  mounted () {
    const editor = new WangEditor('#editor')
    editor.customConfig.uploadImgServer = this.path
    editor.customConfig.uploadImgParams = {
      type: this.parms.type,
      id: this.parms.id
    }
    editor.customConfig.zIndex = 100
    editor.customConfig.uploadFileName = 'file'
    // editor.customConfig.printLog = true
    editor.create()
    // 这里axios是异步获取 结果会慢于给content赋值 暂做一个定时器解决
    setTimeout(() => {
      // console.log(this.content)
      editor.txt.html(this.content)
    }, 500)
    this.editor = editor
  },
  methods: {
    result () {
      this.$emit('input', this.editor.txt.html())
    }
  }
}
</script>
<style scoped>
#editor {
    height: 440px;
}
.wangEditor-container {
    border-radius: 2px;
    overflow: hidden;
    border: 1px solid #CCC;
}
.w-e-droplist {
z-index: 10001;
}
</style>
