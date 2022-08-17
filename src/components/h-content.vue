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
                    :commentNum="n.comments.length"
                    :categories="n.cates"
                    :author="n.author"
                    :onReadArticle="onAchieve"></h-content-card>
        </div>
        <button class="load-more-article" title="更多文章"
                v-show="isLoading > 0"
                @click="onLoading">
            {{ loadMoreArticle }}
        </button>
        <div v-show="isLoading < 0" class="load-more-tips">{{ loadMoreTips }}</div>
        <div v-show="isLoading === 0" class="load-more-tips">落落的裤衩子都让你扒拉干净了😭</div>
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
                dataList: [],
                isLoading: 1,
                params: {
                    start: 0,
                    num: 5,
                },
                loadMoreArticle: 'Loading...',
                loadMoreTips: '落落正在拼命加载中😫...'
            }
        },
        methods: {
            onLoading() {
                const totalArticle = this.$store.getters["app/getArticleNum"];
                this.params.start += this.params.num;
                if (this.params.start > totalArticle) {
                    this.isLoading = 0
                    return;
                }
                this.isLoading = -1
                this.$apis.web.getArticles(this.params).then(res => {
                    if (res) {
                        this.isLoading = 1;
                        this.$store.commit('app/addContentArticles', res.data)
                    }
                })
            },
            onAchieve(id) {
                const article = this.dataList.filter(item => item._id === id)[0];
                article.content = marked.parse(article.content)
                localStorage.setItem('vdocs-currentArticle', JSON.stringify(article));
                this.$router.push(`/achieve/${article.title}`);
            }
        },
        watch:{
            dataList(newVal){
                this.dataList = newVal;
            }
        },
        created() {
            this.$store.commit('app/setContentArticles', [this, this.params])
        },
        mounted() {
            setTimeout(() => {
                this.dataList = this.$store.getters["app/getContentArticles"]
            }, 500)
        }
    }
</script>

<style scoped lang="scss">

</style>