import VueRouter from 'vue-router'
import Vue from 'vue'
import LoginView from "@/views/login/LoginView.vue";
import RegisterView from "@/views/login/RegisterView.vue";
import MainView from "@/views/MainView.vue";
import HomeView from "@/views/home/HomeView.vue";
import UserView from "@/views/user/UserView.vue";
import MovieView from "@/views/system/MovieView.vue";
import PurchaseView from "@/views/system/PurchaseView.vue";
import MovieArrangeView from "@/views/manage/MovieArrangeView.vue";
import SeatArrangeView from "@/views/manage/SeatArrangeView.vue";

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: '登录',
        component: LoginView
    },
    {
        path: '/register',
        name: '注册',
        component: RegisterView
    },
    {
        path: '/',
        component: MainView,
        redirect: '/login',
        children: [
            {
                path: 'home',
                name: '系统首页',
                component: HomeView,
            },
            {
                path: 'user',
                name: '用户管理',
                component: UserView
            },
            {
                path: 'movie',
                name: '影片管理',
                component: MovieView
            },
            {
                path: 'purchase',
                name: '订单信息',
                component: PurchaseView
            },
            {
                path: 'movieArrange',
                name: '影片排场',
                component: MovieArrangeView
            },
            {
                path: 'seatArrange',
                name: '座次安排',
                component: SeatArrangeView
            },

        ]
    }
]

const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})

export default router