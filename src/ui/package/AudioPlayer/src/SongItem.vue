<template>
    <div class="h-song-item">
        <div class="order">{{ id }}</div>
        <div class="song text-ellipse" :title="song">{{ song }}</div>
        <div class="singer text-ellipse" :title="singer">{{ singer }}</div>
    </div>
</template>

<script>
    export default {
        name: "HSongItem",
        props: {
            id: {type: Number},
            song: {type: String},
            singer: {type: String},
        },
    }
</script>

<style scoped lang="scss">
  .h-song-item {
    display: flex;
    flex-direction: row;
    text-align: center;
    border-top: solid 1px black;
    transition: .4s;
    position: relative;

    &:hover {
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.2);
      &:after {
        position: absolute;
        content: '';
        width: 5px;
        height: 100%;
        background-color: #409eff;
        left: 0;
        top: 0;
      }
    }

    & > div {
      padding: .2rem .4rem;
      border-right: solid 1px black;
    }

    .order {
      width: 10%;
    }

    .song {
      flex: 1;
    }

    .singer {
      width: 20%;
      border-right: none;
    }
  }

  .text-ellipse {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis; // 隐藏超过的文本
    white-space: nowrap; // 不换行
  }
</style>