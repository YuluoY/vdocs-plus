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
                <el-form-item label="浏览数：" label-width="90px">
                    <el-input-number v-model="model.viewNum" :min="0" label="描述文字"></el-input-number>
                </el-form-item>
                <el-form-item label="评论列表：">
                    <el-table
                            height="200"
                            :data="model.comments && model.comments.filter(data => !search || data.content.toLowerCase().includes(search.toLowerCase()))"
                            style="width: 100%">
                        <el-table-column label="_id" prop="_id"></el-table-column>
                        <el-table-column label="头像" prop="imgUrl">
                            <template slot-scope="scope">
                                <el-avatar :src="scope.row.imgUrl" shape="square"></el-avatar>
                            </template>
                        </el-table-column>
                        <el-table-column label="姓名" prop="name"></el-table-column>
                        <el-table-column label="评论内容" prop="content"></el-table-column>
                        <el-table-column label="评论时间" prop="createdAt"></el-table-column>
                        <el-table-column align="right">
                            <template slot="header" slot-scope="scope">
                                <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
                            </template>
                            <template slot-scope="scope">
                                <el-button size="mini"
                                        @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                                <el-button
                                        size="mini"
                                        type="danger"
                                        @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
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
                categories: [],
                search:''
            }
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
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
                this.model.categories.length = 0
                article.cates.forEach(item => this.model.categories.push(item._id))
            }
        }
    }
</script>

<style scoped lang="scss">
</style>