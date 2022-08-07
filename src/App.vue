<template>
    <div id="app">
        <h-header :is-header="!isLogin && isHeader"></h-header>
        <router-view/>
        <h-back-to-top :speed="10"></h-back-to-top>
        <h-audio-player
                :is-disabled="!isLogin && isHeader"
                :song-list="songList"
                :default-song="5"
                :volume="0.7"></h-audio-player>
        <!-- 评论区 -->
        <h-comment v-if="!isLogin && isComment"></h-comment>
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
            isComment() {
                const blacklist = ['/home', '/message', '/login']
                return !(blacklist.includes(this.$route.path));
            },
            isHeader() {
                const blacklist = ['/login']
                return !(blacklist.includes(this.$route.path))
            },
            isLogin() {
                return this.$store.getters["router/updateStore"]
            },
        },
        watch: {
            $route(to, from) {
                if (['/home', '/login', '/'].includes(to.path)) {
                    this.$store.commit('router/changeLoginState', false);
                }
            }
        },
        mounted() {
            this.songList = media;
            window.onload = () => {
                if (JSON) {
                    const isLogin = JSON.parse(localStorage.getItem('h-admin-login') || '')
                    this.$store.commit('router/changeLoginState', isLogin)
                }
            }
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
