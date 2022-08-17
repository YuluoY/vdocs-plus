<template>
    <div class="h-comment-area">
        <div class="h-comment">
            <div class="header">
                <div class="img">
                    <img :src="model.imgUrl"/>
                </div>
                <div class="name">
                    <input v-model.trim="model.name" :placeholder="hints.nameHint" @focusout="getUserInfo"/>
                </div>
                <div class="email">
                    <input v-model.trim="model.email" :placeholder="hints.emailHint"/>
                </div>
                <div class="address">
                    <input v-model.trim="model.address" :placeholder="hints.addressHint"/>
                </div>
            </div>
            <div class="center">
                <div class="content">
                    <div
                            ref="textarea"
                            class="textarea"
                            @input="onChangeContent"
                            :style="`color:${model.words ? 'black':'silver'}`"
                            @focus="!model.words && ($refs.textarea.innerText = '')"
                            @focusout="!model.words && ($refs.textarea.innerHTML = hints.contentHint)"
                            contenteditable="true">
                        {{ hints.contentHint }}
                    </div>
                </div>
            </div>
            <div class="footer">
                <div class="count">
                    <div class="words">字数统计：{{ model.words }}</div>
                </div>
                <div class="function">
                    <span @click.prevent="onRelease">发布</span>
                </div>
            </div>
            <div class="close-sub-comment-area"
                 @click="$emit('onReplyStateChange','init')"
                 v-if="!isReplyState">
                <svg-icon icon-class="close"></svg-icon>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "HCommentArea",
        props: {
            isReplyState: Boolean,
            id: String,
        },
        data() {
            return {
                model: {
                    imgUrl: require('@/assets/img/1.jpg'),
                    name: '',
                    email: '',
                    address: '',
                    content: '',
                    words: 0,
                    cname: ''
                },
                hints: {
                    nameHint: 'QQ/匿名昵称',
                    emailHint: '邮箱',
                    addressHint: '博客网址',
                    contentHint: '是时候展现你真正的技术了！（提示：输入QQ号会自动填写头像和邮箱哦~）',
                }
            }
        },
        computed: mapState({
            browserType: state => state.app.browserType,
        }),
        methods: {
            // 发布评论
            async onRelease() {
                if (this.model.content.trim() === '') {
                    this.$message.warning('您还没有填写任何评论哦！')
                    return;
                }
                const brandInfo = navigator.userAgent.replace(/(\()|(\))/g, '').split(' ');
                const system = `${brandInfo[1]} ${brandInfo[3]}`.replace(/(\.0)|(;)/g, '');
                let browser = this.browserType;

                if (this.browserType === 'Chrome') {
                    browser = brandInfo[10].replace(/(\/)/g, ' ');
                } else if (this.browserType === 'Firefox') {
                    browser = brandInfo[8].replace(/(\/)/g, ' ');
                } else if (this.browserType === 'QQBrowser') {
                    browser = brandInfo[12].replace(/(\/)/g, ' ');
                }

                this.model.name === '' && (this.model.name = 'Anonymous')
                this.model.address === '' && (this.model.address = '#')
                this.model.system = system; // 操作系统
                this.model.browser = browser; // 浏览器参数
                this.model.path = decodeURI(this.$route.path);  // 页面
                this.model.cname = (await this.$apis.rest.getUserIp()).data.cname
                if (this.id) {
                    this.model.sub = this.id
                    this.model.isSub = true;
                }

                const res = await this.$apis.web.addComment(this.model);
                if (res) {
                    this.$notify.success(`${this.model.name}成功发布一条评论！`)
                    this.$refs.textarea.innerHTML = this.hints.contentHint;
                    this.model = {
                        imgUrl: require('@/assets/img/1.jpg'),
                        name: '',
                        email: '',
                        address: '',
                        content: '',
                        words: 0,
                    }
                    this.$store.commit('comment/setCommentsByPath', this);
                    this.$emit('onReplyStateChange', 'init')
                }
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
  .h-comment-area {
    .h-comment {
      width: 80em;
      border-radius: 5px;
      box-shadow: 0px 0px 10px silver;
      margin: 30px auto;
      font-size: .8em;
      position: relative;
      z-index: 10;

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
            user-select: none;
            border: dashed 1.5px silver;
            line-height: 3em;
            padding: 7px;
            margin-right: 5px;
            background-color: unset;
            font-size: 1.4em;
            transition: 1s;
            cursor: pointer;
            color: rgba(0, 0, 0, 0.7);

            &:hover {
              color: #409eff;
              border: solid 1.5px #409eff;
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

      .close-sub-comment-area {
        position: absolute;
        right: 10px;
        top: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999999999;
        cursor: pointer;
        font-size: 2em;
        color: silver;
        border: dashed 1.5px silver;
        transition: 1s;

        div {
          padding: 0 8px;
        }

        &:hover {
          border: solid 1.5px #409eff;
          color: #409eff;
        }
      }
    }
  }
</style>