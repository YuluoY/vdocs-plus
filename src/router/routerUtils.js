// 构建动态路由
/*
* @Param: arr 【数组数据对象】
* @Param: firstPath 【src下的路径】
* @Param: routes 【需要合并的数组】
* */
export function build(arr, firstPath = 'views', routes = []) {
    const routerArr = routes
    arr.forEach(item => {
        const router = {};
        if (!routerArr.includes(item.path)) {
            router.path = item.path;
            router.component = loadView(firstPath, item.component)
            router.meta = item;
            if (item.children) {
                router.children = build(item.children, firstPath);
            }
            routerArr.push(router)
        }
    })
    return routerArr;
}

export function loadView(firstPath, componentName) {
    return () => import(`@/${firstPath}/${componentName}`)
}