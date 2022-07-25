<template>
    <div class="log baseStyle">
        <div class="backgroundImg baseBackgroundImg" ref="backgroundImg">
            <div class="title">{{ title }}</div>
        </div>
        <div class="log-wrapper">
            <div class="log-item"
                 v-for="(y, i) in years" :key="i">
                <div class="year">
                    <div>{{ y }}</div>
                    <div class="date">
                        {{ logs.filter(log => log.releaseDate.substring(0,4) === y) }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {useBackgroundImgMixin} from "@/mixin";

    export default {
        name: "Log",
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
        methods: {},
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