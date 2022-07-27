export const staticRoutes = [
    {
        path: '/',
        redirect: '/home'
    },
    // {
    //     path: '/home',
    //     name: 'Home',
    //     component: () => import('@/views/Home')
    // },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login')
    },
    {
        path: '/admin',
        name: 'Admin',
        component: () => import('@/server/Admin')
    }
]

// 构建动态路由
export function build(arr, firstPath = 'views', routes = []) {
    const routerArr = routes
    arr.forEach(item => {
        const router = {};
        if (!routerArr.includes(item.path)) {
            router.path = item.path;
            router.component = () => import(`@/${firstPath}/${item.label}`);
            router.meta = item;
            if (item.children) {
                router.children = build(item.children);
            }
            routerArr.push(router)
        }
    })
    return routerArr;
}