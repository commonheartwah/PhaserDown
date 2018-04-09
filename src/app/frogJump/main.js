import '../../components/callAppFunc'
import 'pixi'
import 'p2'
import Phaser from 'phaser'
// import config from './config'

import '../../components/map'
import gameOverState from '../../components/overCover'
import centerState from '../../components/centerPage'
import cover from '../../components/cover'
import preloadState from './states/preload'
import gameStartState from './states/start'
import gameStartPlay from './states/index'

var _c = 0
var _tempWidth = window.innerWidth
var t = setInterval(function(){
    if(_tempWidth != window.innerWidth){
        cover.init(function(){
            window.game = new Game()
        })
        clearInterval(t)
    }else if(_c > 20){
        cover.init(function(){
            window.game = new Game()
        })
        clearInterval(t)
    }
    _c++
},20)

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

class Game extends Phaser.Game {
  constructor() {

    super(screenWidth, screenHeight, Phaser.CANVAS, 'content', {

      init: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
      },

      preload: function () {
        this.load.spritesheet('loading', 'assets/common/loading.png', 1740 / 6, 240, 6)
      },

      create: function () {
        this.state.start('preload')
      }
    }, true)

      this.state.add('start', gameStartState, false)
      this.state.add('preload', preloadState, false)
      this.state.add('play', gameStartPlay, false)
      this.state.add('over', gameOverState, false)
      this.state.add('centerState', centerState, false)
  }
}

// window.game = new Game()

if (window.cordova) {
  var app = {
    initialize: function () {
      document.addEventListener(
        'deviceready',
        this.onDeviceReady.bind(this),
        false
      )
    },

    onDeviceReady: function () {
      this.receivedEvent('deviceready')
    },

    receivedEvent: function (id) {
      console.log('Received Event: ' + id)
    }
  }
  app.initialize()
}
