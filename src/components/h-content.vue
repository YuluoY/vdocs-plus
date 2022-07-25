<template>
    <div class="h-content">
        <div class="h-content-card-wrapper">
            <h-content-card
                    v-for="(n, i) in dataList"
                    :key="i"
                    :id="n.id"
                    :imgUrl="n.imgUrl"
                    :title="n.title"
                    :detail="n.detail"
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
                dataList: new Array(5).fill(
                    {
                        id: 1,
                        imgUrl: require('@/assets/img/hudieren.jpg'),
                        title: '我的考研',
                        detail: '考研是真的煎熬，如果没有坚定的信仰和强大的意志力劝退。考研是真的煎熬，如果没有坚定的信仰和强大的意志力劝退。' +
                            '考研是真的煎熬，如果没有坚定的信仰和强大的意志力劝退。考研是真的煎熬，如果没有坚定的信仰和强大的意志力劝退。' +
                            '考研是真的煎熬，如果没有坚定的信仰和强大的意志力劝退。考研是真的煎熬，如果没有坚定的信仰和强大的意志力劝退。' +
                            '考研是真的煎熬，如果没有坚定的信仰和强大的意志力劝退。考研是真的煎熬，如果没有坚定的信仰和强大的意志力劝退。' +
                            '考研是真的煎熬，如果没有坚定的信仰和强大的意志力劝退。考研是真的煎熬，如果没有坚定的信仰和强大的意志力劝退。' +
                            '考研是真的煎熬，如果没有坚定的信仰和强大的意志力劝退。考研是真的煎熬，如果没有坚定的信仰和强大的意志力劝退。' +
                            '考研是真的煎熬，如果没有坚定的信仰和强大的意志力劝退。考研是真的煎熬，如果没有坚定的信仰和强大的意志力劝退。',
                        // supportNum: 2,  // 点赞数
                        viewNum: 10, // 浏览数量
                        commentNum: 100,
                        categories: ['生活'],
                        author: '雨落'
                    }
                )
            }
        }
    }
</script>

<style scoped>

</style>