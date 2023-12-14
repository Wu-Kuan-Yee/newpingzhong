#Canvas 3d Background

### 使用教程

一款基于three.js的 HTML5 canvas3D线条动画特效。该3D线条动画特效可以用鼠标进行互动，canvas的背景颜色可以随机改变。你可以使用它来制作页面顶部的Banner，效果会非常的酷。

### 兼容性
IE10及以上


下面是该3D线条特效的基本HTML结构。

### 使用方法
引入js文件
```
<!-- Main library -->
<script src="js/three.min.js"></script>
  
<!-- Helpers -->
<script src="js/projector.js"></script>
<script src="js/canvas-renderer.js"></script>
  
<!-- Visualitzation adjustments -->
<script src="js/3d-lines-animation.js"></script>
  
<!-- Animated background color -->
<script src="js/jquery/2.0.2/jquery.min.js"></script>
<script src="js/color.js"></script>
```

### HTML结构
```
<div class="canvas-wrap">
    <div class="canvas-content">
        <h1>Hello world</h1>
    </div>
    <div id="canvas" class="gradient"></div>
</div>
```

相关属性的修改
1 颜色 
在color.js 文件中修改
```
var colors = new Array(
[62,35,255],
  [60,255,60],
  [255,35,98],
  [45,175,230],
  [255,0,255],
  [255,128,0]);


```

2 线条等相关修改
在3d-lines-animation.js文件中

3 canvas大小（背景图的大小）
在css文件夹
```
#canvas{
                width:100%;
                height:500px;
                overflow: hidden;
                position:absolute;
                top:0;
                left:0;
                background-color: #1a1724;               
            }
            .canvas-wrap{
                position:relative;
                
            }
            div.canvas-content{
                position:relative;
                z-index:2000;
                color:#fff;
                text-align:center;
                padding-top:30px;
            }
```

[demo演示](http://www.jq22.com/yanshi9447)