<template>
    <div class="userInfoWrapper">
        <div class="img">
            <img :src='model.imgUrl'/>
        </div>
        <div class="name">{{ model.name }}</div>
        <div class="motto" v-html="model.motto"></div>
        <div class="info-wrapper">
            <div class="article">
                <div>{{ $store.getters["app/getArticleNum"] }}</div>
                <div>文章数</div>
            </div>
            <div class="comment">
                <div>{{ $store.getters["app/getCommentNum"] }}</div>
                <div>评论数</div>
            </div>
            <div class="running">
                <div>{{ model.info.running }}</div>
                <div>运行天数</div>
            </div>
        </div>
        <div class="main-wrapper">
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UserInfoWrapper",
        props: {
            model: Object
        },
        methods: {
            init() {
                const {web} = this.$apis;
                web.getArticleNum().then(({data}) => {
                    this.$store.commit('app/setSidebarUserInfo', {article: data});
                })
                web.getCommentNum().then(({data}) => {
                    this.$store.commit('app/setSidebarUserInfo', {comment: data});
                })
            }
        },
        created() {
            this.init();
        }
    }
</script>

<style scoped>

</style>