// 全局变量用来判断结束页显示逻辑
window.interAction = {
    overType: 0
}
// 测试全局方法
window.buttonClick = function (isFinalGame, type) {
  //菜单按钮
  if (type == 1) {
      parent.location.reload();
  }
  // 重来
  if (type == 2) {
      if (window.qid && isFinalGame) {
          parent.replayAll()
      } else {
          window.location.reload();
          parent.replayThis()
      }
  }
  // 去往成长足迹
  if (type == 3) {
      window.gotoReport()
  }
  if (type == 4) {
      if (!window.overClick) {
          return false
      } else {
          window.overClick = false;
          if (isFinalGame) {
              if (window.qid) {
                  // 跳到下一个关卡
                  goNextTask()
              }
          } else {
              if (window.qid) {
                  // 判断如果是来自地图 游戏结束后传分
                  submitScore(window.qid, window.type, window.currentPage, window.totalPage, window.perScore, window.correctCount, window.totalScore)
              } else {
                  // 是来自集训营课程 游戏结束后调用父方法进行下个游戏
                  parent.handleGoing(window.xIndex)
              }
          }
      }

  }
}
