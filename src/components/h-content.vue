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
                    :author="n.author"></h-content-card>
        </div>
    </div>
</template>

<script>
    import HContentCard from "@/components/h-content-card";

    export default {
        name: "h-content",
        components: {HContentCard},
        data() {
            return {
                dataList: []
            }
        },
        created() {
            // 获取所有的文章
            setTimeout(() => this.$store.commit('app/getArticles', this))
        },
        mounted() {
            setTimeout(() => {
                this.dataList = this.$store.getters["app/getArticles"]
                this.dataList.forEach((n, i, arr) => arr[i].createdAt = new Date(n.createdAt).getTime())
                this.$forceUpdate()
            }, 500)
        }
    }
</script>

<style scoped>

</style>