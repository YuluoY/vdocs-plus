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
            this.$store.commit('app/getContent', this);
        },
        mounted() {
            setTimeout(() => {
                this.dataList = this.$store.getters["app/getArticles"]
                this.$forceUpdate()
            }, 100)
        }
    }
</script>

<style scoped>

</style>