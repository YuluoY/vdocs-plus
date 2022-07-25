<template>
    <!-- 站点信息计数区 -->
    <div class="info-count-wrapper">
        <div class="info-count-title">文章统计</div>
        <div v-for="(n, i) in nav" :key="i"
             v-if="['Article', 'Life', 'Log', 'Note'].includes(n.label)"
             :class="n.iconClass+'-count'">
            <svg-icon :icon-class="n.iconClass"></svg-icon>
            {{ n.label }} : {{ i }}
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "InfoCountWrapper",
        computed: mapState({
            nav: state => state.app.header.nav
        })
    }
</script>

<style scoped>

</style>