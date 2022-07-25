import Progress from "./src/Progress";

Progress.install = (Vue) => {
    Vue.component(Progress.name, Progress);
}

export default Progress;