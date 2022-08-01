import dayjs from 'dayjs';
import {Loading, MessageBox} from "element-ui";

// 比较两个对象是否相等
export function compareWithTwoObj(obj1, obj2) {
    let bool = true;
    Object.keys(obj1).forEach(key => {
        obj1[key] !== obj2[key] && (bool = false)
        if(!bool) return bool;
    });
    return bool;
}
// 消息确认
export function confirmTip(text, title = "提示", type = "warning") {
    return MessageBox.confirm(text, title, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: type
    }).then(() => {
        return true;
    }).catch(() => {
        return false;
    });
}

// 日期格式化
export function formatDate(time, format = "YYYY年MM月DD日 HH:mm:ss") {
    return dayjs(time).format(format);
}

// 合并对象
export function merge(target, ...args) {
    args.forEach(arg => Object.assign(target, arg));
    return target;
}

// 获取随机数
export function randomNum(baseNum) {
    return Math.floor(Math.random() * baseNum)
}

// 深拷贝
export function deepClone(target, source) {
    if (isArray(target) && isArray(source)) {
        arrayDeepClone(target, source);
    } else if (isObject(target) && isObject(source)) {
        objectDeepClone(target, source);
    } else {
        console.error("类型不一致或不是数组、对象类型！");
    }
}

export function arrayDeepClone(target, source) {
    source = source || [];
    for (const i in source) {
        if (isArray(source[i])) {
            target.push([]);
            arrayDeepClone(target[target.length - 1], source[i]);
        } else {
            target.push(source[i]);
        }
    }
    return target;
}

export function objectDeepClone(target, source) {
    source = source || {};
    for (const sourceKey in source) {
        if (isObject(source[sourceKey])) {
            target[sourceKey] = {};
            objectDeepClone(target[sourceKey], source[sourceKey]);
        } else {
            target[sourceKey] = source[sourceKey];
        }
    }
    return target;
}

// 加载效果
export function loading(dom, text) {
    return Loading.service({
        lock: true, //lock的修改符--默认是false
        text: text || "Loading...", //显示在加载图标下方的加载文案
        spinner: "el-icon-loading", //自定义加载图标类名
        background: "rgba(0, 0, 0, 0.7)",//遮罩层颜色
        target: dom || document.body //loadin覆盖的dom元素节点
    });
};

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

