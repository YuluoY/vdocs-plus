const svgContext = require.context('./audio', true, /\.(mp3|mgg|flac)$/);
const audioUrls = svgContext.keys().map(svgContext);
let audioInfos = []
audioUrls.forEach((item, index, arr) => {
    let info = /\/(.*?)\./.exec(item)[1].split('-');
    let obj = {}
    obj.id = index + 1;
    obj.singer = info[0].trim();
    obj.song = info[1].trim();
    obj.url = item;
    audioInfos.push(obj)
})
export default audioInfos;