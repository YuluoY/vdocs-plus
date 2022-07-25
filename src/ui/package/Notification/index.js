import Notification from './src/Notification'
import Vue from 'vue'
import {deepMerge, merge} from "../../util/core";

let instances = [], seed = 1;
const NotificationConstructor = Vue.extend(Notification);

const defaultOptions = {
    text: '', // 通知内容
    type: 'warning',  // 提示类型
    color: 'black', // 文字颜色
    duration: 3,  // 持续显示时间
    // direction: 'left', // 方向
    background: null, // 背景样式
    verticalGap: 10, // 当有多个通知时的垂直间隔
    isAutomaticExit: true, // 是否自动退出
}
const defaultOptionsRaw = Object.assign({});
deepMerge(defaultOptionsRaw, defaultOptions);

const notify = (options = {}) => {
    if (Vue.prototype.$isServer) return; // 如果是服务器环境就退出

    const notificationInstance = new NotificationConstructor({});
    merge(notificationInstance.$props, defaultOptions, options); // 合并配置项

    notificationInstance.id = `notification_${seed++}`;
    notificationInstance.$mount();
    document.body.appendChild(notificationInstance.$el);

    let verticalGap = notificationInstance.$props.verticalGap;
    const verticalGapTemp = verticalGap;
    instances.forEach(item => verticalGap += item.$el.offsetHeight + verticalGapTemp);
    notificationInstance.verticalGap = verticalGap;
    instances.push(notificationInstance);
    deepMerge(defaultOptions, defaultOptionsRaw);
    return notificationInstance;
}

export default notify;