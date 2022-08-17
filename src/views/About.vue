<template>
    <div class="about baseStyle">
        <div class="backgroundImg baseBackgroundImg" ref="backgroundImg">
            <div class="title">{{ title }}</div>
        </div>
        <div class="about-box">
            <div class="self">
                <div class="title">关于我</div>
                <div v-highlightjs>
                    <div>问：你是谁？</div>
                    <div>答：我是一名学教育的准大四的学生，是代码个搬砖人。</div>
                    <div>问：你的爱好是什么？</div>
                    <div>答：编程、跑步、乒乓球、动漫（电影、电视剧我也很喜欢，但我很挑）</div>
                    <div>问：你开发这个博客的原因是什么？</div>
                    <div>答：我建立这个博客系统的原因：一、锻炼自己的代码和业务能力。
                        二、记录自己的学习、生活。
                        三、希望自己能养成写博客习惯。</div>
                    <div>问：你认为你是个怎样的人？</div>
                    <div>答：我是应该算是一个理想主义者，矛盾型人格。
                        口是心非，死鸭子嘴硬，刀子嘴豆腐心，表面上怼天怼地怼空气，实则在内心已经开始辩证别人的话。</div>
                    <div>问：你以后的规划是什么？</div>
                    <div>答：以后大概率会去从事程序员工作。我要主修前端，辅以后端，一名合格的全栈是我的目标。</div>
                </div>
            </div>
            <div class="tech-power">
                <div>技术支持</div>
                <div>就说一些可能比较不常见插件吧，许多模块都是我自己实现的，目的还是想提升自己的编程能力。</div>
                <div>前端</div>
                <div>vue2-flip-countdown 0.12.1：考研倒计时模块实现。</div>
                <div>@kangc/v-md-editor 1.7.11：用于后端使用Markdown语法撰写的富文本编辑器插件</div>
                <div>marked 4.0.18：解析Markdown语法</div>
                <div>vue-lazyload 1.3.3：懒加载的实现</div>
                <div>highlight.js 11.5.1：代码高亮样式</div>
                <div>后端</div>
                <div>inflection 1.13.2：请求模块的大小写、单复数的映射</div>
                <div>multer 1.4.5-lts.1：图片上传</div>
                <div>require-all 3.0.0：schema模块的全部导出，这个配合inflection有神奇的效果</div>
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