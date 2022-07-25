export const app = {
    namespaced: true,
    state: {
        header: {
            nav: [
                {
                    id: '0',
                    imgUrl: require('@/assets/img/1.gif'),
                    title: '我的小屋',
                    label: 'Home',
                    chineseLabel: '首页',
                    path: '/home',
                    iconClass: 'home'
                },
                {
                    id: '1',
                    imgUrl: require('@/assets/img/hudieren.jpg'),
                    title: '文章分类',
                    label: 'Category',
                    chineseLabel: '分类',
                    path: '/category',
                    iconClass: 'category',
                    children: [
                        {
                            id: '1-1',
                            imgUrl: require('@/assets/img/1.jpg'),
                            title: '我的文章',
                            label: 'Article',
                            chineseLabel: '我的文章',
                            path: '/category/article'
                        },
                        {
                            id: '1-2',
                            imgUrl: require('@/assets/img/main_img.jpg'),
                            title: '生活随感',
                            label: 'Life',
                            chineseLabel: '生活随感',
                            path: '/category/life'
                        },
                        {
                            id: '1-3',
                            imgUrl: require('@/assets/img/hudieren.jpg'),
                            title: '文摘小屋',
                            label: 'Abstract',
                            chineseLabel: '文摘小屋',
                            path: '/category/abstract'
                        },
                        {
                            id: '1-4',
                            imgUrl: require('@/assets/img/1.jpg'),
                            title: '学习笔记',
                            label: 'Note',
                            chineseLabel: '学习笔记',
                            path: '/category/note'
                        }
                    ]
                },
                {
                    id: '2',
                    imgUrl: require('@/assets/img/1.jpg'),
                    title: '文章归档',
                    label: 'File',
                    chineseLabel: '归档',
                    path: '/file',
                    iconClass: 'guidang'
                },
                {
                    id: '3',
                    imgUrl: require('@/assets/img/main_img.jpg'),
                    title: '关于我',
                    label: 'About',
                    chineseLabel: '关于',
                    path: '/about',
                    iconClass: 'about'
                },
                {
                    id: '4',
                    imgUrl: require('@/assets/img/1.jpg'),
                    title: '留言',
                    label: 'Message',
                    chineseLabel: '留言',
                    path: '/message',
                    iconClass: 'liuyan'
                },
                {
                    id: '5',
                    imgUrl: require("@/assets/img/main_img.jpg"),
                    title: '站点日志',
                    label: 'Log',
                    chineseLabel: '日志',
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
            ]
        },
        section: {
            homePageImg: require('@/assets/img/1.jpg'), // 主页背景图
            drop: {
                speed: 10  // ms
            }
        },
        main: {
            websiteInfo: {  // 站点信息
                img: require('@/assets/img/hudieren.jpg'),
                categoryTag: {
                    articles: [
                        {label: '我的日常', href: '/'}
                    ],
                    skills: [
                        {label: 'JavaScript', href: '/'},
                        {label: 'Vue2', href: '/'},
                        {label: 'Java', href: '/'},
                        {label: 'Node', href: '/'},
                        {label: 'MongoDB', href: '/'}],
                    friends: [
                        {label: '百度', href: 'www.baidu.com'},
                        {label: '雨落', href: '/'}
                    ]
                }
            },
            content: {}
        },
        footer: {
            gifUrl: require('@/assets/img/footer.gif'),
            running: 2222,
            visit: 30000,
            establish: Date.now(),
            permit: '© 2022 YuLuoCoding 鄂ICP备2021017241号'
        },
        sidebar: {
            userInfoArea: {
                title: '关于作者',
                imgUrl: require("@/assets/img/1.jpg"),
                name: '雨落',
                motto: '与其守成法，毋宁尚自然；<br>与其求划一，毋宁展个性。',
                info: {
                    article: 10,
                    comment: 20,
                    running: 1000
                }
            },
            tagInfoArea: {
                title: '标签云'
            },
            friendInfoArea: {
                title: '友人帐'
            }
        },
    },
    mutations: {},
    actions: {},
}