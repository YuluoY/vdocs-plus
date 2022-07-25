<template>
    <div class="h-timeLine-box" :style="`flex-direction:${isReverse ? 'column-reverse' : 'column'}`">
        <slot></slot>
    </div>
</template>

<script>

    export default {
        name: "HTimeLineBox",
        props: {
            isReverse: {type: Boolean, default: true}
        },
    }
</script>

<style scoped lang="scss">
  .h-timeLine-box {
    width: 100%;
    margin: 0 auto;
    display: flex;
  }
</style>