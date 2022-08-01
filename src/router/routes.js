export const staticRoutes = [
    {path: '/', redirect: '/home'},
    // {path: '/home', name: 'Home', component: () => import('@/views/Home')},
    {path: '/login', name: 'Login', component: () => import('@/views/Login')},
    // {path: '/admin', name: 'Admin', component: () => import('@/server/Admin')}
]

export const dynamicRoutes = []
