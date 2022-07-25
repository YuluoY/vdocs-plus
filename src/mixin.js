// 设置一级路由背景图及标题
export const useBackgroundImgMixin = {
    data() {
        return {
            title: ''
        }
    },
    mounted() {
        let pageData = this.$route.meta;
        this.title = pageData.chineseLabel;
        this.$refs.backgroundImg.style.backgroundImage = `url(${pageData.imgUrl})`
        this.$refs.backgroundImg.style.backgroundRepeat = "no-repeat";//设置背景不平铺
        this.$refs.backgroundImg.style.backgroundPosition = "center";//设置背景图的位置
        this.$refs.backgroundImg.style.backgroundSize = "cover";//设置背景图像的尺寸
    },
}

// 设置子路由背景图及标题
export const useSubBackgroundImgMixin = {
    data() {
        return {
            title: ''
        }
    },
    watch: {
        $route(to, from) {
            const pageData = to.meta;
            this.title = pageData.chineseLabel;
            this.$refs.backgroundImg.style.backgroundImage = `url(${pageData.imgUrl})`
            this.$refs.backgroundImg.style.backgroundRepeat = "no-repeat";//设置背景不平铺
            this.$refs.backgroundImg.style.backgroundPosition = "center";//设置背景图的位置
            this.$refs.backgroundImg.style.backgroundSize = "cover";//设置背景图像的尺寸
        }
    },
}