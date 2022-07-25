import TimeLine from './src/TimeLine'
import './assets/css/iconfont.css'

TimeLine.install = (Vue) => {
    Vue.component(TimeLine.name, TimeLine);
}

export default TimeLine;