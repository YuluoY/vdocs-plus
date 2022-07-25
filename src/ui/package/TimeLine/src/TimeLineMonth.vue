<template>
    <div :class="`month year-${year}`">
        <div class="text-month">
        <span class="text-month-span"
              :style="`background-color:${weather(month)}`">{{ month }}</span>
            <span :class="`scalable-month iconfont icon-${this.stretchIcon}`"
                  @click="onSwitch($event,`month-${month}-${year}`)"></span>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "HTimeLineMonth",
        props: {
            year: String,
            month: String,
            weather: Function,
            onSwitch: Function,
            stretchIcon:{type:String, default:'xiala'}
        }
    }
</script>

<style scoped lang="scss">
  .month {
    margin: 20px 10px 10px 10px;
    display: block;
    overflow: hidden;

    .text-month {
      font-size: 3em;
      padding-left: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      span:first-child {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        text-shadow: 2px 0px 20px white;
        transition: .8s;
        cursor: pointer;

        &:active {
          width: 100%;
          border-radius: 5px;
          transform: rotateX(360deg);
        }

        &:hover {
          transform: rotateY(360deg);
        }
      }

      span:last-child {
        font-size: .9em;
        margin-right: 50px;
        color: silver;
        cursor: pointer;
      }
    }

  }
</style>