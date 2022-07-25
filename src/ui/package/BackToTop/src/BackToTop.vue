<template>
    <div class="h-backToTop" v-show="isShow">
        <svg-icon
                :icon-class="this.iconClass"
                :class-name="this.className"
                @click="onToTop"></svg-icon>
    </div>
</template>

<script>
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
                this.timer = setInterval(_ => {
                    if (document.body.scrollTop <= 0) clearInterval(this.timer);
                    document.body.scrollBy(0, -20)
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

    &:hover {
      cursor: pointer;
      transform: translateY(-.5em);
    }
  }
</style>