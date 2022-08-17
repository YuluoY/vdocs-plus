<template>
    <div class="websiteInfoWrapper">
        <div class="website-info-box">
            <div class="visitorNum">访问人数：{{ model.visitorNum }}</div>
            <div class="visitNum">访问次数：{{ model.visitNum }}</div>
            <!--            <div class="establish">建站时间：{{ model.establish }}</div>-->
            <div class="running">本站已运行：{{ runningStr }}</div>
        </div>
    </div>
</template>

<script>
    import dayjs from "dayjs";

    export default {
        name: "WebsiteInfoWrapper",
        props: {
            model: Object
        },
        data() {
            return {
                runningStr: ''
            }
        },
        methods: {
            dateFormatter(val) {
                let day = dayjs(Date.now()).diff(val, 'days')
                let hour = dayjs(Date.now()).diff(val, 'hours') % 24
                let minute = dayjs(Date.now()).diff(val, 'minute') % 60
                let second = dayjs(Date.now()).diff(val, 'seconds') % 60
                second = second < 10 ? '0' + second : second;
                minute = minute < 10 ? '0' + minute : minute;
                hour = hour < 10 ? '0' + hour : hour;
                day = day < 10 ? '0' + day : day;
                this.runningStr = `${day}天${hour}时${minute}分${second}秒`
            },
            async init() {
                this.$apis.rest.getUserIp().then(async res => {
                    const {data} = await this.$apis.web.getAndUpdateCount({visitorInfo: res.data});
                    const obj = {
                        path: 'websiteInfoArea.info',
                        target: data,
                    }
                    this.$store.commit('app/setSidebar', obj);
                })
            }
        },
        created() {
            this.init();
        },
        mounted() {
            this.timer = setInterval(() => this.dateFormatter(this.model.running), 1000)
        },
        beforeDestroy() {
            clearInterval(this.timer)
        }
    }
</script>

<style scoped lang="scss">
  .websiteInfoWrapper {
    .website-info-box {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      & > div {
        padding: 5px 10px;
        letter-spacing: 2px;
      }
    }
  }
</style>