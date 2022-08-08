<template>
    <div class="h-content">
        <div class="h-content-card-wrapper">
            <h-content-card
                    v-for="(n, i) in dataList"
                    :key="i"
                    :id="n._id"
                    :imgUrl="n.imgUrl || $store.getters['app/getDefaultArticleImg']"
                    :title="n.title"
                    :desc="n.desc"
                    :createdAt="n.createdAt"
                    :content="n.content"
                    :viewNum="n.viewNum"
                    :commentNum="n.commentNum"
                    :categories="n.categories"
                    :author="n.author"
                    :onReadArticle="onAchieve"></h-content-card>
        </div>
    </div>
</template>

<script>
    import HContentCard from "@/components/h-content-card";
    import marked from "@/Marked";

    export default {
        name: "h-content",
        components: {HContentCard},
        data() {
            return {
                dataList: []
            }
        },
        methods: {
            onAchieve(id) {
                const article = this.dataList.filter(item => item._id === id)[0];
                article.content = marked.parse(article.content)
                localStorage.setItem('vdocs-currentArticle', JSON.stringify(article));
                this.$router.push(`/achieve/${article.title}`);
            }
        },
        created() {
            // 获取所有的文章
            setTimeout(() => this.$store.commit('app/setContentArticles', this))
        },
        mounted() {
            setTimeout(() => {
                this.dataList = this.$store.getters["app/getContentArticles"]
                this.dataList.forEach((n, i, arr) => arr[i].createdAt = new Date(n.createdAt).getTime())
                this.$forceUpdate()
            }, 500)
        }
    }
</script>

<style scoped>

</style>