<template>
    <div class="h-article-sidebar">
        <div class="sidebar-wrapper" @click="move">
            <div class="list">目录</div>
            <div v-for="(n, i) in articleSidebar" :key="i"
                 v-html="n.innerHTML">
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
                speed: 1,
            }
        },
        methods: {
            move(event) {
                if (event.target.nodeName === 'A') {
                    this.jump(event.target.innerText)
                    this.updateTitleActive(event.target.parentNode)
                }
            },
            updateTitleActive(node) {
                const TITLEACTIVE = 'title-active';
                if (!this.titles.length) {
                    const sidebar = document.getElementsByClassName('sidebar-wrapper')[0];
                    this.titles = Array.from(sidebar.getElementsByTagName('div'));
                }
                this.titles.forEach(n => isClassname(n, TITLEACTIVE) && deleteClass(n, TITLEACTIVE))
                addClass(node, TITLEACTIVE)
            },
            jump(id) {
                let tar = document.getElementById('anchor-' + id)// 获取需要滚动的距离

                const header = window.location.origin // http://localhost/8080
                const path = window.location.hash.substring(1).split('#')[0] // 路由路径
                const anchor = tar.parentNode.id // 锚点名称
                window.location.href = `${header}/#${path}#${anchor}`

                clearInterval(this.timer)
                let gap = Math.abs(tar.getBoundingClientRect().bottom) / 255;
                // getBoundingClientRect() 可以找到当前元素位于浏览器视口的绝对定位距离
                tar.getBoundingClientRect().bottom < 0 && (gap = -gap);
                clearInterval(this.timer)
                console.time('文章导航跳转耗时：')
                this.timer = setInterval(_ => {
                    // 减去顶部导航栏高度100
                    let total = tar.getBoundingClientRect().bottom - 100;
                    if ((gap < 0 && total >= 0) || (gap > 0 && total <= 0)) {
                        clearInterval(this.timer)
                        console.timeEnd('文章导航跳转耗时：')
                    }
                    document.body.scrollTo(0, document.body.scrollTop + gap)
                }, this.speed)
            },
        },
        mounted() {
            setTimeout(() => this.articleSidebar = $hUtils.articleSidebar)
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
    z-index: 99;
    max-height: 400px;
    overflow-y: auto;
    right: 1em;
  }

  .h-article-sidebar2 {
    position: fixed !important;
    top: 3em !important;
  }
</style>