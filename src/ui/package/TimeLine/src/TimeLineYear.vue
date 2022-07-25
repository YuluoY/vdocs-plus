<template>
    <div class="year">
        <div class="text-year">
            <span class="text-year-span">{{ year }}</span>
            <span class="annualArticle">共 {{ annualArticle }} 篇文章</span>
            <span :class="`scalable-year iconfont icon-${this.stretchStyle.openIcon}`"
                  :style="style"
                  @click="onSwitch($event,`year-${year}`)"></span>
        </div>
        <div class="annualArticle">
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
            annualArticle: Number,
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
    padding: 20px;
    overflow: hidden;
    border-left: solid 1px silver;

    .text-year {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .text-year-span {
        font-size: 4em;
        font-weight: bolder;
        font-family: 宋体, sans-serif;
        text-shadow: 5px 0px 12px black;
      }

      .annualArticle {
        font-size: 1.2em;
        color: silver;
      }

      .scalable-year {
        text-shadow: none;
        cursor: pointer;
        font-weight: normal;
      }
    }
  }
</style>