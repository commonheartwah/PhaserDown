import Phaser from 'phaser'

export default class extends Phaser.State{
    constructor() {
        super();
        this.isFinalGame = window.xTotal == window.xIndex ? true : false
        this.lightLeft = null;
        this.starLeftLight = null;
        this.starCenterLight = null;
        this.lightCenter = null;
        this.starRightLight = null;
        this.lightRight = null;
        this.currentStar = 'left';
        this.smallLightWidth = 0;
        this.bigLightWidth = 0;
    }
    init() {
        // 缩放控制
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    }
    create() {
        let _self = this;
        // 加载背景图
        this.bgPic = this.add.image(0, 0, 'bgImg');
        this.bgPic.width = bgWidth
        this.bgPic.height = bgHeight
        this.bgPic.centerX = screenWidth / 2
        this.bgPic.centerY = screenHeight / 2

        // 遮罩层
        var graphics = game.add.graphics(0, 0)
        graphics.alpha = 0.8
        graphics.beginFill(0x020202)
        graphics.drawRect(0, 0, screenWidth, screenHeight)
        graphics.endFill()
        this.add.audio('starMusic').play()
// console.log(offsetX(0), offsetY(0))
        // 结束框
        var starsGroup = this.add.group();
        var overBg = game.add.image(offsetX(165), offsetY(100), 'overBg');
        overBg.width = scaleSize(712)
        overBg.height = scaleSize(334)

        // 加载perfect
        var perfextImg = game.add.image(offsetX(240), offsetY(170), 'perfect');
        perfextImg.width = scaleSize(392)
        perfextImg.height = scaleSize(121)

        /**
         * 左侧星星
         */
        // 底下星星
        var starLeftDark = game.add.image(offsetX(160), offsetY(65), 'star_dark' );
        starLeftDark.width = scaleSize(294*.8)
        starLeftDark.height = scaleSize(286*.8)
        // 左侧星星背光
        this.lightLeft = game.add.image(offsetX(160 + 50), offsetY(65 + 50), 'light')
        this.lightLeft.width = scaleSize(404*.8)
        this.lightLeft.height = scaleSize(338*.8)
        this.lightLeft.anchor.setTo(0.5, 0.5)
        this.lightLeft.alpha = 0;
        // 左侧亮星星
        this.starLeftLight = game.add.image(starLeftDark.centerX, starLeftDark.centerY, 'star_light' )
        this.smallLightWidth = this.starLeftLight.getBounds().width;
        this.starLeftLight.width = scaleSize(294*.8)
        this.starLeftLight.height = scaleSize(286*.8)
        this.starLeftLight.anchor.setTo(0.5, 0.5)
        this.starLeftLight.alpha = 0;

        /**
         * 中间星星
         */
         // 中间底部星星
        var starCenterDark = game.add.image(offsetX(150 + 112), offsetY(60 - 30), 'star_dark');
        starCenterDark.width = scaleSize(294)
        starCenterDark.height = scaleSize(286)
         // 中间星星背光
        this.lightCenter = game.add.image(offsetX(150 + 112 + 65), offsetY(60 - 10 + 55), 'light')
        this.lightCenter.width = scaleSize(404)
        this.lightCenter.height = scaleSize(338)
        this.lightCenter.anchor.setTo(0.5, 0.5)
        this.lightCenter.alpha = 0;
        // 中间亮星星
        // this.starCenterLight = game.add.image(offsetX(150 + 112), offsetY(60 - 30), 'star_light' )
        this.starCenterLight = game.add.image(starCenterDark.centerX, starCenterDark.centerY, 'star_light' )
        this.bigLightWidth = this.starCenterLight.getBounds().width;
        this.starCenterLight.width = scaleSize(294)
        this.starCenterLight.height = scaleSize(286)
        this.starCenterLight.anchor.setTo(0.5, 0.5)
        this.starCenterLight.alpha = 0;
        /**
         * 右侧星星
         */
        var starRightDark = game.add.image(offsetX(150 + 240), offsetY(65), 'star_dark');
        starRightDark.width = scaleSize(294*.8)
        starRightDark.height = scaleSize(286*.8)
        // 右侧背光
        this.lightRight = game.add.image(offsetX(150 + 240 + 55), offsetY(65 + 55), 'light')
        this.lightRight.width = scaleSize(404*.8)
        this.lightRight.height = scaleSize(338*.8)
        this.lightRight.anchor.setTo(0.5, 0.5)
        this.lightRight.alpha = 0;
        // 右侧亮星星
        this.starRightLight = game.add.image(starRightDark.centerX, starRightDark.centerY, 'star_light' )
        this.starRightLight.width = scaleSize(294*.8)
        this.starRightLight.height = scaleSize(286*.8)
        this.starRightLight.anchor.setTo(0.5, 0.5)
        this.starRightLight.alpha = 0;


        this.starAni()

        var menuBtn = game.add.image(offsetX(300 - 100), offsetY(250), 'menu')
        menuBtn.width = scaleSize(172)
        menuBtn.height = scaleSize(126)
        menuBtn.alpha = 0;
        menuBtn.visible = false

        var repeatBtn = game.add.image(offsetX(300), offsetY(250), 'repeat')
        repeatBtn.width = scaleSize(172)
        repeatBtn.height = scaleSize(126)
        repeatBtn.alpha = 0

        var nextBtn = game.add.image(offsetX(300 + 100), offsetY(250), 'nextBtn')
        nextBtn.width = scaleSize(172)
        nextBtn.height = scaleSize(126)
        nextBtn.alpha = 0;
        nextBtn.visible = false;

        var footBtn = game.add.image(offsetX(300 + 100), offsetY(250), 'foot')
        footBtn.width = scaleSize(172)
        footBtn.height = scaleSize(126)
        footBtn.alpha = 0;
        footBtn.visible = false;

        // 按钮的显示逻辑
        if(window.interAction.overType == 1) {

        } else if(window.interAction.overType == 2) {
            footBtn.visible = true;
            menuBtn.visible = true;
        } else {
            nextBtn.visible = true;
            menuBtn.visible = true;
        }

        // 按钮动画
        var menuBtnAni = this.add.tween(menuBtn)
        menuBtnAni.to({
            alpha: 1,
        }, 700)
        var repeatBtnAni = this.add.tween(repeatBtn)
        repeatBtnAni.to({
            alpha: 1,
        }, 700)

        var nextBtnAni = this.add.tween(nextBtn)
        nextBtnAni.to({
            alpha: 1,
        }, 700)

        var footBtnAni = this.add.tween(footBtn)
        footBtnAni.to({
            alpha: 1,
        }, 700)
        var footBtnScaleAni = this.add.tween(footBtn.scale)
        footBtnScaleAni.to({
            x: [1.2, 0.9, 1],
            y: [1.2, 0.9, 1]
        }, 700)
        footBtnScaleAni.loop()
        var nextBtnScaleAni = this.add.tween(nextBtn.scale)
        nextBtnScaleAni.to({
            x: [1.2, 0.9, 1],
            y: [1.2, 0.9, 1]
        }, 700)
        nextBtnScaleAni.loop()


        menuBtnAni.start()
        menuBtnAni.chain(repeatBtnAni);
        if(window.interAction.overType == 2) {
            repeatBtnAni.chain(footBtnAni);
            footBtnAni.chain(footBtnScaleAni)
        } else if(window.interAction.overType == 3) {
            repeatBtnAni.chain(nextBtnAni)
            nextBtnAni.chain(nextBtnScaleAni)
        }

        // 菜单按钮点击事件
        menuBtn.inputEnabled = true;
        menuBtn.events.onInputDown.add(function() {
            buttonClick( _self.isFinalGame, 1)
        })
        // 重玩按钮点击事件
        repeatBtn.inputEnabled = true;
        repeatBtn.events.onInputDown.add(function() {
            buttonClick( _self.isFinalGame, 2)
        })
        // 成长足迹
        footBtn.inputEnabled = true;
        footBtn.events.onInputDown.add(function() {
            buttonClick( _self.isFinalGame, 3)
        })
        // 下一关按钮点击事件
        nextBtn.inputEnabled = true;
        nextBtn.events.onInputDown.add(function() {
            buttonClick( _self.isFinalGame, 4)
        })
    }

    /**
     * 星星动画
     */
    starAni() {
        var lightCur, starCur;
        // 星星比例
        //
        var scaleStar = this.starLeftLight.width / this.smallLightWidth
        var bigScaleStar = this.starCenterLight.width / this.bigLightWidth

        if(this.currentStar == 'left') {
            starCur = this.starLeftLight;
            lightCur = this.lightLeft;
            this.starAniStart(starCur, lightCur, scaleStar)
        } else if(this.currentStar == 'center') {
            starCur = this.starCenterLight;
            lightCur = this.lightCenter;
            this.starAniStart(starCur, lightCur, bigScaleStar)
        } else if(this.currentStar == 'right') {
            starCur = this.starRightLight;
            lightCur = this.lightRight;
            this.starAniStart(starCur, lightCur, scaleStar)
        } else {
            return
        }
    }
    starAniStart(starCur, lightCur, scaleStar) {
        var _self = this;
        // 背光动画
        var lightAni = this.add.tween(lightCur);
        lightAni.to({
            alpha: 1,
            angle: 360
        }, 500)
        // 星星动画
        var starCurAni = this.add.tween(starCur)
        starCurAni.to({
            alpha: 1,
        }, 10)
        starCurAni.start();
        var starCurAniScale = this.add.tween(starCur.scale)

        starCurAniScale.to({
            x: [1.2*scaleStar, scaleStar, 1.1* scaleStar, scaleStar],
            y: [1.2*scaleStar, scaleStar, 1.1* scaleStar, scaleStar]
        }, 500)
        starCurAniScale.start();
        starCurAni.chain(lightAni)
        starCurAniScale.onComplete.add(function() {
            if(_self.currentStar == 'left') {
                _self.currentStar = 'center'
                _self.starAni()
            } else if(_self.currentStar == 'center'){
                _self.currentStar = 'right'
                _self.starAni()
            } else if(_self.currentStar == 'right'){
                return
            }
        })
    }
}
