<template>
    <div class="h-comment-wrapper"
         :style="`flex-direction: ${isReverse ? 'column-reverse' : 'column'}`">
        <h-comment-area v-if="isReplyState" :isReplyState="isReplyState"></h-comment-area>
        <div class="comment-title" v-if="!isReverse">{{ title }}</div>
        <h-comment-display :comments="$store.getters['comment/getComments']"
                           :isReplyState="isReplyState"
                           :states="states"
                           :idToName="idToName"
                           :onReplyStateChange="onReplyStateChange"></h-comment-display>
        <div class="comment-title" v-if="isReverse">{{ title }}</div>
    </div>
</template>

<script>
    import HCommentDisplay from "@/components/comment/h-comment-display";
    import HCommentArea from "@/components/comment/h-comment-area";


    export default {
        name: "HComment",
        components: {HCommentArea, HCommentDisplay},
        props: {
            isReverse: {type: Boolean, default: false}
        },
        data() {
            return {
                isReplyState: true,
                states: {},
                idToName: {}
            }
        },
        methods: {
            onReplyStateChange(id) {
                const comments = this.$store.getters["comment/getComments"];
                if (id !== 'init') {
                    const state = this.states[id]; // 取出当前回复的状态

                    this.initCommentId(comments) // 初始化所以评论下的状态为false
                    this.$set(this.states, id, !state)
                    this.isReplyState = Object.keys(this.states).every(k => this.states[k] === false);
                } else {
                    this.isReplyState = true;
                    this.initCommentId(comments)
                }
            },
            initCommentId(comments) {
                if (comments === null || comments.length === 0) return;
                comments.forEach(item => {
                    if (item.sub.length > 0) {
                        this.initCommentId(item.sub);
                    }
                    this.idToName[item._id] = item.name;
                    item._id && this.$set(this.states, item._id, false)
                })
            },
            countCommentNum(comments) {
                if (comments === null || comments.length === 0) return;
                let n = 0;
                comments.forEach(item => {
                    item.sub.length > 0 && (n += item.sub.length)
                    n++;
                })
                return n;
            }
        },
        computed: {
            title() {
                const comments = this.$store.getters["comment/getComments"];
                let n = this.countCommentNum(comments) || 0;
                let title = '';
                if (comments.length === 0) {
                    if (this.$route.path !== '/message') {
                        title = '暂无评论'
                    } else {
                        title = '暂无留言'
                    }
                } else {
                    title = '共' + n + '条评论';
                    if (this.$route.path === '/message') title = '共' + n + '条留言';
                }
                return title
            }
        },
        mounted() {
            setTimeout(() => {
                this.initCommentId(this.$store.getters["comment/getComments"])
            }, 200)
        }
    }
</script>

<style scoped>

    .h-comment-wrapper {
        display: flex;
    }

    .comment-title {
        width: 80%;
        margin: 0 auto;
        font-size: 1.8em;
        font-weight: bolder;
        letter-spacing: 5px;
        color: #34495E;
        transition: .7s;
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;
    }

    .comment-title:active {
        transform: rotateX(360deg);
        text-align: right;
        background-color: #409eff;
    }

</style>