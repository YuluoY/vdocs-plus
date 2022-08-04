<template>
    <div class="log baseStyle">
        <div class="backgroundImg baseBackgroundImg" ref="backgroundImg">
            <div class="title">{{ title }}</div>
        </div>

        <div class="log-wrapper">
            <div class="log-item"
                 v-for="(y, i) in years" :key="i">
                <div class="year">
                    <div class="year-text">{{ y }}</div>
                    <div class="log-info"
                         v-for="(d, j) in yearFilter(y)" :key="j">
                        <div class="github-update">
                            <h-router-link :href="d.href">[G]</h-router-link>
                        </div>
                        <div class="date">{{ d.releaseDate.substring(5, d.releaseDate.length) }}</div>
                        <span>/</span>
                        <div class="title">{{ d.title }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {useBackgroundImgMixin} from "@/mixin";
    import HRouterLink from "@/components/h-router-link";
    import {formatDate} from "@/utils";

    export default {
        name: "Log",
        components: {HRouterLink},
        mixins: [useBackgroundImgMixin],
        data() {
            return {
                logs: [],
                years: [],
            }
        },
        methods: {
            yearFilter(val) {
                return this.logs.filter(log => log.releaseDate.substring(0, 4) === val).reverse();
            }
        },
        created() {
            this.$store.commit('app/getLogs', this);
        },
        mounted() {

            setTimeout(() => {
                this.logs = this.$store.getters["app/getLogs"]
                this.$forceUpdate()
                this.logs.forEach((item, i, arr) => arr[i].releaseDate = formatDate(item.releaseDate))
                this.logs.forEach(log => {
                    let year = log.releaseDate.substring(0, 4);
                    !this.years.includes(year) && this.years.push(year);
                })
            },100)
        },
    }
</script>

<style scoped>

</style>