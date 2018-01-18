;(function($){
	$.fn.carousel = function(param){
		var carousel = param.carousel;
		var list = $(carousel).children("li");  //图片节点
		var indexContainer = param.indexContainer;  //下标索引
		var prev = param.prev;
		var next = param.next;
		var time = param.time;
		var auto = param.auto;
		var timer;

		//添加索引
		for(var i=1;i<=list.length;i++){
			$(indexContainer).append("<li>" +i+ "</li>")
		} 

		var indexList = $(indexContainer).children("li");
		$(list[0]).addClass('on').fadeIn(animateTime);  //激活图片(默认0)显示
		$(indexList[0]).addClass('index');  //激活索引添加样式
		if(auto){
			startTiming();
			$(carousel + "," + prev + "," + next + "," + indexContainer).hover(function(){
				window.clearInterval(timer);
			},function(){
				startTiming();
			});
		}

		function startTiming(){
			timer = window.setInterval("$.switchImg();",time);
		};

		$(prev).off("click").on("click",function(){
			var on = $(carousel).children(".on");
			on.stop(true,true).fadeOut(animateTime).removeClass('on');
			if(on.prev().is("li")){
				$.switchIndex($(carousel).children("li").index(on.prev()));
				on.prev().stop(true,true).addClass('on').delay(animateTime/2).fadeIn(animateTime);
			}else{
				$.switchIndex($(carousel).children("li").index(list[list.length-1]));
				$(list[list.length-1].stop(true,true).addClass("on").delay(animateTime/2).fadeIn(animateTime);
			}
		});

		$(next).off("click").on("click",function(){
			var on = $(carousel).children('.on');
			on.stop(true,true).fadeOut(animateTime).removeClass("on");
				if(on.next().is("li")){
					$.switchIndex($(carousel).children("li").index(on.next()));
					on.next().stop(true,true).addClass("on").delay(animateTime/2).fadeIn(animateTime);
				}else{
					$.switchIndex($(carousel).children("li").index(list[0]));
					$(list[0]).stop(true,true).addClass("on").delay(animateTime/2).fadeIn(animateTime);
				}
		});

		$(indexList).off("click").on("click",function(){
			if($(this).attr("class") != "index"){
				var on = $(carousel).children(".on");
				var index = $(this).index();
				console.log(index);
				$(indexList).removeClass('index');
				$(indexList[index]).addClass("index");
				on.stop(true,true).fadeOut(animateTime).removeClass("on");
				$(list[index]).stop(true,true).addClass("on").delay(animateTime/2).fadeIn(aniamteTime);
			}
		});


		$.extend({
			switchIndex : function(index){
				$(indexList).removeClass('index');
				$(indexList[index]).addClass("index");
			}
		});

		$.extend({
			switchIndex : function(){
				var on = $(carousel).children(".on");
				on.stop(true,true).fadeOut(animateTime).removeClass("on");
				if(on.next().is("li")){
					$.switchIndex($(carousel).children("li").index(on.next()));
					on.next().stop(true,true).addClass("on").delay(animateTime/2).fadeIn(animateTime);
				}else{
					$.switchIndex($(carousel),children("li").index(list[0]));
					$(list[0]).stop(true,true).addClass('on').delay(animateTime/2).fadeIn(aniamteTime);
				}
			}
		});
	}
})(jQuery);