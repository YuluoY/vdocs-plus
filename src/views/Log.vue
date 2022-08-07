<template>
    <div class="log baseStyle">
        <div class="backgroundImg baseBackgroundImg" ref="backgroundImg">
            <div class="title">{{ title }}</div>
        </div>

        <div class="log-wrapper" v-if="logs.length">
            <div class="log-item"
                 v-for="(y, i) in years" :key="i">
                <div class="year">
                    <div class="year-text">{{ y }}</div>
                    <div class="log-info"
                         v-for="(d, j) in yearFilter(y)" :key="j">
                        <div class="github-update">
                            <h-router-link :href="d.href">[G]</h-router-link>
                        </div>
                        <div class="date">{{ d.createdAt.substring(5, d.createdAt.length) }}</div>
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
                return this.logs.filter(log => log.createdAt.substring(0, 4) === val).reverse();
            }
        },
        created() {
            this.$store.commit('app/setLogs', this);
        },
        mounted() {
            setTimeout(() => {
                this.logs = this.$store.getters["app/getLogs"]
                // 格式化日期
                this.logs.forEach((item, i, arr) => arr[i].createdAt = formatDate(item.createdAt))
                // 提取年份
                this.logs.forEach(log => {
                    let year = log.createdAt.substring(0, 4);
                    !this.years.includes(year) && this.years.push(year);
                })
                this.$forceUpdate()
            },400)
        },
    }
</script>

<style scoped>

</style>