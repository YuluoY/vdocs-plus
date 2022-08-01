<template>
    <div class="a-menu-transition">
        <el-submenu :index="data.path+''" v-if="isChildren">
            <template slot="title">
                <a-sidebar-item :data="data"></a-sidebar-item>
            </template>
            <a-menu-transition
                    v-for="(item, i) in data.children" :key="i"
                    :data="item">
                <a-sidebar-item :data="item"></a-sidebar-item>
            </a-menu-transition>
        </el-submenu>


        <el-menu-item :index="data.path+''" v-else>
            <a-sidebar-item :data="data"></a-sidebar-item>
        </el-menu-item>
    </div>
</template>

<script>
    import ASidebarItem from "@/server/a-sidebar-item";

    export default {
        name: "AMenuTransition",
        components: {ASidebarItem},
        props: {
            data: Object,
        },
        computed:{
            isChildren(){
                return this.data.children !== undefined &&
                    this.data.children.length !== 0
            }
        }
    }
</script>

<style scoped>

</style>