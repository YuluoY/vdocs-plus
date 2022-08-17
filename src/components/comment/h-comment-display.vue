<template>
    <div class="h-comment-display" v-on="$listeners">
        <div class="comment-display-wrapper">
            <div class="comment-item-wrapper">
                <div class="comment-item"
                     v-for="(item, i) in comments" :key="i">
                    <div class="top-info">
                        <img v-lazy="item.imgUrl" alt="头像" class="img"/>
                        <div class="right">
                            <div class="top">
                                <a :href="isAddress(item.address)  ? 'javascript:void(0);' : item.address"
                                   :style="`${isAddress(item.address) && 'cursor: text;'}`">
                                    <div class="name" :id="item._id">{{ item.name }}</div>
                                </a>
                                <div class="browser base-sign hover-blue">
                                    <svg-icon icon-class="browser" style="margin-right: 5px;"></svg-icon>
                                    <span>{{ item.browser }}</span>
                                </div>
                                <div class="system base-sign hover-blue">
                                    <svg-icon icon-class="system" style="margin-right: 5px;"></svg-icon>
                                    <span>{{ item.system }}</span>
                                </div>
                                <div class="cname base-sign hover-blue">
                                    <svg-icon icon-class="address" style="margin-right: 5px;"></svg-icon>
                                    <span>{{ item.cname }}</span>
                                </div>
                            </div>
                            <div class="createdAt">
                                <span class="hover-blue">{{ formatDate(item.createdAt) }}</span>
                            </div>
                        </div>
                    </div>
                    <div :class="at ? 'content-wrapper content-wrapper-sub':'content-wrapper'">
                        <div class="main" :style="at && 'margin-left:70px;'">
                            <a v-if="at" class="at"
                               @click="jump(isArrayObject(item.sub,'_id')?id:item.sub[0])">
                                @{{ isArrayObject(item.sub, '_id') ? at : idToName[item.sub[0]] }}：
                            </a>
                            <span>{{ item.content }}</span>
                        </div>
                        <div class="main-func">
                            <div @click="onReplyStateChange(item._id)"
                                 class="iconfont icon-reply-"
                                 title="回复😀"></div>
                            <div>
                                <span @click.prevent="onLike(item._id, $event)"
                                      class="like iconfont icon-like" title="赞一个🤭"></span>
                                <span style="margin-left: 5px;">{{ item.like }}</span>
                            </div>
                            <div>
                                <span @click="onLike(item._id, $event)"
                                      class="dislike iconfont icon-dislike" title="踩一下🤬"></span>
                                <span style="margin-left: 5px">{{ item.dislike }}</span>
                            </div>
                        </div>
                        <div class="reply-area-wrapper">
                            <h-comment-area
                                    :id="item._id"
                                    :is-reply-state="isReplyState"
                                    @onReplyStateChange="onReplyStateChange"
                                    v-if="states[item._id]"
                            ></h-comment-area>
                        </div>
                        <div v-if="isArrayObject(item.sub, '_id')">
                            <h-comment-display
                                    :isSubComment="true"
                                    :at="item.name"
                                    :id="item._id"
                                    :idToName="idToName"
                                    :comments="item.sub"
                                    :is-reply-state="isReplyState"
                                    :states="states"
                                    :on-reply-state-change="onReplyStateChange"></h-comment-display>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import HComment from "@/components/comment/h-comment";
    import HCommentArea from "@/components/comment/h-comment-area";
    import dayjs from "dayjs";
    import './assets/css/iconfont.css'

    export default {
        name: "HCommentDisplay",
        components: {HCommentArea, HComment},
        props: {
            comments: {type: Array, default: () => []}, // 评论数组
            isReplyState: Boolean, // 全局回复状态变量
            states: Object, // 状态表，每一个评论就有一个id，每一个id就在表中有一个状态，初始值是false，即不显示。
            onReplyStateChange: Function, // 这是h-comment组件的方法，用于改变全局的回复状态
            isSubComment: {type: Boolean, default: false}, // 这个变量可以告诉display组件传过来的comments是不是子评论
            at: String,  // 传过来的是被回复者的name值，@XX
            id: String,  // 用于定位name上div的id，然后进行jump
            idToName: Object
        },
        data() {
            return {
                statesX: '',
            }
        },
        watch: {
            states(newVal) {
                this.statesX = newVal;
            }
        },

        methods: {
            isAddress(address) {
                return address === '#'
            },
            isArrayObject(arr, unique) {
                return arr.every(i => i.hasOwnProperty(unique));
            },
            jump(id) {
                Object.keys(this.statesX).forEach(k => {
                    const n = document.getElementById(k);
                    if (n.style.color === 'red') {
                        n.style.color = 'black' // 设置姓名为红色的恢复为黑色
                    }
                })
                let tar = document.getElementById(id)// 获取需要滚动的距离
                tar.style.color = 'red'; // 设置被点击@的name为红色
                let total = tar.parentNode.offsetTop;
                let currentScrollTop = document.body.scrollTop;
                const upOrDown = total - currentScrollTop;

                const header = window.location.origin // http://localhost/8080
                const path = window.location.hash.substring(1).split('#')[0] // 路由路径
                const anchor = tar.id // 锚点名称
                window.location.href = `${header}/#${path}#${anchor}`

                clearInterval(this.timer)
                this.timer = setInterval(_ => {
                    // 减去顶部导航高度，并与当前滚动条位置高度比对
                    if (upOrDown > 0) {
                        if (currentScrollTop >= total) {
                            clearInterval(this.timer);
                        }
                        document.body.scrollTo(0, currentScrollTop += 5)
                    } else {
                        if (currentScrollTop <= total) {
                            clearInterval(this.timer);
                        }
                        document.body.scrollTo(0, currentScrollTop -= 5)
                    }
                }, 1)
            },
            // 点赞
            async onLike(_id, event) {
                const userInfo = (await this.$apis.rest.getUserIp()).data;
                console.log(userInfo)
                const field = event.target.className.split(' ')[0];

                this.$apis.web.updateLike({_id, field, userInfo}).then(res => {
                    if (res) {
                        this.$store.commit('comment/setCommentsByPath', this);
                        event.target.style.color = 'red';
                    }
                })
            },
            formatDate(val) {
                const currVal = new Date(val).getTime()
                const model = {
                    'year': '年',
                    'month': '月',
                    'week': '周',
                    'day': '天',
                    'hour': '小时',
                    'minute': '分钟',
                    'second': '秒',
                    'millisecond': '毫秒'
                }
                const timeModel = Object.keys(model).filter(k => dayjs(Date.now()).diff(currVal, k))[0]
                const timeDiff = dayjs(Date.now()).diff(currVal, timeModel);
                return `${timeDiff}${model[timeModel]}前`
            }
        },
    }
</script>

<style scoped lang="scss">
  .at {
    color: #409eff !important;
    cursor: pointer;

    &:hover {
      color: #41B883 !important;
    }
  }

  .comment-display-wrapper {
    width: 64em;
    margin: 0 auto;
    position: relative;
    z-index: 10;

    .comment-item-wrapper {
      display: flex;
      flex-direction: column;
      margin-top: 10px;

      .comment-item {
        .top-info {
          display: flex;
          align-items: center;

          .img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }

          .right {
            flex-grow: 1;
            padding: 0 1em;
            line-height: 2em;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            border-right: solid 1px black;

            .top {
              display: flex;

              .name {
                font-size: 1.2em;
              }

              .base-sign {
                font-size: .9em;
                margin-left: 2em;
                color: silver;
              }
            }

            .createdAt {
              color: silver;
              font-size: .9em;
            }
          }
        }

        .content-wrapper-sub {
          width: 100% !important;
        }

        .content-wrapper {
          display: flex;
          flex-direction: column;
          width: 93%;
          float: right;

          .main {
            flex: 1;
            border-right: solid 1px black;
          }

          .main-func {
            display: flex;
            flex: 1;
            align-items: center;
            justify-content: flex-end;
            border-bottom: solid 1px black;
            border-right: solid 1px black;

            & > div {
              display: inline-block;
              cursor: pointer;
              margin-right: 20px;
            }
          }

          // reply
          .reply-area-wrapper {
            margin-bottom: 30px;
          }
        }
      }
    }
  }
</style>