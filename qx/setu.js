
let userApikey   = '181204475f85268baa86d2' //请在 Telegram 内使用 @loliconApiBot 申请
let userR18      = 0 //18禁为1 非为0 2是混合
let userKeyword  = ''//搜索关键字
let userNum      = 1 //一次返回的结果数量，范围为1到10
var request = {
    url:encodeURI("https://api.lolicon.app/setu?apikey=" + userApikey + "&r18=" + userR18 + "&keyword=" + userKeyword),
    header:{  
     "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.2 Mobile/15E148 Safari/604.1"
    },
}
$task.fetch(request).then(response => {
	let obj = JSON.parse(response.body);
	if(obj.code == 0)
	{
		let pictureURL = encodeURI(obj.data[0].url);
		console.log(pictureURL);
		$notify("每日色图", "", "元气满满", {"open-url":pictureURL,"media-url":pictureURL}); // Success
	}
	else
	{
		 $notify("Title", "Subtitle", reason.error); // Error!
	}
})
