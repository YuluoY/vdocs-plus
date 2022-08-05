<template>
    <div class="categoryManage">
        <el-form style="margin-bottom: 70px;">
            <el-form-item label="父类别：" label-width="90px">
                <el-select v-model="model.parent" multiple placeholder="请选择" style="width: 100%">
                    <el-option
                            v-for="item in tableData"
                            :key="'cate'+item._id"
                            :label="item.cateName"
                            :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="类别名称：" label-width="90px">
                <el-input v-model="model.cateName" placeholder="请输入类别" @keydown.enter.native="onSubmit"></el-input>
            </el-form-item>
            <el-button @click="onSubmit" style="width: 100%;">提交</el-button>
        </el-form>

        <el-table
                :data="tableData.filter(data => !search || data.cateName.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
            <el-table-column label="Id" prop="_id"></el-table-column>
            <el-table-column label="类别" prop="cateName"></el-table-column>
            <el-table-column label="父类" prop="parent">
                <template slot-scope="scope" v-if="scope.row.parent.length">
                    <el-tag v-for="(t,i) in scope.row.parent" :key="'tag'+i">{{ t.cateName }}</el-tag>
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
                <el-form-item label="父类：" label-width="120px">
                    <el-select v-model="form.parent"
                               multiple placeholder="请选择" style="width: 100%;">
                        <el-option
                                v-for="(item,i) in tableData"
                                :key="'cate2'+i"
                                :label="item.cateName"
                                :value="item._id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="类别名称：" :label-width="'120px'">
                    <el-input v-model="form.cateName" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="onModifyCategory">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "CategoryManage",
        data() {
            return {
                model: {},
                tableData: [],
                search: '',
                dialogTableVisible: false,
                dialogFormVisible: false,
                form: {
                    _id: '',
                    cateName: '',
                    parent: []
                }
            }
        },
        methods: {
            async onSubmit() {
                console.log(this.model)
                const res = await this.$apis.admin.addCategory(this.model);
                if (res) {
                    this.$notify.success(`"${this.model.cateName}"类别添加成功！`)
                    this.model = {};
                    await this.getAllCategory();
                }
            },
            async onModifyCategory() {
                this.dialogFormVisible = false;
                const res = await this.$apis.admin.updateCategory(this.form);
                if (res) {
                    this.$notify.success(`修改后："${this.form.cateName}"`)
                    await this.getAllCategory();
                }
            },
            async handleEdit(index, row) {
                this.dialogFormVisible = true;
                this.form = {...row};
                this.form.parent = this.form.parent.map(item => item._id)
            },
            async handleDelete(index, row) {
                const res = await this.$apis.admin.delCategory(row);
                if (res) {
                    this.$notify.success(`类别"${row.cateName}"已被删除！`);
                    await this.getAllCategory();
                }
            },
            async getAllCategory() {
                await this.$apis.admin.getAllCategory.call(this, 'tableData')
            }
        },
        created() {
            this.getAllCategory();
        }
    }
</script>

<style scoped>

</style>