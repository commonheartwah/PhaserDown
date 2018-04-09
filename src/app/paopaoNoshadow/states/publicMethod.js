
export default {
    extractingData:function(_responseData){
        var arr = [],
            resources = [];
        function getVal(_responseData) {
            for (var i in _responseData) {
                if (typeof _responseData[i] == 'object') {
                    getVal(_responseData[i])
                } else {
                    arr.push([ i,_responseData[i] ])
                }
            }
        }
        getVal(_responseData);
        for (var i = 0; i < arr.length; i++) {
            for (var j = 0; j < arr[i].length; j++) {
                if (/.jpg$|.png$|.gif$|.mp3$/g.test(arr[i][j])) {
                    resources.push(arr[i])
                }
            }
        }
        return resources
    },
    pageIndex:function(data){
        var key = [];
        for (var item in data) {
            key.push(item)
        }
        key.sort()
        return key;
    },
    objectKeys:function(obj){
        var exam = Object.keys(obj).map(function(k) {
            return {
                value: obj[k],
                keys: k
            }
        })
        return exam;
    },
	ranDom:function(n, m) {
		return Math.floor(Math.random() * (m - n) + n);
	},
    /**
     * @func 游戏结束
     */
    gameOver:function(nextPage,lastPage) {
        // 判断是否是最后一页
        if( window.currentPage < window.totalPage ) {
            // 不是最后一页
            window.qid ? submitScore( window.qid, window.type, window.currentPage, window.totalPage, window.perScore, window.correctCount, window.totalScore ) :'';
                window.currentPage++
                // 此处应该开始下一页的游戏
                nextPage&&nextPage()
        } else {
            // 是最后一页
            lastPage&&lastPage()
            // 判断是否是该关卡的最后一个游戏
            if( window.isFinalGame ) {
                if( window.qid ) {
                    submitScore( window.qid, window.type, window.currentPage, window.totalPage, window.perScore, window.correctCount, window.totalScore )
                } else {
                    var startNumber = 2; // 星星个数
                    var isFinalGame = true; // true代表最后一关的最后一个游戏
                    var isFinalBarrier = false; // true代表最后一个关卡
                    var isSingleLink = true; //非集训营和地图单个链接游戏结束
                    window.starRating( 'modalBox', startNumber, isFinalGame, isFinalBarrier, isSingleLink )
                    window.buttonClick( true )
                }
            } else {
                var startNumber = 2; // 星星个数
                var isFinalGame = false; // true代表最后一关的最后一个游戏
                var isFinalBarrier = false; // true代表最后一个关卡
                var isSingleLink = false; //非集训营和地图单个链接游戏结束
                window.starRating( 'modalBox', startNumber, isFinalGame, isFinalBarrier, isSingleLink )
                window.buttonClick( false )
            }
        }
    }
    /**
     * @func 显示最终的结束页
     * @param  {[number]} startNumber 星星数量
     * @param  {[type]} isFinalGame   true是当前关卡最后一个游戏
     * @param  {[type]} isFinalBarrier    true代表最后一个关卡
     * @param  {[type]} isSingleLink    是否是之前的集训营链接形式或者单个链接形式
     */
}
window.starRating = function( string, num, isFinalGame, isFinalBarrier, isSingleLink ) {
    // 如果是单个链接只显示一个重来按钮
    if( isSingleLink ) {
        window.interAction.overType = 1;
        startState( 1 )
        return
    }
    // 不是当前关卡的最后一个游戏 应该显示greatImg 包含了home和next按钮
    if (!isFinalGame) {
        startState( 2 )
        return
    }
    // 判断如果是当前关卡最后一个游戏且是最后一个关卡应该显示again home 足迹
    if( isFinalGame && isFinalBarrier ) {
        window.interAction.overType = 2;
        startState( 1 )
        return
    }
    // 否则应该显示again home next
    window.interAction.overType = 3;
    window.startState( 1 )
    return
}
window.startState = function( type ) {
    if( type == 1 ) {
        window.gameMainObj.state.start( 'over' )
    } else if(type == 2) {
        window.gameMainObj.state.start( 'centerState' );
    }
}
