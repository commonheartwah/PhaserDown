import Phaser from 'phaser'

/**
 * @func 游戏结束
 */
function gameOver() {
    // 判断是否是最后一页
    if( window.currentPage < window.totalPage ) {
        // 不是最后一页
        window.qid ? submitScore( window.qid, window.type, window.currentPage, window.totalPage, window.perScore, window.correctCount, window.totalScore ) :'';
            window.currentPage++
            // 此处应该开始下一页的游戏
            //
    } else {
        // 是最后一页
        // 判断是否是该关卡的最后一个游戏
        if( window.isFinalGame ) {
            if( window.qid ) {
                submitScore( window.qid, window.type, window.currentPage, window.totalPage, window.perScore, window.correctCount, window.totalScore )
            } else {
                var startNumber = 2; // 星星个数
                var isFinalGame = true; // true代表最后一关的最后一个游戏
                var isFinalBarrier = false; // true代表最后一个关卡
                var isSingleLink = true; //非集训营和地图单个链接游戏结束
                window.starRating( 'modalBox', startNumber, isFinalGame, isFinalBarrier, isSingleLink )
                window.buttonClick( true )
            }
        } else {
            var startNumber = 2; // 星星个数
            var isFinalGame = false; // true代表最后一关的最后一个游戏
            var isFinalBarrier = false; // true代表最后一个关卡
            var isSingleLink = false; //非集训营和地图单个链接游戏结束
            window.starRating( 'modalBox', startNumber, isFinalGame, isFinalBarrier, isSingleLink )
            window.buttonClick( false )
        }
    }
}
/**
 * @func 显示最终的结束页
 * @param  {[number]} startNumber 星星数量
 * @param  {[type]} isFinalGame   true是当前关卡最后一个游戏
 * @param  {[type]} isFinalBarrier    true代表最后一个关卡
 * @param  {[type]} isSingleLink    是否是之前的集训营链接形式或者单个链接形式
 */
window.starRating = function( string, num, isFinalGame, isFinalBarrier, isSingleLink ) {
    // 如果是单个链接只显示一个重来按钮
    if( isSingleLink ) {
        window.interAction.overType = 1;
        startState( 1 )
        return
    }
    // 不是当前关卡的最后一个游戏 应该显示greatImg 包含了home和next按钮
    if (!isFinalGame) {
        startState( 2 )
        return
    }
    // 判断如果是当前关卡最后一个游戏且是最后一个关卡应该显示again home 足迹
    if( isFinalGame && isFinalBarrier ) {
        window.interAction.overType = 2;
        startState( 1 )
        return
    }
    // 否则应该显示again home next
    window.interAction.overType = 3;
    window.startState( 1 )
    return
}
window.startState = function( type ) {
    if( type == 1 ) {
        window.gameMainObj.state.start( 'over' )
    } else if(type == 2) {
        window.gameMainObj.state.start( 'centerState' );
    }
}
export default class extends Phaser.State {
    constructor() {
        super();
        this.rabbitAni = null;
        this.rewardImg = null;
        this.currentWord = 0;
        this.maskState = null;
        this.bgLight = null;
        this.eatCarrot = null;
        this.clickStatus = true;
        this.score = 0;
        window.gameMainObj = this;
        this.rabbitCloseMouse = null;
        this.rabbitOpenMouse = null;
        this.fristClick = true;
        this.intrduceMusic = null;
        this.preWord = null;
    }
    init() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    }
    preload() {
        var wordData = this.state.states.preload.wordArr;
        for(var i=0;i<wordData.length;i++){
            if(wordData[i].audioSrc.search(/https/)){
                wordData[i].audioSrc=wordData[i].audioSrc.replace(/http/,'https')
            }
            if(wordData[i].imgSrc.search(/https/)){
                wordData[i].imgSrc=wordData[i].imgSrc.replace(/http/,'https')
            }
        }        
        for (var i = 0; i < 3; i++) {
            this.load.image( 'wordCard' + ( i + 1 ), wordData[i].imgSrc );
            this.load.audio( 'wordAudio' + ( i + 1 ), wordData[i].audioSrc );
        }
    }
    create() {
        var _self = this
        // 加载背景图
        this.add.image( 0, 0, 'bgImg' );
        // 引导语音
        this.intrduceMusic = _self.add.audio('intrduceMusic');
        this.intrduceMusic.play();

        // 单词气泡背景
        var chatBg = this.add.image( 30, 107, 'chatBg' );
        chatBg.visible = false;

        // 接口数据
        let wordData = this.state.states.preload.wordArr

        // 随机分配单词数据
        let dataArr = [ 1, 11, 2, 12, 3, 13 ];
        for( var i = 0; i < 6; i++ ) {
            // 创建单词卡片组
            this[ 'wordContainer' + ( i + 1 ) ] = this.add.group();
            var wordBgImg = this[ 'wordContainer' + ( i + 1 ) ].create( 0, 0, 'wordBg' );
            wordBgImg.anchor.setTo( 0.5, 0.5 )
            var wordBgImgWidth = wordBgImg.getBounds().width;
            var wordBgImgHeight = wordBgImg.getBounds().height;
            this[ 'wordContainer' + ( i + 1 ) ].x = ( 385 + wordBgImgWidth / 2 ) + 300 * ( i > 2 ? ( i - 3 ) : i );
            this[ 'wordContainer' + ( i + 1 ) ].y = i - 2 > 0 ? ( 86 + wordBgImgHeight / 2 ) : ( 385 + wordBgImgHeight / 2 );

            // 随机分配图片
            let randomNum = parseInt( Math.random() * dataArr.length );
            var wordCard, wordAudio, wordContent, textWord;
            // 随机排放单词数据
            if( dataArr[ randomNum ] == 1 || dataArr[ randomNum ] == 11 ) {
                wordCard = this[ 'wordContainer' + ( i + 1 ) ].create( wordBgImg.centerX, wordBgImg.centerY, 'wordCard1' )
                this[ 'wordContainer' + ( i + 1 ) ].wordAudio = this.add.audio( 'wordAudio1' );
                this[ 'wordContainer' + ( i + 1 ) ].wordContent = wordData[ 0 ].desc;
            } else if( dataArr[ randomNum ] == 2 || dataArr[ randomNum ] == 12 ) {
                wordCard = this[ 'wordContainer' + ( i + 1 ) ].create( wordBgImg.centerX, wordBgImg.centerY, 'wordCard2' );
                this[ 'wordContainer' + ( i + 1 ) ].wordAudio = this.add.audio( 'wordAudio2' )
                this[ 'wordContainer' + ( i + 1 ) ].wordContent = wordData[ 1 ].desc;
            } else {
                wordCard = this[ 'wordContainer' + ( i + 1 ) ].create( wordBgImg.centerX, wordBgImg.centerY, 'wordCard3' );
                this[ 'wordContainer' + ( i + 1 ) ].wordAudio = this.add.audio( 'wordAudio3' )
                this[ 'wordContainer' + ( i + 1 ) ].wordContent = wordData[ 2 ].desc;
            }
            /**
             * 原图为600*600 根据设计稿缩放比例
             */
            wordCard.scale.setTo( 220 / 600, 220 / 600 )
            wordCard.anchor.setTo( 0.5, 0.5 )
            /**
             * 随机分配word卡片id 用来连连看时的逻辑比较
             */
            this[ 'wordContainer' + ( i + 1 ) ].wordId = dataArr[ randomNum ]
            dataArr.splice( randomNum, 1 );
            // 为卡片上的单词绑定事件
            this[ 'wordContainer' + ( i + 1 ) ].children[ 0 ].inputEnabled = true;
            ( function( x ) {
                // 绑定点击事件
                _self[ 'wordContainer' + ( x + 1 ) ].children[ 0 ].events.onInputDown.add( function() {
                    if(_self.fristClick) {
                        _self.intrduceMusic.pause()
                    }
                    if( _self.clickStatus ) {
                        // 判断连连看是否选择正确逻辑
                        if( _self.currentWord == 0 ) {
                            // 暂存点击状态
                            _self.currentWord = this.wordId;
                            _self.preWord = this;
                            // 单词气泡相关逻辑
                            chatBg.visible = true;
                            this.wordAudio.play()
                            // 选择第一个单词时候的动画
                            _self.chooseOne( this );
                            if( textWord ) {
                                textWord.alpha = 0;
                            }
                            // 单词位置确定
                            textWord = _self.add.text( chatBg.centerX, chatBg.centerY - 10, this.wordContent, {
                                font: "50px",
                                fill: '#ffffff',
                                wordWrapWidth: chatBg.getBounds().width,
                                align: "center",
                            } )
                            textWord.stroke = '#ffffff';
                            textWord.anchor.setTo( 0.5, 0.5 )
                        } else if( Math.abs( _self.currentWord - this.wordId ) == 10 ) {
                            // 记分
                            _self.score++
                            var rewardMusicPlayer = _self.add.audio( 'rewardMusic' );
                            rewardMusicPlayer.play()
                            // 选择正确时的单词气泡是否显示
                            chatBg.visible = false;
                            textWord.visible = false;
                            // 奖励动画
                            _self.rewardAni()
                            // 重置当前选择的单词id
                            _self.currentWord = 0
                            _self.preWord.destroy();
                            _self[ 'wordContainer' + ( x + 1 ) ].destroy();
                            _self.clickStatus = false;
                        } else {
                            _self.chooseError( this, _self.preWord )
                            // _self.currentWord = this.wordId
                            // _self.preWord = this;
                            this.wordAudio.play()
                        }
                    }
                }, _self[ 'wordContainer' + ( x + 1 ) ] )
            } )( i )
        }

        // 加载兔子帧序列
        this.rabbitAni = this.add.sprite( 16, 284, 'rabbitSprite', 0 );
        this.rabbitAni.visible = false;
        this.rabbitCloseMouse = this.add.image(15, 284, 'closeMouseRabbit');
        this.rabbitOpenMouse = this.add.image(15, 284, 'openMouseRabbit');
        this.rabbitOpenMouse.visible = false;
        // this.rabbitAni.animations.add('eat', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 5, true);
    }
    rewardAni() {
        // 遮罩层
        var mask = new Phaser.Polygon( [ new Phaser.Point( 0, 0 ), new Phaser.Point( 1334, 0 ), new Phaser.Point( 1334, 750 ), new Phaser.Point( 0, 750 ) ] );
        this.maskState = this.add.graphics( 0, 0 )
        this.maskState.beginFill( 0x000000 );
        this.maskState.drawPolygon( mask.points );
        this.maskState.alpha = 0.8
        this.maskState.endFill();

        // 背光
        this.bgLight = this.add.image( 1334 / 2, 750 / 2, 'bgLight' );
        this.bgLight.anchor.set( 0.5, 0.5 );
        this.bgLight.alpha = 0

        // 奖励资源添加
        this.rewardImg = this.add.image( 1334 / 2, 750 / 2, 'reward' );
        this.rewardImg.anchor.set( 0.5, 0.5 );
        this.rewardImg.alpha = 0

        // 背光动画
        var bgLightAni = this.add.tween( this.bgLight );
        bgLightAni.to( {
            alpha: 1
        }, 400, Phaser.Easing.Bounce.out )
        bgLightAni.start();

        // 萝卜动画
        var rewardAni = this.add.tween( this.rewardImg );
        rewardAni.to( {
            alpha: 1
        }, 1000, Phaser.Easing.Bounce.out )
        rewardAni.onComplete.add( this.rewardFly, this )
        rewardAni.start();

    }
    rewardFly() {
        this.bgLight.alpha = 0;
        var rewardFly = game.add.tween( this.rewardImg );
        this.maskState.visible = false;
        rewardFly.to( {
            x: 234,
            y: 524,
            alpha: 0,
            angle: 180
        }, 1000, Phaser.Easing.Linear.None );
        var rewardScale = game.add.tween( this.rewardImg.scale );
        rewardScale.to( {
            x: 0.2,
            y: 0.2
        }, 1000, Phaser.Easing.Linear.None )
        rewardScale.start()
        rewardFly.onComplete.add( this.theFlyEnd, this )
        rewardFly.start()
    }
    theFlyEnd() {
        this.rewardImg.alpha = 0;
        this.rewardImg.x = ( this.world.width - this.rewardImg.getBounds().width ) / 2;
        this.rewardImg.y = ( this.world.height - this.rewardImg.getBounds().height ) / 2;
        this.maskState.visible = false;
        this.rabbitCloseMouse.visible = false;
        this.rabbitAni.visible = true
        this.eatCarrot = this.rabbitAni.animations.add( 'eat');
        var eatAudio = this.add.audio( 'eatMusic' )
        eatAudio.play()
        this.rabbitAni.animations.play('eat', 4, true);

        game.time.events.add( Phaser.Timer.SECOND * 2, this.stopAni, this );
    }
    stopAni() {
        this.eatCarrot.stop()
        this.rabbitAni.visible = false;
        this.rabbitCloseMouse.visible = true;
        this.clickStatus = true;
        if( this.score == 3 ) {
            gameOver()
            this.rabbitCloseMouse.visible = false;
            this.rabbitOpenMouse.visible = true
        }
    }
    /**
     * 选择第一个从单词时候的动画
     */
    chooseOne( self ) {
        let _self = this;
        // 背景图动画
        var wordBgImgAni = this.add.tween( self.children[ 0 ].scale );
        wordBgImgAni.to( {
            x: [ 1.3, 1.1, 1.15 ],
            y: [ 1.3, 1.1, 1.15 ]
        }, 500, Phaser.Easing.Bounce.out )
        wordBgImgAni.start();
        // 单词动画
        var wordImgAni = this.add.tween( self.children[ 1 ].scale );
        // 由于设计图与真实图大小
        var scaleImg = 220 / 600;
        wordImgAni.to( {
            x: [ 1.3 * scaleImg, 1.1 * scaleImg, 1.15 * scaleImg ],
            y: [ 1.3 * scaleImg, 1.1 * scaleImg, 1.15 * scaleImg ],
        }, 500, Phaser.Easing.Bounce.out )
        wordImgAni.start();
    }
    // 选择错误时的动画效果
    chooseError( self, pre ) {
        if( self.wordId == pre.wordId ) {

        } else {
            // 背景图动画
            var wordBgImgAniCurFrist = this.add.tween( self.children[ 0 ] );
            wordBgImgAniCurFrist.to( {
                angle: [ 20, -10, 10, -5, 5, 0 ]
            }, 500, Phaser.Easing.Bounce.out )
            wordBgImgAniCurFrist.start();
            // 单词动画
            var wordImgAniCurFrist = this.add.tween( self.children[ 1 ] );
            wordImgAniCurFrist.to( {
                angle: [ 20, -10, 10, -5, 5, 0 ]
            }, 500, Phaser.Easing.Bounce.out )
            wordImgAniCurFrist.start();
        }

    }
}
