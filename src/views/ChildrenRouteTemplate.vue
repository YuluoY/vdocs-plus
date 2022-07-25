<template>
    <div class="children-route-template">
        <!--        <component :is="require(`@/views/${model.label}`).default"></component>-->
        <component :is="componentInstance"></component>
        阿斯顿撒打算的
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "ChildrenRouteTemplate",
        props: {
            resource: String,
            sub: String
        },
        data() {
            return {
                model: []
            }
        },
        computed: mapState({
            nav: state => state.app.header.nav,
            componentInstance: function () {
                setTimeout(() => {
                    return require(`@/views/${this.model.label}`).default
                })
            }
        }),
        mounted() {
            this.model = this.nav.filter(item => item.href === `/${this.resource}`)[0];
            this.model = this.model.children.filter(item => item.href === `/${this.sub}`)[0]
        }
    }
</script>

<style scoped>

</style>