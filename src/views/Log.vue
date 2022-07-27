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
                        <div class="github-update">[G]</div>
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

    export default {
        name: "Log",
        components: {HRouterLink},
        mixins: [useBackgroundImgMixin],
        data() {
            return {
                logs: [
                    {
                        title: '添加音乐播放器',
                        releaseDate: '2021-2-22',
                    },
                    {
                        title: '添加音乐播放器22',
                        releaseDate: '2021-5-22',
                    },
                    {
                        title: '考研进行时...',
                        releaseDate: '2022-2-22',
                    },
                ],
                years: [],
            }
        },
        methods: {
            yearFilter(val) {
                return this.logs.filter(log => log.releaseDate.substring(0, 4) === val).reverse();
            }
        },
        mounted() {
            this.logs.forEach(log => {
                let year = log.releaseDate.substring(0, 4);
                !this.years.includes(year) && this.years.push(year);
            })
        }
    }
</script>

<style scoped>

</style>