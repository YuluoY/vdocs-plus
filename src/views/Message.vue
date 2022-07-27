<template>
    <div class="message baseStyle">
        <div class="backgroundImg baseBackgroundImg" ref="backgroundImg">
            <div class="title">{{ title }}</div>
        </div>
        <h-comment :is-reverse="true"></h-comment>
    </div>
</template>

<script>
    import {useBackgroundImgMixin} from "@/mixin";
    import HComment from "@/components/h-comment";

    export default {
        name: "Message",
        components: {HComment},
        mixins: [useBackgroundImgMixin]
    }
</script>

<style scoped>

</style>