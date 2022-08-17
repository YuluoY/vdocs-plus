<template>
    <div class="h-header forbid-select-text" v-if="isHeader">
        <div style="width: 100vw;" class="h-header-box">
            <div class="info">
                <a href="/">
                    <img class="logo" :src="userInfo.logo"/>
                    <span class="name" :title="userInfo.name">{{ userInfo.name }}</span>
                </a>
            </div>
            <div class="nav">
                <div v-for="(n, i) in nav" :key="i"
                     :class="`nav-link-box nav-link-box-${i}`"
                     @mouseover="n.children && onOpenDropList(n)"
                     @mouseleave="n.children && onHideDropList(n)">
                    <h-router-link
                            :href="n.path"
                            :title="n.title"
                            style="display: flex;align-items: center;">
                        <svg-icon :icon-class="n.iconClass"></svg-icon>
                        <span style="margin-left: 5px;">{{ n.label }}</span>
                        <svg-icon v-if="n.children" icon-class="drop-down"></svg-icon>
                    </h-router-link>
                    <div :class="`dropList-wrapper dropList-${i}`" v-if="n.children">
                        <h-router-link
                                v-for="(item, i) in n.children" :key='i'
                                :href="item.path"
                                :title="item.title">
                            <span>{{ item.label }}</span>
                        </h-router-link>
                    </div>
                </div>
            </div>
            <div class="contact">
                <!--                <h-router-link-->
                <!--                        :href="n.href"-->
                <!--                        :title="n.title"-->
                <!--                        v-for="(n, i) in contact" :key="i"-->
                <!--                        style="display: flex;align-items: center;">-->
                <!--                    <svg-icon :icon-class="n.iconClass"></svg-icon>-->
                <!--                </h-router-link>-->
                <div class="little-tools">
                    <svg-icon icon-class="login" class-name="login" @click="onLoginHandle" title="登录"></svg-icon>
                    <svg-icon icon-class="tip" class-name="tip" @click="onTipHandle" title="友情提示"></svg-icon>
                    <svg-icon icon-class="search" class-name="search" @click="onSearchHandle" title="站内搜索"></svg-icon>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import HRouterLink from "@/components/h-router-link";
    import {addClass, deleteClass} from "@/utils/dom";

    export default {
        name: "h-header",
        components: {HRouterLink},
        props: {
            isHeader: {type: Boolean, default: true},
            isSidebarAlwaysShow: {type: Boolean, default: true}
        },
        methods: {
            onOpenDropList(n) {
                const dropList = document.getElementsByClassName(`dropList-${n.id}`)[0];
                addClass(dropList, 'h-header-show')
                deleteClass(dropList, 'h-header-hide')
            },
            onHideDropList(n) {
                const dropList = document.getElementsByClassName(`dropList-${n.id}`)[0];
                deleteClass(dropList, 'h-header-show')
            },
            onLoginHandle() {
                this.$router.push('/login')
            },
            onTipHandle() {

            },
            onSearchHandle() {

            }
        },
        computed: mapState({
            userInfo: state => state.user.userInfo,
            nav: state => state.app.header.nav,
            contact: state => state.app.header.contact
        }),
        mounted() {
            document.body.addEventListener('scroll', () => {
                const header = document.getElementsByClassName('h-header')[0];
                const articleSidebar = document.getElementsByClassName('h-article-sidebar')[0];
                let sidebar = null;
                if (this.isSidebarAlwaysShow) {
                    sidebar = document.getElementsByClassName('h-sidebar')[0];
                }

                if (document.body.scrollTop >= document.body.clientHeight - 30) {
                    header && deleteClass(header, ['h-header-transparent', 'h-header-show'])
                    header && addClass(header, 'h-header-hide')
                    sidebar && (sidebar.style.position = 'fixed');
                    if (articleSidebar) {
                        articleSidebar && addClass(articleSidebar, 'h-article-sidebar2');
                    }
                } else if (document.body.scrollTop === 0) {
                    header && addClass(header, 'h-header-transparent');
                    header && deleteClass(header, ['h-header-show', 'h-header-hide'])
                } else {
                    header && addClass(header, 'h-header-show');
                    header && deleteClass(header, ['h-header-hide', 'h-header-transparent'])
                    sidebar && (sidebar.style.position = 'absolute');
                    if (articleSidebar) {
                        articleSidebar && deleteClass(articleSidebar, 'h-article-sidebar2')
                    }
                }
            })
        },
        beforeDestroy() {
            document.body.removeEventListener('scroll', () => {
                console.log('销毁顶部导航')
            });
        }
    }
</script>

<style scoped lang="scss">

</style>