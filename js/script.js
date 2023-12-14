/* 禁止拖拽下载图片 */
document.onkeydown = function () {
    if (window.event && window.event.keyCode == 123) {
        event.keyCode = 0;
        event.returnValue = false;
        return false;
    }
};

/* 禁止Ctrl+滚轮缩放页面 */
var scrollFunc=function(e){
    e=e || window.event;
    if(e.wheelDelta && event.ctrlKey){//IE/Opera/Chrome
     event.returnValue=false;
    }else if(e.detail){//Firefox
     event.returnValue=false;
    }
   } 
     
/*注册事件*/
if(document.addEventListener){
document.addEventListener('DOMMouseScroll',scrollFunc,false);
}//W3C
window.onmousewheel=document.onmousewheel=scrollFunc;//IE/Opera/Chrome/Safari

