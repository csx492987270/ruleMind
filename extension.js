// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const path = require('path');
const fs =  require('fs');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
let ruleList = {}; //fms 数据
let fileUrl = "" //.rule 文件路径
let ruleJsonUrl= "" //fsm 路径url
let dataListUrl="" //urul路径
let timer = null   //时间变量
let dataListJson=[]  //urule数据
let fnsList = []  //函数集
let extensionPath ='' //当前文件路径
let tableMiUrl = ''  //vtable.mi 路径
let tableMiName = '' //vtable.mi名字
let jarUrl = '' //jar 路径
let jarName ='' //jar名字
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "ruleMind" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	if(context.extensionPath){
		extensionPath = context.extensionPath
	}
	if(vscode.workspace.workspaceFolders[0].uri.path){
		fileUrl =vscode.workspace.workspaceFolders[0].uri.path;
		fileUrl= `${fileUrl}/.mind`;
		fileUrl = fileUrl.replace('/','');
		dataListUrl= `${fileUrl}/dataList.json`
	}
	createFile()
		
	let disposable = vscode.commands.registerCommand('ruleMind.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from !');
	});
	let newHtml=vscode.commands.registerCommand('ruleMind.mind', () => {
		createFile()
	    const panel = vscode.window.createWebviewPanel(
			'mindWebview', // viewType
			"ruleMind", // 视图标题
			vscode.ViewColumn.One, // 显示在编辑器的哪个部位
			{
				enableScripts: true, // 启用JS，默认禁用
				retainContextWhenHidden: true // webview被隐藏时保持状态，避免被重置
			}
		);
		panel.webview.html = getWebViewContent(context, 'mind.html'); //加载html文件资源
		fnList(panel)
		//getDataList(panel)
		panel.webview.onDidReceiveMessage(message => {
			switch (message.command) {
				case 'createFs':
					let terminalA = vscode.window.createTerminal({ name: "createFn" });
					terminalA.show(true);
					let cmds = `mvn io.xc5:xvsa-maven-plugin:1.39:gather -Dxvsa.dir="${extensionPath}\\xvsa"  -Dxvsa.phantom=true -X -Djfe.opt="-v,-dumpMethodName=true,-win32=true,-libGen=true,-libGenOnly=true" -Dxvsa.lib.gen=true`
					terminalA.sendText(cmds); //输入命令
					clearInterval(timer)
					fnsList = []
					timer =setInterval(function(){ 
						console.log(fnsList.length)
						if(fnsList.length){
							clearInterval(timer)
						}else {	
							fnList(panel)
						}	
					 }, 3000);		
					break;
			    case "test":	

				let testrr = message

					break;
			    case "delApi":
					delApi(message,panel)
					break;
				case "changeRule":
					changeRule(message,panel)
					break;
				case "getFSM":
					getFSM(message,panel)
					break;
				case "saveJson":		
				// let testrr = message	
				saveJsonData(message,panel)
						break;				
			}
		 }, undefined, context.subscriptions);
	})
	context.subscriptions.push(newHtml);
	context.subscriptions.push(disposable);
}
// exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}
// vscode不支持直接加载本地资源，需要替换成其专有路径格式，这里只是简单的将样式和JS的路径替换
function getWebViewContent(context, templatePath) {
	const resourcePath = path.join(context.extensionPath, templatePath);
	const dirPath = path.dirname(resourcePath);
	let html = fs.readFileSync(resourcePath, 'utf-8');
	html = html.replace(/(<link.+?href="|<script.+?src="|<img.+?src=")(.+?)"/g, (m, $1, $2) => {
	  return $1 + vscode.Uri.file(path.resolve(dirPath, $2)).with({ scheme: 'vscode-resource' }).toString() + '"';
	});
	return html;
  }
  //创建.mind文件夹
function createFile(){
	let  checkDir = fs.existsSync(fileUrl);
	if(checkDir) {
		return
	}
	fs.mkdir(fileUrl, '0777', function(err){
		  if(err){
			  console.log(err);
		  }else{
			console.log("creat done!");
		  }

	})
}
function changeRule(ruleName,panel){
	let rulerUrl = `${fileUrl}/rule.json`
	let checkFile = fs.existsSync(rulerUrl);
	let arr =[]
	if(checkFile){
		fs.readFile(rulerUrl,'utf-8',(err,data)=>{
			let newData = JSON.parse(data)		
			 if(newData[ruleName.text] && Array.isArray(newData[ruleName.text])){
				arr=[...newData[ruleName.text]]
			 }	
			 	 
			 panel.webview.postMessage({text:arr,type:'hisFnList'});
		 })
	}else {

		panel.webview.postMessage({text:arr,type:'hisFnList'});
	}
	
}
//获取fsm 数据
function getFSM(message,panel){
	let strarr = message.text.split(":")
	let str1 = strarr[0]
	let strArr1 = str1.split(".")
	let str2 = strArr1.slice(strArr1.length - 1)
	let ss = str2.join(".")
	let starStr = strArr1.slice(0, strArr1.length - 1).join('.')
	let fsU = strarr[1].replace(/</g, "");
	fsU = fsU.replace(/>/g, "");
	let saveUrl = `${fileUrl}/package/${starStr}/${ss}/${fsU}.json`
	let checkDir = fs.existsSync(saveUrl);
	let obj = {}
	  if(checkDir){	
		fs.readFile(saveUrl,'utf-8',(err,data)=>{		
           if(data){		   
			   obj = JSON.parse(data)
		   }
		   panel.webview.postMessage({text:obj,type:'fsmData',keys:message.text});
		})
	  }else {

		 panel.webview.postMessage({text:obj,type:'fsmData',keys:message.text});
	  }
}
//保存数据
function saveJsonData(params,panel) {
	let obj = {}	
	let fsmJson=params.text
	let strarr = fsmJson.data.topic.split(":")
	fsmJson.data.topic = fsmJson.data.topic.replace(/&gt;/g, ">");
	fsmJson.data.topic = fsmJson.data.topic.replace(/&lt;/g, "<");
	let str1 = strarr[0]
	let strArr1 = str1.split(".")
	let str2 = strArr1.slice(strArr1.length - 1)
	let ss = str2.join(".")
	let starStr = strArr1.slice(0, strArr1.length - 1).join('.')
	let saveUrl = `${fileUrl}/package/${starStr}/${ss}`
	let rulerUrl = `${fileUrl}/rule.json`
	let checkDir = fs.existsSync(saveUrl);	
	let checkFile = fs.existsSync(rulerUrl); 
	let jsonArr = getRuleName(params)
    if(checkDir){	
      }else {
     	mkdirsSync(saveUrl)
	 }
	 let nameArr = fsmJson.data.topic.split(" ")
	 let jsonName = nameArr[nameArr.length-1]
	 let fsU = strarr[1].replace(/&gt;/g, "");
	 fsU = fsU.replace(/&lt;/g, "");
	 fs.writeFile(`${saveUrl}/${fsU}.json`,JSON.stringify(fsmJson,"","\t"),'utf-8',(err,data)=>{
		if (err) {
			// res.status(500).send('Server is error...')
		}
	})
	if(checkFile){
		fs.readFile(rulerUrl,'utf-8',(err,data)=>{			
			if(data){
				let newData = JSON.parse(data) 
				jsonArr.forEach(item=>{
					if(newData[item]){
						if(newData[item].length && newData[item].includes(fsmJson.data.topic)){				
						}else {
							newData[item].push(fsmJson.data.topic)
						}
					}else {
						newData[item] = [] 
						newData[item].push(fsmJson.data.topic)
					}
				})
				for(var key in newData) {
                    if(jsonArr.includes(key)){
					}else {
						if(Array.isArray(newData[key]) && newData[key].includes(fsmJson.data.topic)){
							newData[key].splice(newData[key].findIndex(item => item=== fsmJson.data.topic), 1)
						}
					}
				} 
				panel.webview.postMessage({text:newData,type:'refreshHis'});
				fs.writeFile(rulerUrl,JSON.stringify(newData,"","\t"),'utf-8',(err,data)=>{
					if (err) {
						// res.status(500).send('Server is error...')
					}
				})
			}else if(err && err.code=='ENOENT' ) {
				jsonArr.forEach(item=>{
					obj[item] = []
					obj[item].push(fsmJson.data.topic)
				})
				panel.webview.postMessage({text: obj,type:'refreshHis'});
	            fs.writeFile(rulerUrl,JSON.stringify(obj,"","\t"),'utf-8',(err,data)=>{
		        	if (err) {
		        		// res.status(500).send('Server is error...')
		        	}
		        })
			  }
		  })

	}else {
		jsonArr.forEach(item=>{
			obj[item] = []
			obj[item].push(fsmJson.data.topic)
		})
	    fs.writeFile(rulerUrl,JSON.stringify(obj,"","\t"),'utf-8',(err,data)=>{
			if (err) {
				// res.status(500).send('Server is error...')
			}
		})
	}
}
//获取树形里面的标准集
function getRuleName(params) {
	let json = [];
	let ruleArr = [...params.ruleArr]
	let jsonData = []
	jsonData.push(params.text.data)
	getSubJson(jsonData,ruleArr, json)
	return json
}
function getSubJson(jsonData, ruleArr, json) {
	for (var i = 0; i < jsonData.length; i++) {
		if (ruleArr.includes(jsonData[i].topic) ) {
			json.push(jsonData[i].topic);
		} else {
			if (jsonData[i].hasOwnProperty("children")) {
				getSubJson(jsonData[i].children, ruleArr, json);
			}
		}
	}
}
//创建多层目录 、r/r/rdz
function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
      return true;
    } else {
      if (mkdirsSync(path.dirname(dirname))) {
        fs.mkdirSync(dirname);
        return true;
      }
    }
  }
 //mi生成函数lie
function fnList(panel){	
	let url = vscode.workspace.workspaceFolders[0].uri.path
	let miurl= `${url}/target/xvsa-out`
	 miurl = miurl.replace('/','')
     let  checkDir = fs.existsSync(miurl);
     if (checkDir){
	 let files = fs.readdirSync( miurl );
	 let dfv = files.filter(item=>item.includes('vtable.mi'))
	 if(dfv.length){
		 let miName = dfv[0]
		 tableMiName = miName
		 let newUl = `${miurl}/${miName}`
		 tableMiUrl = newUl //赋值
		 fs.readFile(newUl,'utf-8',(err,data)=>{
			if(data){		
				let	miFlie = data.split("\n") 
				fnsList = miFlie
				//packageGet(fnsList)
				 setTimeout(()=>{
					panel.webview.postMessage({text:miFlie,type:'fnList',tableMiUrl:tableMiUrl});
				 },1000)
			}
		})
	 }
   } 
} 
//删除操作
function delApi(message,panel) {
	let strarr = message.text.split(":")
	let str1 = strarr[0]
	let strArr1 = str1.split(".")
	let str2 = strArr1.slice(strArr1.length - 1)
	let ss = str2.join(".")
	let starStr = strArr1.slice(0, strArr1.length - 1).join('.')
	let fsU = strarr[1].replace(/</g, "");
	fsU = fsU.replace(/>/g, "");
	let saveUrl = `${fileUrl}/package/${starStr}/${ss}/${fsU}.json`
	deleteFolderRecursive(saveUrl)
	ruleRecode(message.text,panel)
}
//删除文件方法
function deleteFolderRecursive (url) {
    fs.unlink(url, function(err){
		if(err){
		 throw err;
		}
		console.log('文件:'+url+'删除成功！');
	})
}
//清除标记目录
function ruleRecode(isKey,panel){
	let rulerUrl = `${fileUrl}/rule.json`
	let checkFile = fs.existsSync(rulerUrl);
	let arr =[]
	if(checkFile){
		fs.readFile(rulerUrl,'utf-8',(err,data)=>{
			let newData = JSON.parse(data)
			for(var key in newData) {
				if(Array.isArray(newData[key]) && newData[key].includes(isKey)){
			    	newData[key].splice(newData[key].findIndex(item => item=== isKey), 1)
				}
			} 
			panel.webview.postMessage({text: newData,type:'refreshHis'});
			fs.writeFile(rulerUrl,JSON.stringify(newData,"","\t"),'utf-8',(err,data)=>{
				if (err) {
				}
			})	
		 })
	}
}
module.exports = {
	activate,
	deactivate
}
