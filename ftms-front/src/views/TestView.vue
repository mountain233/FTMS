<template>
    <div class="movie-container">
        <div class="movie-content">
            <div class="search-bar">
                <el-input
                    v-model="searchValue"
                    placeholder="请输入查询植物名称..."
                    class="search-input"
                    @input="handleSearch"
                />

                <el-button type="success" round @click="dialogFormVisible = true">+ 新增植物</el-button>
            </div>

            <el-table
                :data="moviesData"
                class="user-table">
                <el-table-column prop="name" label="植物名称"></el-table-column>
                <el-table-column prop="image" label="图片">
                    <template slot-scope="{ row }">
                        <el-image style="width: auto; height: 40px; border:none;cursor: pointer;"
                                  :src="getImage(row.image)"
                                  :preview-src-list="[ `${$baseUrl}/common/download?name=${row.image}` ]" >
                            <div slot="error" class="image-slot">
                                <img src="../../assets/noImg.png" style="width: auto; height: 40px; border:none;" >
                            </div>
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="alias" label="别名"></el-table-column>
                <el-table-column prop="family" label="科属"></el-table-column>
                <el-table-column prop="growthHabit" label="生长习性"></el-table-column>
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

            <!-- Add movie Form -->
            <el-dialog title="添加植物" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="植物名称" prop="name">
                        <el-input type="text" v-model="form.name" placeholder="植物名称"></el-input>
                    </el-form-item>
                    <el-form-item label="别名" prop="alias">
                        <el-input type="text" v-model="form.alias" placeholder="别  名"></el-input>
                    </el-form-item>
                    <el-form-item label="科属" prop="family">
                        <el-input type="text" v-model="form.family" placeholder="科  属"></el-input>
                    </el-form-item>
                    <el-form-item label="生长习性" prop="growthHabit">
                        <el-input type="textarea" v-model="form.growthHabit" placeholder="生长习性,最长可写200字"></el-input>
                    </el-form-item>

                    <el-form-item label="植物介绍" prop="introduction">
                        <el-input type="textarea" v-model="form.introduction" placeholder="植物介绍,最长可写200字"></el-input>
                    </el-form-item>

                    <el-form-item label="植物图片" prop="image">
                        <el-upload
                            class="avatar-uploader"
                            action="${$baseUrl}/common/upload"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :on-change="onChange"
                            ref="upload">

                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleAddmovie">确 定</el-button>
                </div>
            </el-dialog>

            <!-- Edit movie Form -->
            <el-dialog title="添加植物" :visible.sync="dialogFormVisible2">
                <el-form :model="formEdit">
                    <el-form-item label="植物名称" prop="name">
                        <el-input type="text" v-model="formEdit.name" placeholder="植物名称"></el-input>
                    </el-form-item>
                    <el-form-item label="别名" prop="alias">
                        <el-input type="text" v-model="formEdit.alias" placeholder="别  名"></el-input>
                    </el-form-item>
                    <el-form-item label="科属" prop="family">
                        <el-input type="text" v-model="formEdit.family" placeholder="科  属"></el-input>
                    </el-form-item>
                    <el-form-item label="生长习性" prop="growthHabit">
                        <el-input type="textarea" v-model="formEdit.growthHabit" placeholder="生长习性,最长可写200字"></el-input>
                    </el-form-item>

                    <el-form-item label="植物介绍" prop="introduction">
                        <el-input type="textarea" v-model="formEdit.introduction" placeholder="植物介绍,最长可写200字"></el-input>
                    </el-form-item>

                    <el-form-item label="植物图片" prop="image">
                        <el-upload
                            class="avatar-uploader"
                            action="${$baseUrl}/common/upload"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess2"
                            :on-change="onChange"
                            ref="upload">

                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                    <el-button type="primary" @click="handleEditmovie">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
export default {
    name: "movieView",
    data() {
        return {
            searchValue: '',
            dialogFormVisible: false,
            dialogFormVisible2: false,
            moviesData: [],
            pageSize: 5,
            currentPage: 1,
            total: '',
            imageUrl: '',

            form: {
                name: '', // 名称
                image: '', // 图片
                alias: '', // 别名
                family: '', // 科属
                growthHabit: '', // 生长习性
                introduction: '', // 介绍
            },

            formEdit: {
                name: '', // 名称
                image: '', // 图片
                alias: '', // 别名
                family: '', // 科属
                growthHabit: '', // 生长习性
                introduction: '', // 介绍
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
            this.$axios.get('/movie/page', {params}).then((res) => {
                this.moviesData = res.data.data.records; // 数据
                this.total = res.data.data.total; // 更新总记录数
            }).catch((error) => {
                console.log(error);
                this.$message.error('网络错误，植物数据获取失败！');
            });
        },
        handleEdit(row) {
            console.log(row);
            this.dialogFormVisible2 = true;
            const userInfo = row;
            this.formEdit = Object.assign({}, userInfo);
        },
        // 警告框
        openAlert(movieId) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deletemovie(movieId)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        // 配合警告框删除数据
        deletemovie(movieId) {
            // TODO: 删除指定用户
            const url = `/movie/delete/${movieId}`;
            this.$axios.delete(url)
                .then(response => {
                    // 删除成功
                    if (response.data.code === 200) {
                        this.$message.success(response.data.data);
                        // TODO: 刷新列表或者做其他操作
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
        handleAddmovie() {
            // TODO 添加新植物
            this.$axios.post('/movie/addmovie', this.form)
                .then(response => {
                    if (response.data.code === 200) {
                        this.$message.success("添加新植物成功！");
                        this.dialogFormVisible = false;
                        this.init();
                    } else {
                        this.$message.error("添加新用户失败，请稍后重试！");
                    }
                })
                .catch(error => {
                    console.log(error);
                    this.$message.error('网络错误，请稍后再试');
                });
        },
        handleEditmovie() {
            this.$axios.put('/movie/editmovie', this.formEdit)
                .then(response => {
                    if (response.data.code === 200) {
                        this.$message.success(response.data.data);
                        this.dialogFormVisible2 = false;
                        this.init();
                    } else {
                        this.$message.error("添加新用户失败，请稍后重试！");
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
        getImage (image) {
            return `http://localhost:80/common/download?name=${image}`
        },

        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            this.form.image = res.data;
        },
        handleAvatarSuccess2(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            this.formEdit.image = res.data;
        },

        onChange (file) {
            if(file){
                const suffix = file.name.split('.')[1]
                const size = file.size / 1024 / 1024 < 2
                if(['png','jpeg','jpg'].indexOf(suffix) < 0){
                    this.$message.error('上传图片只支持 png、jpeg、jpg 格式！')
                    this.$refs.upload.clearFiles()
                    return false
                }
                if(!size){
                    this.$message.error('上传文件大小不能超过 2MB!')
                    return false
                }
                return file
            }
        },
    }
}
</script>

<style scoped>
.movie-content {
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
    margin-top: 40px;
    margin-left: 32%;
    margin-bottom: 35px;
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