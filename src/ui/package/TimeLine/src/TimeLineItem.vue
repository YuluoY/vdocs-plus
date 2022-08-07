<template>
    <div class="h-timeLine-item">
        <div class="title" :style="style">
            <div>{{ title }}</div>
            <div>最后更新：{{ updatedAt | dateFilter }}</div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HTimeLineItem",
        props: {
            title: {type: String, default: '未知标题😔'},
            updatedAt: String,
            fontSize: {type: Number, default: 0.6},
            textColor: {type: String, default: 'black'},
            background: {type: String, default: 'white'},
            href: String,
        },
        methods:{
            a(){
                console.log(1)
            }
        },
        computed: {
            style() {
                return (`
                font-size:${this.fontSize}em;
                color:${this.textColor};
                background:${this.background};
                `)
            }
        },
        filters: {
            dateFilter(val) {
                return val.substring(0, 10)
            }
        }
    }
</script>

<style scoped lang="scss">
  .h-timeLine-item {
    .title {
      width: 100%;
      height: 100%;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: black;
      z-index: -4;


      div:nth-of-type(2) {
        font-size: .7em;
        color: rgba(112, 107, 107, 0.5);
        margin-right: 100px;
      }
    }
  }

</style>