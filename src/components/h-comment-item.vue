<template>
    <div class="h-comment-item">
        <div class="comment-display-wrapper">
            <div class="comment-title">{{ title }}</div>
            <div class="comment-item-wrapper">
                <div class="comment-item"
                     v-for="(item, i) in comments" :key="i">
                    <div class="top-info">
                        <img :src="item.imgUrl" alt="头像" class="img"/>
                        <div class="right">
                            <div class="top">
                                <span class="name">{{ item.name }}</span>
                                <span class="system">{{ item.system }}</span>
                                <span class="browser">{{ item.browser }}</span>
                            </div>
                            <div class="releaseDate">{{ item.releaseDate }}</div>
                        </div>
                    </div>
                    <div class="content-wrapper">
                        <div class="main">{{ item.content }}</div>
                        <div class="main-func">
                            <div>回复</div>
                            <div>
                                <span>👍</span>
                                <span>{{ item.like }}</span>
                            </div>
                            <div>
                                <span>👎</span>
                                <span>{{ item.dislike }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HCommentItem",

        computed:{
            title() {
                let title = '';
                if (this.comments.length === 0) {
                    if (this.$route.path !== '/message') {
                        title = '暂无评论'
                    } else {
                        title = '暂无留言'
                    }
                } else {
                    title = '共' + this.comments.length + '条评论';
                    if (this.$route.path === '/message') title = '共' + this.comments.length + '条留言';
                }
                return title
            }
        }
    }
</script>

<style scoped>

</style>