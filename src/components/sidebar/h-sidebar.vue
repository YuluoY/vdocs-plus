<template>
    <div class="h-sidebar">
        <sidebar-item :title="sidebar.userInfoArea.title">
            <user-info-wrapper :model="sidebar.userInfoArea"></user-info-wrapper>
        </sidebar-item>
        <sidebar-item title="考研倒计时">
            <flip-countdown :deadline="deadline"
                            @timeElapsed="timeElapsedHandle"
                            style='font-family:"Arial", "Microsoft YaHei", "榛戜綋", "瀹嬩綋", sans-serif;'></flip-countdown>
        </sidebar-item>
        <sidebar-item :title="sidebar.tagInfoArea.title">
            <tag-info-wrapper :model="sidebar.tagInfoArea"></tag-info-wrapper>
        </sidebar-item>
        <sidebar-item :title="sidebar.recentlyCommentArea.title">
            <recently-comment-wrapper
                    :start="0"
                    :num="5"
                    :model="sidebar.recentlyCommentArea"></recently-comment-wrapper>
        </sidebar-item>
        <sidebar-item :title="sidebar.friendInfoArea.title">
            <friend-info-wrapper :model="sidebar.friendInfoArea"></friend-info-wrapper>
        </sidebar-item>
        <website-info-wrapper></website-info-wrapper>
    </div>
</template>

<script>
    import SidebarItem from "@/components/sidebar/SidebarItem";
    import UserInfoWrapper from "@/components/sidebar/UserInfoWrapper";
    import TagInfoWrapper from "@/components/sidebar/TagInfoWrapper";
    import FriendInfoWrapper from "@/components/sidebar/FriendInfoWrapper";
    import FlipCountdown from "vue2-flip-countdown";
    import {mapState} from "vuex";
    import {useVue2FlipCountdownMixin} from "@/mixin";
    import RecentlyCommentWrapper from "@/components/sidebar/RecentlyCommentWrapper";
    import WebsiteInfoWrapper from "@/components/sidebar/WebsiteInfoWrapper";

    export default {
        name: "HSidebar",
        mixins: [useVue2FlipCountdownMixin],
        components: {
            WebsiteInfoWrapper,
            RecentlyCommentWrapper,
            FriendInfoWrapper, TagInfoWrapper, UserInfoWrapper, SidebarItem, FlipCountdown
        },
        computed: mapState({
            sidebar: state => state.app.sidebar,
        }),
    }
</script>

<style scoped lang="scss">
</style>