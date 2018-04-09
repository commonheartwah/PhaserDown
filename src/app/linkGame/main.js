import 'pixi'
import 'p2'
import Phaser from 'phaser'
import config from './config'
import gameMainState from './states/gameMain'
import gameStartState from './states/start'
import gameOverState from '../../components/over'
import preloadState from './states/preload'
import centerState from '../../components/centerPage'
import '../../components/map'
import '../../components/global'

class Game extends Phaser.Game {
    constructor() {
        const docElement = document.documentElement
        const DPR = window.devicePixelRatio;

        window.gameWidth = 1334;
        window.gameHeight = 750;


        //初始化canvas画布
        super(window.gameWidth, window.gameHeight, Phaser.CANVAS, 'content', {
            init: function () {
                // game.scale.pageAlignHorizontally = true
                // game.scale.pageAlignVertically = true
                this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            },
            preload: function () {
                this.load.spritesheet('loading', 'assets/common/loading.png', 1740 / 6, 240, 6);
            },
            create: function () {
                this.state.start('preload')
            }
        }, true)
        this.state.add('gameMain', gameMainState, false);
        this.state.add('start', gameStartState, false);
        this.state.add('preload', preloadState, false);
        this.state.add('over', gameOverState, false);
        this.state.add('centerState', centerState, false);
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
        //
        onDeviceReady: function () {
            this.receivedEvent('deviceready')

            // When the device is ready, start Phaser Boot state.
            // window.game.state.start('Boot')
        },

        receivedEvent: function (id) {
            console.log('Received Event: ' + id)
        }
    }

    app.initialize()
}
