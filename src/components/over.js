import Phaser from 'phaser'
// import config from '../config'

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
    }
    init() {
        // 缩放控制
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    }
    create() {
        let _self = this;
        // 加载背景图
        this.add.image(0, 0, 'bgImg');

        // 遮罩层
        var mask = new Phaser.Polygon([ new Phaser.Point(0, 0), new Phaser.Point(window.gameWidth, 0), new Phaser.Point(window.gameWidth, window.gameHeight), new Phaser.Point(0, window.gameHeight) ]);
        var maskState = this.add.graphics(0, 0)
        maskState.beginFill(0x000000);
        maskState.drawPolygon(mask.points);
        maskState.alpha = 0.7;
        maskState.endFill();
        this.add.audio('starMusic').play()

        // 结束框
        var starsGroup = this.add.group();
        var overBg = starsGroup.create(window.gameWidth/2, window.gameHeight/2, 'overBg');
        overBg.anchor.setTo(0.5, 0.5)

        // 星星比例
        var scaleStar = 253/294;
        /**
         * 左侧星星
         */
        // 底下星星
        var starLeftDark = starsGroup.create(window.gameWidth/2 - 234, window.gameHeight/2 - 110, 'star_dark' );
        starLeftDark.anchor.setTo(0.5, 0.5)
        starLeftDark.scale.setTo(scaleStar, scaleStar)

        // 左侧星星背光
        this.lightLeft = starsGroup.create(starLeftDark.centerX, starLeftDark.centerY, 'light')
        this.lightLeft.anchor.setTo(0.5, 0.5)
        this.lightLeft.alpha = 0;

        // 左侧亮星星
        this.starLeftLight = starsGroup.create(starLeftDark.centerX, starLeftDark.centerY, 'star_light' )
        this.starLeftLight.anchor.setTo(0.5, 0.5)
        this.starLeftLight.scale.setTo(scaleStar, scaleStar);
        this.starLeftLight.alpha = 0;
        /**
         * 中间星星
         */
         // 中间底部星星
        var starCenterDark = starsGroup.create(window.gameWidth/2 , window.gameHeight/2 - 150, 'star_dark');
        starCenterDark.anchor.setTo(0.5, 0.5)
         // 中间星星背光
        this.lightCenter = starsGroup.create(starCenterDark.centerX, starCenterDark.centerY, 'light')
        this.lightCenter.anchor.setTo(0.5, 0.5)
        this.lightCenter.alpha = 0;
        // 中间亮星星
        this.starCenterLight = starsGroup.create(starCenterDark.centerX, starCenterDark.centerY, 'star_light' )
        this.starCenterLight.anchor.setTo(0.5, 0.5)
        this.starCenterLight.alpha = 0;
        /**
         * 右侧星星
         */
        var starRightDark = starsGroup.create(window.gameWidth/2 + 234, window.gameHeight/2 - 110, 'star_dark');
        starRightDark.anchor.setTo(0.5, 0.5)
        starRightDark.scale.setTo(scaleStar, scaleStar)
        // 右侧背光
        this.lightRight = starsGroup.create(starRightDark.centerX, starRightDark.centerY, 'light')
        this.lightRight.anchor.setTo(0.5, 0.5)
        this.lightRight.alpha = 0;
        // 右侧亮星星
        this.starRightLight = starsGroup.create(starRightDark.centerX, starRightDark.centerY, 'star_light' )
        this.starRightLight.anchor.setTo(0.5, 0.5)
        this.starRightLight.scale.setTo(scaleStar, scaleStar);
        this.starRightLight.alpha = 0;

        // 加载perfect
        var perfextImg = starsGroup.create(starsGroup.centerX, starsGroup.centerY + 120
            , 'perfect');
        perfextImg.anchor.setTo(0.5, 0.5)
        this.starAni()

        // this.overBgAni(overBg, starLeftDark, starCenterDark, starRightDark, perfextImg)

        var menuBtn = starsGroup.create(overBg.centerX - 300, overBg.centerY + 150, 'menu')
        menuBtn.alpha = 0;
        menuBtn.visible = false

        var repeatBtn = starsGroup.create(overBg.centerX, overBg.centerY + 150, 'repeat')
        repeatBtn.anchor.setTo(0.5, 0)
        repeatBtn.alpha = 0

        var nextBtn = starsGroup.create(overBg.centerX + 200, overBg.centerY + 220, 'nextBtn')
        // nextBtn.scale.setTo(172/189, 126/150)
        nextBtn.anchor.setTo(0.5, 0.5)
        nextBtn.alpha = 0;
        nextBtn.visible = false;

        var footBtn = starsGroup.create(overBg.centerX + 200, overBg.centerY + 215, 'foot')
        footBtn.anchor.setTo(0.5, 0.5)
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
     * 背景图动效
     */
    overBgAni(overBg, starLeftDark, starCenterDark, starRightDark, perfextImg) {
        var _self = this
        var overBgScale = this.add.tween(overBg.scale)
        overBgScale.to({
            x: [1.3, 0.8, 1.2, 0.9, 1.1, 1],
            y: [1.3, 0.8, 1.2, 0.9, 1.1, 1]
        }, 1000)
        overBgScale.start()
        var starLeftDarkScale = this.add.tween(starLeftDark.scale)
        starLeftDarkScale.to({
            x: [1.3, 0.8, 1.2, 0.9, 1.1, 1],
            y: [1.3, 0.8, 1.2, 0.9, 1.1, 1]
        }, 1000)
        starLeftDarkScale.start()
        var starCenterDarkScale = this.add.tween(starCenterDark.scale)
        starCenterDarkScale.to({
            x: [1.3, 0.8, 1.2, 0.9, 1.1, 1],
            y: [1.3, 0.8, 1.2, 0.9, 1.1, 1]
        }, 1000)
        starCenterDarkScale.start()

        var starRightDarkScale = this.add.tween(starRightDark.scale)
        starRightDarkScale.to({
            x: [1.3, 0.8, 1.2, 0.9, 1.1, 1],
            y: [1.3, 0.8, 1.2, 0.9, 1.1, 1]
        }, 1000)
        starRightDarkScale.start()

        var perfextImgScale = this.add.tween(perfextImg.scale)
        perfextImgScale.to({
            x: [1.3, 0.8, 1.2, 0.9, 1.1, 1],
            y: [1.3, 0.8, 1.2, 0.9, 1.1, 1]
        }, 1000)
        perfextImgScale.start()
        perfextImgScale.onComplete.add(function () {
            _self.starAni()
        })
    }

    /**
     * 星星动画
     */
    starAni() {
        var lightCur, starCur;
        // 星星比例
        var scaleStar = 253/294;

        if(this.currentStar == 'left') {
            starCur = this.starLeftLight;
            lightCur = this.lightLeft;
            this.starAniStart(starCur, lightCur, scaleStar)
        } else if(this.currentStar == 'center') {
            starCur = this.starCenterLight;
            lightCur = this.lightCenter;
            this.starAniStart(starCur, lightCur, 1)
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
