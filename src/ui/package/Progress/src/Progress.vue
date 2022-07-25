<template>
    <div class="h-progress">
        <div class="h-progress-bar"
             :style="`width:${width}%;
             background-color:${this.progressBarColor};
             height:${progressBarHeight}px;`"></div>
    </div>
</template>

<script>
    export default {
        name: "HProgress",
        props: {
            progressBarColor: {type: String, default: '#409eff'},
            progressBarHeight: {type: String, default: '3'}
        },
        data() {
            return {
                width: 0
            }
        },
        mounted() {
            document.body.addEventListener('scroll', () => {
                // 滚动条有效高度
                const validHeight = document.body.scrollHeight - document.body.offsetHeight - 1;
                this.width = Math.round((document.body.scrollTop / validHeight) * 100);
                this.$forceUpdate();
            })
        },
        beforeDestroy() {
            document.body.removeEventListener('scroll', () => {
            })
        }
    }
</script>

<style scoped lang="scss">
  .h-progress {
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 9999999;

    .h-progress-bar {
      width: 0;
      transition: .2s;
    }
  }
</style>