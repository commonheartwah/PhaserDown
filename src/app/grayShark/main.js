import Phaser from 'phaser'
import Init from './states/init'

import config from './config'
import { screenConfigInit, screenConfigPreload,screenConfigCreate } from '../../components/screenConfig'


class Game extends Phaser.Game {
  constructor() {
    const docElement = document.documentElement
    const width = 1920
    const height = 1080

    super(width, height, Phaser.CANVAS, 'content', {

      init: function () {
        screenConfigInit()
      },

      preload: function () {
        screenConfigPreload(1920,1080,game)
      },

      create:function(){
        screenConfigCreate(1920,1080,game)
      }
    })

    this.state.add('Init', Init)

    // with Cordova with need to wait that the device is ready so we will call the Boot state in another file
    if (!window.cordova) {
      this.state.start('Init')
    }
  }
}

window.game = new Game()
// screenConfig()
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
    //
    onDeviceReady: function () {
      this.receivedEvent('deviceready')
      // screenConfig()

      // When the device is ready, start Phaser Boot state.
      window.game.state.start('Init')
    },

    receivedEvent: function (id) {
      // console.log('Received Event: ' + id)
    }
  }

  app.initialize()
}
