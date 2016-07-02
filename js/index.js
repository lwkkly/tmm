window.onload=function(){
	//右侧栏
	var sildetab=getClass("sildetab")[0];
	var h=document.documentElement.clientHeight;
	sildetab.style.height=h+"px";
	//搜索框
	var input=getClass("search")[0];
	input.onfocus=function(){
		this.style.color="#ccc";
	}
	input.onblur=function(){
		if(this.value==""){
			this.value="百搭T恤 女神衣橱必备";
		}
		this.style.color="#000"
	}
	//轮播图
		//图片轮播
	var bannerBox=getClass("bannerBox")[0];
	var imgs=getClass("imgbg",bannerBox);
	var divs=getClass("anniu")[0].getElementsByTagName('div');
	var num=0;
	function move(){
		for(var i=0;i<imgs.length;i++){
			imgs[i].style.opacity=0;
			divs[i].className="";
		}
		num++;
		if(num>=imgs.length){
			num=0;
		}
		animate(imgs[num],{opacity:1},600);
		divs[num].className="hover";
	}
	var t=setInterval(move,2000);
		//鼠标移入大盒子  轮播停止
	bannerBox.onmouseover=function(){
		clearInterval(t);
	}
	bannerBox.onmouseout=function(){
		t=setInterval(move,2000);
	}
		//点击按钮
	for (var i = 0; i < divs.length; i++) {
		divs[i].index=i;
		divs[i].onmouseover=function(){
			for (var i = 0; i < imgs.length; i++) {
				imgs[i].style.opacity=0;
				divs[i].className="";
			};
			imgs[this.index].style.opacity=1;
			this.className="hover";
			num=this.index;
		}
	}


	

	//热门品牌
	var items=getClass("item");
	var dis=getClass("dis");
	for (var i = 0; i < items.length; i++) {
		items[i].index=i;
		items[i].onmouseover=function(){
			dis[this.index].style.display="block";
		}
		items[i].onmouseout=function(){
			dis[this.index].style.display="none";
		}
	}
	//中间导航
	var lis=$("li",$(".subnavR")[0]);
	var as=$("a",$(".subnavR")[0]);
	var hoverpic=$(".hoverpic",$(".subnavR")[0])
	for (var i = 0; i < lis.length; i++) {
		lis[i].index=i;
		lis[i].onmouseover=function(){
			for(var j=0;j<hoverpic.length;j++){
				hoverpic[j].style.top=0;
			}
			animate(hoverpic[this.index],{top:-15},200)
		}
		lis[i].onmouseout=function(){
			hoverpic[this.index].style.top=0;
		}
	}
	//顶部float导航
	var floatnav=$(".floatnav")[0];	
	var floors=$(".floor");
	var jump=$(".jump")[0];
	var lifts=$(".lift",jump);
	var color=["#F7A945","#19C8A9","#F15453","#64C333","#0AA6E8","#EA5F8D","#DD2727"];
	var now=0;
	var flag=true;
	var flag2=true;
	document.onscroll=function(){
		var tops=document.body.scrollTop?document.body.scrollTop:document.documentElement.scrollTop;
		// document.title=tops;
		if(tops>=1100){
			if(flag2){
				animate(floatnav,{top:0},200);
				flag2=false;
				flag=true;
			}
			 
		}else{
			if(flag){
				animate(floatnav,{top:-50},200);
				flag=false;
				flag2=true;
			}
			 
		}

		//	楼层跳转
		if(tops>=1000){//如果滚动条到浏览器1000px
			jump.style.display="block"; //左侧栏出现  
		}else{
			jump.style.display="none";  //左侧栏消失
		}



		for(var i=0;i<floors.length;i++){   //遍历所有楼层
			if(floors[i].offsetTop<=tops+50){   //如果的对应楼层超出浏览器部分<=滚动条到浏览器+80；
				for(var j=0;j<lifts.length;j++){  //遍历所有楼梯 
					lifts[j].style.background="";  //让所有楼梯显示原色
				}
				lifts[i].style.background=color[i];//对应楼梯显示相对应的颜色
				now=i;
			}
		}



	}
	var obj=document.body.scrollTop?document.body:document.documentElement;//获取对象，兼容ie，ff,chrome,
	for(var i=0;i<lifts.length;i++){ //遍历所有楼梯
		lifts[i].index=i; //记下当下楼梯的下标
		lifts[i].onclick=function(){  //点击楼梯
			now=this.index;
			for(var j=0;j<lifts.length;j++){  //遍历所有楼梯
				lifts[j].style.background="";  //让所有楼梯显示原色
			}
			// obj.scrollTop=floors[this.index].offsetTop-80;
			lifts[this.index].style.background=color[this.index];  //当前楼梯显示相对应的颜色
			animate(obj,{scrollTop:floors[this.index].offsetTop-50},200)  
		}
		lifts[i].onmouseover=function(){    //鼠标移入楼梯
			for(var j=0;j<lifts.length;j++){
				if(j!=now){
					lifts[j].style.background="";
				}
				
			}
			this.style.background=color[this.index];  //当前楼梯显示相对应的颜色
		}
		lifts[i].onmouseout=function(){    //鼠标移出楼梯
			if(now!=this.index){           //如果不是现在点击过的楼梯，就让它显示原来颜色
				this.style.background="";
			}
		}
	}


	//图片左移
	function moveLeft(con){
		var conlImg=$("img",con);
		for(var j=0;j<conlImg.length;j++){
			conlImg[j].index=j;
			conlImg[j].onmouseover=function(){
				animate(conlImg[this.index],{right:30},300)
			}
			conlImg[j].onmouseout=function(){
				animate(conlImg[this.index],{right:0},300)
			}
		}
	}
	for(var i=0;i<3;i++){
		var conl=$(".containC")[i];
		var conr=$(".containR")[i];
		moveLeft(conl[i]);	
		moveLeft(conr[i]);	
	}	

}

	