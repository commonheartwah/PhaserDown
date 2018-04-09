import Phaser from 'phaser'
import config from './config'
import gameOverState from '../../components/over'
import centerState from '../../components/centerPage'
import '../../components/map'
import '../../components/global'

import preloadState from './states/preload'
import gameStartState from './states/start'
import gameStartPlay from './states/index'

window.interAction = {
  overType: 0
}

class Game extends Phaser.Game {
  constructor () {
      window.gameWidth = 1334;
      window.gameHeight = 750;

      window.winWidth = document.documentElement.clientWidth*2
      window.winHeight= document.documentElement.clientHeight*2
      window.gameStartWidth = 1334
      window.gameStartHeight= 750

      super(1334, 750, Phaser.CANVAS, 'content', {
          preload: function () {
              this.load.spritesheet('loading', 'assets/common/loading.png', 1700 / 6, 240, 6)
          },
          create: function () {
              this.state.start('preload')
          }
      },true)

      this.state.add('start', gameStartState, false)
      this.state.add('preload', preloadState, false)
      this.state.add('play', gameStartPlay, false)
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

    // deviceready Event Handler
    onDeviceReady: function () {
      this.receivedEvent('deviceready')
    },

    receivedEvent: function (id) {
      console.log('Received Event: ' + id)
    }
  }

  app.initialize()
}
