<template>
    <div class="a-sidebar-item">
<!--        <i :class="'iconfont '+data.icon || 'el-icon-menu'"></i>-->
        <svg-icon :icon-class="data.icon" style="margin-right: 5px"></svg-icon>
        <span slot="title">{{ data.title }}</span>
    </div>
</template>

<script>
    export default {
        name: "ASidebarItem",
        props: {
            data: {
                type: Object,
                default: () => {
                    return {title: '哎呀，失算啦！'}
                }
            },
        }
    }
</script>

<style scoped>

</style>