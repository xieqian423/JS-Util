/**
 * @author Xieqian
 * 异步请求
 * @param {object} options
 * @param {string} options.method       请求方式
 * @param {object} options.data         请求参数
 * @param {string} options.url          资源url
 * @param {function} options.success    成功回调函数
 * @param {function} options.fail       失败回调函数
 */
var createAjaxRequst = function(options){
    var options = options || {};
    var method = options.method;
    var url = options.url;
    var data = options.data;
    var success = options.success;
    var fail = options.fail;

    var xmlhttp;
    if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    }else{
        xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
    }

    xmlhttp.open('POST',url,true);
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState==4 &&　xmlhttp.status==200){
            if(success instanceof Function){
                var allResH = xmlhttp.getAllResponseHeaders();
                success(xmlhttp.responseText);   //接收到的数据
            }
        }else{
            if(fail instanceof Function){
                fail({
                    readyState: xmlhttp.readyState,
                    status: xmlhttp.status
                });
            }
        }
    };

    method = method.toLowerCase()
    if(method == 'post') {
        xmlhttp.send(data);      //post方法时，参数需要通过send()方法传递
    }
    else if(method == 'get'){
        xmlhttp.send();
    }
};
