export const staticRoutes = [
    {path: '/', redirect: '/home'},
    // {path: '/home', name: 'Home', component: () => import('@/views/Home')},
    // {path: '/admin', name: 'Admin', component: () => import('@/server/Admin')}

    {path: '/login', name: 'Login', component: () => import('@/views/Login')},
    {
        path: '/achieve/:title', component: () => import('@/views/Achieve'), props: true, meta: {},
        beforeEnter: (to, from, next) => {
            const article = JSON.parse(localStorage.getItem('vdocs-currentArticle') || "{}");
            to.meta.article = article;
            next();
        }
    }
]

export const dynamicRoutes = []
