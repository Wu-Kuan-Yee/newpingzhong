var clock = document.querySelector('#utility-clock')
utilityClock(clock)

if (clock.parentNode.classList.contains('fill')) /*autoResize(clock, 295 + 32)这个时钟不能随页面缩放改变大小*/autoResize(clock)

function utilityClock(container) {
    var dynamic = container.querySelector('.dynamic')
    var hourElement = container.querySelector('.hour')
    var minuteElement = container.querySelector('.minute')
    var secondElement = container.querySelector('.second')

    // 新增日期和时间元素
    var dateElement = document.createElement('div');
    dateElement.className = 'date';
    dynamic.appendChild(dateElement);

    // 新增时间元素
    var timeElement = document.createElement('div');
    timeElement.className = 'time';
    dynamic.appendChild(timeElement);

    var minute = function(n) {
        return n % 5 == 0 ? minuteText(n) : minuteLine(n)
    }
    var minuteText = function(n) {
        var element = document.createElement('div')
        element.className = 'minute-text'
        element.innerHTML = (n < 10 ? '0' : '') + n
        position(element, n / 60, 135)
        dynamic.appendChild(element)
    }
    var minuteLine = function(n) {
        var anchor = document.createElement('div')
        anchor.className = 'anchor'
        var element = document.createElement('div')
        element.className = 'element minute-line'
        rotate(anchor, n)
        anchor.appendChild(element)
        dynamic.appendChild(anchor)
    }
    var hour = function(n) {
        var element = document.createElement('div')
        element.className = 'hour-text hour-' + n
        element.innerHTML = n
        position(element, n / 12, 105)
        dynamic.appendChild(element)
    }
    var position = function(element, phase, r) {
        var theta = phase * 2 * Math.PI
        element.style.top = 0.062*(-r * Math.cos(theta)).toFixed(1) + 'rem'
        element.style.left = 0.062*(r * Math.sin(theta)).toFixed(1) + 'rem'
    }
    var rotate = function(element, second) {
        element.style.transform = element.style.webkitTransform = 'rotate(' + (second * 6) + 'deg)'
    }

    var updateDateTime = function() {
        var now = new Date();
    
        // 设置日期显示格式为中文
        var dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        var dateText = now.toLocaleDateString('zh-CN', dateOptions);
    
        var timeText = now.toLocaleTimeString(); // 获取本地时间字符串
    
        // 更新日期和时间元素的内容
        dateElement.innerHTML = dateText;
        timeElement.innerHTML = timeText;

        // 设置日期元素的位置（居中显示在上半部分，稍微向中心靠近）
        dateElement.style.top = '2.4rem'; // 上半部分的垂直位置，可以根据需要修改
        dateElement.style.left = '50%'; // 水平位置居中
        dateElement.style.transform = 'translateX(-50%)'; // 通过 transform 调整水平位置
        dateElement.style.whiteSpace = 'nowrap'; // 防止文本换行

        // 设置时间元素的位置（居中显示在下半部分，稍微向中心靠近）
        timeElement.style.bottom = '2.4rem'; // 下半部分的垂直位置，可以根据需要修改
        timeElement.style.left = '50%'; // 水平位置居中
        timeElement.style.transform = 'translateX(-50%)'; // 通过 transform 调整水平位置
    };
    

    var animate = function() {
        var now = new Date()
        var time = now.getHours() * 3600 +
                    now.getMinutes() * 60 +
                    now.getSeconds() * 1 +
                    now.getMilliseconds() / 1000
        rotate(secondElement, time)
        rotate(minuteElement, time / 60)
        rotate(hourElement, time / 60 / 12)

        // 更新日期和时间
        updateDateTime();

        requestAnimationFrame(animate)
    }
    for (var i = 1; i <= 60; i ++) minute(i)
    for (var i = 1; i <= 12; i ++) hour(i)
    animate()

    // 在 utilityClock 函数末尾调用更新日期和时间的函数
    updateDateTime();
}

function autoResize(element, nativeSize) {
    var update = function() {
        var scale = (Math.min(window.innerWidth, window.innerHeight) / nativeSize)*0.4
        element.style.transform = element.style.webkitTransform = 'scale(' + scale.toFixed(3) + ')'
    }
    update()
    window.addEventListener('resize', update)
}
/*function autoResize(element) {
    var update = function () {
        var nativeSize = 295 + 32; // 如果原始大小发生变化，请更新此值
        var scale = Math.min(window.innerWidth, window.innerHeight) / nativeSize;

        // 更新时钟大小
        element.style.width = (300 * scale) + 'px';
        element.style.height = (300 * scale) + 'px';

        // 如果需要，更新其他依赖于大小的属性

        // 更新动态元素（文本、线条等）
        // 如果需要，你可能还需要根据新的缩放因子调整它们的大小和位置

        // 调用此函数根据新的大小调整时钟的动态元素
        updateDynamicElements(scale);
    }

    var updateDynamicElements = function (scale) {
        // 根据新的缩放因子调整动态元素的大小和位置
        // 你需要遍历每个动态元素，并适当地应用缩放因子
    }

    update();
    window.addEventListener('resize', update);
}*/