import Phaser from 'phaser'
export default class extends Phaser.State{
    constructor () {
        super()
    }
    init() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
        game.add.image(0, 0,'bgImg')
        var graphics = game.add.graphics(0, 0)
        graphics.alpha = 0.8
        graphics.beginFill(0x020202)
        graphics.drawRect(0, 0, window.gameWidth,window.gameHeight)
        graphics.endFill()
    }
    create() {
        var that=this
        this.prompt = this.add.audio('pp');
        //在舞台中心添加点击开始游戏图片
        var startBtn=this.add.sprite(window.gameWidth/2, window.gameHeight/2, 'start' )
        startBtn.anchor.setTo(0.5, 0.5)
        startBtn.width=594
        startBtn.height=541
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
