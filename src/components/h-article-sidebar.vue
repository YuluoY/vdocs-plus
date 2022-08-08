<template>
    <div class="h-article-sidebar">
        <div class="sidebar-wrapper" @click="move">
            <div v-for="(n, i) in articleSidebar" :key="i"
                 v-html="n">
            </div>
        </div>
    </div>
</template>

<script>

    import {addClass, deleteClass, isClassname} from "@/utils/dom";

    export default {
        name: "HArticleSidebar",
        data() {
            return {
                titles: [],
                articleSidebar: [],
                activeStep: 0,
                speed: 10,
            }
        },
        methods: {
            move(event) {
                if (event.target.nodeName === 'A') {
                    this.jump(event.target.innerText)
                    this.updateTitleActive(event.target)
                }
            },
            updateTitleActive(node) {
                const TITLEACTIVE = 'title-active';
                if (!this.titles.length) {
                    const sidebar = document.getElementsByClassName('sidebar-wrapper')[0];
                    this.titles = Array.from(sidebar.getElementsByTagName('a'));
                }
                this.titles.forEach(n => isClassname(n, TITLEACTIVE) && deleteClass(n, TITLEACTIVE))
                addClass(node, TITLEACTIVE)
            },
            jump(id) {
                let tar = document.getElementById('anchor-' + id)// 获取需要滚动的距离
                let total = tar.parentNode.offsetTop + 450;
                let currentScrollTop = document.body.scrollTop;
                const upOrDown = total - currentScrollTop;

                const header = window.location.origin // http://localhost/8080
                const path = window.location.hash.substring(1).split('#')[0] // 路由路径
                const anchor = tar.parentNode.id // 锚点名称
                window.location.href = `${header}/#${path}#${anchor}`

                clearInterval(this.timer)
                console.time('h-article-sidebar')
                this.timer = setInterval(_ => {
                    // 减去顶部导航高度，并与当前滚动条位置高度比对
                    if (upOrDown > 0) {
                        if (currentScrollTop >= total) {
                            clearInterval(this.timer);
                            console.timeEnd('h-article-sidebar')
                        }
                        document.body.scrollTo(0, currentScrollTop += 50)
                    } else {
                        if (currentScrollTop <= total) {
                            clearInterval(this.timer);
                            console.timeEnd('h-article-sidebar')
                        }
                        document.body.scrollTo(0, currentScrollTop -= 50)
                    }
                }, this.speed)
            },
        },
        mounted() {
            setTimeout(() => {
                this.articleSidebar = $hUtils.articleSidebar
                this.$forceUpdate()
            })
            this.$nextTick(() => {
                const arr = window.location.href.split('#');
                if (arr.length === 3)
                    this.jump(decodeURI(arr[arr.length - 1]))
            })
        }
    }
</script>

<style scoped lang="scss">
  .h-article-sidebar {
    position: absolute;
    width: 15em;
    top: 20em;
    padding: 10px 10px;
    background-color: rgba(255, 255, 255, 0.5);
    z-index: 999999999;
    max-height: 400px;
    overflow-y: auto;
    right: 1em;
  }

  .h-article-sidebar2 {
    position: fixed !important;
    top: 3em !important;
  }
</style>