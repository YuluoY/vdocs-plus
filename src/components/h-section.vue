<template>
    <div class="h-section">
        <div class="section-box">
            <div class="section-main-page baseBackgroundImg"
                 :style="style"
                 ref="mainPage">
                <slot name="h-drop"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import HDrop from "@/components/h-drop";

    export default {
        name: "h-section",
        components: {HDrop},
        computed: mapState({
            style: function (state) {
                return `background-image:url(${state.app.section.homePageImg})`
            }
        }),
    }
</script>

<style scoped>
    .section-main-page {
        /*background-image: url("../assets/img/1.jpg") !important;*/
    }
</style>