<template>
    <div class="file baseStyle">
        <div class="backgroundImg baseBackgroundImg" ref="backgroundImg">
            <div class="title">{{ title }}</div>
        </div>
        <div class="file-wrapper" v-if="articles.length">
            <h-time-line :data="articles" :jump="onJump"></h-time-line>
        </div>
    </div>
</template>

<script>
    import {useBackgroundImgMixin} from "@/mixin";
    import marked from "@/Marked";
    import {mapState} from "vuex";

    export default {
        name: "File",
        mixins: [useBackgroundImgMixin],
        methods: {
            async onJump(id) {
                const articles = this.articles ||
                    JSON.parse(localStorage.getItem('vdocs-articles') || "{}")
                let article = articles.filter(item => item._id === id)[0];
                if (!article) {
                    article = (await this.$apis.web.getArticleById(id)).data;
                }
                article.content = marked.parse(article.content)
                localStorage.setItem('vdocs-currentArticle', JSON.stringify(article));
                await this.$router.push(`/achieve/${article.title}`);
            }
        },
        computed: mapState({
            articles: state => state.app.pages.filePage.articles
        }),
        created() {
            this.$store.commit('app/setFilePageArticles', this);
        },
    }
</script>

<style scoped>

</style>