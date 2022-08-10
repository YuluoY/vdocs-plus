<template>
    <div class="articleUpdate">
        <el-table
                :data="tableData.filter(data => !search || data.cateName.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
            <el-table-column label="Id" prop="_id"></el-table-column>
            <el-table-column label="标题" prop="title"></el-table-column>
            <el-table-column label="作者" prop="author"></el-table-column>
            <el-table-column label="类别" prop="categories">
                <template slot-scope="scope">
                    <el-tag v-for="(t, i) in scope.row.cates" :key="'tag-'+i">
                        {{ t.cateName }}
                    </el-tag>
                </template>
            </el-table-column>
            <!--            <el-table-column label="描述" prop="desc"></el-table-column>-->
            <el-table-column label="发布时间" prop="createdAt">
                <template slot-scope="scope">
                    {{ formatDate(scope.row.createdAt) }}
                </template>
            </el-table-column>
            <el-table-column label="更新时间" prop="updatedAt">
                <template slot-scope="scope">
                    {{ formatDate(scope.row.updatedAt) }}
                </template>
            </el-table-column>
            <el-table-column label="浏览数" prop="viewNum"></el-table-column>
            <el-table-column label="评论数" prop="comments">
                <template slot-scope="scope">
                    {{scope.row.comments.length}}
                </template>
            </el-table-column>
            <el-table-column align="right" width="150px">
                <template slot="header" slot-scope="scope">
                    <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
                </template>
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {useDateFormat} from "@/mixin";

    export default {
        name: "ArticleUpdate",
        mixins: [useDateFormat],
        data() {
            return {
                tableData: [],
                search: '',
            }
        },
        methods: {
            async handleEdit(index, row) {
                this.dialogFormVisible = true;
                localStorage.setItem('h-article-edit', JSON.stringify(row))
                await this.$router.push({
                    path: '/articleWrite',
                    query: {isEditArticle: true}
                })
            },
            async handleDelete(index, row) {
                const res = await this.$apis.admin.delArticle(row._id);
                if (res) {
                    this.$notify.success(`文章"${row.title}"已被删除！`);
                    setTimeout(async () => this.tableData = (await this.$apis.admin.getArticles()).data)
                }
            },
        },
        created() {
            setTimeout(async () => this.tableData = (await this.$apis.admin.getArticles()).data)
        }
    }
</script>

<style scoped>
    ::v-deep .el-table th,
    ::v-deep .el-table td {
        text-align: center !important;
    }
</style>