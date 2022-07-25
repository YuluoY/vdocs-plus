import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'

import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';

import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css';

import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index';
import '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css';

import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';

import Prism from 'prismjs'
// highlightjs 核心代码
import hljs from 'highlight.js/lib/core';

const partPlugins = [
    createCopyCodePlugin,
    createEmojiPlugin,
    createLineNumbertPlugin,
    createTodoListPlugin
]

VueMarkdownEditor.use(vuepressTheme, {
    Hljs: hljs,
    Prism,
    extend(md) {
        // md为 markdown-it 实例，可以在此处进行修改配置,并使用 plugin 进行语法扩展
        // md.set(option).use(plugin);
    },
    codeHighlightExtensionMap: {
        vue: 'xml',
    },

});

partPlugins.forEach(p => VueMarkdownEditor.use(p()))


export default VueMarkdownEditor;