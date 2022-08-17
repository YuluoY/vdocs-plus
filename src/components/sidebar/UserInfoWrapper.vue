<template>
    <div class="userInfoWrapper">
        <div class="img">
            <img :src='model.imgUrl'/>
        </div>
        <div class="name">{{ model.name }}</div>
        <div class="motto" v-html="model.motto"></div>
        <div class="info-wrapper">
            <div class="article">
                <div>{{ articleNum }}</div>
                <div>文章数</div>
            </div>
            <div class="comment">
                <div>{{ commentNum }}</div>
                <div>评论数</div>
            </div>
            <div class="running">
                <div>{{ runningNum }}</div>
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
    import {mapState} from "vuex";
    import dayjs from "dayjs";

    export default {
        name: "UserInfoWrapper",
        props: {
            model: Object
        },
        computed: mapState({
            articleNum: state => state.app.sidebar.userInfoArea.info.article,
            commentNum: state => state.app.sidebar.userInfoArea.info.comment,
            runningNum: function (state) {
                const establishDate = state.app.sidebar.websiteInfoArea.info.establish
                return dayjs(Date.now()).diff(new Date(establishDate).getTime(), 'days')
            }
        }),
        methods: {
            init() {
                const {web} = this.$apis;
                web.getArticleNum().then(({data}) => {
                    this.$store.commit('app/setSidebar',
                        {
                            path: 'userInfoArea.info.article',
                            target: data,
                            model: 'replace'
                        });
                })
                web.getCommentNum().then(({data}) => {
                    this.$store.commit('app/setSidebar',
                        {
                            path: 'userInfoArea.info.comment',
                            target: data,
                            model: 'replace'
                        });
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