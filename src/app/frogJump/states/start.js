import Phaser from 'phaser'
export default class extends Phaser.State{
    constructor () {
        super()
    }
    init() {
        var bgPic = game.add.image(0,0, 'bgImg')
        bgPic.width = bgWidth
        bgPic.height = bgHeight
        bgPic.centerX = screenWidth / 2
        bgPic.centerY = screenHeight / 2
        // 蛙
        this.frogInit = game.add.sprite(offsetX(20), offsetY(170), 'frogInit')
        this.frogInit.width = scaleSize(135)
        this.frogInit.height = scaleSize(119)
        // 禁止的蛙房子
        this.house1 = game.add.image(offsetX(550), offsetY(25), 'house2')
        this.house1.width = scaleSize(339)
        this.house1.height = scaleSize(281)
        var graphics = game.add.graphics(0, 0)
        graphics.alpha = 0.8
        graphics.beginFill(0x020202)
        graphics.drawRect(0, 0, screenWidth, screenHeight)
        graphics.endFill()
    }
    create() {
        var that=this
        //在舞台中心添加点击开始游戏图片
        var startBtn=this.add.sprite(offsetX(200), offsetY(50), 'start' )
        startBtn.width = scaleSize(594)
        startBtn.height = scaleSize(541)
        // startBtn.anchor.setTo(0.5, 0.5)
        that.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
        startBtn.visible = true
        // 解决开始按钮从底部往中间飞的问题
        setTimeout(function () {
            startBtn.visible = true
        }, 10)
        startBtn.inputEnabled = true
        startBtn.events.onInputDown.add(function() {
            startBtn.visible = false
            game.state.start('play')
        }, startBtn)
    }
}
