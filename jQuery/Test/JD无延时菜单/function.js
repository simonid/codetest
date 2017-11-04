//判断延迟的算法实现：

        /**
         * 判断是否同向
         * a:鼠标上一次位置
         * b:二级菜单上方
         * c:二级菜单下方
         * p:鼠标当前位置
         */
        function sameSign(a,b){
            return (a ^ b) >= 0;  
        }
        //向量公式:向量 ab=pb - pa
        function vector(a,b){
            return{
                x:b.x - a.x,
                y:b.y - a.y
            }
        }
        //向量叉乘公式
        function vectorProduct(v1,v2){
            return v1.x*v2.y - v2.x*v1.y;
        }

        function isPointInTrangle(p,a,b,c){
            var pa = vector(p,a);
            var pb = vector(p,b);
            var pc = vector(p,c);

            var t1 = vectorProduct(pa,pb);
            var t2 = vectorProduct(pb,pc);
            var t3 = vectorProduct(pc,pa);

            return sameSign(t1,t2) && sameSign(t2,t3);
        }

        function needDelay(elem,leftCorner,currMousePos){
            var offset = elem.offset();
            //上边缘
            var topLeft = {
                x:offset.left,
                y:offset.top
            }
            //下边缘
            var bottomLeft = {
                x:offset.left,
                y:offset.top + elem.height()
            }
            return isPointInTrangle(currMousePos,leftCorner,topLeft,bottomLeft);
        }