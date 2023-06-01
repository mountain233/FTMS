<template>
    <div class="session-container">
        <div class="session-content">
            <div class="search-bar">
                <el-input
                        v-model="searchValue"
                        placeholder="请输入查询电影名称..."
                        class="search-input"
                        @input="handleSearch"
                />

                <el-button type="success" round @click="dialogFormVisible = true">+ 新增排场</el-button>
            </div>

            <el-table
                    :data="sessionsData"
                    class="user-table">
                <el-table-column prop="movie" label="影片名称"></el-table-column>
                <el-table-column prop="room" label="放映房间号"></el-table-column>
                <el-table-column prop="timeArrange" label="时间安排"></el-table-column>
                <el-table-column prop="updateTime" label="更新时间"></el-table-column>

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

            <!-- Add session Form -->
            <el-dialog title="添加订单" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="电影影片名称" prop="movie">
                        <el-input type="text" v-model="form.movie" placeholder="电影影片名称"></el-input>
                    </el-form-item>
                    <el-form-item label="放映房间号" prop="room">
                        <el-input type="text" v-model="form.room" placeholder="放映房间号"></el-input>
                    </el-form-item>
                    <el-form-item label="时间安排" prop="timeArrange">
                        <el-input type="text" v-model="form.timeArrange" placeholder="时间安排"></el-input>
                    </el-form-item>


                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleAddsession">确 定</el-button>
                </div>
            </el-dialog>

            <!-- Edit session Form -->
            <el-dialog title="编辑订单" :visible.sync="dialogFormVisible2">
                <el-form :model="formEdit">
                    <el-form-item label="电影影片名称" prop="movie">
                        <el-input type="text" v-model="formEdit.movie" placeholder="电影影片名称"></el-input>
                    </el-form-item>
                    <el-form-item label="放映房间号" prop="room">
                        <el-input type="text" v-model="formEdit.room" placeholder="放映房间号"></el-input>
                    </el-form-item>
                    <el-form-item label="时间安排" prop="timeArrange">
                        <el-input type="text" v-model="formEdit.timeArrange" placeholder="时间安排"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                    <el-button type="primary" @click="handleEditsession">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
export default {
    name: "sessionView",
    data() {
        return {
            searchValue: '',
            dialogFormVisible: false,
            dialogFormVisible2: false,
            sessionsData: [],
            pageSize: 6,
            currentPage: 1,
            total: '',
            imageUrl: '',

            form: {
                movie: '', // 电影影片
                room: '', // 播放房间号
                timeArrange: '', // 时间安排
                update_time: '', // 更新时间
            },

            formEdit: {
                movie: '', // 电影影片
                room: '', // 播放房间号
                time_arrange: '', // 时间安排
                update_time: '', // 更新时间
            }
        }
    },
    created() {
        this.init();
    },
    methods: {
        // 解决查询数据问题
        handleSearch() {
            this.currentPage = 1; // 查询操作需要重置页码为1
            this.init();
        },
        // 页面数据初始化
        init() {
            const params = {
                page: this.currentPage,
                pageSize: this.pageSize,
                name: this.searchValue,
            };
            this.$axios.get('/session/page', {params}).then((res) => {
                this.sessionsData = res.data.data.records; // 数据
                this.total = res.data.data.total; // 更新总记录数
            }).catch((error) => {
                console.log(error);
                this.$message.error('网络错误，订单数据获取失败！');
            });
        },
        handleEdit(row) {
            this.dialogFormVisible2 = true;
            this.formEdit = Object.assign({}, row);
        },
        // 警告框
        openAlert(sessionId) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deletesession(sessionId)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        // 配合警告框删除数据
        deletesession(sessionId) {
            const url = `/session/delete/${sessionId}`;
            this.$axios.delete(url)
                .then(response => {
                    // 删除成功
                    if (response.data.code === 200) {
                        this.$message.success(response.data.data);
                        this.init();
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
        handleAddsession() {
            // TODO 添加新订单
            this.$axios.post('/session/addsession', this.form)
                .then(response => {
                    if (response.data.code === 200) {
                        this.$message.success(response.data.data);
                        this.dialogFormVisible = false;
                        this.init();
                    } else {
                        this.$message.error("添加新场次失败，请稍后重试！");
                    }
                })
                .catch(error => {
                    console.log(error);
                    this.$message.error('网络错误，请稍后再试');
                });
        },
        handleEditsession() {
            this.$axios.put('/session/editsession', this.formEdit)
                .then(response => {
                    if (response.data.code === 200) {
                        this.$message.success(response.data.data);
                        this.dialogFormVisible2 = false;
                        this.init();
                    } else {
                        this.$message.error("订单信息修改失败，请稍后重试！");
                    }
                })
                .catch(error => {
                    console.log(error);
                    this.$message.error('网络错误，请稍后再试');
                });
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.init();
        },

    }
}
</script>

<style scoped>
.session-content {
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
    margin-top: 20px;
    margin-left: 32%;
    margin-bottom: 8px;
}

.user-table {
    padding: 12px;
}
</style>