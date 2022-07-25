<template>
    <div class="category baseStyle">
        <div class="backgroundImg baseBackgroundImg" ref="backgroundImg">
            <div class="title">{{ title }}</div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import {useBackgroundImgMixin, useSubBackgroundImgMixin} from "@/mixin";

    export default {
        name: "Category",
        mixins: [useBackgroundImgMixin, useSubBackgroundImgMixin],
    }
</script>

<style scoped>
    .category {
        width: 100vw;
        height: 100vh;
    }
</style>