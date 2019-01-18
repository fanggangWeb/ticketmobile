let apiUrl = 'http://192.168.0.90:30041'

// 封装ajax
function Ajax(options) {
  var error = function (error) {
    // console.log(error)
    // if (error.statusText == 'timeout') {
    //   $.alert('连接超时')
    // }
    if (error.responseJSON) {
      $.alert(error.responseJSON.message)
    } 
    if (error.status == 401) {
      setTimeout(()=> {
        location.href = 'login.html'
      },1000)
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
	options['xhrFields'] = {withCredentials: true};
  options['crossDomain'] = true
  options['error'] = error
  // options['withCredentials'] = true
  return $.ajax(options)
  
}
const _OK = 200
const NoLogin = 401
// 解析url传参
var getParam = function (name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURI(r[2])
  return null
}
$(function () {
  // 防止底部按钮挡住输入框
  $(window).resize(function(event) {
    $('.BTN').toggle()
  })
})
// 判断返回的列表是否有更多数据
var judgeList = function (data, list = [] ,nodataState, moreShow) {
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
