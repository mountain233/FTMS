<template>
    <div class="header-container">
        <div class="l-content">
            <el-row>
                <el-button @click="handleMenu" icon="el-icon-s-fold" size="mini"></el-button>
                <span style="color: #faf5f5; font-size: 15px; padding-left: 40px;">
              欢迎使用本系统：{{ userName }}
            </span>
            </el-row>
            <!--            <div>-->
            <!--                <el-breadcrumb separator-class="el-icon-arrow-right">-->
            <!--                    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>-->
            <!--                    <el-breadcrumb-item :to="{ path: '/user' }">用户管理</el-breadcrumb-item>-->
            <!--                    <el-breadcrumb-item :to="{ path: '/user' }" >系统管理</el-breadcrumb-item>-->
            <!--                    <el-breadcrumb-item :to="{ path: '/user' }">工作管理</el-breadcrumb-item>-->
            <!--&lt;!&ndash;                    <el-breadcrumb-item&ndash;&gt;-->
            <!--&lt;!&ndash;                            v-for="(item, index) in $router.meta.breadcrumb"&ndash;&gt;-->
            <!--&lt;!&ndash;                            :key="index"&ndash;&gt;-->
            <!--&lt;!&ndash;                            :to="item.to"&ndash;&gt;-->
            <!--&lt;!&ndash;                    >&ndash;&gt;-->
            <!--&lt;!&ndash;                    </el-breadcrumb-item>&ndash;&gt;-->
            <!--                </el-breadcrumb>-->
            <!--            </div>-->
        </div>

        <div class="r-content">
            <el-dropdown>
              <span class="el-dropdown-link">
                <img class="user" id="user" src="../assets/user.jpg" alt="账号管理" title="账号管理">
              </span>
                <el-dropdown-menu slot="dropdown">
                    <el-button @click="logout">退出登录</el-button>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
export default {
    name: "CommonHeader",
    data() {
        return {
            userName: ''
        }
    },
    created() {
        this.userInfo();
    },
    computed: {
        // 面包屑路径
        breadcrumb() {
            let path = this.$route.path.split('/')
                .filter(item => item !== '') // 去除空路径
                .map(item => this.$route.matched.find(route => route.path.includes(item)).meta.name) // 获取路由对应的标题
                .join(' / '); // 拼接面包屑
            return path;
        }
    },
    methods: {
        handleMenu() {
            this.$store.commit('collapseMenu')
        },
        async logout() {
            try {
                const response = await this.$axios.post('/user/logout');
                if (response.data.code === 200) {
                    console.log(response.data)
                    this.$message.success(response.data.data);
                    localStorage.removeItem('userInfo');
                    this.$router.push('/login');
                } else {
                    this.$message.error(response.data.message);
                }
            } catch (error) {
                console.log(error);
                this.$message.error('网络错误，请稍后再试！');
            }
        },
        userInfo() {
            // 发送接口请求获取用户姓名
            this.$axios.get('/user/name')
                .then(response => {
                    if (response.data.code === 200) {
                        this.userName = response.data.data;
                    }
                })
                .catch(error => {
                    console.log(error);
                    this.$message.error("网络错误，获取用户名失败！")
                });
        }
    }
}
</script>

<style lang="less" scoped>
.header-container {
  padding: 0 20px;
  background-color: #030331;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 12px #738177;

  .l-content {
    display: flex;
    align-items: center;
    justify-content: center;

    div {
      margin-left: 30px;
      font-size: 20px;
    }
  }

  .r-content {
    .user {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 25px;
      cursor: pointer;
    }

    .user:active {
      transform: scale(0.95);
    }
  }
}

</style>