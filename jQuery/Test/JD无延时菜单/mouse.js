$(document).ready(function(){
    var sub = $('#sub');
    var activeRow;
    var activeMenu;
    var timer;
    var inTarget = false; //记录鼠标是否在子菜单
    sub.on("mouseenter",function(e){
        inTarget = true;
    }).on("mouseleave",function(e){
        inTarget = false;
    })

    var mouseTrack = [];  //创建一个记录鼠标位置的数组
    var moveHandler = function(e){
        mouseTrack.push({
            x:e.pageX,
            y:e.pageY
        })
        if(mouseTrack.length > 3){
            mouseTrack.shift();
        }
    }

    //一级菜单事件
    $('#test').on('mouseenter',function(e){
        sub.removeClass('none'); //激活二级菜单
        $(document).bind('mousemove',moveHandler);  //常识：mousemove绑定到document对象上
    })
    .on("mouseleave",function(e){
        sub.addClass('none'); //隐藏二级菜单
        if(activeRow){
            activeRow.removeClass('active');
            activeRow = null;
        }
        if(activeMenu){
            activeMenu.addClass('none');
            activeMenu = null;
        }
        //鼠标离开时要解绑，以免影响到其他组件
        $(document).unbind('mousemove',moveHandler);
    })
    .on('mouseenter','li',function(e){
        if(!activeRow){
            activeRow = $(e.target);
            activeRow.addClass('active');
            activeMenu = $('#'+activeRow.data('id'));
            activeMenu.removeClass('none');
            return
        }
    if(timer){
        clearTimeout(timer);
    }
    //当前鼠标定位
    var currMousePos = mouseTrack[mouseTrack.length - 1];
    //鼠标上一次定位
    var leftCorner = mouseTrack[mouseTrack.length - 2];
    //判断是否延迟
    var delay = needDelay(sub,leftCorner,currMousePos);

    if(delay){
        timer = setTimeout(function(){
            if(inTarget){
                return
            }
            //从一个激活的一级列表移动到另外一个一级列表
            activeRow.removeClass('active');
            activeMenu.addClass('none');

            activeRow = $(e.target);
            activeRow.addClass('active');
            activeMenu = $('#'+activeRow.data('id'));
            activeMenu.removeClass('none');
            timer = null;
        },300);
    }else{
        var prevActive = activeRow;
        var prevActiveMenu = activeMenu;

        activeRow = $(e.target);
        activeMenu = $('#'+activeRow.data('id'));

        prevActiveRow.removeClass('active');
        prevActiveMenu.addClass('none');

        activeRow.addClass('active');
        actveMenu.removeClass('none');
    }
    });
});