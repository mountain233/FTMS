<template>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo"
             @open="handleOpen"
             @close="handleClose"
             :collapse="isCollapse"
             background-color="#202123"
             text-color="#fff"
             active-text-color="#409eff">

        <div class="logo">
            <img src="../assets/logo.png" class="logo-img">
            <span><h3>{{ !isCollapse ? '影院管理系统' : '' }}</h3></span>
        </div>

        <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.name" :index="item.name" >
            <i :class="`el-icon-${item.icon}`"></i>
            <span slot="title">{{ item.label }}</span>
        </el-menu-item>

        <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
            <template slot="title">
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title">{{ item.label }}</span>
            </template>
            <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
                <el-menu-item :index="subItem.path" @click="clickMenu(subItem)">
                    <span>{{ subItem.label }}</span>
                </el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>

</template>

<script>
export default {
    name: "CommonAside",
    data() {
        return {
            menuData: [
                {
                    path: '/home',
                    name: 'home',
                    label: '系统首页',
                    icon: 's-home',
                    url: 'Home/Home'
                },
                {
                    path: '/user',
                    name: 'user',
                    label: '用户管理',
                    icon: 'user',
                    url: 'UserManage/UserManage'
                },
                {
                    label: '系统管理',
                    icon: 's-operation',
                    children: [
                        {
                            path: '/movie',
                            name: 'Movie',
                            label: '影片信息管理',
                            icon: 'setting',
                            url: 'Movie/Movie'
                        },
                        {
                            path: '/purchase',
                            name: 'Purchase',
                            label: '订单信息管理',
                            icon: 'setting',
                            url: 'Purchase/Purchase'
                        },
                    ]
                },
                {
                    label: '工作管理',
                    icon: 'monitor',
                    children: [
                        {
                            path: '/movieArrange',
                            name: 'MovieArrange',
                            label: '影片排场管理',
                            icon: 'setting',
                            url: 'MovieArrange/MovieArrange'
                        },
                        {
                            path: '/seatArrange',
                            name: 'SeatArrange',
                            label: '座次安排管理',
                            icon: 'setting',
                            url: 'SeatArrange/SeatArrange'
                        }
                    ]
                }
            ]
        };
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        clickMenu(item) {
            if (this.$route !== item.path && !(this.$route.path === '/home' && item.path === '/')) {
                this.$router.push(item.path);
            }
        }
    },
    computed: {
        noChildren() {
            return this.menuData.filter(item => !item.children);
        },
        hasChildren() {
            return this.menuData.filter(item => item.children);
        },
        isCollapse() {
            return this.$store.state.tab.isCollapse;
        }
    }
}
</script>

<style lang="less" scoped>

.logo {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    img {
        width: 55px;
    }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

h3 {
    color: #409eff;
    text-align: center;
    font-size: 20px;
    line-height: 30px;
}

.el-menu {
    overflow: hidden;
    height: 100vh;
    border-right: none;
}

</style>