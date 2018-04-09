$(document).ready(function(){
	$(window).on("load",function(){
		waterFail();
		//用JSON的格式模拟加载的图片数据
		var imgDate={"date":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"},{"src":"6.jpg"},{"src":"7.jpg"},{"src":"8.jpg"},{"src":"9.jpg"},{"src":"10.jpg"}]}
		$(window).scroll(function(){//滚动时加载图片
			if(scrollTime()){
     			$.each(imgDate.date,function(index,value){
     				var newBox=$("<div>").addClass("box").appendTo($(".container"));
     				var newContent=$("<div>").addClass("content").appendTo(newBox);
     				$("<img>").attr("src","./images/"+$(value).attr("src")).appendTo(newContent);
     			})
     			waterFail();
			}

		})
	});
});


function waterFail(){
	var box=$(".box");
	var boxWidth=box.first().outerWidth();//获取盒子的宽度
	var winWidth=$(window).width();//获取window窗口的宽度
	var boxNum=Math.floor(winWidth/boxWidth);//获取每行可放图片的个数
	$(".container").css({"width":boxWidth*boxNum+"px","margin":"0 auto"});//设置外容器container的宽度，并居中
	var boxHeight=[];//用于存入第一行的每个box的高度及后面每列的高度
	$.each(box,function(index,value){
		if(index<boxNum){
			boxHeight[index]=box.eq(index).outerHeight();//获取第一行第个盒子的高度
		}else{
			var minHeight=Math.min.apply(null,boxHeight);//取得第一行盒子高度最小值o
			var minHeIndex=$.inArray(minHeight,boxHeight);//取得最小高度盒子的索引
			$(value).css({"position":"absolute","top":minHeight+"px","left":minHeIndex*boxWidth+"px"});//依次设置图片的位置
			boxHeight[minHeIndex]+=box.eq(index).outerHeight();//更改boxHeight中的最小高度值
		}

	})
}

//确定滚动加载图片的时间
function scrollTime(){
	var box=$(".box");
	var lastImgHeight=box.last().offset().top+Math.floor(box.last().outerHeight()/2);
	var documentHeight=$(window).height();//获取window的高度
	var scrollHeight=$(window).scrollTop();//获取滚动的高度
	return (lastImgHeight<documentHeight+scrollHeight)?true:false;

}