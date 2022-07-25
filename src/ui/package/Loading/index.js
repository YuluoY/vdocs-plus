import Vue from "vue";
import Loading from "./src/Loading";
import {deepMerge, merge} from "../../util/core";

let seed = 1;

const defaultOptions = {
    text: 'loading...',
    visible: false,
    background: 'rgba(0,0,0,0.3)',
    dom: document.body,
    borderRadius: 'unset',
}

const defaultOptionsRaw = Object.assign({});
deepMerge(defaultOptionsRaw, defaultOptions);

const loadingConstructor = Vue.extend(Loading);
const loadingInstance = new loadingConstructor({});

const loading = (options = {}) => {
    loadingInstance.$mount();

    merge(loadingInstance.$props, defaultOptions, options);
    loadingInstance.$props.borderRadius = getComputedStyle(loadingInstance.$props.dom).borderRadius;
    loadingInstance.$props.dom.style.position = 'relative';
    loadingInstance.$props.dom.appendChild(loadingInstance.$el);

    loadingInstance.visible = true;
    deepMerge(defaultOptions, defaultOptionsRaw);
    return loadingInstance
};

// 单例模式服务
loading.service = (options = {}) => {
    const instance = new loadingConstructor({});
    instance.$mount();

    merge(instance.$props, defaultOptions, options);
    instance.$props.borderRadius = getComputedStyle(instance.$props.dom).borderRadius;
    instance.$props.dom.style.position = 'relative';

    instance.id = `loading_${seed++}`;

    instance.$props.dom.appendChild(instance.$el);
    instance.visible = true;
    instance.close = (time = 1) => {
        setTimeout(() => {
            instance.visible = false;
            setTimeout(() => instance.$props.dom.style.position = 'unset', 500)
        }, time * 1000);
    };
    deepMerge(defaultOptions, defaultOptionsRaw);
    return instance;
}

loadingInstance.close = (time = 1) => {
    setTimeout(() => {
        loadingInstance.visible = false;
        setTimeout(() => loadingInstance.$props.dom.style.position = 'unset', 500)
    }, time * 1000)
}

export default loading;