<template>
    <div class="commentManage">
        <el-card>
            <el-table
                    lazy
                    height="600"
                    :data="tableData.filter(data => !search || data._id.toLowerCase().includes(search.toLowerCase()))"
                    style="width: 100%">
                <!--                <el-table-column label="id" prop="_id"></el-table-column>-->
                <el-table-column label="头像" prop="imgUrl" width="50">
                    <template slot-scope="scope">
                        <el-avatar :src="scope.row.imgUrl" shape="square"></el-avatar>
                    </template>
                </el-table-column>
                <el-table-column label="姓名" prop="name"></el-table-column>
                <el-table-column label="评论字数" prop="word"></el-table-column>
                <el-table-column label="页面" prop="path"></el-table-column>
                <el-table-column label="地址" prop="address"></el-table-column>
                <el-table-column label="喜欢" prop="like" width="50"></el-table-column>
                <el-table-column label="不喜欢" prop="dislike" width="65"></el-table-column>
                <el-table-column label="评论时间" prop="createdAt" width="120"
                                 :formatter="onDateFormatter"></el-table-column>
                <el-table-column label="子评论">
                    <template slot-scope="scope">
                        <el-button
                                v-if="scope.row.sub.length"
                                @click="onEditSubComment(scope.row)"
                                style="cursor: pointer">二级评论
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column align="right">
                    <template slot="header" slot-scope="scope">
                        <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
                    </template>
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
    import {formatDate} from "@/utils";

    export default {
        name: "CommentManage",
        data() {
            return {
                tableData: [],
                search: ''
            }
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                this.$apis.admin.delCommentById({_id: row._id}).then(res => {
                    if (res) {
                        this.$message.success(`成功删除"${row.name}"的评论`)
                        this.getComments();
                    }
                })
            },
            onEditSubComment(row) {

            },
            onDateFormatter(row, column, cellValue, index) {
                return formatDate(cellValue)
            },
            async getComments() {
                this.tableData = (await this.$apis.admin.getComments()).data;
            }
        },
        created() {
            this.getComments()
        }
    }
</script>

<style scoped>
    ::v-deep .el-table th,
    ::v-deep .el-table td {
        text-align: center !important;
    }
</style>