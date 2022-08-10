<template>
    <div class="h-backToTop" v-show="isShow">
        <svg-icon
                :icon-class="this.iconClass"
                :class-name="this.className"
                @click="onToTop"></svg-icon>
    </div>
</template>

<script>
    import {getBrowserType} from "../../../util/env";

    export default {
        name: "hBackToTop",
        props: {
            speed: {type: Number, default: () => 10},
            iconClass: {type: String, default: () => 'rocket'},
            className: {type: String, default: () => 'h-backToTop-icon'}
        },
        data() {
            return {
                isShow: false
            }
        },
        methods: {
            onToTop() {
                const env = getBrowserType(navigator.userAgent)
                let base = 120;
                // 以10ms的速率，实现在1.2秒内（小数存在一点误差，但问题不大）置顶
                if (env === 'Firefox') base = 70;
                const deficit = document.body.scrollTop / base;
                clearInterval(this.timer)
                console.time('h-backToTop component')
                this.timer = setInterval(_ => {
                    if (document.body.scrollTop <= 0) {
                        clearInterval(this.timer);
                        console.timeEnd('h-backToTop component')
                    }
                    document.body.scrollBy(0, -deficit)
                }, this.speed)
            }
        },
        mounted() {
            let validHeight = document.body.clientHeight;
            let state = false;

            document.body.addEventListener('scroll', () => {
                document.body.scrollTop >= (validHeight / 2) ? (state = true) : (state = false);
                this.$set(this, 'isShow', state);
            })
        }

    }
</script>

<style scoped lang="scss">
  .h-backToTop {
    position: fixed;
    right: .2em;
    bottom: .2em;
    font-size: 5em;
    transition: 1s;
    z-index: 9999999999999;

    &:hover {
      cursor: pointer;
      transform: translateY(-.5em);
    }
  }
</style>