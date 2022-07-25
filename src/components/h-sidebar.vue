<template>
    <div class="h-sidebar">
        <sidebar-item :title="sidebar.userInfoArea.title">
            <user-info-wrapper :model="sidebar.userInfoArea"></user-info-wrapper>
        </sidebar-item>
        <sidebar-item :title="sidebar.tagInfoArea.title">
            <tag-info-wrapper :model="sidebar.tagInfoArea"></tag-info-wrapper>
        </sidebar-item>
        <sidebar-item :title="sidebar.friendInfoArea.title">
            <friend-info-wrapper :model="sidebar.friendInfoArea"></friend-info-wrapper>
        </sidebar-item>
    </div>
</template>

<script>
    import SidebarItem from "@/components/sidebar/SidebarItem";
    import UserInfoWrapper from "@/components/sidebar/UserInfoWrapper";
    import TagInfoWrapper from "@/components/sidebar/TagInfoWrapper";
    import FriendInfoWrapper from "@/components/sidebar/FriendInfoWrapper";
    import {mapState} from "vuex";

    export default {
        name: "HSidebar",
        components: {FriendInfoWrapper, TagInfoWrapper, UserInfoWrapper, SidebarItem},
        data() {
            return {}
        },
        computed: mapState({
            sidebar: state => state.app.sidebar
        })
    }
</script>

<style scoped>

</style>