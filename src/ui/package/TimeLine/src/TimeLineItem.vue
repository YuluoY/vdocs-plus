<template>
    <div class="h-timeLine-item">
        <div class="title" :style="style">
            {{ title }}
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HTimeLineItem",
        props: {
            title: {type: String, default: '未知标题😔'},
            fontSize: {type: Number, default: 0.6},
            textColor: {type: String, default: 'black'},
            background: {type: String, default: 'white'},
            href: String,
        },
        computed: {
            style() {
                return (`
                font-size:${this.fontSize}em;
                color:${this.textColor};
                background:${this.background};
                `)
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
      color: black;
      cursor: pointer;
      z-index: -4;
    }
  }

</style>