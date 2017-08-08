
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

//����һ���¶���
var target = new EventTarget();

//���һ���¼�������򣬹۲��߶���
target.addHandler("message", handleMessage);

//�����¼������巢����Ϣ
target.fire({ type: "message", message: "Hello world!"});

//ɾ���¼��������
target.removeHandler("message", handleMessage);

//�ٴΣ�Ӧû�д������
target.fire({ type: "message", message: "Hello world!"});