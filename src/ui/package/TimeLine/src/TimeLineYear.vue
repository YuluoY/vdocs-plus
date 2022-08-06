<template>
    <div class="year">
        <div class="text-year">
            <span class="text-year-span" @click="onSwitch($event,`year-${year}`)">{{ year }}</span>
            <span class="annualArticle">共 {{ annualArticles }} 篇文章</span>
<!--            <span :class="`scalable-year iconfont icon-${this.stretchStyle.openIcon}`"-->
<!--                  :style="style"-->
<!--                  @click="onSwitch($event,`year-${year}`)"></span>-->
        </div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "HTimeLineYear",
        props: {
            year: String,
            onSwitch: Function,
            annualArticles: Number,
            stretchStyle: Object,
        },
        computed: {
            style() {
                return (`
                    font-size:${this.stretchStyle.fontSize}em;
                    color:${this.stretchStyle.color};
                `)
            }
        }
    }
</script>

<style scoped lang="scss">
  .year {
    width: 100%;
    padding-left: 20px;
    overflow: hidden;
    border-left: solid 1px silver;

    .text-year {
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: left;

      .text-year-span {
        font-size: 4em;
        font-weight: bolder;
        font-family: 宋体, sans-serif;
        text-shadow: 5px 0px 12px black;
        transition: .8s;
        cursor: pointer;

        &:hover {
          color: #409eff;
          text-shadow: 5px 0px 12px white;
        }
      }

      .annualArticle {
        font-size: 1.2em;
        color: silver;
        display: inline-block;
        width: 100%;
        text-align: right;
      }

      .scalable-year {
        text-shadow: none;
        cursor: pointer;
        font-weight: normal;
      }
    }
  }
</style>