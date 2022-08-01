<template>
    <div class="admin">
        <el-container>
            <a-sidebar></a-sidebar>
            <el-container>
                <el-header>
                    <a-header></a-header>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>

    import ASidebar from "@/server/a-sidebar";
    import AHeader from "@/server/a-header";

    export default {
        name: "Admin",
        components: {
            AHeader,
            ASidebar
        },
        computed: {
            isLogin() {
                return this.$store.getters["router/updateStore"]
            }
        },
        beforeMount() {
            if (!(this.isLogin)) {
                this.$notify.info('您没有访问的权限~');
                this.$router.push('/')
            }
        },
    }
</script>

<style scoped lang="scss">

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    min-height: 90vh;
    float: right;
  }
  .el-header{
    padding: 0 !important;
    height: 10vh !important;
  }
</style>