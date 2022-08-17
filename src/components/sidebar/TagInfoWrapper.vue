<template>
    <div class="tagInfoWrapper">
        <h-tag
                v-for="(t, i) in tags"
                :key="'tags' + i + t._id"
                :text="t.cateName"
                :num="t.articles.length"
                :title="t.cateName + '：'+t.articles.length"
                is-show-icon
                radius="plain"
                :href="'/'">
        </h-tag>
    </div>
</template>

<script>
    export default {
        name: "tagInfoWrapper",
        data() {
            return {
                tags: []
            }
        },
        methods: {
            a() {
                console.log(1)
            },
            init(callback) {
                const {web} = this.$apis;
                web.getCategories({isArticle: true}).then(({data}) => {
                    this.tags = data;
                    this.$store.commit('app/setSidebar',
                        {path: 'tagInfoArea.tags', target: data})
                    typeof callback === 'function' && callback()
                })
            }
        },
        created() {
        },
        mounted() {
            this.init(() => {
            })
        }
    }
</script>

<style scoped lang="scss">
  .tagInfoWrapper {
    display: flex;
    flex-wrap: wrap;

    & > div {
      margin-left: 10px;
      margin-top: 10px;
    }
  }
</style>