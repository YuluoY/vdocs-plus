<template>
    <div class="login">
        <div class="bg-blur"></div>
        <div class="login-wrapper">
            <div class="box">
                <div>
                    <label>
                        用户名：<input v-model="model.username"
                                   type="text" placeholder="请输入用户名" autofocus/>
                    </label>
                </div>
                <div>
                    <label style="margin-left: 20px;">
                        密码：<input v-model="model.password" type="password" placeholder="请输入密码"/>
                    </label>
                </div>
                <div>
                    <h-button type="primary" title="登录"
                              @click.native="onLogin">登录
                    </h-button>
                    <h-button type="primary" title="返回主页继续浏览"
                              @click.native="$router.push('/')">返回
                    </h-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                model: {},
                blur: 4
            }
        },
        methods: {
            onLogin() {
                if (this.model.username && this.model.password) {
                    this.$apis.web.loginApi(this.model).then(res => {
                        this.$store.commit('router/changeLoginState', true)
                        this.$store.commit('router/saveAdminInfo', res.data)
                        this.$notify.success(`尊贵的SSSVIP用户,${res.data.realName}先生已登录！`)
                        this.$router.push('/admin')
                    }, err => {
                        this.model = {};
                        this.$notify.error(err.response.data)
                    })
                }
            }
        },
        mounted() {
            // getComputedStyle(bg).filter.match(/\d+(.\d+)?/g)[0]
            const bg = document.getElementsByClassName('bg-blur')[0];
            bg.style.filter = `blur(${this.blur++}px);`
            window.onmousewheel = document.onmousewheel = (e) => {
                if (e.wheelDelta < 0) {
                    bg.style.cssText = `filter:blur(${this.blur += 0.1}px);`
                } else if (e.wheelDelta > 0) {
                    bg.style.cssText = `filter:blur(${this.blur -= .1}px);`
                }
            }
        }
    }
</script>

<style scoped lang="scss">

</style>