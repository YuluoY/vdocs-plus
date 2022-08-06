<template>
    <div class="day">
        <span class="text-day-span">{{ day }}：</span>
        <span class="mask" :style="`background-color:${weather(month)}`"></span>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "HTimeLineDay",
        props: {
            day: String,
            month: String,
            weather: Function
        }
    }
</script>

<style scoped lang="scss">
  .day {
    font-size: 2em;
    margin: 15px 0 0 80px;
    border-bottom: solid 1px silver;
    border-right: solid 2px silver;
    position: relative;
    z-index: 1;
    transition: .8s;
    overflow: hidden;
    display: flex;
    cursor: pointer;

    span:first-child {
      width: 90px;
      height: 100%;
      left: 0;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }


    &:hover > .mask {
      transform: translateX(50em);
      opacity: 0.2;
    }

    .mask {
      display: inline-block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      right: 50em;
      z-index: -3;
      transition: .8s;
    }
  }
</style>