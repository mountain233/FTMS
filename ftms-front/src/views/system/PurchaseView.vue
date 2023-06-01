<template>
    <div class="purchase-container">
        <div class="purchase-content">
            <div class="search-bar">
                <el-input
                        v-model="searchValue"
                        placeholder="请输入查询用户名称..."
                        class="search-input"
                        @input="handleSearch"
                />


            </div>

            <el-table
                    :data="purchasesData"
                    class="user-table">
                <el-table-column prop="userName" label="用户"></el-table-column>
                <el-table-column prop="movieName" label="订购影片"></el-table-column>
                <el-table-column prop="quantity" label="订单数量"></el-table-column>
                <el-table-column prop="status" label="订单状态">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">
                            {{ scope.row.status === 1 ? '已支付' : '未支付' }}
                        </el-tag>
                    </template>
                </el-table-column>
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

<!--            &lt;!&ndash; Add purchase Form &ndash;&gt;-->
<!--            <el-dialog title="添加订单" :visible.sync="dialogFormVisible">-->
<!--                <el-form :model="form">-->
<!--                    <el-form-item label="订单用户" prop="name">-->
<!--                        <el-input type="text" v-model="form.name" placeholder="订单用户"></el-input>-->
<!--                    </el-form-item>-->
<!--                    <el-form-item label="订单数量" prop="quantity">-->
<!--                        <el-input type="text" v-model="form.quantity" placeholder="订单数量"></el-input>-->
<!--                    </el-form-item>-->
<!--                    <el-form-item label="订单状态" prop="status">-->
<!--                        <el-radio-group v-model="form.status">-->
<!--                            <el-radio label="已支付"></el-radio>-->
<!--                            <el-radio label="未支付"></el-radio>-->
<!--                        </el-radio-group>-->
<!--                    </el-form-item>-->

<!--                </el-form>-->
<!--                <div slot="footer" class="dialog-footer">-->
<!--                    <el-button @click="dialogFormVisible = false">取 消</el-button>-->
<!--                    <el-button type="primary" @click="handleAddpurchase">确 定</el-button>-->
<!--                </div>-->
<!--            </el-dialog>-->

            <!-- Edit purchase Form -->
            <el-dialog title="编辑订单" :visible.sync="dialogFormVisible2">
                <el-form :model="formEdit">
                    <el-form-item label="影片名称" prop="movieName">
                        <el-input type="text" v-model="formEdit.movieName" placeholder="影片名称"></el-input>
                    </el-form-item>
                    <el-form-item label="订单数量" prop="quantity">
                        <el-input type="text" v-model="formEdit.quantity" placeholder="订单数量"></el-input>
                    </el-form-item>
                    <el-form-item label="订单状态" prop="status">
                        <el-radio-group v-model="formEdit.status">
                            <el-radio label="已支付"></el-radio>
                            <el-radio label="未支付"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                    <el-button type="primary" @click="handleEditpurchase">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
export default {
    name: "purchaseView",
    data() {
        return {
            searchValue: '',
            dialogFormVisible: false,
            dialogFormVisible2: false,
            purchasesData: [],
            pageSize: 8,
            currentPage: 1,
            total: '',
            imageUrl: '',

            // form: {
            //     userName: '', // 名称
            //     movieName: '', // 电影影片
            //     quantity: '', // 订单数量
            //     status: '', // 订单状态
            //     update_time: '', // 更新时间
            // },

            formEdit: {
                userName: '', // 名称
                movieName: '', // 电影影片
                quantity: '', // 订单数量
                status: '', // 订单状态
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
            this.$axios.get('/purchase/page', {params}).then((res) => {
                this.purchasesData = res.data.data.records; // 数据
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
        openAlert(purchaseId) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deletepurchase(purchaseId)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        // 配合警告框删除数据
        deletepurchase(purchaseId) {
            const url = `/purchase/delete/${purchaseId}`;
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
        // handleAddpurchase() {
        //     // TODO 添加新订单
        //     this.form.status = this.form.status === '已支付' ? '1' : '0';
        //     this.$axios.post('/purchase/addpurchase', this.form)
        //         .then(response => {
        //             if (response.data.code === 200) {
        //                 this.$message.success(response.data.data);
        //                 this.dialogFormVisible = false;
        //                 this.init();
        //             } else {
        //                 this.$message.error("添加新用户失败，请稍后重试！");
        //             }
        //         })
        //         .catch(error => {
        //             console.log(error);
        //             this.$message.error('网络错误，请稍后再试');
        //         });
        // },
        handleEditpurchase() {
            this.formEdit.status = this.formEdit.status === '已支付' ? '1' : '0';
            this.$axios.put('/purchase/editpurchase', this.formEdit)
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
.purchase-content {
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

.avatar-uploader .el-upload {
    border: 1px dashed #de0808;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>