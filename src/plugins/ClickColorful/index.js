/**
 * @Author：雨落
 * @Dir：src/plugins/ClickColorful
 * @Time：2022/8/17 21:05:30
 */
(function (win, doc) {
    "use strict";
    var defaultParams = {
        colors: ['#eb125f', '#6eff8a', '#6386ff', '#f9f383', '#409EFF', '#24587A'],
        size: 30,
        maxCount: 30
    }

    function colorBall(params) {
        this.params = Object.assign({}, defaultParams, params)
    }

    function getOneRandom(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function _run(ball) {
        var randomXFlag = Math.random() > 0.5
        var randomYFlag = Math.random() > 0.5
        var randomX = parseInt(Math.random() * 160);
        var randomY = parseInt(Math.random() * 160);
        if (randomXFlag) {
            randomX = randomX * -1;
        }
        if (randomYFlag) {
            randomY = randomY * -1
        }
        var transform = 'translate3d(' + randomX + 'px,' + randomY + 'px, 0) scale(0)';
        ball.style.webkitTransform = transform;
        ball.style.MozTransform = transform;
        ball.style.msTransform = transform;
        ball.style.OTransform = transform;
        ball.style.transform = transform;
    }

    colorBall.prototype.fly = function (x, y, playCount, loopTimer) {
        if (!loopTimer) loopTimer = 300
        var ballElements = []
        var fragment = document.createDocumentFragment()

        var ballNum = this.params.maxCount;
        // 修改轮换播放实现方式，改为一次创建所有，通过延迟执行动画实现
        if (playCount) {
            ballNum = ballNum * playCount;
        }
        var loop = 0
        for (var i = 0; i < ballNum; i++) {
            var curLoop = parseInt(i / this.params.maxCount)
            var ball = doc.createElement('i');
            ball.className = 'color-ball ball-loop-' + curLoop;
            var blurX = Math.random() * 10
            if (Math.random() > 0.5) blurX = blurX * -1
            var blurY = Math.random() * 10
            if (Math.random() > 0.5) blurY = blurY * -1
            ball.style.left = (x) + 'px';
            ball.style.top = (y) + 'px';
            ball.style.width = this.params.size + 'px';
            ball.style.height = this.params.size + 'px';
            ball.style.position = 'fixed';
            ball.style.borderRadius = '1000px';
            ball.style.boxSizing = 'border-box';
            ball.style.zIndex = 99999999999999;
            ball.style.opacity = 0;
            if (curLoop === 0) ball.style.opacity = 1;
            ball.style.transform = 'translate3d(0px, 0px, 0px) scale(1)';
            ball.style.webkitTransform = 'translate3d(0px, 0px, 0px) scale(1)';
            ball.style.transition = 'transform 1s ' + curLoop * loopTimer / 1000 + 's ease-out';
            ball.style.webkitTransition = 'transform 1s ' + curLoop * loopTimer / 1000 + 's ease-out';
            ball.style.backgroundColor = getOneRandom(this.params.colors);
            fragment.appendChild(ball);
            ballElements.push(ball)
            // 性能优化终极版
            if (curLoop !== loop) {
                (function (num) {
                    setTimeout(function () {
                        var loopBalls = document.getElementsByClassName('ball-loop-' + num)
                        for (let j = 0; j < loopBalls.length; j++) {
                            loopBalls[j].style.opacity = 1
                        }
                        if (num === loop) {
                            _clear(ballElements)
                        }
                    }, num * loopTimer + 30)
                })(curLoop)
                loop = curLoop
            }
        }
        doc.body.appendChild(fragment);
        // 延迟删除
        !playCount && _clear(ballElements)

        // 执行动画
        setTimeout(function () {
            for (let i = 0; i < ballElements.length; i++) {
                _run(ballElements[i])
            }
        }, 5)

        _clear(ballElements)

        function _clear(balls) {
            setTimeout(function () {
                for (let i = 0; i < balls.length; i++) {
                    doc.body.removeChild(balls[i])
                }
            }, loopTimer * 10)
        }
    }

    //兼容CommonJs规范
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = colorBall;
    }
    //兼容AMD/CMD规范
    // if (typeof define === 'function') define(function() {
    //     return colorBall;
    // });
    //注册全局变量，兼容直接使用script标签引入插件
    win.colorBall = colorBall;
})(window, document)


// eslint-disable-next-line no-undef
const color = new colorBall({
    colors: ["#eb125f", "#6eff8a", "#6386ff", "#f9f383"], // 自定义颜色
    size: 30, // 小球大小
    maxCount: 20, // 点击一次出现多少个球
});
document.body.addEventListener('click', (event) => {
    color.fly(event.x - 10, event.y - 10, 1, 100)
})