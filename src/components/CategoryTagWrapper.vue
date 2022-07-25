<template>
    <!-- 类别标签区 -->
    <div class="category-tag-wrapper">
        <!-- 文章标签 -->
        <div class="article-tag">
            <div class="article-tag-title">
                <span>类<br>别<br>标<br>签</span>
            </div>
            <div class="tags">
                <h-tag
                        text="考研随感"
                        :num="3"
                        type="success"
                        is-show-icon
                        radius="plain"
                        :href="'/'">
                </h-tag>
            </div>
        </div>
        <!-- 技术、技能标签 -->
        <div class="skill-tag">
            <div class="skill-tag-title">
                <span>技<br>能<br>标<br>签</span>
            </div>
            <div class="tags">
                <h-tag v-for="(c, i) in categoryTag.skills" :key="i"
                       :text="c.label"
                       type="primary"
                       :title="c.label"
                       icon-type="biaoqian"
                       is-show-icon
                       :href="c.href"></h-tag>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "CategoryTagWrapper",
        computed: mapState({
            categoryTag: state => state.app.main.websiteInfo.categoryTag
        })
    }
</script>

<style scoped lang="scss">
  .h-tag {
    margin-top: 10px;
    margin-left: 10px;
  }
</style>