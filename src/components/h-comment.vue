<template>
    <div class="h-comment-wrapper"
         :style="`flex-direction: ${isReverse ? 'column-reverse' : 'column'}`">
        <div class="h-comment">
            <div class="header">
                <div class="img">
                    <img :src="imgUrl"/>
                </div>
                <div class="name">
                    <input v-model="name" :placeholder="nameHint" @focusout="getUserInfo"/>
                </div>
                <div class="email">
                    <input v-model="email" :placeholder="emailHint"/>
                </div>
                <div class="address">
                    <input v-model="address" :placeholder="addressHint"/>
                </div>
            </div>
            <div class="center">
                <div class="content">
                    <div
                            ref="textarea"
                            class="textarea"
                            @input="onChangeContent"
                            :style="`color:${words ? 'black':'silver'}`"
                            @focus="!words && ($refs.textarea.innerHTML = '')"
                            @focusout="!words && ($refs.textarea.innerHTML = contentHint)"
                            contenteditable="true">
                        {{ contentHint }}
                    </div>
                </div>
            </div>
            <div class="footer">
                <div class="count">
                    <div class="words">字数统计：{{ words }}</div>
                </div>
                <div class="function" @click.prevent="onRelease">
                    <span>发布</span>
                </div>
            </div>
        </div>
        <div class="comment-display-wrapper">
            <div class="comment-title">{{ commentInfo.length }}条评论</div>
            <div class="comment-item-wrapper">
                <div class="comment-item"
                     v-for="(item, i) in commentInfo" :key="i">
                    <div class="top-info">
                        <img src="../assets/img/1.jpg" alt="头像" class="img"/>
                        <div class="right">
                            <div class="name">
                                <span>{{ item.name }}</span>
                                <span>{{ item.brand }}</span>
                            </div>
                            <div class="releaseDate">{{ item.releaseDate }}</div>
                        </div>
                    </div>
                    <div class="content-wrapper">
                        <div class="main">{{ item.content }}</div>
                        <div class="main-func">
                            <div>回复</div>
                            <div>
                                <span>👍</span>
                                <span>{{ item.like }}</span>
                            </div>
                            <div>
                                <span>👎</span>
                                <span>{{ item.dislike }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import log from "@/views/Log";

    export default {
        name: "HComment",
        props: {
            isReverse: {type: Boolean, default: false}
        },
        data() {
            return {
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
        },
        methods: {
            onRelease() {
                const brandInfo = navigator.userAgent.replace(/(\()|(\))/g, '').split(' ');
                const system = `${brandInfo[1]} ${brandInfo[3]}`.replace(/(\.0)|(;)/g, '');
                const browser = brandInfo[10].replace(/(\/)/g, ' ');

                const data = {};
                data.imgUrl = this.imgUrl;
                data.name = this.name;
                data.email = this.email;
                data.address = this.address || '地球村';
                data.content = this.content;
                data.words = this.words;
                data.system = system;
                data.browser = browser;
                data.path = this.$route.path;

                this.$refs.textarea.innerHTML = this.contentHint;
                this.words = 0
            },
            onChangeContent() {
                this.content = this.$refs.textarea.innerHTML;
                this.words = this.replaceAll(this.content, ['&nbsp;', ' ', '<br>', '<div>', '</div>'], '').length;
            },
            getUserInfo() {
                const user = JSON.parse(localStorage.getItem('userQQInfo') || "{}").data;
                // if (user && user.name === this.name) return;
                if (this.name) {
                    const xhr = new XMLHttpRequest();
                    xhr.open('GET', 'https://api.usuuu.com/qq/' + this.name);
                    xhr.send();
                    xhr.onreadystatechange = () => {
                        if (xhr.readyState === 4) {
                            if (xhr.status >= 200 && xhr.status < 300) {
                                localStorage.setItem('userQQInfo', xhr.response);
                                const data = JSON.parse(xhr.response).data;
                                this.name = data.name;
                                this.imgUrl = data.avatar;
                                this.email = `${data.qq}@qq.com`
                            } else {
                                this.imgUrl = require('../assets/img/1.jpg');
                                this.email = ''
                            }
                        }
                    }
                } else {
                    this.imgUrl = require('../assets/img/1.jpg');
                    this.email = ''
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
            commentInfo: state => state.comment.commentInfo
        }),
        mounted() {
            const data = JSON.parse(localStorage.getItem('userQQInfo') || '{}').data;
            if (data) {
                this.name = data.name;
                this.imgUrl = data.avatar;
                this.email = `${data.qq}@qq.com`
            }
        }
    }
</script>

<style scoped lang="scss">
  .h-comment-wrapper{
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
            font-family: 宋体;
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

            .img {
              width: 50px;
              height: 50px;
              border-radius: 50%;
            }

            .right {
              flex-grow: 1;
              padding: 0 1em;
              line-height: 1.7em;

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
              margin-bottom: 50px;
              align-items: center;

              & > div {
                cursor: pointer;
                margin-right: 20px;
              }
            }
          }
        }
      }
    }
  }

</style>