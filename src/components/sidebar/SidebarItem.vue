<template>
    <div class="h-sidebar-item">
        <div class="title" :title="title">{{ title }}</div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "SidebarItem",
        props: {
            title: String
        }
    }
</script>

<style scoped>

</style>