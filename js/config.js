let apiUrl = ''

// 封装ajax
function Ajax(options) {
	// options['xhrFields'] = {withCredentials: true};
	// options['crossDomain'] = true
	return $.ajax(options)
}

// 解析url传参
function getParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURI(r[2])
  return null
}
