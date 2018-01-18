/*
实现效果：

图片自动向左运动，鼠标移动到索引会切换到指定图片，部分图片有hover阴影特效
鼠标移动到图片上会停止轮播
*/
$(function(){
	var sWidth = $("#focus").width(); //轮播图片容器宽
	var len = $("#focus ul li").length;  //所有图片容器数目
	var index = 0;
	var picTimer;

	//添加索引底栏
	var btn = "<div class='btnBg'>" + "</div><div class='btn'>";
	//var btn = "<div class='btnBg'></div><div class='btn'>";  //Error
	for(var i=0;i<len;i++){
		btn += "<span>" + (i+1) + "</span>";
	}
	btn += "</div>"

	//索引底栏加入到最外层容器
	$(btn).appendTo($("#focus"));

	$("#focus .btn span").mouseenter(function(){
		index = $("#focus .btn span").index(this); //获取索引
		showPics(index);
	});

	//获取所有容器宽度合
	$("#focus ul").css("width",sWidth*(len+1));

	//hover特效
	$("#focus ul li div").hover(function(){
		$(this).siblings().css("opacity",0.7);
	},function(){
		$("#focus ul li div").css("opacity",1);
	});


	//鼠标移动到容器上停止轮播，移出后继续轮播
	$("#focus").hover(function(){
		clearInterval(picTimer);
	},function(){
		picTimer = setInterval(function(){
			if(index == len){
				index = 0;     //如果轮播到最后一张，接着显示第一张
				showFirstPic();
			}else{
				showPics(index);
			}
			index++;
		},2000);
	});

	//切换图片
	function showPics(index){
		var nowLsft = -index * sWidth;
		$("#focus ul").stop(true,false).animate({"left":nowLeft},500);
		$("#focus .btn span").removeClass("on").eq(index).addClass("on");
	}

	//切换到第一张
	function showFirstPic(){
		$("#focus ul").append($("#focus ul li:first").clone());
		var nowLeft = -len * sWidth;
		$("#focus ul").stop(true,false).animate({"left":nowLeft},500,function(){
			$("#focus ul").css("left","0");
			$("#focus ul li:last").remove();
		});
		$("#focus .btn span").removeClass("on").eq(0).addClass("on");
	}
});