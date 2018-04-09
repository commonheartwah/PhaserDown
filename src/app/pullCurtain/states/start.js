import Phaser from 'phaser'


export default class extends Phaser.State{
    constructor () {
        super();
    }

    init() {
        // this.scale.pageAlignHorizontally = true
        // this.scale.pageAlignVertically = true
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    }

    preload() {

    }

    create() {
        let _self = this
        this.add.image(0, 0, 'bgImg')

        // 遮罩
        const mask = new Phaser.Polygon([ new Phaser.Point(0, 0), new Phaser.Point(window.gameWidth, 0), new Phaser.Point(window.gameWidth, window.gameHeight), new Phaser.Point(0, window.gameHeight) ])
        const maskState = this.add.graphics(0, 0)
        maskState.beginFill(0x000000)
        maskState.drawPolygon(mask.points)
        maskState.alpha = 0.7
        maskState.endFill()

        // 加开始按钮 用来触发背景音乐
        const startBtn = this.add.image(window.gameWidth/2, window.gameHeight/2, 'start')
        startBtn.anchor.setTo(0.5, 0.5)
        startBtn.visible = false
        // 解决开始按钮从底部往中间飞的问题
        setTimeout(function () {
            startBtn.visible = true
        }, 10)

        startBtn.inputEnabled = true
        startBtn.events.onInputDown.add(function() {
            startBtn.visible = false
            maskState.visible = false
            _self.state.start('gameStaOne')

            const bgMusic = _self.add.audio('bgMusic')
            bgMusic.play()
            const intrduceMusic = _self.add.audio('intrduceMusic')
            intrduceMusic.play()
            intrduceMusic.onStop.add(_self.intrduceMusicOver, _self)
        }, startBtn)
    }
    // 引导语音结束 才可点击图片
    intrduceMusicOver() {
        // this.state.states.gameStaOne.clickStatus = true
    }
}
