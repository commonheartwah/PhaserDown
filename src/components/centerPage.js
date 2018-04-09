import Phaser from 'phaser'

export default class extends Phaser.State{
    constructor () {
        super();
    }
    init() {
        // 缩放控制
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    }
    create() {
        // 背景图
        this.add.image(0, 0, 'bgImg')
        // 遮罩层
        var mask = new Phaser.Polygon( [ new Phaser.Point( 0, 0 ), new Phaser.Point( window.gameWidth, 0 ), new Phaser.Point( window.gameWidth, window.gameHeight ), new Phaser.Point( 0, window.gameHeight ) ] );
        this.maskState = this.add.graphics( 0, 0 )
        this.maskState.beginFill( 0x000000 );
        this.maskState.drawPolygon( mask.points );
        this.maskState.alpha = 0.6
        this.maskState.endFill();

        // greatImg 图片显示
        var greatImg = this.add.image(this.world.centerX, this.world.centerY -100, 'greatImg');
        greatImg.anchor.setTo(0.5, 0.5);

        // 加载按钮项
        var menuBtn = this.add.image(0, greatImg.centerY + 300, 'menu');
        var nextBtn = this.add.image(0, greatImg.centerY + 302, 'nextBtn');
        menuBtn.anchor.setTo(0.5, 0.5);
        nextBtn.anchor.setTo(0.5, 0.5);
        menuBtn.x = greatImg.centerX - menuBtn.getBounds().width/2 - 10;
        nextBtn.x = greatImg.centerX + menuBtn.getBounds().width/2;

        // 菜单按钮点击事件
        menuBtn.inputEnabled = true;
        menuBtn.events.onInputDown.add(function() {
            buttonClick( window.isFinalGame, 1);
        })

        // 下一关按钮点击事件
        nextBtn.inputEnabled = true;
        nextBtn.events.onInputDown.add(function() {
            buttonClick( window.isFinalGame, 4);
        })
        var nextBtnAni = this.add.tween(nextBtn.scale);
        nextBtnAni.to({
            x: [1.2, 0.9, 1],
            y: [1.2, 0.9, 1]
        }, 800)
        nextBtnAni.start()
        nextBtnAni.loop()
    }
}
