<template>
    <div class="articleWrite">
        <div>
            <el-form>
                <el-form-item label="标题：" label-width="60px">
                    <el-input type="text" placeholder="请输入标题" v-model="model.title" autofocus></el-input>
                </el-form-item>
                <el-form-item label="作者：" label-width="60px">
                    <el-input type="text" placeholder="请输入作者" v-model="model.author"></el-input>
                </el-form-item>
                <el-form-item label="类别：" label-width="60px">
                    <el-select v-model="model.categories" placeholder="请选择" multiple style="width: 100%;">
                        <el-option
                                v-for="item in categories"
                                :key="item._id"
                                :label="item.cateName"
                                :value="item._id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="描述：" label-width="60px">
                    <el-input type="text" placeholder="请输入描述" v-model="model.desc"></el-input>
                </el-form-item>
                <el-form-item label="上传图片：" label-width="90px">
                    <h-upload :setImgUrl="setImgUrl"></h-upload>
                </el-form-item>
                <el-form-item label="发布时间：" label-width="90px">
                    <el-date-picker
                            v-model="model.releaseDate"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="更新时间：" label-width="90px">
                    <el-date-picker
                            v-model="model.updateDate"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="浏览次数：" label-width="90px">
                    <el-input-number v-model="model.viewsNum" :min="0" label="描述文字"></el-input-number>
                </el-form-item>
                <el-form-item label="评论次数：" label-width="90px">
                    <el-input-number v-model="model.commentNum" :min="0" label="描述文字"></el-input-number>
                </el-form-item>
            </el-form>
            <vue-markdown-editor v-model="str"
                                 @save="handleSave"
                                 @upload-image="handleUploadImage"
                                 :include-level="[1,2,3]"
                                 height="400px"></vue-markdown-editor>
            <div style="text-align: center; margin-top: 2em;">
                <el-button type="primary" plain style="width: 100%" @click="onSubmit">提交文章</el-button>
            </div>
        </div>
    </div>
</template>

<script>

    import VueMarkdownEditor from "@/plugins/VueMarkdownEditor";
    import HUpload from "@/server/component/h-upload";

    export default {
        name: "ArticleWrite",
        components: {
            HUpload,
            VueMarkdownEditor
        },
        data() {
            return {
                str: '',
                model: {
                    categories: [],
                    releaseDate: Date.now(),
                    updateDate: Date.now(),
                    viewsNum: 0,
                    commentNum: 0,
                    imgUrl:''
                },
                categories: []
            }
        },
        methods: {
            setImgUrl(url) {
                this.model.imgUrl = url;
            },
            handleUploadImage(event, insertImage, files) {

            },
            handleSave(text, html) {
                this.model.content = html;
            },
            async onSubmit() {
                if (this.model.content) {
                    const res = await this.$apis.admin.addArticle(this.model);
                    if (res) {
                        this.$message.success(`文章"${this.model.title}"添加成功！`)
                        this.model = {
                            releaseDate: Date.now(),
                            updateDate: Date.now(),
                            viewsNum: 0,
                            commentNum: 0,
                            imgUrl: ''
                        }
                        this.str = '';
                    }
                } else {
                    this.$message.warning('请先保存文章内容后提交！');
                }
            },
            async getAllCategory() {
                const a = await this.$apis.admin.getAllCategory('categories')
                this.categories = a.data;
            }
        },
        created() {
            this.getAllCategory();
        }
    }
</script>

<style scoped lang="scss">
  .el-form {

  }

  .el-form-item {
  }

  .el-input {
  }
</style>