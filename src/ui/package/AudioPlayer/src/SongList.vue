<template>
    <div class="h-song-list">
        <div class="song-title-wrapper">
            <div class="order-title">序号</div>
            <div class="song-title">歌曲</div>
            <div class="singer-title">歌手</div>
        </div>
        <div class="song-list-wrapper">
            <slot name="audio"></slot>
            <slot name="empty"></slot>
            <h-song-item
                    :id="item.id"
                    :song="item.song"
                    :singer="item.singer"
                    :duration="item.duration"
                    @click.native="onHandle(item)"
                    :ref="'active'+item.id"
                    :class="item.id === 1 ? 'h-active':''"
                    v-for="(item,i) in songList" :key="i">
            </h-song-item>
        </div>
    </div>
</template>

<script>
    import HSongItem from "./SongItem";

    export default {
        name: "HSongList",
        components: {HSongItem},
        props: {
            songList: {type: Array, default: () => [], required: true},
        },
        methods: {
            onHandle(item) {
                this.$emit('onChange', item.id);
            }
        },
        mounted() {

        }
    }
</script>

<style scoped lang='scss'>
  .h-active {
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

  .h-song-list {
    font-size: .8rem;

    .song-title-wrapper {
      position: sticky;
      top: 0;
      z-index: 9999;
      display: flex;
      flex-direction: row;
      align-items: center;
      text-align: center;
      background-color: rgba(64, 158, 255, 0.6);

      & > div {
        padding: .2rem .4rem;
        border-right: solid 1px black;
      }

      .order-title {
        width: 10%;
      }

      .song-title {
        flex: 1;
      }

      .singer-title {
        width: 20%;
        border-right: none;
      }

    }
  }
</style>