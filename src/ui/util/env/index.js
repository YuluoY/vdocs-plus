/**
 * 获取浏览器的类型
 * @param ua 传入navigator.userAgent属性
 * @returns {string}
 */
export function getBrowserType(ua) {
    const kUserAgent = {
        Opera: 'Opera',
        Firefox: 'Firefox',
        Chrome: 'Chrome',
        Safari: 'Safari',
        IE: 'IE',
        QQ: 'QQBrowser'
    };
    // })
    if (ua.indexOf('Opera') > -1) {
        // 判断是否Opera浏览器
        return kUserAgent.Opera;
    }
    if (ua.indexOf('Firefox') > -1) {
        // 判断是否Firefox浏览器
        return kUserAgent.Firefox;
    }
    if (ua.indexOf('QQBrowser') > -1) {
        return kUserAgent.QQ
    }
    if (ua.indexOf('Chrome') > -1) {
        // 判断是否为谷歌浏览器
        return kUserAgent.Chrome;
    }
    if (ua.indexOf('Safari') > -1) {
        // 判断是否Safari浏览器
        return kUserAgent.Safari;
    }

    if (
        ua.indexOf('compatible') > -1 &&
        ua.indexOf('MSIE') > -1 &&
        ua.indexOf('Opera') > -1
    ) {
        // 判断是否IE浏览器
        return kUserAgent.IE;
    }
    return '';
}