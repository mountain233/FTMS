<template>
    <div class="user-container">
        <div class="user-content">
            <div class="search-bar">
                <el-input
                        v-model="searchValue"
                        placeholder="请输入查询对象的名字..."
                        class="search-input"
                        @input="handleSearch"
                />

                <el-button type="primary" round @click="dialogFormVisible = true">+ 新增用户</el-button>
            </div>

            <el-table
                    :data="userData"
                    class="user-table">
                <el-table-column prop="name" label="员工姓名"></el-table-column>
                <el-table-column prop="username" label="账号名称"></el-table-column>
                <el-table-column prop="phone" label="手机号"></el-table-column>
                <el-table-column prop="status" label="账号状态">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">
                            {{ scope.row.status === 1 ? '正常' : '禁用' }}
                        </el-tag>
                    </template>
                </el-table-column>

                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="openAlert(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="pagination-block">
                <el-pagination
                        background
                        @current-change="handleCurrentChange"
                        :page-size="pageSize"
                        :current-page.sync="currentPage"
                        layout="prev, pager, next, jumper"
                        :total=total>
                </el-pagination>
            </div>
        </div>

        <el-dialog title="添加新用户" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="账号名称" prop="username">
                    <el-input type="text" v-model="form.username" placeholder="账  号"></el-input>
                </el-form-item>
                <el-form-item label="用户姓名" prop="name">
                    <el-input type="text" v-model="form.name" placeholder="姓  名"></el-input>
                </el-form-item>
                <el-form-item label="用户密码" prop="password">
                    <el-input type="password" v-model="form.password" placeholder="密  码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="form.checkPass" placeholder="确认密码"
                              autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" prop="phone">
                    <el-input type="text" v-model="form.phone" placeholder="手机号码"></el-input>
                </el-form-item>
                <el-form-item label="用户性别" prop="sex">
                    <el-radio-group v-model="form.sex">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleAddUser">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="编辑用户信息" :visible.sync="dialogForm2Visible">
            <el-form :model="formEdit">
                <el-form-item label="账号名称" prop="username">
                    <el-input type="text" v-model="formEdit.username" placeholder="账  号"></el-input>
                </el-form-item>
                <el-form-item label="用户姓名" prop="name">
                    <el-input type="text" v-model="formEdit.name" placeholder="姓  名"></el-input>
                </el-form-item>
                <el-form-item label="用户密码" prop="password">
                    <el-input type="password" v-model="formEdit.password" placeholder="密  码"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" prop="phone">
                    <el-input type="text" v-model="formEdit.phone" placeholder="手机号码"></el-input>
                </el-form-item>
                <el-form-item label="帐号状态" prop="status">
                    <el-radio-group v-model="formEdit.status">
                        <el-radio label="正常"></el-radio>
                        <el-radio label="禁用"></el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogForm2Visible = false">取 消</el-button>
                <el-button type="primary" @click="handleChange">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
export default {
    name: "UserView",
    data() {
        return {
            searchValue: '', // 搜索框
            userData: [], // 用户数据
            currentPage: 1, // 当前页码
            pageSize: 6, // 每页数据条数
            total: '', // 总记录数

            dialogFormVisible: false,
            dialogForm2Visible: false,
            form: {
                username: '',
                name: '',
                password: '',
                checkPass: '',
                phone: '',
                sex: '',
                status: ''
            },
            formEdit: {
                username: '',
                name: '',
                password: '',
                phone: '',
                sex: '',
                status: ''
            },
            formLabelWidth: '120px'
        }
    },
    created() {
        this.handleUserData();
    },
    methods: {
        // 解决查询数据问题
        handleSearch() {
            this.currentPage = 1; // 查询操作需要重置页码为1
            this.handleUserData();
        },
        // 初始化数据
        handleUserData() {
            const params = {
                page: this.currentPage,
                pageSize: this.pageSize,
                name: this.searchValue,
            };
            this.$axios.get('/user/page', {params}).then((res) => {
                this.userData = res.data.data.records;
                this.total = res.data.data.total; // 更新总记录数
            }).catch((error) => {
                console.log(error);
                this.$message.error('网络错误，用户数据获取失败！');
            });
        },
        // 页码
        handleCurrentChange(val) {
            this.currentPage = val;
            this.handleUserData();
        },
        // 编辑数据
        handleEdit(row) {
            // TODO: 打开编辑用户弹窗
            // 获取需要编辑的用户数据
            const userInfo = row;
            // 将数据绑定到表单中
            this.formEdit = Object.assign({}, userInfo);
            // 显示表单对话框
            this.dialogForm2Visible = true;
        },
        // 警告框
        openAlert(userId) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteUser(userId)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        // 配合警告框删除数据
        deleteUser(userId) {
            // TODO: 删除指定用户
            const url = `/user/delete/${userId}`;
            this.$axios.delete(url)
                .then(response => {
                    // 删除成功
                    if (response.data.code === 200) {
                        this.$message.success(response.data.data);
                        // TODO: 刷新列表或者做其他操作
                        this.handleUserData();
                    } else {
                        // 删除失败
                        this.$message.error(response.data.message);
                    }
                })
                .catch(error => {
                    console.log(error);
                    this.$message.error('网络错误，请稍后再试');
                });
        },
        // 对话框添加新用户
        handleAddUser() {
            // TODO 添加新用户
            this.$axios.post('/user/register', this.form)
                .then(response => {
                    if (response.data.code === 200) {
                        this.$message.success("添加新用户成功！");
                        this.dialogFormVisible = false;
                        this.handleUserData();
                    } else {
                        this.$message.error("添加新用户失败，请稍后重试！");
                    }
                })
                .catch(error => {
                    console.log(error);
                    this.$message.error('网络错误，请稍后再试');
                });
        },
        //编辑用户信息
        handleChange() {
            this.formEdit.status = this.formEdit.status === '正常' ? 1 : 0;
            this.$axios.put('/user/changeUserInfo',this.formEdit).then(res => {
                console.log(res);
                if (res.data.code === 200) {
                    this.$message.success(res.data.data)
                    this.handleUserData();
                    this.dialogForm2Visible = false;
                } else {
                    this.$message.error(res.data.msg)
                }
            })
                .catch(error => {
                    console.log(error);
                })
        }
    }
}
</script>

<style scoped>
.user-content {
    border: 2px solid #dce1f6;
    box-shadow: 0 0 10px #5f7267;
}

.search-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    padding: 15px;
}

.search-input {
    width: 300px;
    margin-right: 10px;
}

.pagination-block {
    margin-top: 60px;
    margin-left: 35%;
    margin-bottom: 35px;
}

.user-table {
    padding: 12px 3%;
}
</style>