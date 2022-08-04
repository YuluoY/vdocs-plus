<template>
    <div>
        <el-aside width="200px">
            <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    :default-active="$route.path"
                    :default-openeds="['/admin']"
                    router
                    @open="handleOpen"
                    @close="handleClose">
                <a-menu-transition v-for="(item , i) in adminSidebar" :key="i"
                                   :data="item">
                </a-menu-transition>
            </el-menu>
        </el-aside>
    </div>
</template>

<script>
    import ASidebarItem from "@/server/a-sidebar-item";
    import {mapState} from "vuex";
    import AMenuTransition from "@/server/a-menu-transition";

    export default {
        name: "ASidebar",
        components: {AMenuTransition, ASidebarItem},
        computed: mapState({
            adminSidebar: state => state.admin.sidebar,
        }),
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped lang="scss">
  .el-aside {
    color: white;
    text-align: center;
    background: rgba(43, 43, 43, 1);
    min-height: 100vh;
    overflow-x: hidden;
    float: left;
  }
</style>