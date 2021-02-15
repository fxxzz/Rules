 /*
Surge

[Script]
健康上报-Cookie = type=http-request,pattern=^https?:\/\/jksb\.v\.zzu\.edu\.cn\/,script-path=https://github.com/fxxzz/Rules/raw/master/jksb.js,script-update-interval=0
健康上报 = type=cron,cronexp=1 1 * * *,script-path=https://github.com/fxxzz/Rules/raw/master/jksb.js,script-update-interval=0

[Mitm]
hostname = jksb.v.zzu.edu.cn


QuantumultX

[task_local]
1 1 * * * https://github.com/fxxzz/Rules/raw/master/jksb.js, tag=test, enabled=true

[rewrite_local]
^https?:\/\/jksb\.v\.zzu\.edu\.cn\/ url script-request-header https://github.com/fxxzz/Rules/raw/master/jksb.js

[Mitm]
hostname = jksb.v.zzu.edu.cn
 */


var $nobyda = nobyda();
var zzujksb=$nobyda.read('zzujksb')
var head={
        Cookie:zzujksb,
          'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1'
}


var t=new Date();
var month=t.getMonth()+1;
month = month<10?("0"+month):month;
var day=t.getDate();
day = day<10?("0"+day):day;
datetoday='f0f">'+month+"月"+day+"日"



if ($nobyda.isRequest) {
  GetCookie()
} else {
  jksb()
}



function jksb(){
  if (!zzujksb) {
    $nobyda.notify("健康打卡", "签到失败", "未获取到cookie");
    $nobyda.done()
  }else{
  setTimeout(getuid,1000)
  setTimeout(main,2000)
  setTimeout(post,3000)
  setTimeout(test,4000)
  setTimeout($nobyda.done,5000)
  }
}



function getuid(){
  const url={
    url:'https://jksb.v.zzu.edu.cn/vls6sss/zzujksb.dll/first0',
      headers:head
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
      }finally{
        console.log(text+": \n")
    }
  })
}

 

function main() {
  const url = {url: 'https://jksb.v.zzu.edu.cn/vls6sss/zzujksb.dll/jksb', headers:head, body:"day6=b&did=1&door=&men6=a&"+ uid}
  $nobyda.post(url, (error, response,data) => {
    try {
      if (data.match(/#00f">20/)) {
        textt ='Open✔️'
      } else {
        textt ='Open❌'
      }
    }catch(e){
      textt ='Open❌❌'
    }finally{
      console.log(textt+": \n")
    }
  })
}



function post() {
  const url = {url: 'https://jksb.v.zzu.edu.cn/vls6sss/zzujksb.dll/jksb', headers:head, body:"myvs_1=%E5%90%A6&myvs_2=%E5%90%A6&myvs_3=%E5%90%A6&myvs_4=%E5%90%A6&myvs_5=%E5%90%A6&myvs_6=%E5%90%A6&myvs_7=%E5%90%A6&myvs_8=%E5%90%A6&myvs_9=%E5%90%A6&myvs_10=%E5%90%A6&myvs_11=%E5%90%A6&myvs_12=%E5%90%A6&myvs_13a=41&myvs_13b=4101&myvs_13c=%E6%B2%B3%E5%8D%97%E7%9C%81.%E9%83%91%E5%B7%9E%E5%B8%82.%E6%96%B0%E5%AF%86%E5%B8%82&myvs_14=%E5%90%A6&myvs_14b=&memo22=%E6%88%90%E5%8A%9F%E8%8E%B7%E5%8F%96&did=2&door=&day6=b&men6=a&sheng6=&shi6=&fun3=&jingdu=113.374641&weidu=34.562874&"+uid}
  $nobyda.post(url, (error, response, data) => {
    try{
      if (data.match(/感谢/)) {
        result='jksb✔️'
      } else {
        result='jksb❌'
      }
    }catch(e){
      result='jksb❌❌'
    }finally{
      console.log(result+": \n")
    }
  })
}



function test(){
  const url = {url:'https://jksb.v.zzu.edu.cn/vls6sss/zzujksb.dll/jksb?'+uid+'&fun2=', headers:head, 
body:"day6=b&did=1&door=&men6=a&"+ uid}
  $nobyda.get(url,function(error, response, data) {
    try {
      if (data.match(datetoday)){
        texttt='成功'
      } else {
        texttt='失败❌'
      }
      } catch(e) {
        texttt='失败❌❌'
      }finally{
        console.log(texttt+": \n")
        $nobyda.notify("健康上报",texttt,"")
    }
  })
}



function GetCookie() {
  var headerCookie = $request.headers["Cookie"];
  if (headerCookie) {
    if ($nobyda.read("zzujksb") != undefined) {
      if ($nobyda.read("zzujksb") != headerCookie) {
        if (headerCookie.indexOf("zzu_zzj_20200302") != -1) {
          var cookie = $nobyda.write(headerCookie, "zzujksb");
          if (!cookie) {
            $nobyda.notify("更新jksb-Cookie失败‼️", "", "");
          } else {
            $nobyda.notify("更新jksb-Cookie成功 🎉", "", "");
          }
        }
      }
    } else {
      if (headerCookie.indexOf("zzu_zzj_20200302") != -1) {
        var cookie = $nobyda.write(headerCookie, "zzujksb");
        if (!cookie) {
          $nobyda.notify("首次写入jksb-Cookie失败‼️", "", "");
        } else {
          $nobyda.notify("首次写入jksb-Cookie成功 🎉", "", "");
        }
      }
    }
  }
  $nobyda.done()
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
    if (isQuanX) {
      if (typeof options == "string") options = {
        url: options
      }
      options["method"] = "GET"
      $task.fetch(options).then(response => {
        callback(null, adapterStatus(response), response.body)
      }, reason => callback(reason.error, null, null))
    }
    if (isSurge) $httpClient.get(options, (error, response, body) => {
      callback(error, adapterStatus(response), body)
    })
  }
  const post = (options, callback) => {
    if (isQuanX) {
      if (typeof options == "string") options = {
        url: options
      }
      options["method"] = "POST"
      $task.fetch(options).then(response => {
        callback(null, adapterStatus(response), response.body)
      }, reason => callback(reason.error, null, null))
    }
    if (isSurge) {
      $httpClient.post(options, (error, response, body) => {
        callback(error, adapterStatus(response), body)
      })
    }
  }
  const done = (value = {}) => {
    if (isQuanX) return $done(value)
    if (isSurge) isRequest ? $done(value) : $done()
  }
  return {
    isRequest,
    notify,
    write,
    read,
    get,
    post,
    done
  }
};
