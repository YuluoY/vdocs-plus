<template>
    <div class="h-main" id="h-main">
        <div class="center">
            <div class="h-sidebar-wrapper">
                <slot name="h-sidebar"></slot>
            </div>
            <div class="h-content-wrapper">
                <slot name="h-content"></slot>
            </div>
        </div>
        <div class="h-footer-wrapper">
            <slot name="h-footer"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "h-main",
    }
</script>

<style scoped lang="scss">

</style>