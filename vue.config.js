const path = require('path');
const resolve = dir => path.join(__dirname, dir); // 路径对接

const PORT = 8080;  // 端口号
const PUBLIC_PATH = './'; // 基本公共路径
const TITLE = "雨落的博客 | 欢迎光临😄";  // 浏览器标题
const ICON_PACKAGE_PATH = './src/assets/icons/svg';

module.exports = {
    lintOnSave: false,
    publicPath: PUBLIC_PATH,
    devServer: {
        port: PORT,
    },

    configureWebpack: {
        name: TITLE
    },
    chainWebpack(config) {
        // 修改当前项目默认svg配置,添加svg规则
        config.module.rule('svg')
            .exclude.add(resolve(ICON_PACKAGE_PATH));

        // 设置webpack的svg loader加载svg文件
        config.module.rule('icons')
            .test(/.svg$/)
            .include.add(resolve(ICON_PACKAGE_PATH)).end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({symbolId: 'icon-[name]'});
    }
}