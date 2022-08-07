<template>
    <div class="file baseStyle">
        <div class="backgroundImg baseBackgroundImg" ref="backgroundImg">
            <div class="title">{{ title }}</div>
        </div>
        <div class="file-wrapper" v-if="timeLineData.length">
            <h-time-line :data="timeLineData" :jump="onJump"></h-time-line>
        </div>
    </div>
</template>

<script>
    import {useBackgroundImgMixin} from "@/mixin";
    import marked from "@/Marked";

    export default {
        name: "File",
        mixins: [useBackgroundImgMixin],
        data() {
            return {
                timeLineData: [],
            }
        },
        methods: {
            onJump(id) {
                const articles = this.$store.getters["app/getContentArticles"] ||
                    JSON.parse(localStorage.getItem('vdocs-articles') || "{}")
                const article = articles.filter(item => item._id === id)[0];
                article.content = marked.parse(article.content)
                localStorage.setItem('vdocs-currentArticle', JSON.stringify(article));
                this.$router.push(`/achieve/${article.title}`);
            }
        },
        created() {
            this.$store.commit('app/setArticles', this);
        },
        mounted() {
            setTimeout(() => {
                this.timeLineData = this.$store.getters["app/getArticles"]
                this.$forceUpdate()
            }, 500)
        }
    }
</script>

<style scoped>

</style>