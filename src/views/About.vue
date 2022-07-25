<template>
    <div class="about baseStyle">
        <div class="backgroundImg baseBackgroundImg" ref="backgroundImg">
            <div class="title">{{ title }}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "About",
        mixins:[require('@/mixin').useBackgroundImgMixin]
    }
</script>

<style scoped>

</style>