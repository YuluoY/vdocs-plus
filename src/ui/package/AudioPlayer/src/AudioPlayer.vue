<template>
    <div class="h-audio-player" v-show="isDisabled">
        <div class="h-audio-player-wrapper">
            <div class="song-list-wrapper" v-show="isShowSongListX">
                <h-song-list :songList="songList" @onChange="onChange">
                    <template #audio>
                        <audio ref="myAudio" id="h-audio-player"
                               :src="`${currentSong.url}`"></audio>
                    </template>
                    <template #empty>
                        <div v-if="!songList.length" style="text-align: center">暂无歌曲</div>
                    </template>
                </h-song-list>
            </div>
            <div class="player-wrapper">
                <div class="left" ref="left"
                     :title="'当前歌曲：'+currentSong.song">
                    <div class="halt-wrapper"
                         @click.prevent.self="onShrinkPlayer">
                    <span class="halt-icon iconfont icon-zanting"
                          title="播放" v-show="!isPlay"
                          @click="onAudioSwitch"></span>
                        <span class="halt-icon iconfont icon-bofang"
                              title="暂停" v-show="isPlay"
                              @click="onAudioSwitch"></span>
                    </div>
                    <div class="song-img-wrapper">
                        <img src="@/assets/img/main_img.jpg" class="song-img"/>
                    </div>
                </div>
                <div class="right" v-show="isShowSongInfoX">
                    <div class="song-info-wrapper">
                        <div class="song-info">
                            <div class="singer text-ellipse">
                                <span class="iconfont icon-renwu-ren" style="margin-right: 10px;"></span>
                                <span>{{ currentSong.singer }}</span>
                            </div>
                            <div class="song text-ellipse">
                                <span class="iconfont icon-yinle" style="margin-right: 10px;"></span>
                                <span>{{ currentSong.song }}</span>
                            </div>
                            <div class="play-time">
                                <span><span class="iconfont icon-shijian"></span>
                                    {{ currentTimeStr }}</span>
                                /
                                <span>{{ durationStr }}</span>
                            </div>
                            <div class="progress-bar-wrapper"
                                 @click="onChangeProgress">
                                <span class="progress-bar" ref="progressBar"></span>
                            </div>
                            <div class="shrink-icon iconfont icon-xiangzuo1"
                                 :title="`${isShowSongInfoX ? '隐藏' : '打开'}歌曲信息`"
                                 @click="onShrinkPlayer"></div>
                            <div class="song-list-icon iconfont icon-liebiao"
                                 :title="`${isShowSongListX ? '隐藏' : '打开'}歌单列表`"
                                 @click="onSwitchSongList"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import HSongList from "./SongList";

    export default {
        name: "HAudioPlayer",
        components: {HSongList},
        props: {
            isShowSongList: {type: Boolean, default: false}, // 是否展开歌单列表
            isShowSongInfo: {type: Boolean, default: true}, // 是否展示歌曲信息
            volume: {type: Number, default: 1}, // 设置音量
            progressBarColor: {type: String, default: () => '#409eff'}, // 设置进度条颜色
            songList: {type: Array, default: () => []},
            defaultSong: {type: Number, default: 5},
            isDisabled: {type: Boolean, default: true}
        },
        data() {
            return {
                isPlay: false,
                isShowSongListX: this.isShowSongList,
                isShowSongInfoX: this.isShowSongInfo,
                currentSong: {},
                durationStr: '',
                currentTimeStr: '00:00',
            }
        },
        methods: {
            // 设置进度条颜色
            setProgressBarColor(val) {
                this.$refs.progressBar.style.backgroundColor = val;
            },
            // 设置歌曲时长
            setAudioDuration(audio, mode) {
                let M = Math.floor(audio[mode] / 60);
                let S = Math.floor(audio[mode] % 60);
                return `${M < 10 ? ('0' + M) : M}:${S < 10 ? ('0' + S) : S}`
            },
            setAudioVolume(audio, val) {
                if (val >= 0 && val <= 1) {
                    audio.volume = val;
                }
            },

            // 缩小播放器[歌曲信息]
            onShrinkPlayer() {
                this.isShowSongListX && (this.isShowSongListX = !this.isShowSongListX);
                this.isShowSongInfoX = !this.isShowSongInfoX;
                const info = {isShowSongInfo: this.isShowSongInfoX}
                localStorage.setItem('h-audio-player', JSON.stringify(info));
            },
            // 显示/隐藏歌曲列表
            onSwitchSongList() {
                this.isShowSongListX = !this.isShowSongListX;
            },
            // 切换歌曲
            onChange(id) {
                this.onChangeSongBgStyle(id - 1);

                const audio = document.getElementById('h-audio-player');
                audio.pause();
                this.isPlay = false;
                // 歌曲id不存在时自动播放列表第一个
                if (this.songList.some(item => item.id === id)) {
                    this.currentSong = this.songList[id - 1];
                } else {
                    this.currentSong = this.songList[0];
                }
                setTimeout(this.onAudioSwitch)
            },
            onChangeSongBgStyle(id) {
                // 设置当前正在播放的歌曲样式
                $hUtils.dom.deleteClass($hUtils.dom.findAllByClass('h-active')[0], 'h-active');
                $hUtils.dom.addClass($hUtils.dom.findAllByClass('h-song-item')[id], 'h-active');
            },
            // 暂停/播放切换
            onAudioSwitch() {
                const audio = document.getElementById('h-audio-player');
                if (audio.paused) {
                    audio.play().then(() => this.durationStr = this.setAudioDuration(audio, 'duration'))
                    this.countTime(audio)
                    this.isPlay = true;
                } else {
                    audio.pause();
                    clearInterval(this.timer);
                    this.isPlay = false;
                }
            },
            // 修改播放进度
            onChangeProgress(event) {
                const audio = document.getElementById('h-audio-player');
                const progressBar = document.getElementsByClassName('progress-bar')[0];
                const progressBarWrapper = document.getElementsByClassName('progress-bar-wrapper')[0];

                const totalWidth = parseInt(getComputedStyle(progressBarWrapper).width);
                progressBar.style.width = (event.offsetX / totalWidth) * 100 + '%';
                audio.currentTime = (event.offsetX / totalWidth) * audio.duration;
                this.currentTimeStr = this.setAudioDuration(audio, 'currentTime');
            },
            // 计算当前播放时间
            countTime(audio) {
                clearInterval(this.timer);
                const progressBar = document.getElementsByClassName('progress-bar')[0];
                this.timer = setInterval(() => {
                    if (audio.ended) {  // 音频播放完毕后自动切换下一首
                        clearInterval(this.timer);
                        const totalSongNum = this.songList.length;
                        this.onChange(totalSongNum <= this.currentSong.id ? 1 : this.currentSong.id + 1);
                    }
                    this.currentTimeStr = this.setAudioDuration(audio, 'currentTime');
                    progressBar.style.width = (audio.currentTime / audio.duration) * 100 + '%';
                }, 10)
            },
        },
        mounted() {
            this.setProgressBarColor(this.progressBarColor);

            setTimeout(() => {
                this.onChangeSongBgStyle(this.defaultSong)
                this.currentSong = this.songList[this.defaultSong]
            })

            // setTimeout(() => this.onChange(this.defaultSong + 1))

            const audio = document.getElementById('h-audio-player');
            audio.load();  // 加载音频
            audio.oncanplay = () => {  // 音频能播放时执行
                this.durationStr = this.setAudioDuration(audio, 'duration');
                this.setAudioVolume(audio, this.volume);

                setTimeout(() => {
                    if(JSON){
                        const info = JSON.parse(localStorage.getItem('h-audio-player') || '{}');
                        this.isShowSongInfoX = info.isShowSongInfo;
                    }
                }, 500)
            }
        }
    }
</script>

<style scoped lang="scss">
  .text-ellipse {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis; // 隐藏超过的文本
    white-space: nowrap; // 不换行
  }

  .h-audio-player {
    //font-size: 16px;

    //width: 25em;
    position: fixed;
    left: 0;
    bottom: 1rem;
    background-color: white;
    transition: 1s;
    user-select: none;
    border-top: solid .1px black;
    border-right: solid .1px black;
    border-bottom: solid .1px black;
    z-index: 9999999999999999999;

    .h-audio-player-wrapper {
      width: 100%;

      .song-list-wrapper {
        max-height: 20rem;
        overflow-y: auto;
        transition: 1s;
      }

      .player-wrapper {
        //width: 100%;
        height: 6rem;
        display: flex;
        flex-direction: row;
        position: relative;
        bottom: 0;

        //#region audio left style
        .left {
          width: 6rem;
          position: relative;

          .halt-wrapper {
            width: 100%;
            line-height: 6rem;
            position: absolute;
            text-align: center;
            color: white;

            .halt-icon {
              font-size: 3rem;
              user-select: none;

              &:hover {
                cursor: pointer;
              }
            }
          }

          .song-img-wrapper {
            .song-img {
              width: 100%;
              height: 6rem;
            }
          }
        }

        //#endregion

        //#region audio right style
        .right {
          //width: 100%;
          width: 19rem;
          font-size: 14px;

          .song-info-wrapper {
            position: relative;

            .song-info {
              width: 100%;
              margin-left: 1rem;


              .singer, .song, .play-time {
                font-size: 1rem;
                width: 90%;
                margin-top: .2rem;
              }

              .play-time {
                margin-bottom: .3rem;
              }

              .progress-bar-wrapper {
                //width: 240px;
                width: 12rem;
                height: .8rem;
                border: solid .1px black;
                border-radius: 15px;
                display: flex;
                align-items: center;
                background-color: rgba(0, 0, 0, 0.05);

                &:hover {
                  cursor: pointer;
                }

                .progress-bar {
                  display: inline-block;
                  border-radius: 5px;
                  height: .8rem;
                  position: relative;

                  &:after {
                    position: absolute;
                    right: -.5rem;
                    top: -.15rem;
                    content: '';
                    width: 1rem;
                    height: 1rem;
                    border-radius: 50%;
                    border: solid .1px black;
                    background-color: #409eff;
                  }
                }
              }

              .shrink-icon {
                position: absolute;
                right: -5px;
                font-size: 2.5rem;
                color: #409eff;
                bottom: 0;
                z-index: 999;

                &:hover {
                  cursor: pointer;
                }
              }

              .song-list-icon {
                position: absolute;
                right: 5px;
                top: .3rem;
                font-size: 1.2rem;
                color: #409eff;

                &:hover {
                  cursor: pointer;
                }
              }
            }
          }
        }

        //#endregion
      }
    }
  }
</style>