<template>
    <div class="userInfoWrapper">
        <div class="img">
            <img :src='model.imgUrl'/>
        </div>
        <div class="name">{{ model.name }}</div>
        <div class="motto" v-html="model.motto"></div>
        <div class="info-wrapper">
            <div class="article">
                <div>{{ model.info.article }}</div>
                <div>文章数</div>
            </div>
            <div class="comment">
                <div>{{ model.info.comment }}</div>
                <div>评论数</div>
            </div>
            <div class="running">
                <div>{{ model.info.running }}</div>
                <div>运行天数</div>
            </div>
        </div>
        <div class="main-wrapper">
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UserInfoWrapper",
        props: {
            model: Object
        },
        data() {
            return {}
        }
    }
</script>

<style scoped>

</style>