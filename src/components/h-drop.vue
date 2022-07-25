<template>
    <div class="h-drop">
        <svg-icon icon-class="drop"
                  class-name="drop"
                  @click="onDropDown"></svg-icon>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "h-drop",
        methods: {
            onDropDown() {
                let n = document.body.scrollTop;
                this.timer = setInterval(_ => {
                    // 减去顶部导航高度，并与当前滚动条位置高度比对
                    if (n >= (document.body.clientHeight - 30)) clearInterval(this.timer);
                    document.body.scrollTo(0, n += 20)
                }, this.speed)
            }
        },
        computed: mapState({
            speed: state => state.app.section.drop.speed
        })
    }
</script>

<style scoped lang="scss">
  @import "src/ui/stylus/variables";

  .h-drop {
    position: absolute;
    bottom: 6em;
    width: 100%;
    text-align: center;
    opacity: 0.5;

    div {
      font-size: 5em;
      transition: 1s;
      margin: 0 auto;

      &:hover {
        cursor: pointer;
        transform: translateY(.6em);
      }
    }
  }

</style>