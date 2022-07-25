<template>
    <div class="h-footer">
        <div class="footer-info-wrapper">
            <div>
                <img :src="footer.gifUrl"/>
            </div>
            <div>已运行：{{ footer.running }}天</div>
            <div>访问人数：{{ footer.visit }}人次</div>
            <div>建站日期：{{ footer.establish | establishFormat }}</div>
            <div>
                <a href="#" style="color: rgb(185,185,185)">{{ footer.permit }}</a>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import {formatDate} from "@/utils";

    export default {
        name: "HFooter",
        computed: mapState({
            footer: state => state.app.footer
        }),
        filters: {
            establishFormat(val) {
                return formatDate(val, 'YYYY年MM月DD日')
            }
        }
    }
</script>

<style scoped>

</style>