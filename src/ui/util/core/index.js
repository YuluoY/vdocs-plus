// 字符串数组排序  默认：从小到大

export function sortStringArr(arr) {
    if (isNull(arr) || isUndef(arr) || arr.length === 2) return arr;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if ((arr[j] * 1) > (arr[j + 1] * 1)) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

// 合并对象
export function merge(target, ...args) {
    args.forEach(arg => Object.assign(target, arg));
    return target;
}

// 深拷贝
export function deepMerge(target, source) {
    if (isArray(target) && isArray(source)) {
        arrayDeepMerge(target, source);
    } else if (isObject(target) && isObject(source)) {
        objectDeepMerge(target, source);
    } else {
        console.error("类型不一致或不是数组、对象类型！");
    }
}

export function arrayDeepMerge(target = {}, source = {}) {
    for (const i in source) {
        if (isArray(source[i])) {
            target.push([]);
            arrayDeepMerge(target[target.length - 1], source[i]);
        } else {
            target.push(source[i]);
        }
    }
    return target;
}

export function objectDeepMerge(target = {}, source = {}) {
    for (const sourceKey in source) {
        if (isObject(source[sourceKey])) {
            target[sourceKey] = {};
            objectDeepMerge(target[sourceKey], source[sourceKey]);
        } else {
            target[sourceKey] = source[sourceKey];
        }
    }
    return target;
}

// 查看元素是否已存在将要添加的类名
export function isClassname(el, cls) {
    return el.className.split(' ').some(str => str === cls);
}

export function isEmptyObj(obj) {
    return JSON.stringify(obj) === "{}";
}

export function isString(str) {
    return Object.prototype.toString.call(str) === "[object String]";
}

export function isNumber(num) {
    return Object.prototype.toString.call(num) === "[object Number]";
}

export function isBoolean(bool) {
    return Object.prototype.toString.call(bool) === "[object Boolean]";
}

export function isNull(obj) {
    return Object.prototype.toString.call(obj) === "[object Null]";
}

export function isUndef(obj) {
    return Object.prototype.toString.call(obj) === "[object Undefined]";
}

export function isPrimitive(obj) {
    return (
        typeof obj === "string" ||
        typeof obj === "number" ||
        typeof obj === "boolean" ||
        typeof obj === "symbol" ||
        typeof obj === "bigint"
    );
}

export function isArray(arr) {
    return Object.prototype.toString.call(arr) === "[object Array]";
}

export function isObject(obj) {
    return Object.prototype.toString.call(obj) === "[object Object]";
}