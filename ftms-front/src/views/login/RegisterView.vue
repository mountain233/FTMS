<template>
    <div class="registerForm-container">
        <h1>影院注册界面</h1>
        <el-form :inline="true" :model="registerForm" :rules="rules" ref="registerForm" class="registerForm">
            <div class="form-container">

                <div class="form-item">
                    <el-form-item label="账号名称" prop="username">
                        <el-input type="text" v-model="registerForm.username" placeholder="账  号"></el-input>
                    </el-form-item>
                </div>

                <div class="form-item">
                    <el-form-item label="用户姓名" prop="name">
                        <el-input type="text" v-model="registerForm.name" placeholder="姓  名"></el-input>
                    </el-form-item>
                </div>

                <div class="form-item">
                    <el-form-item label="用户密码" prop="password">
                        <el-input type="password" v-model="registerForm.password" placeholder="密  码"></el-input>
                    </el-form-item>
                </div>

                <div class="form-item">
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="registerForm.checkPass" placeholder="确认密码" autocomplete="off"></el-input>
                    </el-form-item>
                </div>

                <div class="form-item">
                    <el-form-item label="联系方式" prop="phone">
                        <el-input type="text" v-model="registerForm.phone" placeholder="手机号码"></el-input>
                    </el-form-item>
                </div>

                <div class="form-item">
                    <el-form-item label="用户性别" prop="sex">
                        <el-radio-group v-model="registerForm.sex">
                            <el-radio label="男"></el-radio>
                            <el-radio label="女"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                </div>

                <div>
                    <el-form-item>
                        <el-button type="primary" @click="registerAccount">提交账号</el-button>
                        <el-button type="info" @click="backLogin">返回登录</el-button>
                    </el-form-item>
                </div>
            </div>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "RegisterView",
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else if (value && value.length < 6 && value.length > 18) {
                callback(new Error('密码长度需6-18位'))
            } else {
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.registerForm.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            registerForm: {
                username: '',
                name: '',
                password: '',
                checkPass: '',
                phone: '',
                sex: ''
            },
            rules: {
                username: [
                    {required: true, trigger: 'blur', message: '请输入账号名称'}
                ],
                name: [
                    {required: true, trigger: 'blur', message: '请输入姓名'}
                ],
                password: [
                    {required: true, trigger: 'blur', message: '请输入账号密码'},
                    {min: 6, message: '密码长度不能小于6位', trigger: 'blur'},
                    {validator: validatePass, trigger: 'blur'}
                ],
                checkPass: [
                    {required: true, trigger: 'blur', message: '请再次输入账号密码'},
                    {min: 6, message: '密码长度不能小于6位', trigger: 'blur'},
                    {validator: validatePass2, trigger: 'blur'}
                ],
                phone: [
                    {required: true, trigger: 'blur', message: '请输入手机号'}
                ],
                sex: [
                    {required: true, trigger: 'blur', message: '请填写性别'}
                ]


            }
        }
    },
    methods: {
        registerAccount() {
            delete this.registerForm.checkPass;
            this.registerForm.sex = this.registerForm.sex === '男' ? 1 : 0;
            this.$refs.registerForm.validate(valid => {
                if (valid) {
                    // 表单验证通过，执行提交操作
                    this.$axios.post('/user/register', this.registerForm)
                        .then(response => {
                            // 登录成功
                            if (response.data.code === 200) {
                                // 跳转到首页
                                this.$message.success("注册成功，请登录！");
                                this.$router.push('/login');
                            } else {
                                // 登录失败
                                this.$message.error(response.data.message);
                            }
                        })
                        .catch(error => {
                            console.log(error);
                            this.$message.error('网络错误，请稍后再试');
                        });
                }
            })
        },
        backLogin() {
            this.$router.push('/login');
        }
    }
}
</script>

<style scoped>
.registerForm-container {
    margin: 60px auto;
    padding: 50px;
    width: 350px;
    border: 2px solid #5f7267;
    box-shadow: 0 0 25px #5f7267;
    border-radius: 12px;
}

h1 {
    display: flex;
    justify-content: center;
    align-items: center;
}

.form-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.form-item {
    margin: 2px;
    width: 165px;
}
</style>