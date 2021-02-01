/*

persistentStore.write('username','zzuid')
persistentStore.write('password','zzupw')
$done


[Script]
 健康打卡= type=cron,cronexp=15 0,3,6,9 * * *,script-path=https://raw.githubusercontent.com/fxxzz/Rules/master/surge/jksb.js,script-update-interval=0,script-update-interval=0

*/


//Script of ZZU jksb
zzuid=$persistentStore.read('zzuid')
zzupw=$persistentStore.read('zzupw')
uid=$persistentStore.read('ptopidsid')



 //Start
signup()
setTimeout(function(){main();},2000)
setTimeout(function(){jksb();},3000)
$done
 //End



 //Get ptopid&sid
function signup(){
    const url = {url: 'https://jksb.v.zzu.edu.cn/vls6sss/zzujksb.dll/login', body:'uid='+zzuid+'&upw='+zzupw+"&smbtn=%E8%BF%9B%E5%85%A5%E5%81%A5%E5%BA%B7%E7%8A%B6%E5%86%B5%E4%B8%8A%E6%8A%A5%E5%B9%B3%E5%8F%B0&hh28=7t54"}
    $httpClient.post(url, (error, response, data) => {
        try {
            uuid=String(data.toString().match(/\ptopid.*\d/))
            if (uuid.length===63) {
                text='Get ptopid&sid✔️'
                uid=uuid
            } else {
                text='Get ptopid&sid❌'
            }
        } catch(e){
            text='Get ptopid&sid❌❌'
        }
        console.log(text+": \n")
        $persistentStore.write(uid, 'ptopidsid')
    })
}



 //Open
function main() {
    const url = {url: 'https://jksb.v.zzu.edu.cn/vls6sss/zzujksb.dll/jksb', body:"day6=b&did=1&door=&men6=a&"+ uid}
    $httpClient.post(url, (error, response,data) => {
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



 //jksb
function jksb() {
    const url = {url: 'https://jksb.v.zzu.edu.cn/vls6sss/zzujksb.dll/jksb', body:"myvs_1=%E5%90%A6&myvs_2=%E5%90%A6&myvs_3=%E5%90%A6&myvs_4=%E5%90%A6&myvs_5=%E5%90%A6&myvs_6=%E5%90%A6&myvs_7=%E5%90%A6&myvs_8=%E5%90%A6&myvs_9=%E5%90%A6&myvs_10=%E5%90%A6&myvs_11=%E5%90%A6&myvs_12=%E5%90%A6&myvs_13a=41&myvs_13b=4101&myvs_13c=%E6%B2%B3%E5%8D%97%E7%9C%81.%E9%83%91%E5%B7%9E%E5%B8%82.%E6%96%B0%E5%AF%86%E5%B8%82&myvs_14=%E5%90%A6&myvs_14b=&memo22=%E6%88%90%E5%8A%9F%E8%8E%B7%E5%8F%96&did=2&door=&day6=b&men6=a&sheng6=&shi6=&fun3=&jingdu=113.374641&weidu=34.562874&"+uid}
    $httpClient.post(url, (error, response, data) => {
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
    $notification.post(result,text+";"+textt+";"+result,"")
    })
}
