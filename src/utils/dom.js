import {isArray, isClassname, isString} from "@/ui/util/core";

const $ = document;

export function addClass(el, className) {
    if (isClassname(el, className)) return;
    if (isString(className)) {
        el.className = el.className + ' ' + className;
    } else if (isArray(className)) {
        className.forEach(name => el.className = el.className + ' ' + name);
    } else {
        console.error('The class name add error !')
    }
    return this;
}

export function findAllByClass(className) {
    return $.getElementsByClassName(className)
}

export function deleteClass(el, className) {
    if (isString(className) && isClassname(el, className)) {
        el.className = el.className.split(' ').filter(str => str !== className).join(' ');
    } else if (isArray(className)) {
        let clsArr = el.className = el.className.split(' ');
        className.forEach(name => clsArr = clsArr.filter(str => str !== name));
        el.className = clsArr.join(' ');
    }
}

export function removeAllClass(node) {
    node.className = '';
    return this;
}
