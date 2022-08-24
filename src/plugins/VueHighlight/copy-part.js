/**
 * @Author：雨落
 * @Dir：src/plugins/VueHighlight
 * @Time：2022/8/24 01:01:37
 */
const $ = document;


function copyNode(code, i) {
    const copyWrapper = $.createElement('div');
    copyWrapper.className = 'copy-wrapper'
    copyWrapper.innerHTML = `
        <span class="copyTips copyTips-${i}" style="opacity: 0;">Copied</span>
        <span class="copyBtn" title="copy" onclick="$hUtils.clipboard(${i})">Copy</span>`
    return copyWrapper;
}

const toggle = {
    exec: function (node, destination, gap, speed = 30) {
        clearInterval(node.timer)
        let n = gap;
        let ratio = 1 / (destination / Math.abs(gap))
        let r = ratio
        let d = destination
        if (gap > 0) {
            ratio = 1
            r = -r
            d = -d
        }
        node.timer = setInterval(() => {
            if (Math.abs(gap) >= destination || destination <= 0) {
                clearInterval(node.timer)
                node.timer = undefined
                setTimeout(() => this.exec(node, 50, 2, 10), 2000)
            }
            node.style.opacity = ratio += r
            if (gap < 0) {
                node.style.transform = `translateX(${gap += n}px)`
            } else {
                node.style.transform = `translateX(${d += n}px)`
            }
        }, speed)
        return this
    }
}

module.exports = codes => {
    for (let i = 0; i < codes.length; i++) {
        codes[i].parentNode.appendChild(copyNode(codes[i], i))
    }
    window.$hUtils.clipboard = function (index) {
        navigator.clipboard.writeText(codes[index].innerText).then(value => {
            const tips = $.getElementsByClassName(`copyTips-${index}`)[0];
            tips.style.display = 'inline'
            toggle.exec(tips, 40, -2, 10, 2000)
        })
    }
}