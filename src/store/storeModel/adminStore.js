export default {
    namespaced: true,
    state: {
        sidebar: [
            {
                title: '管理员操作',
                name: 'Admin',
                path: '/admin',
                component: 'Admin',
                children: [
                    {
                        id: '0',
                        title: '网站管理',
                        name: 'WebSideManage',
                        path: '/webSideManage',
                        component: 'WebSideManage',
                        icon: '',
                        children: [
                            {title: '顶部导航', name: 'TopNav', path: '/topNav', component: 'TopNav'}
                        ]
                    },
                    {
                        id: '1',
                        title: '用户管理',
                        name: 'UserManage',
                        path: '/userManage',
                        component: 'UserManage',
                        icon: 'author'
                    },
                    {
                        id: '2',
                        title: '文章管理',
                        name: 'ArticleManage',
                        path: '/articleManage',
                        component: 'ArticleManage',
                        redirect: '/articleWrite',
                        icon: 'article',
                        children: [
                            {
                                id: "2-1",
                                title: '撰写',
                                name: 'ArticleWrite',
                                path: "/articleWrite",
                                component: 'ArticleWrite',
                                icon: 'write',
                            },
                            {
                                id: "2-2",
                                title: '类别',
                                name: 'ArticleCategory',
                                path: "/articleCategory",
                                component: 'ArticleCategory',
                                icon: 'category',
                            },
                        ]
                    },
                ]
            },

        ]
    },
    mutations: {},
    actions: {},
    modules: {}
}