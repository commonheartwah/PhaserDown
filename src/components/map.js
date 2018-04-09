/**
 * 线上环境
 * @author Jerry
 * @description 根据地图类型获取评分相关数据
 * @argument type 5 磨耳朵类型
 * @argument type 6 二选一类型
 * @argument type 7 踩白块类型
 * @argument type 8 打地鼠类型
 * @argument type 9 跑火车类型
 */
window.mapScore = function( type, data ) {
    window.perScore = data.perScore ? data.perScore : 10
    switch( type ) {
        case 6:
            window.totalScore = window.perScore
            break;
        case 7:
            window.totalScore = data.totalScore
            break;
    }
}
//  跨域iframe通信 设置超域 本地调试时注释
if( window.location.host.indexOf('babyfs.cn') > -1) {
    document.domain = 'babyfs.cn'
}

// 模板提交分数
// submitScore(qid, type, page, totalPage, single, count, full)
// qid:questId, type:类型, page:页数, totalPage:总页数, single:单次得分, count:次数, full:满分

window.submitScore = function( qid, type, page, totalPage, single, count, full ) {
    parent.updateScore( qid, type, page, totalPage, single, count, full );
}

window.gotoReport = function() {
    parent.gotoReport()
}

window.goNextTask = function() {
    parent.goNextTask()
}

// 结束显示弹框
window.showDone = function() {
    // $( '.f-modal-box' ).fadeIn();
    // $( '.home' ).show();
}
