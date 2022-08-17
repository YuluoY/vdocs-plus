<template>
    <div class="h-content-card border-gradual" :title="title" ref="contentCard">
        <img v-lazy="imgUrl" class="img"/>
        <div class="info-wrapper">
            <div class="left">
                <div class="title">{{ title }}</div>
                <div class="detail">
                    <span class="text-ellipse" v-html="desc" :title="desc"></span>
                </div>
                <div class="extra-Info-wrapper">
                    <div class="date" title="发布日期">
                        <svg-icon icon-class="date"></svg-icon>
                        <span>{{ createdAt | dateFormat }}</span>
                    </div>
                    <div class="author" title="作者">
                        <svg-icon icon-class="author"></svg-icon>
                        <span>{{ author }}</span>
                    </div>
                    <div class="category" title="文章类别">
                        <svg-icon icon-class="category"></svg-icon>
                        <span>{{ categories | categoriesFormat }}</span>
                    </div>
                    <div class="view" title="访问数">
                        <svg-icon icon-class="visit"></svg-icon>
                        <span>{{ viewNum }}</span>
                    </div>
                    <div class="comment" title="评论数">
                        <svg-icon icon-class="comment"></svg-icon>
                        <span>{{ commentNum }}</span>
                    </div>
                    <div class="reading" title="阅读全文">
                        <span @click="onReadArticle(id)">阅读全文</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {formatDate, randomNum} from "@/utils";

    export default {
        name: "HContentCard",
        props: {
            id: {type: String, required: true},
            viewNum: {type: Number, default: 0},
            commentNum: {type: Number, default: 0},

            title: String,
            imgUrl: String,
            content: String,
            createdAt: String,
            desc: String,
            author: String,
            categories: Array,
            onReadArticle: Function
        },
        filters: {
            dateFormat(val) {
                return formatDate(new Date(val).getTime(), 'YYYY年MM月DD日')
            },
            categoriesFormat(val) {
                const cate = []
                val.forEach(v => cate.push(v.cateName))
                return cate.join(',');
            }
        },
        mounted() {
            // randomNum(2) && (this.$refs.contentCard.style.flexDirection = 'row-reverse');
        }
    }
</script>

<style scoped>

</style>