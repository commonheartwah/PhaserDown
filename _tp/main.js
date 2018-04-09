import 'pixi'
import 'p2'
import Phaser from 'phaser'
import config from './config'
import gameOverState from '../../components/over'
import centerState from '../../components/centerPage'
import '../../components/map'

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
    window.gameWidth = 1334
    window.gameHeight = 750

    super(window.gameWidth, window.gameHeight, Phaser.CANVAS, 'content', {

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
    this.state.add('preload', preloadState, false)
    this.state.add('over', gameOverState, false)
    this.state.add('centerState', centerState, false)
  }
}

window.game = new Game()

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
