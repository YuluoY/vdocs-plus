<template>
    <div id="app">
        <h-header :is-header="!isLogin && isHeader"
                  :is-sidebar-always-show="false"></h-header>
        <router-view/>
        <h-back-to-top :speed="10"></h-back-to-top>
        <h-audio-player
                :is-disabled="!isLogin && isHeader"
                :song-list="getSongList"
                :default-song="4"
                :volume="0.7"></h-audio-player>
        <!-- 评论区 -->
        <h-comment v-if="!isLogin && isComment"></h-comment>
        <h-progress></h-progress>
    </div>
</template>

<script>
    import HHeader from "@/components/h-header";
    import media from "@/assets/media";
    import HComment from "../src/components/comment/h-comment";
    import {getBrowserType, getResponseTime} from "@/utils";

    export default {
        components: {HComment, HHeader},
        data() {
            return {}
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
            getSongList() {
                return media;
            }
        },
        watch: {
            $route(to, from) {
                // 改变登录状态
                if (['/home', '/login', '/'].includes(to.path)) {
                    this.$store.commit('router/changeLoginState', false);
                }

                // 根据路由获取评论
                if (!['/home', '/login'].includes(to.path) && !this.isLogin) {
                    if (to.hash) {
                        if (!this.$store.getters["comment/getCommentsByPath"].length) {
                            this.$store.commit('comment/setCommentsByPath', this)
                        }
                        return;
                    }
                    this.$store.commit('comment/setCommentsByPath', this)
                }
            }
        },
        created() {
            this.$store.commit('app/setBrowserType', getBrowserType(navigator.userAgent));
        },
        mounted() {
            setTimeout(() => {
                if (JSON) {
                    const isLogin = JSON.parse(localStorage.getItem('h-admin-login') || '')
                    this.$store.commit('router/changeLoginState', isLogin)
                }
            }, 10)
            getResponseTime(window.performance, time =>
                this.$store.commit('app/setWebResponseTime', Math.floor(time))
            )
        }
    }
</script>
<style lang="scss">
  html, body {
    width: 100vm;
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    font-size: 16px;
    /*background: rgba(192, 192, 192, 0.32);*/
    position: relative;
    min-width: 1440px;
  }
</style>
