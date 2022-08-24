<template>
    <div class="logManage">
        <el-form style="margin-bottom: 70px;">
            <el-form-item label="日志名称：" label-width="90px">
                <el-input v-model="model.title" placeholder="请输入日志"></el-input>
            </el-form-item>
            <el-form-item label="提交地址：" label-width="90px">
                <el-input v-model="model.href" placeholder="请输入提交地址" @keydown.enter.native="onSubmit"></el-input>
            </el-form-item>
            <el-button @click="onSubmit" style="width: 100%;">提交</el-button>
        </el-form>
        <el-table
                :data="tableData.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
            <el-table-column label="Id" prop="_id"></el-table-column>
            <el-table-column label="日志" prop="title"></el-table-column>
            <el-table-column label="链接" prop="href">
                <template slot-scope="scope">
                    <el-link :href="scope.row.href" target="_blank">{{ scope.row.href }}</el-link>
                </template>
            </el-table-column>
            <el-table-column label="发布日期" prop="createdAt" width="120px">
                <template slot-scope="scope">
                    {{ formatDate(scope.row.createdAt) }}
                </template>
            </el-table-column>
            <el-table-column label="更新日期" prop="updatedAt" width="120px">
                <template slot-scope="scope">
                    {{ formatDate(scope.row.updatedAt) }}
                </template>
            </el-table-column>
            <el-table-column align="right">
                <template slot="header" slot-scope="scope">
                    <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
                </template>
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="类别编辑" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="日志：" label-width="90px">
                    <el-input v-model="form.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="链接：" label-width="90px">
                    <el-input v-model="form.href" autocomplete="off"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="onUpdateLog">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {useDateFormat} from "@/mixin";

    export default {
        name: "LogManage",
        mixins: [useDateFormat],
        data() {
            return {
                model: {},
                tableData: [],
                search: '',
                dialogTableVisible: false,
                dialogFormVisible: false,
                form: {
                    _id: '',
                    title: '',
                }
            }
        },
        methods: {
            async onSubmit() {
                const res = await this.$apis.admin.addLog(this.model);
                if (res) {
                    this.$notify.success(`"${this.model.title}"日志添加成功！`)
                    this.model = {};
                    await this.getLogs();
                }
            },
            async onUpdateLog() {
                this.dialogFormVisible = false;
                const res = await this.$apis.admin.updateLog(this.form);
                if (res) {
                    this.$notify.success(`修改后："${this.form.title}"`)
                    await this.getLogs();
                }
            },
            async handleEdit(index, row) {
                this.dialogFormVisible = true;
                this.form = {...row};
            },
            async handleDelete(index, row) {
                const res = await this.$apis.admin.delLog(row);
                if (res) {
                    this.$notify.success(`日志"${row.title}"已被删除！`);
                    await this.getLogs();
                }
            },
            async getLogs() {
                this.tableData = (await this.$apis.admin.getLogs()).data;
            }
        },
        created() {
            this.getLogs()
        }
    }
</script>

<style scoped>
    ::v-deep .el-table th,
    ::v-deep .el-table td {
        text-align: center !important;
    }
</style>