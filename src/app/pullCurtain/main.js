import 'pixi'
import 'p2'
import Phaser from 'phaser'
import config from './config'
import gameOverState from '../../components/over'
import centerState from '../../components/centerPage'
import '../../components/map'

import preloadState from './states/preload'
import gameStartState from './states/start'
import gameStaOne from './states/gameStaOne'
import gameStaTwo from './states/gameStaTwo'
import gameStaThree from './states/gameStaThree'
import '../../components/global'

window.interAction = {
  overType: 0
}

class Game extends Phaser.Game {
  constructor() {
    const docElement = document.documentElement
    const width = docElement.clientWidth > config.gameWidth ? config.gameWidth : docElement.clientWidth
    const height = docElement.clientHeight > config.gameHeight ? config.gameHeight : docElement.clientHeight

    window.gameWidth = 1334
    window.gameHeight = 750

    super(window.gameWidth, window.gameHeight, Phaser.CANVAS, 'content', {

      init: function () {
        // screenConfigInit()

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
      },

      preload: function () {
        // screenConfigPreload(1334,750,game)
        this.load.spritesheet('loading', 'assets/common/loading.png', 1740 / 6, 240, 6)
      },

      create: function () {
        // screenConfigCreate(1334,750,game)
        this.state.start('preload')
      }
    }, true)
    this.state.add('gameStaOne', gameStaOne, false)
    this.state.add('gameStaTwo', gameStaTwo, false)
    this.state.add('gameStaThree', gameStaThree, false)
    this.state.add('start', gameStartState, false)
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
