
function EventTarget(){
    this.handlers = {};
}

EventTarget.prototype = {
    constructor: EventTarget,
    addHandler: function(type, handler){
        if(typeof this.handlers[type] == 'undefined'){
            this.handlers[type] = [];
        }
        this.handlers[type].push(handler);
    },
    fire: function(event){
        if(!event.target){
            event.target = this;
        }

        if(this.handlers[event.type] instanceof Array){
            var handlers = this.handlers[event.type];
            for (var i=0, len=handlers.length; i < len; i++){
                handlers[i](event);
            }
        }
    },
    removeHandler: function(type, handler){
       if(this.handlers[type] instanceof Array){
           var handlers = this.handlers[type];
           for(var i=0,len=handlers.length; i<len; i++){
               if(handlers[i] === handler){
                    break;
               }
           }
           handlers.splice(i,1);
       }
    }
};


//test
function handleMessage(event){
    alert("Message received: " + event.message);
}

//创建一个新对象
var target = new EventTarget();

//添加一个事件处理程序，观察者订阅
target.addHandler("message", handleMessage);

//触发事件，主体发布消息
target.fire({ type: "message", message: "Hello world!"});

//删除事件处理程序
target.removeHandler("message", handleMessage);

//再次，应没有处理程序
target.fire({ type: "message", message: "Hello world!"});