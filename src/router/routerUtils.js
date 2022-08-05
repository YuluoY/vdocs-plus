// 构建动态路由
/*
* @Param: arr 【数组数据对象】
* @Param: firstPath 【src下的路径】
* @Param: routes 【需要合并的数组】
* */
import {merge} from "@/utils";

export function build(arr, firstPath = 'views', routes = []) {
    const routerArr = routes
    arr.forEach(item => {
        const router = {};
        router.meta = router.meta || {};

        if (!routerArr.includes(item.path)) {
            router.path = item.path;
            router.component = loadView(firstPath, item)
            merge(router.meta, item);
            if (item.children) {
                if(item.meta && item.children){
                    item.children.forEach(n => n.meta = item.meta)
                }
                router.children = build(item.children, firstPath);
            }
            routerArr.push(router)
        }
    })
    return routerArr;
}

export function loadView(firstPath, item) {
    if (firstPath === 'server' && !!item.meta) {
        return () => import(`@/${firstPath + item.meta.filePath}/${item.component}`)
    }
    return () => import(`@/${firstPath}/${item.component}`)
}