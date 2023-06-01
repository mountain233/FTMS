<template>
    <div>
        <h1>FTMS 电影售票管理系统</h1>
        <el-form :inline="true" :model="loginForm" :rules="rules" ref="loginForm" class="login-form">
            <img src="../../assets/logo.png" class="img-logo">
            <div class="form-container">
                <el-form-item label="用户名称" prop="username">
                    <el-input v-model="loginForm.username" placeholder="账号"></el-input>
                </el-form-item>
                <el-form-item label="用户密码" prop="password">
                    <el-input type="password" v-model="loginForm.password" placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm">登录账号</el-button>
                    <el-button type="success" @click="registerAccount()">注册账号</el-button>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "LoginView",
    data() {
        return {
            loginForm: {
                username: 'admin',
                password: '123456'
            },
            rules: {
                username: [
                    { required: true, trigger: 'blur', message: '请输入账号名称'}
                ],
                password: [
                    { required: true, trigger: 'blur', message: '请输入账号密码'},
                    { min: 6, message: '密码长度不能小于6位', trigger: 'blur' },
                ]
            }
        }
    },
    methods: {
        submitForm() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    // 表单验证通过，执行提交操作
                    this.$axios.post('/user/login', this.loginForm)
                        .then(response => {
                            // 登录成功
                            if (response.data.code === 200) {
                                // 跳转到首页
                                this.$message.success("登录成功！");
                                localStorage.setItem('userInfo',JSON.stringify(response.data))
                                this.$router.push('/home');
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
        registerAccount() {
            this.$router.push('/register')
        }
    }
}
</script>

<style scoped>
.login-form {
    width: 800px;
    height: 400px;
    margin: 80px auto;
    background-color: white;
    border: 2px solid #dce1f6;
    border-radius: 12px;
    box-shadow: 0 0 25px #5f7267;
    display: flex;
    overflow: hidden;
}

.img-logo {
    width: 60%;
    height: 102%;
}

.form-container {
    margin: auto 50px;
}

h1 {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>