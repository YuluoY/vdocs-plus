import {objValModByPath} from "@/utils";

export default {
    namespaced: true,
    state: {
        browserType: '',
        header: {
            nav: [
                {
                    id: '0',
                    imgUrl: require('@/assets/img/1.gif'),
                    title: '我的小屋',
                    component: 'Home',
                    label: '首页',
                    path: '/home',
                    iconClass: 'home'
                },
                {
                    id: '1',
                    imgUrl: require('@/assets/img/hudieren.jpg'),
                    title: '文章分类',
                    label: '分类',
                    path: '/category',
                    component: 'Category',
                    iconClass: 'category',
                    children: [
                        {
                            id: '1-1',
                            imgUrl: require('@/assets/img/1.jpg'),
                            title: '编程文章',
                            label: '编程文章',
                            component: 'Article',
                            path: '/category/article'
                        },
                        {
                            id: '1-2',
                            imgUrl: require('@/assets/img/main_img.jpg'),
                            title: '生活随感',
                            label: '生活随感',
                            component: 'Life',
                            path: '/category/life'
                        },
                        {
                            id: '1-3',
                            imgUrl: require('@/assets/img/hudieren.jpg'),
                            title: '文摘小屋',
                            label: '文摘小屋',
                            component: 'Abstract',
                            path: '/category/abstract'
                        },
                        {
                            id: '1-4',
                            imgUrl: require('@/assets/img/1.jpg'),
                            title: '学习笔记',
                            label: '学习笔记',
                            component: 'Note',
                            path: '/category/note'
                        },
                        {
                            id: '1-5',
                            imgUrl: require('@/assets/img/7.jpg'),
                            title: '我的空间',
                            label: '我的空间',
                            component: 'Space',
                            path: '/category/space'
                        }
                    ]
                },
                {
                    id: '2',
                    imgUrl: require('@/assets/img/1.jpg'),
                    title: '文章归档',
                    label: '归档',
                    component: 'File',
                    path: '/file',
                    iconClass: 'guidang'
                },
                {
                    id: '3',
                    imgUrl: require('@/assets/img/main_img.jpg'),
                    title: '关于我',
                    label: '关于',
                    component: 'About',
                    path: '/about',
                    iconClass: 'about'
                },
                {
                    id: '4',
                    imgUrl: require('@/assets/img/1.jpg'),
                    title: '留言',
                    label: '留言',
                    component: "Message",
                    path: '/message',
                    iconClass: 'liuyan'
                },
                {
                    id: '5',
                    imgUrl: require("@/assets/img/main_img.jpg"),
                    title: '站点日志',
                    label: '日志',
                    component: 'Log',
                    path: '/log',
                    iconClass: 'log'
                },
            ],
            contact: [
                {
                    title: '腾讯QQ',
                    label: 'QQ',
                    href: 'https://wpa.qq.com/msgrd?v=3&uin=568055454&site=qq&menu=yes&jumpflag=1',
                    iconClass: 'qq'
                },
                {
                    title: '微信',
                    label: 'WeChat',
                    href: require("@/assets/img/1.jpg"),
                    iconClass: 'WeChat'
                },
                {
                    title: '世界上最大的男性交友平台',
                    label: 'GitHub',
                    href: 'https://github.com/YuluoY',
                    iconClass: 'github'
                },
                {
                    title: '在垃圾堆里找金子',
                    label: 'CSDN',
                    href: 'https://blog.csdn.net/weixin_42390185?type=blog',
                    iconClass: 'CSDN'
                }
            ],
        },
        section: {
            homePageImg: require('@/assets/img/1.jpg'), // 主页背景图
            drop: {
                speed: 10  // ms
            }
        },
        main: {
            content: {
                articles: [],
                defaultArticleImg: require('@/assets/img/hudieren.jpg')
            }
        },
        footer: {
            gifUrl: require('@/assets/img/footer.gif'),
            running: 2222,
            visit: 30000,
            establish: Date.now(),
            website: '©2021-2022 By 雨落',
            permit: '鄂ICP备2021017241号'
        },
        sidebar: {
            userInfoArea: {
                title: '作者',
                imgUrl: require("@/assets/img/8.jpg"),
                name: '雨落',
                motto: '愿理想与现实不谋而合。',
                info: {
                    article: 10,
                    comment: 20,
                    running: 1000
                }
            },
            tagInfoArea: {
                title: '标签云',
                tags: []
            },
            recentlyCommentArea: {
                title: '最新评论',
                comments: []
            },
            friendInfoArea: {
                title: '友人帐',
                friends: []
            },
            websiteInfoArea: {
                title: '小破站',
                info: {
                    establish: '2022-08-14 09:09:22', // 建站时间
                    visitNum: 1000, // 访问次数
                    visitorNum: 10,  // 访问人数
                    running: 1660439362000
                }
            }
        },
        pages: {
            logPage: {
                logs: [],
                articles: []
            }
        }
    },
    mutations: {
        setBrowserType(state, browserType) {
            state.browserType = browserType;
        },
        async setContentArticles(state, [that, params]) {
            state.main.content.articles = (await that.$apis.web.getArticles(params)).data
            localStorage.setItem('vdocs-articles', JSON.stringify(state.main.content.articles))
        },
        addContentArticles(state, arr) {
            state.main.content.articles.push(...arr);
            localStorage.setItem('vdocs-articles', JSON.stringify(state.main.content.articles))
        },
        async setLogs(state, that) {
            state.pages.logPage.logs = (await that.$apis.web.getLogs()).data
        },
        async setArticles(state, that) {
            state.pages.logPage.articles = (await that.$apis.web.getArticles()).data;
        },
        setSidebar(state, {path, target, model = 'emerge'}){
            this.getters['app/getCommentNum'] = state.sidebar.userInfoArea.info.comment
            objValModByPath(path, state.sidebar, target, model)
        },
    },
    actions: {},
    getters: {
        getBrowserType(state) {
            return state.browserType;
        },
        getContentArticles(state) {
            return state.main.content.articles;
        },
        getLogs(state) {
            return state.pages.logPage.logs;
        },
        getArticles(state) {
            return state.pages.logPage.articles;
        },
        getDefaultArticleImg(state) {
            return state.main.content.defaultArticleImg;
        },
        getArticleNum(state) {
            return state.sidebar.userInfoArea.info.article;
        },
        getCategoryTags(state) {
            return state.sidebar.tagInfoArea.tags;
        },
    }
}