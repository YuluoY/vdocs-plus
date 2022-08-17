<template>
    <div class="achieve baseStyle" ref="achieve">
        <div class="backgroundImg baseBackgroundImg" ref="backgroundImg">
            <div class="title">{{ title }}</div>
        </div>
        <div class="content-box">
            <!--            <div class="bar">{{ article.categories }}</div>-->
            <div></div>
            <div class="left">
                <div class="content" v-if="article.content" v-highlightjs v-html="article.content"></div>
            </div>
            <h-article-sidebar></h-article-sidebar>
        </div>
    </div>
</template>

<script>

    import {isEmptyObj} from "@/utils";
    import 'highlight.js/styles/atom-one-dark.css'
    import "@/assets/themes/typora-vue-theme-master/vue.css";
    import HArticleSidebar from "@/components/h-article-sidebar";
    import {deleteClass} from "@/utils/dom";
    import {isClassname} from "@/ui/util/core";

    export default {
        name: "Achieve",
        components: {HArticleSidebar},
        props: {
            title: {type: String, default: ''}
        },
        data() {
            return {
                article: {}
            }
        },
        mounted() {
            if (!isEmptyObj(this.$route.meta)) {
                this.article = {...this.$route.meta['article']}
                this.$refs.backgroundImg.style.backgroundImage = `url(${this.article.imgUrl || require("@/assets/img/1.jpg")})`
                this.$refs.backgroundImg.style.backgroundRepeat = "no-repeat";//设置背景不平铺
                this.$refs.backgroundImg.style.backgroundPosition = "center";//设置背景图的位置
                this.$refs.backgroundImg.style.backgroundSize = "cover";//设置背景图像的尺寸
                this.$apis.web.updateViewNum({_id: this.article._id})
            }
            document.body.addEventListener('scroll', () => {
                if (/achieve/.test(this.$route.path)) {
                    const achieve = document.getElementsByClassName('achieve')[0];

                    const high = parseInt(getComputedStyle(achieve).height) - 460;
                    if (document.body.scrollTop >= high) {
                        const articleSidebar = document.getElementsByClassName('h-article-sidebar')[0];
                        isClassname(articleSidebar, 'h-article-sidebar2') && deleteClass(articleSidebar, 'h-article-sidebar2')
                    }
                }
            })
        },
        beforeDestroy() {
            document.body.removeEventListener('scroll', () => {
            });
        }
    }
</script>

<style scoped lang="scss">
  .achieve {
    background-color: rgba(150, 150, 150, .15);


    .content-box {
      position: relative;
      width: 100%;
      margin: 0 auto;

      .left {
        width: 70%;
        margin-left: 8em;

        .content {
          background-color: white;
          padding: 20px 20px;
          position: relative;
          z-index: 10;
        }
      }
    }
  }
</style>