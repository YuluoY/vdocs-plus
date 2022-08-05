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
                        meta: {filePath: '/Article'},
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
                                title: '修改',
                                name: 'ArticleUpdate',
                                path: "/articleUpdate",
                                component: 'ArticleUpdate',
                                icon: 'update',
                            },
                        ]
                    },
                    {
                        id: '3',
                        title: '类别管理',
                        name: 'CategoryManage',
                        path: "/categoryManage",
                        component: 'CategoryManage',
                        icon: 'category',
                    },
                    {
                        id: '4',
                        title: '日志管理',
                        name: 'LogManage',
                        path: '/logManage',
                        component: 'LogManage',
                        icon: 'log'
                    }
                ]
            },

        ]
    },
    mutations: {},
    actions: {},
    modules: {}
}