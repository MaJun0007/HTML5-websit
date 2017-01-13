var curId = 0;
var arrScene = ["content", "portfolio","falls"];
var arrColor = ["#3498db","#1abc9c","#95A5A6"];
var timer;
$(document).ready(function(){
	//切换页面渐显
	$('.main_link').each(function(index){
		$(this).attr("index", index);
		$("#"+arrScene[index]).css("opacity",0);
		$(this).click(function(event){
			event.preventDefault();
			if(!TweenMax.isTweening($('body')) && curId!=$(this).attr("index")){
				TweenMax.to($('#'+arrScene[curId]),.3,{top:"100%",opacity:0,display:"none"});
				curId = $(this).attr("index");
				if(arrScene[curId]!="content"){
					TweenMax.to($('#side_nav'),.5,{display:"none",opacity:0});
				}else{
					TweenMax.to($('#side_nav'),.5,{display:"block",opacity:1});
				}
				TweenMax.to($('body'),.5,{backgroundColor:arrColor[curId]});
				TweenMax.to($('#nav a'),.5,{color:arrColor[curId]});
				TweenMax.to($('#nav ul input'),.5,{borderColor:arrColor[curId]});
				TweenMax.to($('#'+arrScene[curId]),.5,{top:"0%", opacity:1,display:"block", delay:.5});
			}
		});
		console.log(this.variables)
	});
	//第一次进入页面渐显
	TweenMax.to($('#content'),2,{opacity:1});
	//portfolio页面弹出框
	$(".portfolio_link").each(function(index){
		$(this).attr("index",index+1);
		$(this).click(function(event){
			event.preventDefault();
			$("#popup").addClass("show");
			$('#pop_content').addClass('show');
			var index=$(this).attr("index");
			$("#popup_holder").html($("#work"+index).html());
		})
	});
	$("#pop_bg,.close").click(function(){
		$("#popup").removeClass("show");
		$('#pop_content').removeClass('show');
	});
	//主页登录按钮显示登录方式
	$("#logoIn").click(function(){
		if($("#logoIn_list").css("display")=="block"){
			$("#logoIn_list").css("display","none");
		}else{
			$("#logoIn_list").css("display","block");
		}
	});
	//注册按钮
	$("#register").click(function(){
		$("#register_popup").addClass("show");
		$("#register_pop_content").addClass("show");
		$("body").css("overflow","hidden");
	});
	$("#register_pop_content .close").click(function(){
		$("#register_popup").removeClass("show");
		$('#register_pop_content').removeClass('show');
		$("body").css("overflow","auto");
	});
	$("#register_title li h1").click(function(){
		$("#register_title li h1").removeClass("active");
		$(this).addClass("active");
	});
	//获取短信验证倒计时
	$("#get_utext").click(function(){
		$("#get_utext").attr("value","60s");
		var value=parseInt($("#get_utext").attr("value"));
		timer=setInterval(function(){
			value--;
			$("#get_utext").attr("value",value+"s");
			if(value<0){
				$("#get_utext").attr("value","重新获取验证码");
				clearInterval(timer);
				timer=null;
			}
		},1000);
	});
	//滑块注册，拖动滑块
	var drag=document.getElementById("drag");
	var dot=document.getElementById("dot");
	var drag_final=160;
	var dot_max=120;
	var drag_start=drag.offsetLeft;
	var dot_start=dot.offsetLeft;
	dot.onmousedown=function(e){
		var start= e.clientX;
		//不断获取当前点的位置
		var dot_curr=dot.offsetLeft;
		document.onmousemove=function(e){
			var move=e.clientX-start;
			var to=dot_curr+move;
			if(to>dot_max+dot_start){
				to=dot_max+dot_start;
			}else if(to<dot_start){
				to=dot_start;
			}
			dot.style.left=to+"px";
			drag.style.left=(drag_start+to-dot_start)+"px";
		};
		document.onmouseup=function(){
			this.onmousemove=null;
			if(Math.abs(drag.offsetLeft-drag_final)<=7){
				$("#sl_info").html("验证成功！");
				$("#sl_info").css("color","#E74C3C");
				//验证成功后禁止移动点
				dot.onmousedown=null;
			}
		}
	};
	//日历事件
	//显示当前日期日历
	refreshDate();
	//当前日期日历点击几号显示绿边框
	day_click();
	$("#prev").click(function(e){
		e.preventDefault();
		now_month--;
		//防止点击过快now_month<0
		if(now_month<=0){
			now_month=11;
			now_year--;
		}
		//显示上一个月日期日历
		refreshDate();
		//上一个月日期日历点击几号显示绿边框
		day_click()
	});
	$("#next").click(function(e){
		e.preventDefault();
		now_month++;
		if(now_month>11){
			now_month=0;
			now_year++;
		}
		//显示下一个月日期日历
		refreshDate();
		//下一个月日期日历点击几号显示绿边框
		day_click()
	});
	$("#calendar_btn").click(function(e){
		e.preventDefault();
	});
	$("#calendar_li").mouseover(function(){
		$(".calendar").css("display","block");
	});
	$("#calendar_li").mouseout(function(){
		$(".calendar").css("display","none");
	});
	//瀑布图片一个个延迟
	$(".pic").each(function(index){
		$(this).css("animationDelay",("0."+index) *.5+"s");
	})
});
var nav=$("#nav");
var home_position=$("#home").offset().top;
var home_color="#3498D8";
var about_position=$("#about").offset().top;
var about_color="#9B59B6";
var service_position=$("#service").offset().top;
var service_color="#E67E22";
var buffer=0;
window.onscroll=function(){
	//用于固定主导航固定在顶部
	var scrollTop=document.body.scrollTop|| document.documentElement.scrollTop;
	if (scrollTop<50){
		nav.removeClass("fixed")
	}else{
		nav.addClass("fixed");
	}
	//当不是瀑布流页面时
	if($("#falls").css("display")!="block"){
		//达到滚轮相应位置修改背景颜色，显示边导航
		$("body").removeClass();
		$("#nav ul li a").removeClass();
		$("#side_nav ul li a").removeClass();
		if ((scrollTop+buffer)>=service_position){
			$("body").css("background-color",service_color);
			$("#nav ul li a").css("color",service_color);
			$("#link3").addClass("scrolling");
		}else if((scrollTop+buffer)>=about_position){
			$("body").css("background-color",about_color);
			$("#nav ul li a").css("color",about_color);
			$("#link2").addClass("scrolling");
		}else if((scrollTop+buffer)>=home_position){
			$("body").css("background-color",home_color);
			$("#nav ul li a").css("color",home_color);
			$("#link1").addClass("scrolling");
		}
	}
};
var sp_month=[31,29,31,30,31,30,31,31,30,31,30,31];
var normal_month=[31,28,31,30,31,30,31,31,30,31,30,31];
var month_name=["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];
var now=new Date();
var now_year=now.getFullYear();
var now_month=now.getMonth();
var now_day=now.getDate();
function isSp_month(year,month){
	if((year%4==0)||(year%400==0)&&(year%100!=0)){
		return sp_month[month];
	}else{
		return normal_month[month];
	}
}
function get_firstDay(month,year){
	var first=new Date(year,month,1);
	return (first.getDay());
}
function refreshDate(){
	var str="";
	var currMonth_days=isSp_month(now_year,now_month);
	var firstDay=get_firstDay(now_month,now_year);
	var li_class="";
	for (var i= 0;i<firstDay;i++){
		str+="<li></li>";
	}
	for (var j=1;j<=currMonth_days;j++){
		if(now_year==now.getFullYear()&&now_month==now.getMonth()&&j<now_day||now_year==now.getFullYear()&&now_month<now.getMonth()||now_year<now.getFullYear()){
			li_class=" class='lingthgrey'";
		}else if(now_year==now.getFullYear()&&now_month==now.getMonth()&&j==now_day){
			li_class=" class='white white_box'"
		}else{
			li_class=" class='drakgrey'"
		}
		str+="<li"+li_class+">"+j+"</li>";

	}
	$("#days").html(str);
	$("#calendar_title").html(month_name[now_month]);
	$("#calendar_year").html(now_year);
	//当天之前双休日淡红
	$("#days li").each(function(index){
		if($(this).attr("class")=="lingthgrey"){
			if(index%7==0) {
				$(this).attr("class", "lingthred");
				$($("#days li")[index-1]).attr("class", "lingthred");
			}
		}
		//当天是双休日
		else if($(this).attr("class")=="white white_box"){
			if((index)%7==0||(index+1)%7==0) {
				$(this).attr("class", "drakred white_box");
			}
		}
		//当天之后是双休日
		else{
			if((index)%7==0||(index+1)%7==0) {
				$(this).attr("class", "drakred");
			}
		}
	})
}
function day_click(){
	$("#calendar_li .calendar .body #days li").click(function(){
		$("#calendar_li .calendar .body #days li").removeClass("green_box");
		$(this).addClass("green_box");
	});
}

