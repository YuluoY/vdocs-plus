<template>
    <div class="latelyCommentWrapper">
        <div class="comment-line-wrapper"
             v-for="(c, i) in comments" :key="'recentlyComment' + i">
            <div class="comment-name" :title="c.name">{{ c.name }}：</div>
            <div class="comment-content text-ellipse" :title="c.content">{{ c.content }}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LatelyCommentWrapper",
        props: {
            start: {type: Number, default: 0},
            num: {type: Number, default: 5},
        },
        data() {
            return {
                comments: []
            }
        },
        methods: {
            init(callback) {
                const params = {
                    start: this.start,
                    num: this.num,
                    sort: {'createdAt': -1}  // 以最新评论排序
                }
                this.$apis.web.getComments(params).then(res => {
                    this.comments = res.data;
                    this.$store.commit('app/setSidebar',
                        {path: 'recentlyCommentArea.comments', target: res.data})
                    typeof callback === 'function' && callback()
                }, err => {
                    console.log('The recently comments component find error !')
                })
            }
        },
        mounted() {
            this.init(() => {
            })
        }
    }
</script>

<style scoped lang='scss'>
  .latelyCommentWrapper {
    display: flex;
    z-index: 99999;
    flex-direction: column;

    .comment-line-wrapper {
      display: flex;
      padding: 5px 10px;

      .comment-content {
        flex: 1;
      }
    }
  }
</style>