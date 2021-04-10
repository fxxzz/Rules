var $nobyda = nobyda()
var zzujksb=$nobyda.read('zzujksb')
var zzu_13a=$nobyda.read('zzu_13a')
var zzu_13b=$nobyda.read('zzu_13b')
var zzu_13c=$nobyda.read('zzu_13c')
var zzu_jingdu=$nobyda.read('zzu_jingdu')
var zzu_weidu=$nobyda.read('zzu_weidu')
var head={
  Cookie:zzujksb,
  'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1'
}



!(async () => {
  if ($nobyda.isRequest) {
    GetCookie()
    return;
  }
  await getuid();
  await main();
  await post();
  await test();
})()
  .catch((e) => {
    console.log(error);
  })
  .finally(() => {
    $done()
  })
  


function getuid(){
  return new Promise((resolve) => {
    var url={
      url:'https://jksb.v.zzu.edu.cn/vls6sss/zzujksb.dll/first0',
      headers:head
  }
    $nobyda.get(url,function(error, response, data) {
      uid=String(String(data).match(/\ptopid.*\d\d/))
      if (uid.length===63) {
        text='Get ptopid✔️'
      } else {
        text='Get ptopid❌'
        console.log(error)
      }
      console.log(text+": \n")
      resolve()
    })
  })
}

 

function main() {
  return new Promise((resolve) => {
    var url = {
      url: 'https://jksb.v.zzu.edu.cn/vls6sss/zzujksb.dll/jksb',
      headers:head,
      body:"day6=b&did=1&door=&men6=a&"+ uid
    }
    $nobyda.post(url, (error, response,data) => {
      if (String(data).match(/#00f">20/)) {
        textt ='Open✔️'
      } else {
        textt ='Open❌'
      }
      console.log(textt+": \n")
      resolve()
    })
  })
}



function post() {
  return new Promise((resolve) => {
    var code="myvs_1=否&myvs_2=否&myvs_3=否&myvs_4=否&myvs_5=否&myvs_6=否&myvs_7=否&myvs_8=否&myvs_9=否&myvs_10=否&myvs_11=否&myvs_12=否&myvs_13a="+zzu_13a+"&myvs_13b="+zzu_13b+"&myvs_13c="+zzu_13c+"&myvs_14=否&myvs_14b=&myvs_30=在校&memo22=成功获取&did=2&door=&day6=b&men6=a&sheng6=&shi6=&fun3=&jingdu="+zzu_jingdu+"&weidu="+zzu_weidu+"&"
    var url = {
      url: 'https://jksb.v.zzu.edu.cn/vls6sss/zzujksb.dll/jksb',
      headers:head,
      body:encodeURI(code)+uid
    }
    $nobyda.post(url, (error, response, data) => {
      if (String(data).match(/感谢/)) {
        texttt='jksb✔️'
      } else {
        texttt='jksb❌'
      }
      console.log(texttt+": \n")
      resolve()
    })
  })
}



function test(){
  return new Promise((resolve) => {
    var url = {
      url:'https://jksb.v.zzu.edu.cn/vls6sss/zzujksb.dll/jksb?'+uid+'&fun2=',
      headers:head,
      body:"day6=b&did=1&door=&men6=a&"+uid
    }
    $nobyda.get(url,function(error, response, data) {
      var bbb= "今日您已经填报过了"
      if (String(data).match(bbb)) {
        textttt='成功✔️'
      } else {
        textttt='失败❌'
      }
      console.log(textttt+": \n")
      $nobyda.notify("健康上报",textttt,error)
      resolve()
    })
  })
}



function GetCookie() {
  var headerCookie = $request.headers["Cookie"];
  if (headerCookie.indexOf("zzu_zzj_20200302") != -1) {
    var cookie = $nobyda.write(headerCookie, "zzujksb");
    if (!cookie) {
      $nobyda.notify("更新jksb-Cookie失败‼️", "", "");
     } else {
       $nobyda.notify("更新jksb-Cookie成功 🎉", "", "");
     }
   }
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
    isRequest, notify, write, read, get, post, done
  }
}