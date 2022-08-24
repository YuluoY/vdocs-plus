/**
 * @Author：雨落
 * @Dir：src
 * @Time：2022/8/23 09:41:40
 */
import webStore from './store/storeModel/webStore'
import {isDeviceMobile} from "@/utils";

(() => {
    const computed = {
        articleNum: webStore.state.sidebar.userInfoArea.info.article
    }
    const footer = document.getElementsByClassName('h-footer-wrapper')[0];
    if (computed.articleNum < 5) {
        const sidebar = document.getElementsByClassName('h-sidebar')[0];
        const height = parseInt(getComputedStyle(sidebar).height);
        footer.style.marginTop = height + 'px';
    }
    if (isDeviceMobile(navigator.userAgent)) {
        setTimeout(() => {
            document.body.style.minHeight = footer.getBoundingClientRect().y + 190 + 'px';
        }, 300)
    }
})(window)