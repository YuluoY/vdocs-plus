// const uis = require.context('./', true, /\.js$/);
// const installs = uis.keys().map(ui => uis(ui).default).filter(item => item && item);

import './util'
import './icon/iconfont.css'
import Loading from './package/Loading'
import Notification from './package/Notification'
import Card from './package/Card'
import Button from './package/Button'
import BackToTop from "./package/BackToTop";
import Tag from "./package/Tag";
import AudioPlayer from "./package/AudioPlayer";
import Progress from "./package/Progress";
import TimeLine from "./package/TimeLine";

const components = [
    Card,
    Button,
    BackToTop,
    Tag,
    AudioPlayer,
    Progress,
    TimeLine
]

const install = function (Vue) {
    if (Vue.prototype.$isServer) return;

    components.forEach(c => Vue.component(c.name, c));
    Vue.prototype.$hNotify = Notification
    Vue.prototype.$hLoading = Loading;
}

export default {
    Loading,
    Notification,
    install
}

