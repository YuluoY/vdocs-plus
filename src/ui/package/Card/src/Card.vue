<template>
    <div class="h-card" ref="card">
        <div :class="title && 'title'">{{ title }}</div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "HCard",
        props: {
            title: {type: String},
            shadowOpportunity: {type: String, default: () => 'default'},
        },
        methods: {
            init() {
                if (this.shadowOpportunity === 'default') return;
                if (this.shadowOpportunity === 'hover') {
                    this.$refs.card.style.boxShadow = 'unset';
                    this.$refs.card.className += ' h-' + this.shadowOpportunity;
                }
            }
        },
        mounted() {
            this.init();
        }
    }
</script>

<style scoped lang="scss">



</style>