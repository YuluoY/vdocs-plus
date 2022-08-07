/**
 * @Author：雨落
 * @Dir：src
 * @Time：2022/8/7 00:07:03
 */
import {marked} from "marked";
import hljs from "highlight.js/lib/core";

let rendererMD = new marked.Renderer();

marked.setOptions({
    renderer: rendererMD,
    highlight: function (code) {
        return hljs.highlightAuto(code).value;
    },
    pedantic: false,
    gfm: true,
    tables: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
});

export default marked;
