import BackToTop from './src/BackToTop'

BackToTop.install = (Vue) => {
    Vue.component(BackToTop.name, BackToTop);
}

export default BackToTop;