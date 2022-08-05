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
                                v-for="(item,i) in categories"
                                :key="item._id + `-${i}`"
                                :label="item.cateName"
                                :value="item._id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="描述：" label-width="60px">
                    <el-input type="textarea" placeholder="请输入描述" v-model="model.desc"></el-input>
                </el-form-item>
                <el-form-item label="上传图片：" label-width="90px">
                    <h-upload :setImgUrl="setImgUrl" :img-url="model.imgUrl"></h-upload>
                </el-form-item>
                <el-form-item label="浏览次数：" label-width="90px">
                    <el-input-number v-model="model.viewNum" :min="0" label="描述文字"></el-input-number>
                </el-form-item>
                <el-form-item label="评论次数：" label-width="90px">
                    <el-input-number v-model="model.commentNum" :min="0" label="描述文字"></el-input-number>
                </el-form-item>
            </el-form>
            <vue-markdown-editor v-model="model.content"
                                 @save="handleSave"
                                 @upload-image="handleUploadImage"
                                 :include-level="[1,2,3]"
                                 height="400px"></vue-markdown-editor>
            <div style="text-align: center; margin-top: 2em;">
                <el-button type="primary" plain style="width: 100%" @click="onSubmit">
                    {{ JSON.stringify($route.query) === '{}' ? '添加' : '更新' }}文章
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>

    import VueMarkdownEditor from "@/plugins/VueMarkdownEditor";
    import HUpload from "@/server/component/h-upload";
    import {isEmptyObj} from "@/utils";
    import log from "@/views/Log";

    export default {
        name: "ArticleWrite",
        components: {
            HUpload,
            VueMarkdownEditor
        },
        data() {
            return {
                model: {
                    categories: [],
                    viewNum: 0,
                    commentNum: 0,
                    imgUrl: ''
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
                this.model.content = text;
            },
            async onSubmit() {
                let res = null;
                let operation = '添加'
                if (this.model.content) {
                    if (!isEmptyObj(this.$route.query)) {
                        res = await this.$apis.admin.updateArticle(this.model);
                        operation = '更新'
                    } else {
                        res = await this.$apis.admin.addArticle(this.model);
                    }
                    if (res) {
                        this.$message.success(`文章"${this.model.title}"${operation}成功！`)
                        await this.$router.push('ArticleUpdate')
                        // this.model = {
                        //     viewsNum: 0,
                        //     commentNum: 0,
                        //     imgUrl: ''
                        // }
                    }
                } else {
                    this.$message.warning('请撰写文章后提交！');
                }
            },
            async updateCategory() {

            },
            async getAllCategory() {
                const a = await this.$apis.admin.getAllCategory('categories')
                this.categories = a.data;
            }
        },
        created() {
            this.getAllCategory();
        },
        mounted() {
            if (!isEmptyObj(this.$route.query)) {
                const article = JSON.parse(localStorage.getItem('h-article-edit') || '{}');
                this.model = {...article};
                this.model.categories = []
                article.categories.forEach(item => this.model.categories.push(item._id))
            }
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