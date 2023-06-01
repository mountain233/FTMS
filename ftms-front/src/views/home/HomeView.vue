<template>
    <div class="carousel-wrapper container">
        <h1 style="color: #f60606; font-size: 38px">热映影片...</h1>
        <el-carousel :interval="2000" type="card" height="50vh" class="movie">
            <el-carousel-item v-for="(item, index) in images" :key="index">
                <img :src="item.image" alt="">
            </el-carousel-item>
        </el-carousel>

        <h1 style="color: #130a0a">电影售票管理系统...</h1>
        <h3 style="font-size: 24px; color: #31353d">A website that can effectively manage the Filming-Tickets...</h3>
    </div>
</template>

<script>
export default {
    name: "HomeView",
    data() {
        return {
            images: [
                {
                    image: require('@/assets/movies/movie_1.png')
                },
                {
                    image: require('@/assets/movies/movie_2.png')
                },
                {
                    image: require('@/assets/movies/movie_3.png')
                },
                {
                    image: require('@/assets/movies/movie_4.png')
                }

            ]
        }
    }
}
</script>


<style lang="less" scoped>

.carousel-wrapper {
  max-width: 800px; /* 设置容器的最大宽度 */
  margin: 0 auto; /* 居中显示容器 */

  .el-carousel__item {
      display: flex;
      justify-content: center;
      align-items: center;
  }
}

.el-carousel {
  height: 100%; /* 设置 Carousel 组件的高度为 100% */
}

</style>