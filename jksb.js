const $nobyda = nobyda();
zzujksb=$nobyda.read('zzujksb')


if ($nobyda.isRequest) {
  GetCookie()
} else {
login()
setTimeout(function(){main();},2000)
setTimeout(function(){jksb();},3000)
setTimeout(function(){end();},4000)
}



function GetCookie() {
  var headerCookie = $request.headers["Cookie"];
  if (headerCookie) {
    if ($nobyda.read("zzujksb") != undefined) {
      if ($nobyda.read("zzujksb") != headerCookie) {
        if (headerCookie.indexOf("zzu_zzj_20200302") != -1) {
          var cookie = $nobyda.write(headerCookie, "zzujksb");
          if (!cookie) {
            $nobyda.notify("更新贴吧Cookie失败‼️", "", "");
          } else {
            $nobyda.notify("更新贴吧Cookie成功 🎉", "", "");
          }
        }
      }
    } else {
      if (headerCookie.indexOf("zzu_zzj_20200302") != -1) {
        var cookie = $nobyda.write(headerCookie, "zzujksb");
        if (!cookie) {
          $nobyda.notify("首次写入贴吧Cookie失败‼️", "", "");
        } else {
          $nobyda.notify("首次写入贴吧Cookie成功 🎉", "", "");
        }
      }
    }
  }
  $nobyda.done()
}










function login(){
    return new Promise(resolve => {
        var url={
            url:'https://jksb.v.zzu.edu.cn/vls6sss/zzujksb.dll/first0',
            headers: {
                Cookie:zzujksb,
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1'
            }
        }
        $nobyda.get(url,function(error, response, data) {
        uid=String(data.toString().match(/\ptopid.*\d\d/))
        try {
           if (uid.length===63) {
                text='Get ptopid✔️'
            } else {
                text='Get ptopid❌'
            }
        } catch(e) {
            text='Get ptopid❌❌'
        }
        console.log(text+": \n")
        })
    resolve()
    })
}

 

function main() {
    const url = {url: 'https://jksb.v.zzu.edu.cn/vls6sss/zzujksb.dll/jksb', body:"day6=b&did=1&door=&men6=a&"+ uid}
    $nobyda.post(url, (error, response,data) => {
        try {
            if (data.match(/#00f">201/)) {
                textt ='Open✔️'
            } else {
                textt ='Open❌'
            }
        }catch(e){
            textt ='Open❌❌'
        }
    console.log(textt+": \n")
    })
}



function jksb() {
    const url = {url: 'https://jksb.v.zzu.edu.cn/vls6sss/zzujksb.dll/jksb', body:"myvs_1=%E5%90%A6&myvs_2=%E5%90%A6&myvs_3=%E5%90%A6&myvs_4=%E5%90%A6&myvs_5=%E5%90%A6&myvs_6=%E5%90%A6&myvs_7=%E5%90%A6&myvs_8=%E5%90%A6&myvs_9=%E5%90%A6&myvs_10=%E5%90%A6&myvs_11=%E5%90%A6&myvs_12=%E5%90%A6&myvs_13a=41&myvs_13b=4101&myvs_13c=%E6%B2%B3%E5%8D%97%E7%9C%81.%E9%83%91%E5%B7%9E%E5%B8%82.%E6%96%B0%E5%AF%86%E5%B8%82&myvs_14=%E5%90%A6&myvs_14b=&memo22=%E6%88%90%E5%8A%9F%E8%8E%B7%E5%8F%96&did=2&door=&day6=b&men6=a&sheng6=&shi6=&fun3=&jingdu=113.374641&weidu=34.562874&"+uid}
    $nobyda.post(url, (error, response, data) => {
    try{
        if (data.match(/感谢/)) {
            result='jksb✔️'
        } else {
            result='jksb❌'
        }
    }catch(e){
        result='jksb❌❌'
    }
    console.log(result)
    $nobyda.notify(result,text+";"+textt+";"+result,"")
    })
}
 
 
function end(){ 
$done() 
}
 

 
function nobyda() {
    const isRequest = typeof $request != "undefined" 
    const isSurge = typeof $httpClient != "undefined" 
    const isQuanX = typeof $task != "undefined" 
    const notify = (title, subtitle, message) => { 
        if (isQuanX) $notify(title, subtitle, message) 
        if (isSurge) $notification.post(title, subtitle, message) 
    } 
    const write = (value, key) => { 
        if (isQuanX) return $prefs.setValueForKey(value, key) 
        if (isSurge) return $persistentStore.write(value, key) 
    } 
    const read = (key) => { 
        if (isQuanX) return $prefs.valueForKey(key) 
        if (isSurge) return $persistentStore.read(key) 
    }
    const post = (options, callback) => { 
        if (isQuanX) { 
            if (typeof options == "string") options = { url: options } 
            options["method"] = "POST" 
            $task.fetch(options).then(response => { 
                response["status"] = response.statusCode 
                callback(null, response, response.body) 
            }, reason => callback(reason.error, null, null)) 
        } 
        if (isSurge) $httpClient.post(options, callback) 
    }
    const adapterStatus = (response) => {
        if (response) {
            if (response.status) {
                response["statusCode"] = response.status
            } else if (response.statusCode) {
                response["status"] = response.statusCode
            }
        }
    return response
    }
const get = (options, callback) => {
    options.headers['User-Agent'] = 'JD4iPhone/167169 (iPhone; iOS 13.4.1; Scale/3.00)'
    if (isQuanX) {
        if (typeof options == "string") options = {
            url: options
        }
        options["method"] = "GET"
        $task.fetch(options).then(response => {
            callback(null, adapterStatus(response), response.body)
        }, reason => callback(reason.error, null, null))
    }
    if (isSurge) {
        options.headers['X-Surge-Skip-Scripting'] = false
        $httpClient.get(options, (error, response, body) => {
            callback(error, adapterStatus(response), body)
        })
    }
}
const end = () => { 
        if (isQuanX) return $done({}) 
        if (isSurge) isRequest ? $done({}) : $done() 
    } 
    return { isRequest, isQuanX, isSurge, notify, write, read, post, get, end } 
};
