<template>
    <div id="app">
        <h-header></h-header>
        <router-view/>
        <h-back-to-top :speed="10"></h-back-to-top>
        <h-audio-player
                :is-disabled="false"
                :song-list="songList"
                :default-song="5"
                :volume="0.7"></h-audio-player>
        <!-- 评论区 -->
        <h-comment v-if="isHome"></h-comment>
        <h-progress></h-progress>
    </div>
</template>

<script>
    import HHeader from "@/components/h-header";
    import media from "@/assets/media";
    import HComment from "@/components/h-comment";

    export default {
        components: {HComment, HHeader},
        data() {
            return {
                songList: []
            }
        },
        computed: {
            isHome() {
                const blacklist = ['/home', '/message']
                return !(blacklist.includes(this.$route.path));
            }
        },
        mounted() {
            this.songList = media;
        }
    }
</script>
<style>
    html, body {
        width: 100vm;
        height: 100vh;
        overflow-y: auto;
        overflow-x: hidden;
        font-size: 16px;
        /*background: rgba(192, 192, 192, 0.32);*/
    }
</style>
