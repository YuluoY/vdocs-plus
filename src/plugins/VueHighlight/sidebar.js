/**
 * @Author：雨落
 * @Dir：src/plugins/VueHighlight
 * @Time：2022/8/23 23:54:11
 */

const lowerCase = str => str.toLocaleLowerCase();

module.exports = el => {
    const titles = ['h1', 'h2', 'h3'];
    const contentChildren = el.children;
    window.$hUtils.articleSidebar = window.$hUtils.articleSidebar || [];

    Array.from(contentChildren).forEach((rawNode) => {
        const title = lowerCase(rawNode.nodeName)
        const isH1 = title === 'h1';
        if (titles.includes(title)) {
            const newNode = rawNode.cloneNode(true)
            newNode.innerHTML =
                `<div class="text-ellipse ${title} ${isH1 ? 'title-active' : ''}" title="${newNode.innerText}">
                    <a>${newNode.innerHTML}</a>
                </div>`
            window.$hUtils.articleSidebar.push(newNode)

            rawNode.innerHTML = `<a id="anchor-${rawNode.innerText}">${rawNode.innerText}</a>`
            rawNode.id = rawNode.innerText;
        }
    })
}