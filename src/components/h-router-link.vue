<template>
    <div class="h-router-link">
        <a v-if="href[0] !== '/'" :href="href" target="_blank">
            <slot></slot>
        </a>
        <router-link v-else
                     exact
                     :to="href"
                     :tag="tag"
                     target="_self">
            <slot></slot>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "h-router-link",
        props: {
            tag: {type: String, default: () => 'a'},
            href: {type: String, required: true}
        },
    }
</script>

<style scoped>

</style>