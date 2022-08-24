/**
 * @Author：雨落
 * @Dir：src/plugins/VueHighlight
 * @Time：2022/8/23 23:48:03
 */
'use strict';

let hljs = require('highlight.js');

let vueHighlightJS = {};
vueHighlightJS.install = function install(Vue) {
    Vue.directive('highlightjs', {
        deep: true,
        bind: function bind(el, binding) {
            // build sidebar
            require('./sidebar')(el)

            // on first bind, highlight all targets
            let targets = el.querySelectorAll('pre code');
            // add copy function
            require('./copy-part')(targets)
            let target;
            let i;

            for (i = 0; i < targets.length; i += 1) {
                target = targets[i];
                if (typeof binding.value === 'string') {
                    // if a value is directly assigned to the directive, use this
                    // instead of the element content.
                    console.log(target)
                    target.textContent = binding.value;
                }

                hljs.highlightBlock(target);
            }
        },
        componentUpdated: function componentUpdated(el, binding) {
            // after an update, re-fill the content and then highlight
            let targets = el.querySelectorAll('pre code');
            let target;
            let i;

            for (i = 0; i < targets.length; i += 1) {
                target = targets[i];
                if (typeof binding.value === 'string') {
                    target.textContent = binding.value;
                    hljs.highlightBlock(target);
                }
            }
        },
    });
};

module.exports = vueHighlightJS;
