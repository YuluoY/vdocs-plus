<template>
    <div class="h-comment-wrapper"
         :style="`flex-direction: ${isReverse ? 'column-reverse' : 'column'}`">
        <div class="h-comment">
            <div class="header">
                <div class="img">
                    <img :src="model.imgUrl"/>
                </div>
                <div class="name">
                    <input v-model.trim="model.name" :placeholder="model.nameHint" @focusout="getUserInfo"/>
                </div>
                <div class="email">
                    <input v-model.trim="model.email" :placeholder="model.emailHint"/>
                </div>
                <div class="address">
                    <input v-model.trim="model.address" :placeholder="model.addressHint"/>
                </div>
            </div>
            <div class="center">
                <div class="content">
                    <div
                            ref="textarea"
                            class="textarea"
                            @input="onChangeContent"
                            :style="`color:${model.words ? 'black':'silver'}`"
                            @focus="!model.words && ($refs.textarea.innerHTML = '')"
                            @focusout="!model.words && ($refs.textarea.innerHTML = model.contentHint)"
                            contenteditable="true">
                        {{ model.contentHint }}
                    </div>
                </div>
            </div>
            <div class="footer">
                <div class="count">
                    <div class="words">字数统计：{{ model.words }}</div>
                </div>
                <div class="function" @click.prevent="onRelease">
                    <span>发布</span>
                </div>
            </div>
        </div>
        <div class="comment-display-wrapper">
            <div class="comment-title">{{ title }}</div>
            <div class="comment-item-wrapper">
                <div class="comment-item"
                     v-for="(item, i) in comments" :key="i">
                    <div class="top-info">
                        <img :src="item.imgUrl" alt="头像" class="img"/>
                        <div class="right">
                            <div class="top">
                                <span class="name">{{ item.name }}</span>
                                <span class="system">{{ item.system }}</span>
                                <span class="browser">{{ item.browser }}</span>
                            </div>
                            <div class="releaseDate">{{ item.releaseDate }}</div>
                        </div>
                    </div>
                    <div class="content-wrapper">
                        <div class="main">{{ item.content }}</div>
                        <div class="main-func">
                            <div @click="onReplay(item._id)">回复</div>
                            <div>
                                <span @click="onLike(item._id, $event)" class="like">👍</span>
                                <span>{{ item.like }}</span>
                            </div>
                            <div>
                                <span @click="onLike(item._id, $event)" class="dislike">👎</span>
                                <span>{{ item.dislike }}</span>
                            </div>
                        </div>
                        <div class="reply-area-wrapper" :ref="item._id" style="display: none">回复评论区</div>
                    </div>
                </div>
            </div>
        </div>
        <!--        <div v-else style="text-align: center; font-size: 2em; font-weight: bolder">暂无评论．<{=．．．．</div>-->
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "HComment",
        props: {
            isReverse: {type: Boolean, default: false}
        },
        data() {
            return {
                model: {
                    imgUrl: require('../assets/img/1.jpg'),
                    name: '',
                    nameHint: 'QQ/匿名昵称',
                    email: '',
                    emailHint: '邮箱',
                    address: '',
                    addressHint: '地址或博客',
                    content: '',
                    contentHint: '是时候展现你真正的技术了！',
                    words: 0,
                }
            }
        },
        methods: {
            // 发布评论
            async onRelease() {
                console.log(this.model.content)
                if (this.model.content.trim() === '') {
                    this.$message.warning('您还没有填写任何评论哦！')
                    return;
                }
                const brandInfo = navigator.userAgent.replace(/(\()|(\))/g, '').split(' ');
                const system = `${brandInfo[1]} ${brandInfo[3]}`.replace(/(\.0)|(;)/g, '');
                const browser = brandInfo[10].replace(/(\/)/g, ' ');

                this.model.name === '' && (this.model.name = 'Anonymous')
                this.model.address === '' && (this.model.address = '地球村')
                this.model.system = system; // 操作系统
                this.model.browser = browser; // 浏览器参数
                this.model.path = decodeURI(this.$route.path);  // 页面

                const res = await this.$apis.web.addComment(this.model);
                if (res) {
                    this.$notify.success(`${this.model.name}成功发布一条评论！`)
                    this.$refs.textarea.innerHTML = this.model.contentHint;
                    this.model.words = 0
                    this.model.name = ''
                    this.model.address = ''
                    this.$store.commit('comment/setCommentsByPath', this);
                }
            },
            // 回复
            onReplay(id) {
                const display = this.$refs[id][0].style.display;
                if (display === 'none') {
                    this.$refs[id][0].style.display = 'block';
                } else if (display === 'block') {
                    this.$refs[id][0].style.display = 'none';
                }
            },
            // 点赞
            async onLike(_id, event) {
                const userInfo = (await this.$apis.web.getUserIp()).data;
                const field = event.target.className;

                this.$apis.web.updateLike({_id, field, userInfo}).then(res => {
                    this.$store.commit('comment/setCommentsByPath', this);
                })

            },
            onChangeContent() {
                this.model.content = this.$refs.textarea.innerText;
                this.model.words = this.replaceAll(this.model.content,
                    ['&nbsp;', ' ', '<br>', '<div>', '</div>'], '').length;
            },
            getUserInfo() {
                const user = JSON.parse(localStorage.getItem('userQQInfo') || "{}").data;
                // if (user && user.name === this.name) return;
                if (this.model.name) {
                    const xhr = new XMLHttpRequest();
                    xhr.open('GET', 'https://api.usuuu.com/qq/' + this.model.name);
                    xhr.send();
                    xhr.onreadystatechange = () => {
                        if (xhr.readyState === 4) {
                            if (xhr.status >= 200 && xhr.status < 300) {
                                localStorage.setItem('userQQInfo', xhr.response);
                                const data = JSON.parse(xhr.response).data;
                                this.model.name = data.name;
                                this.model.imgUrl = data.avatar;
                                this.model.email = `${data.qq}@qq.com`
                            } else {
                                this.model.imgUrl = require('@/assets/img/1.jpg');
                                this.model.email = ''
                            }
                        }
                    }
                } else {
                    this.model.imgUrl = require('@/assets/img/1.jpg');
                    this.model.email = ''
                }
            },

            replaceAll(str, searchVal, replVal) {
                if (typeof searchVal === "string") {
                    str = str.replaceAll(searchVal, replVal);
                } else if (typeof searchVal === 'object') {
                    searchVal.forEach(s => str = str.replaceAll(s, replVal))
                }
                return str;
            }
        },
        computed: mapState({
            comments: state => state.comment.comments,
            title() {
                let title = '';
                if (this.comments.length === 0) {
                    if (this.$route.path !== '/message') {
                        title = '暂无评论'
                    } else {
                        title = '暂无留言'
                    }
                } else {
                    title = '共' + this.comments.length + '条评论';
                    if (this.$route.path === '/message') title = '共' + this.comments.length + '条留言';
                }
                return title
            }
        }),
        mounted() {
            const data = JSON.parse(localStorage.getItem('userQQInfo') || '{}').data;
            if (data) {
                this.model.name = data.name;
                this.model.imgUrl = data.avatar;
                this.model.email = `${data.qq}@qq.com`
            }
        }
    }
</script>

<style scoped lang="scss">
  .h-comment-wrapper {
    display: flex;

    .h-comment {
      width: 80em;
      border-radius: 5px;
      box-shadow: 0px 0px 10px silver;
      margin: 30px auto;
      font-size: .8em;

      .header {
        display: flex;
        padding: 0 1em;

        .img {
          img {
            width: 50px;
            height: 50px;
            border-radius: 5px;
            margin-top: 10px;
            margin-right: 10px;
          }
        }

        .name {
          line-height: 78px;
          flex: 1;
        }

        .email {
          line-height: 78px;
          flex: 1;
        }

        .address {
          line-height: 78px;
          flex: 1;
        }

        input {
          line-height: 3em;
          display: inline-block;
          width: 100%;
          border: none;
          border-bottom: 1px dashed rgba(0, 0, 0, 0.2);
          font-size: 1.3em;

          &:focus {
            outline: none;
            border: none;
            border-bottom: 1px dashed #409eff;
          }
        }
      }

      .center {
        width: 100%;
        position: relative;

        .content {
          width: 98%;
          margin: 0 auto;
          padding: 1em;

          .textarea {
            outline: none;
            border: none;
            word-break: break-all;
            width: 100%;
            min-height: 220px;
            overflow: hidden;
            font-family: 宋体, sans-serif;
            font-size: 1.2em;
          }
        }
      }

      .footer {
        border-top: dashed 1px silver;
        display: flex;

        .function {
          flex-grow: 1;
          text-align: right;

          span {
            border: none;
            line-height: 60px;
            margin: .3em 1em;
            background-color: unset;
            font-size: 1.4em;
            transition: .6s;
            color: rgba(0, 0, 0, 0.7);

            &:hover {
              cursor: pointer;
              color: #409eff;
            }
          }
        }

        .count {
          width: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1em;

          .words {
            font-size: 1.2em;
            color: silver;
          }
        }
      }
    }

    .comment-display-wrapper {
      width: 64em;
      margin: 20px auto;

      .comment-title {
        font-size: 1.8em;
        font-weight: bolder;
        letter-spacing: 10px;
        color: #34495E;
        transition: .7s;
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;

        &:active {
          transform: rotateX(360deg);
          text-align: right;
          background-color: #409eff;
        }
      }

      .comment-item-wrapper {
        display: flex;
        flex-direction: column;
        margin-top: 20px;

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
              line-height: 1.7em;

              .top {
                .name {
                  font-size: 1.2em;
                }

                .system {
                  font-size: .9em;
                  margin-left: 2em;
                  color: silver;
                }

                .browser {
                  font-size: .9em;
                  margin-left: 2em;
                  color: silver;
                }
              }

              .releaseDate {
                color: silver;
              }
            }
          }

          .content-wrapper {
            display: flex;
            flex-direction: column;
            width: 93%;
            float: right;
            padding: 10px 0;

            .main {
              flex: 1;
            }

            .main-func {
              display: flex;
              color: red;
              margin-top: 20px;
              margin-bottom: 10px;
              align-items: center;

              & > div {
                cursor: pointer;
                margin-right: 20px;
              }
            }

            .reply-area-wrapper {
              margin-bottom: 30px;
            }
          }
        }
      }
    }
  }

</style>