<template>
    <div class="movie-container">
        <div class="movie-content">
            <div class="search-bar">
                <el-input
                        v-model="searchValue"
                        placeholder="请输入查询影片名称..."
                        class="search-input"
                        @input="handleSearch"
                />

                <el-button type="success" round @click="dialogFormVisible = true">+ 新增影片</el-button>
            </div>

            <el-table
                    :data="moviesData"
                    class="user-table">
                <el-table-column prop="name" label="影片名称"></el-table-column>
                <el-table-column prop="image" label="图片">
                    <template slot-scope="{ row }">
                        <el-image style="width: auto; height: 40px; border:none;cursor: pointer;"
                                  :src="getImage(row.image)"
                                  :preview-src-list="[ `http://localhost:80/common/download?name=${row.image}` ]" >
                            <div slot="error" class="image-slot">
                                <img src="../../assets/noImg.png" style="width: auto; height: 40px; border:none;" >
                            </div>
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="director" label="导演名称"></el-table-column>
                <el-table-column prop="price" label="价格"></el-table-column>
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
            <el-dialog title="添加影片" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="影片名称" prop="name">
                        <el-input type="text" v-model="form.name" placeholder="影片名称"></el-input>
                    </el-form-item>
                    <el-form-item label="导演名称" prop="director">
                        <el-input type="text" v-model="form.director" placeholder="导演名称"></el-input>
                    </el-form-item>
                    <el-form-item label="价格" prop="price">
                        <el-input type="text" v-model="form.price" placeholder="价格"></el-input>
                    </el-form-item>
                    <el-form-item label="剧情介绍" prop="introduction">
                        <el-input type="textarea" v-model="form.introduction" placeholder="剧情介绍,最长可写200字"></el-input>
                    </el-form-item>

                    <el-form-item label="主要演员" prop="cast">
                        <el-input type="textarea" v-model="form.cast" placeholder="主要演员,最长可写200字"></el-input>
                    </el-form-item>

                    <el-form-item label="影片图片" prop="image">
                        <el-upload
                            class="avatar-uploader"
                            action="http://localhost:80/common/upload"
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
            <el-dialog title="编辑影片" :visible.sync="dialogFormVisible2">
                <el-form :model="formEdit">
                    <el-form-item label="影片名称" prop="name">
                        <el-input type="text" v-model="formEdit.name" placeholder="影片名称"></el-input>
                    </el-form-item>
                    <el-form-item label="导演名称" prop="director">
                        <el-input type="text" v-model="formEdit.director" placeholder="导演名称"></el-input>
                    </el-form-item>
                    <el-form-item label="价格" prop="price">
                        <el-input type="text" v-model="formEdit.price" placeholder="价格"></el-input>
                    </el-form-item>
                    <el-form-item label="剧情介绍" prop="introduction">
                        <el-input type="textarea" v-model="formEdit.introduction" placeholder="剧情介绍,最长可写200字"></el-input>
                    </el-form-item>

                    <el-form-item label="主要演员" prop="cast">
                        <el-input type="textarea" v-model="formEdit.cast" placeholder="主要演员,最长可写200字"></el-input>
                    </el-form-item>

                    <el-form-item label="影片图片" prop="image">
                        <el-upload
                            class="avatar-uploader"
                            action="http://localhost:80/common/upload"
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
            pageSize: 6,
            currentPage: 1,
            total: '',
            imageUrl: '',

            form: {
                name: '', // 名称
                image: '', // 图片
                director: '', // 导演名称
                price: '', // 价格
                update_time: '', // 更新时间
                introduction: '',
                cast: ''
            },

            formEdit: {
                name: '', // 名称
                image: '', // 图片
                director: '', // 导演名称
                price: '', // 价格
                update_time: '', // 更新时间
                introduction: '',
                cast: ''
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
                this.$message.error('网络错误，影片数据获取失败！');
            });
        },
        handleEdit(row) {
            this.dialogFormVisible2 = true;
            this.formEdit = Object.assign({}, row);
        },
        // 警告框
        openAlert(movieId) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteMovie(movieId)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        // 配合警告框删除数据
        deleteMovie(movieId) {
            const url = `/movie/delete/${movieId}`;
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
        handleAddmovie() {
            // TODO 添加新影片
            this.$axios.post('/movie/addmovie', this.form)
                .then(response => {
                    if (response.data.code === 200) {
                        this.$message.success(response.data.data);
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