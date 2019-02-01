let apiUrl = 'http://192.168.0.90:8080'
// let apiUrl = '39.104.98.18:8080'
// 解析url传参
var getParam = function (name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURI(r[2])
  return null
}
var removerOpenId = function () {
  sessionStorage.removeItem("openid")
}
var URL = window.location.pathname;
URL = URL.substring(URL.lastIndexOf('/') + 1, URL.length)

let openid = sessionStorage.getItem('openid')
// 封装ajax
function Ajax(options) {
  var error = function (error) {
    // console.log(error)
    // if (error.statusText == 'timeout') {
    //   $.alert('连接超时')
    // }
    // $.alert(JSON.stringify(error))
    if (error.responseJSON) {
      $.alert(error.responseJSON.message)
    }
    if (error.status == 401) {
      setTimeout(() => {
        location.href = 'login.html'
        removerOpenId()
      }, 1000)
    }
  }
  var complete = function (XMLHttpRequest, status) { //当请求完成时调用函数
    if (status == 'timeout') {//status == 'timeout'意为超时,status的可能取值：success,notmodified,nocontent,error,timeout,abort,parsererror 
      // xhr.abort(); //取消请求
      $.alert('链接超时')
    }
  }
  options['timeout'] = 10000
  options['complete'] = complete
  options['xhrFields'] = { withCredentials: true };
  options['crossDomain'] = true
  options['error'] = error
  options['headers'] = {
    'openid': sessionStorage.getItem('openid')
    // 'openid': '1111'
  } 
  // options['withCredentials'] = true
  return $.ajax(options)

}
// 全局登陆
if (spread) {
  var spread = getParam('spread')
  localStorage.setItem('spread', spread)
}
var WXLOGIN = function () {
  // let redirectUrl = window.location.href
  let  redirectUrl = encodeURIComponent('http://x21157b861.iok.la/ticketmobile/login.html')
  // let  redirectUrl = encodeURIComponent('http://lanmei.cqfuyuan.cn/login.html')
  
  // var code1 = sessionStorage.getItem('code')
  if (openid != '' && openid != null && openid != undefined) {
    // alert('openid'+JSON.stringify(openid))
    return false
  } else if (URL == 'pay.html') {
    return 
  } else {
    window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+'wx960808a2cf635b36'+'&redirect_uri='+redirectUrl+'&response_type=code&scope=snsapi_userinfo&state=123&connect_redirect=1#wechat_redirect'
    var code = getParam("code")
    // alert(JSON.stringify(code))
    if (code != '' && code != null && code != undefined) {
      // console.log(redirectUrl)
      let data = {
        code: code
      }
      // sessionStorage.setItem('code',code)
      $.ajax({
        type: 'get',
        url: apiUrl + '/weixin/getOAuth2UserInfo',
        // contentType: "application/json;charset=UTF-8",
        dataType:'json',
        data: data,
        async: false, // 使用同步操作
        timeout: 50000, //超时时间：50秒
        // xhrFields: { withCredentials: true },
        // crossDomain: true,
        success: function (res) {
          // alert(JSON.stringify(res))
          if (res.state == '200') {
            // 存取信息
            // alert(JSON.stringify(res.data))
            res = res.data
            sessionStorage.setItem('openid',res.providerId)
            sessionStorage.setItem('profileUrl', res.profileUrl)
            sessionStorage.setItem('displayName', res.displayName)
          } else {
            // alert(res.message)
          }
        },
        error: function (error) {
          alert(JSON.stringify(error))
        }
      })
    }
  }
}
WXLOGIN()
const _OK = 200
const NoLogin = 401

$(function () {
  // 防止底部按钮挡住输入框
  $(window).resize(function (event) {
    $('.BTN').toggle()
  })
  
})
// 判断返回的列表是否有更多数据
var judgeList = function (data, list = [], nodataState, moreShow) {
  // console.log(list,data,nodataState,moreShow)
  if (data.total == 0) {
    nodataState = true
    moreShow = false
  } else if (list.length < data.total) {
    nodataState = false
    moreShow = true
  } else {
    nodataState = false
    moreShow = false
  }
}
// 时间戳转时间
const timestampToTime = function (timestamp) {
  // if (date.length == 10) {
  //   var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  // }
  date = new Date(timestamp)
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() + ' ';
  var h = date.getHours() + ':';
  var m = date.getMinutes() + ':';
  var s = date.getSeconds();
  return Y + M + D
}

const filterHtml = function (description) {
  description = description.replace(/\s+/g, "");
  description = description.replace(/(\t)/g, "");
  description = description.replace(/(\r)/g, "");
  description = description.replace(/<\/?[^>]*>/g, "");
  description = description.replace(/\s*/g, "");
  return description
}
// 校验手机号
const checkPhone = function (phone) {
  if (!(/^1[34578]\d{9}$/.test(phone))) {
    $.alert("输入的手机号码有误，重新输入");
    return false;
  }
}
// 小数相加减 乘除
function accMul(arg1, arg2) {
  var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
  try { m += s1.split(".")[1].length } catch (e) { }
  try { m += s2.split(".")[1].length } catch (e) { }
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}
function accAdd(arg1,arg2){
  var r1,r2,m;
  try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
  try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
  m=Math.pow(10,Math.max(r1,r2))
  return (arg1*m+arg2*m)/m
}

// 生成二维码的统一接口
var getQrcode = function (url) {
  const data = {
    url: url
  }
  Ajax({
    type: 'get',
    url: apiUrl + '/qRCode/create',
    // contentType: "application/json;charset=UTF-8",
    data: data,
    reponsonType: 'blob',
    success: function (res) {
      return res
    }
  })
}