export const staticRoutes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/Home')
    },
    {
        path: '/:resource',
        name: 'RouteTemplate',
        props: true,
        component: () => import("@/views/RouteTemplate"),
        children: [
            {
                path: '/:resource/:sub',
                name: 'ChildrenRouteTemplate',
                props: true,
                component: () => import('@/views/ChildrenRouteTemplate')
            }
        ]
    }
]

export const dynamicRouter = [

]
