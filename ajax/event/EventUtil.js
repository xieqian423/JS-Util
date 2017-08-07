
var EventUtil = (function(){

    /**
     * @method addHandler
     * 添加句柄：使用事件冒泡可以最大程度兼容浏览器
     * @param element
     * @param type  【click,mouseover,keydown】小写事件名
     * @param handler
     */
    var addHandler = function(element, type, handler ,useCapture){
        useCapture = useCapture ? useCapture : false;
        if(element.addEventListener){
            //此处第三个参数false，所以是事件冒泡
            element.addEventListener(type, handler, useCapture);
        }else if(element.attachEvent){
            element.attachEvent('on'+type, handler);
        }else{
            element['on'+type] = handler;
        }
    };

    /**
     * @method removeHandler
     * 移除句柄
     * @param element
     * @param type
     * @param hander  此处移除的事件名必须与添加的事件名是同一个函数，否则无法移除事件
     */
    var removeHandler = function(element,type,hander){
        if(element.removeEventListener){
            element.removeEventListener(type, hander, false);
        }else if(element.detachEvent){
            element.detachEvent('on'+type, hander);
        }else{
            element['on'+type] = null;
        }
    }

    //获取事件
    var getEvent = function(event) {
        return event ? event : window.event;
    }

    //获取事件类型
    var getType = function(event){
        return event.type;
    }

    //获取事件源
    var getTarget = function(event){
        return event.target || event.srcElement;
    }

    //阻止事件冒泡
    var stopPropagation = function(event){
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.cancelBubble = true;
        }
    }

    //阻止默认行为
    var preventDefault = function(event){
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue = false;
        }
    }

    return {
        addHandler: addHandler
        ,removeHandler: removeHandler
        ,getEvent: getEvent
        ,getType: getType
        ,getTarget: getTarget
        ,stopPropagation: stopPropagation
        ,preventDefault: preventDefault
    }
})();