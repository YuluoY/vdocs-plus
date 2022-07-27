<template>
    <div class="admin">
        <el-container>
            <el-aside width="200px">
                <a-sidebar></a-sidebar>
            </el-aside>
            <el-container>
                <el-header>Header</el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>

    import ASidebar from "@/server/a-sidebar";
    export default {
        name: "Admin",
        components:{
            ASidebar
        },
        computed: {
            isLogin() {
                return this.$store.getters["router/updateStore"]
            }
        },
        beforeMount() {
            // if (!(this.isLogin)) {
            //     this.$notify.info('您没有访问的权限~');
            //     this.$router.push('/')
            // }
        },
    }
</script>

<style scoped lang="scss">
  .el-header {
    color: #333;
    text-align: center;
  }

  .el-aside {
    color: white;
    text-align: center;
    background: rgba(43,43,43,1);
    min-height: 100vh;
  }

  .el-main {
    text-align: center;
  }

  body > .el-container {
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
  }

  .el-container:nth-child(7) .el-aside {
  }
</style>