<template>
    <div class="about baseStyle">
        <div class="backgroundImg baseBackgroundImg" ref="backgroundImg">
            <div class="title">{{ title }}</div>
        </div>
        <div class="about-box">
            <div class="self">
                <div class="title"><h1>关于我</h1></div>
                <div v-highlightjs>
                    <div>目前我一名准大四学生，非计算机科班生，已投入考研大军中。</div>
                    <div>创建该博客网站意为我以后督促自己写blog，持续进步，永远学习。同时我也会将我所学的技术、思想一一实现在博客上，
                        因为时间紧就只花些许时间在博客搭建和设计上，等考研完后后续会优化和更新，敬请期待😄。</div>
                    <div>
                        联系方式：qq：568055454
                    </div>
                </div>
            </div>
            <div></div>
        </div>

    </div>
</template>

<script>
    import 'highlight.js/styles/atom-one-dark.css'
    import "@/assets/themes/typora-vue-theme-master/vue.css";

    export default {
        name: "About",
        mixins: [require('@/mixin').useBackgroundImgMixin]
    }
</script>

<style scoped>

</style>