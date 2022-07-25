<template>
    <div class="file baseStyle">
        <div class="backgroundImg baseBackgroundImg" ref="backgroundImg">
            <div class="title">{{ title }}</div>
        </div>
        <div class="file-wrapper">
            <h-time-line :time-line-data="timeLineData"></h-time-line>
        </div>
    </div>
</template>

<script>
    import {useBackgroundImgMixin} from "@/mixin";

    export default {
        name: "File",
        mixins: [useBackgroundImgMixin],
        data() {
            return {
                timeLineData: [
                    {
                        title: '我在家里敲代码和准备考研',
                        releaseDate: '2022-7-22',
                        updateDate: '2022-7-25'
                    },
                    {
                        title: '今天天气不好',
                        releaseDate: '2022-7-23',
                        updateDate: '2022-7-27'
                    },
                    {
                        title: '革命尚未成功，同志们仍需努力！',
                        releaseDate: '2022-7-25',
                        updateDate: '2022-7-27'
                    },
                    {
                        title: 'congratulation',
                        releaseDate: '2023-5-22',
                        updateDate: '2023-6-2'
                    },
                    {
                        title: '心中的旗帜永存！心中的旗帜永存！心中的旗帜永存！！',
                        releaseDate: '2023-5-23',
                        updateDate: '2023-7-1'
                    },
                    {
                        title: 'congratulation',
                        releaseDate: '2022-1-22',
                        updateDate: '2023-6-2'
                    },
                    {
                        title: 'congratulation',
                        releaseDate: '2024-2-22',
                        updateDate: '2023-6-2'
                    },
                    {
                        title: 'congratulation',
                        releaseDate: '2024-5-29',
                        updateDate: '2023-6-2'
                    },
                    {
                        title: 'congratulation',
                        releaseDate: '2024-12-29',
                        updateDate: '2023-6-2'
                    },
                    {
                        title: 'congratulation',
                        releaseDate: '2024-1-29',
                        updateDate: '2023-6-2'
                    },  {
                        title: 'congratulation',
                        releaseDate: '2024-3-19',
                        updateDate: '2023-6-2'
                    },
                    {
                        title: 'congratulation',
                        releaseDate: '2024-4-29',
                        updateDate: '2023-6-2'
                    },
                    {
                        title: 'congratulation',
                        releaseDate: '2024-6-29',
                        updateDate: '2023-6-2'
                    },
                    {
                        title: 'congratulation',
                        releaseDate: '2024-7-29',
                        updateDate: '2023-6-2'
                    },
                ],
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>

</style>