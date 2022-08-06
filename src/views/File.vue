<template>
    <div class="file baseStyle">
        <div class="backgroundImg baseBackgroundImg" ref="backgroundImg">
            <div class="title">{{ title }}</div>
        </div>
        <div class="file-wrapper" v-if="timeLineData.length">
            <h-time-line :data="timeLineData"></h-time-line>
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
                timeLineData: [],
            }
        },
        created() {
            this.$store.commit('app/setArticles', this);
        },
        mounted() {
            setTimeout(() => {
                this.timeLineData = this.$store.getters["app/getArticles"]
                this.$forceUpdate()
            }, 500)
        }
    }
</script>

<style scoped>

</style>