Array.prototype.remove = function (val)
{
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
}




function setCookie(name,value,domain,path,day){
    var cookie =name+'='+encodeURIComponent(value);  //设置Cookie的名称和Cookie的值，Cookie名称为必填项。
    if(typeof day === 'number'){
        cookie+=';max-age='+(day*60*60*24);　　//设置Cookie的过期事件,默认为Session
    }
    if(!path){cookie+=';path=/'}　　//设置Cookie的路径，默认为 /
    if(domain){cookie+=';domain='+domain}　　//设置Cookie的存储域，默认为当前js执行的网页的域
    document.cookie= cookie;
}

function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

function delCookie(name)
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null) setCookie(name, cval, false, false, -1)
        // document.cookie = name + '=;  expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}


// 定义对比产品存入cookie的键
var compare_product_name = 'lbtek_compare_products';

/**
 *  设置对比产品的cookies值
 * @param value
 * @param show_flag  是否不显示侧边弹窗
 */
function setCompares(value, show_flag) {
    setCookie(compare_product_name, value, null, false, 30);
    getCompareProducts(show_flag);
}

/**
 * 获取cookies中的对比产品
 * @returns {string|string[]}
 */
function getCompares() {
    var compare_products = getCookie(compare_product_name);
    if (compare_products == null) { 
        return compare_products
    } else {
        return  compare_products.split('_')
    }
}

function validate_msg(XMLHttpRequest) {
    if (XMLHttpRequest.responseJSON.error_code === "10000"){
        layer.msg(XMLHttpRequest.responseJSON.msg)
    } else {
        layer.msg('操作失败,请联系管理员', function(){
            //关闭后的操作
        });
    }
}

function ExceptionHandle(data) {
    switch (data.error_code) {
        case 'pre_10005':
            is_to_login_msg();
            break;
        default:
            show_msg(data.msg) ;
    }
}


function show_msg(msg) {
    layer.msg(msg);
}

function is_to_login_msg(msg) {
    layer.confirm('该操作需要登录，去登录？', {
        btn: ['去登录','取消'] //按钮
    }, function(){
        location.href='/cart/checkout.html'
    }, function(index, layero){
        layer.close(index)
    });
}


// 解析url中参数
function urlQuery(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return decodeURI(r[2])
    }
    return null
  }

// 生成新的url
function genUrl(name, value) {
    var url = location.origin + location.pathname
    var search = location.search
    // 无search
    if(!search) {
        return url + '?'+ name +'=' + value
    }
    // 有search
    var reg = new RegExp('(^|[&, ?])'+ name +'=\\d+(&|$)', 'i');
    var r = window.location.search.match(reg);
    // r !== null 有page替换page，否则，直接追加page
    return r ? url + search.replace(reg, r[1] + name + '=' + value + r[2]) : url + search + '&'+ name +'=' + value
}


// 防抖函数
function debounce(fn, delay) {
    var time = null;
    return function (e) {
      var _arguments = arguments,
          _this = this;
  
      if (time) {
        clearTimeout(time);
      }
  
      time = setTimeout(function () {
        fn.apply(_this, _arguments);
      }, delay);
    };
  }