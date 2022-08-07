<template>
    <div class="h-timeLine">
        <h-time-line-box>
            <h-time-line-year
                    v-for="(year, i) in Object.keys(models)" :key="i"
                    :year="year" :onSwitch="onSwitch" :stretch-style="stretchStyle"
                    :annualArticles="annualArticles(year)">
                <h-time-line-month
                        v-for="(month, j) in Object.keys(models[year])" :key="j"
                        :year="year"
                        :month="month"
                        :onSwitch="onSwitch"
                        :weather="weather"
                        :stretch-icon="stretchStyle.openIcon">
                    <div :class="`day-wrapper month-${month}-${year}`">
                        <h-time-line-day
                                v-for="(d, k) in sortDays(models[year][month])" :key="k"
                                :jump="jump"
                                :id="d._id"
                                :month="month"
                                :day="d.day"
                                :weather="weather">
                            <h-time-line-item
                                    :font-size="titleStyle.fontSize"
                                    :text-color="titleStyle.textColor"
                                    :background="titleStyle.background"
                                    :title="d.title"
                                    :updatedAt="d.updatedAt">

                            </h-time-line-item>
                        </h-time-line-day>
                    </div>
                </h-time-line-month>
            </h-time-line-year>
        </h-time-line-box>
    </div>
</template>

<script>
    import HTimeLineItem from "@/ui/package/TimeLine/src/TimeLineItem";
    import HTimeLineBox from "@/ui/package/TimeLine/src/TimeLineBox";
    import HTimeLineYear from "@/ui/package/TimeLine/src/TimeLineYear";
    import HTimeLineMonth from "@/ui/package/TimeLine/src/TimeLineMonth";
    import HTimeLineDay from "@/ui/package/TimeLine/src/TimeLineDay";
    import {addClass, deleteClass} from "@/ui/util/dom";
    import {arrObjectSort} from "@/utils";

    export default {
        name: "HTimeLine",
        components: {HTimeLineBox, HTimeLineItem, HTimeLineDay, HTimeLineMonth, HTimeLineYear},
        props: {
            jump: Function,
            data: {type: Array, default: () => []},
            // 季节的颜色
            seasonColors: {
                type: Object,
                default: () => {
                    return {
                        spring: '#94CD35',
                        summer: '#C83B46',
                        autumn: '#FEB009',
                        winter: '#539DBD',
                        defaultColor: '#4FC18E'
                    }
                }
            },
            // 伸缩图标样式
            stretchStyle: {
                type: Object,
                default: () => {
                    return {
                        openIcon: 'xiala',
                        closeIcon: 'shangla',
                        fontSize: 4,
                        color: 'silver'
                    }
                }
            },
            // 标题样式
            titleStyle: {
                type: Object,
                default: () => {
                    return {
                        fontSize: 0.6,
                        textColor: 'black',
                        background: 'white'
                    }
                }
            },
        },
        data() {
            return {
                models: [],
            }
        },
        methods: {
            weather(val) {
                const spring = ['1', '2', '3'],
                    summer = ['4', '5', '6'],
                    autumn = ['7', '8', '9'],
                    winter = ['10', '11', '12']
                return (spring.includes(val) ? this.seasonColors.spring :
                    summer.includes(val) ? this.seasonColors.summer :
                        autumn.includes(val) ? this.seasonColors.autumn :
                            winter.includes(val) ? this.seasonColors.winter :
                                this.seasonColors.defaultColor)
            },
            onSwitch(event, model) {
                const arr = Array.from(document.getElementsByClassName(model));
                arr.forEach(item => {
                    const state = getComputedStyle(item).display;
                    if (state === 'none') {
                        item.style.display = 'block';
                        // deleteClass(event.target, `icon-${this.stretchStyle.closeIcon}`);
                        // addClass(event.target, `icon-${this.stretchStyle.openIcon}`);
                    } else if (state === 'block') {
                        item.style.display = 'none';
                        // deleteClass(event.target, `icon-${this.stretchStyle.openIcon}`);
                        // addClass(event.target, `icon-${this.stretchStyle.closeIcon}`);
                    }
                })
            },
            build(arr) {
                let obj = {}
                arr.forEach((item, index, arr) => {
                    const [year, month, day] = item.split('-');
                    if (Object.keys(obj).includes(year)) {
                        if (!obj[year][month]) {
                            obj[year][month] = [];
                        }
                    } else {
                        obj[year] = {}
                        obj[year][month] = []
                    }
                    this.data[index].day = day;
                    obj[year][month].push(this.data[index])
                })
                return obj;
            },
            // 计算每年的文章数
            annualArticles(year) {
                let articles = 0;
                Object.keys(this.models[year]).forEach(month => articles += Object.keys(this.models[year][month]).length)
                return articles;
            },
            sortDays(days) {
                arrObjectSort(days, 'day');
                return days
            }
        },
        mounted() {
            this.$nextTick(() => {
                const createdAtArr = []
                this.data.forEach(item => createdAtArr.push(item.createdAt.substring(0, 10)))
                this.models = this.build(createdAtArr)
                // console.log(arrObjectSort(this.models))
            })
        }
    }
</script>

<style scoped lang="scss">
  .h-timeLine {
    width: 100%;
    height: auto;
  }
</style>