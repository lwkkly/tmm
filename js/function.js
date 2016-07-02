/*2016/04/28
	获取类名兼容函数
	参数1：查找的类名
	参数2：查找范围
*/
function getClass(classname,obj){
	//不传参数2时，默认为从document中查找
	obj=obj||document;	
	//判断浏览器			
	if(obj.getElementsByClassName){//条件为真   chrome  ff
		return obj.getElementsByClassName(classname);
	}else{//条件为假   IE
		//ID(只能选一个)   Name(只能表单)    Tag
		var all=obj.getElementsByTagName("*");//找到所有的标签名
		var arr=[];
		for(var i=0;i<all.length;i++){//遍历数组
			if(checkRe(all[i].className,classname)){//如果元素的className与classname相同
				arr.push(all[i]);//把该元素添加到新数组中
			}
		}
		return arr;
	}
}
function checkRe(str,classname){//"aa bb cc"
	var arr=str.split(" ");//用空格把字符串拆分成数组["aa","bb","c"]
	for(var i in arr){//遍历数组
		if(arr[i]==classname){//判断元素是否与classname相同
			return true;//相同返回true
		}
	}
	return false;//所有元素比较后都不相同返回false
}
/*2016/05/03
	纯文本的兼容函数
	参数1：obj:对象
	参数2；val：要设置的值
*/
function getText(obj,val){
	if(val==undefined){   //val无值   获取
		if(obj.textContent){//ff
			return obj.textContent;
		}else{//ie
			return obj.innerText;
		}
	}else{			//val有值   设置
		if(obj.textContent){
			obj.textContent=val;
		}else{
			obj.innerText=val;
		}
	}
}
/*2016/05/03
	获取样式的兼容函数
	参数1：obj:对象
	参数2；attr：属性
*/
function getStyle(obj,attr){
	if(obj.currentStyle){//ie
		return parseInt(obj.currentStyle[attr]);
	}else{//ff
		return parseInt(getComputedStyle(obj,null)[attr]);
	}
}
/*2016/05/05
	获取元素的兼容函数  （类名  标签  id）
	参数1：selector:表示选择器 与css一样 
	参数2；obj：范围
*/
function $(selector,obj){
	obj=obj||document;//给范围设置默认值
	if(typeof selector=="string"){//字符串
		selector=selector.replace(/^\s*|\s*$/g,"");//去除字符串左右的空格
		if(selector.charAt(0)=="."){//类名
			return getClass(selector.slice(1),obj);
		}else if(selector.charAt(0)=="#"){//id
			return obj.getElementById(selector.slice(1));
		}else if(/^[a-zA-Z1-6]{1,6}$/.test(selector)){//标签
			return obj.getElementsByTagName(selector);
		}
	}else if(typeof selector=="function"){//函数
		window.onload=function(){
			selector();
		}
	}
}
/*2016/05/06
	获取子节点的兼容函数
	参数1：父容器
	参数2；type  a:只获取元素子节点
			     b:获取元素+文本子节点
*/
function getChild(obj,type){
	type=type||"a";
	var all=obj.childNodes;
	var arr=[];
	for(var i=0;i<all.length;i++){
		if(type=="a"){
			if(all[i].nodeType==1){
				arr.push(all[i]);
			}
		}else if(type=="b"){
			if(all[i].nodeType==1||(all[i].nodeType==3&&all[i].nodeValue.replace(/^\s*|\s*$/g,"")!="")){
				arr.push(all[i])
			}
		}
	}
	return arr;
}
/*获取第一个子节点*/
function getFirst(obj,type){
	return getChild(obj,type)[0]; 
}
/*获取最后一个子节点*/
function getLast(obj,type){
	return getChild(obj,type)[getChild(obj,type).length-1];
}
/*获取指定下标的子节点*/
function getNum(obj,type,num){
	return getChild(obj,type)[num];
}

