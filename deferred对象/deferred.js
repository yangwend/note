// 1. 定义
// deferred 对象：异步或者同步操作之后，需要执行某些操作（回调函数），而deferred对象可以解决如何去执行这些操作。

// （1）链式操作：$.ajax()操作完成后，返回的是deferred对象，可以进行链式操作。
$.ajax({
    url: "test.html",
    success: function(){ 
        alert("哈哈，成功了！"); 
    },
    error:function(){ 
        alert("出错啦！"); 
    }
});

// ====>

$.ajax("test.html").done(function(){ alert("哈哈，成功了！"); }).fail(function(){ alert("出错啦！"); });

// （2）指定同一操作的多个回调函数：deferred对象可以允许自由添加多个回调函数。（按照顺序执行）
$.ajax("test.html")
    .done(function(){ alert("哈哈，成功了！");} )
    .fail(function(){ alert("出错啦！"); } )
    .done(function(){ alert("第二个回调函数！");} );

// （3）为多个操作指定回调函数：deferred对象可以允许你为多个事件指定一个回调函数。
$.when($.ajax("test1.html"), $.ajax("test2.html"))
    .done(function(){ alert("哈哈，成功了！"); })
    .fail(function(){ alert("出错啦！"); });

$.when(getMyYYInfoData(), getRateData(), getLevel()).then((yyInfoData, rateInfoData, levelInfoData) => {
    //
}, () => {
    //
});

// （4）不管是ajax操作还是本地操作，也不管是异步操作还是同步操作----都可以使用deferred对象的各种方法，指定回调函数。
var wait = function(){
    var tasks = function(){
        alert("执行完毕！");
    };
    setTimeout(tasks,5000);
};

// ====>

var wait = function(){
    var dtd = $.Deferred(); // 新建一个deferred对象
    var tasks = function(){
        alert("执行完毕！");
        dtd.resolve(); // 改变deferred对象的执行状态
    };
    setTimeout(tasks,5000);
    return dtd.promise();
};

$.when(wait())
    .done(function(){ alert("哈哈，成功了！"); })
    .fail(function(){ alert("出错啦！"); });

// （5）$.Deferred()可以接受一个函数作为参数，该函数将在$.Deferred()返回结果之前执行。
// 并且，$.Deferred()所生成的Deferred对象将作为这个函数的默认参数。
$.Deferred(wait)
    .done(function(){ alert("哈哈，成功了！"); })
    .fail(function(){ alert("出错啦！"); });

// （6）在wait对象上部署deferred接口
var wait = function(){
    var dtd = $.Deferred(); // 生成Deferred对象
    var tasks = function(){
        alert("执行完毕！");
        dtd.resolve(); // 改变Deferred对象的执行状态
    };
    setTimeout(tasks,5000);
    return dtd.promise();
};
    wait().done(function(){ alert("哈哈，成功了！"); })
        .fail(function(){ alert("出错啦！"); });
    // 或者 
    wait();

function getLevel() {
    const dtd = $.Deferred();
    formServer('xxx.htm', {}).then((data) => {
        dtd.resolve(data);
    }, () => {
        dtd.reject();
    });
    return dtd.promise(); // 返回promise对象
}


// （1）$.Deferred()生成一个deferred对象。
// （2）deferred.done()指定操作成功时的回调函数
// （3）deferred.fail()指定操作失败时的回调函数
// （4）deferred.promise()没有参数时，作用为保持deferred对象的运行状态不变；接受参数时，作用为在参数对象上部署deferred接口。
// （5）deferred.resolve()手动改变deferred对象的运行状态为"已完成"，从而立即触发done()方法。
// （6）$.when()为多个操作指定回调函数。
// （7）deferred.then()
// （8）有时为了省事，可以把done()和fail()合在一起写，这就是then()方法。
$.when($.ajax( "/main.php" ))
    .then(successFunc, failureFunc );
// 如果then()有两个参数，那么第一个参数是done()方法的回调函数，第二个参数是fail()方法的回调方法。
// 如果then()只有一个参数，那么等同于done()。
// （9）deferred.reject()
// 这个方法与deferred.resolve()正好相反，调用后将deferred对象的运行状态变为"已失败"，从而立即触发fail()方法。
// （10）deferred.always()
// 这个方法也是用来指定回调函数的，它的作用是，不管调用的是deferred.resolve()还是deferred.reject()，最后总是执行。
$.ajax( "test.html" )
    .always( function() { alert("已执行！");} );