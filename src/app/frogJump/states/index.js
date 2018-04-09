import Phaser from 'phaser'

/**
 * @func 游戏结束
 */
function gameOver() {
    // 判断是否是最后一页
    if (window.currentPage < window.totalPage) {
        // 不是最后一页
        window.qid ? submitScore(window.qid, window.type, window.currentPage, window.totalPage, window.perScore, window.correctCount, window.totalScore) : '';
        window.currentPage++
        // 此处应该开始下一页的游戏
        //
    } else {
        // 是最后一页
        // 判断是否是该关卡的最后一个游戏
        if (window.isFinalGame) {
            if (window.qid) {
                submitScore(window.qid, window.type, window.currentPage, window.totalPage, window.perScore, window.correctCount, window.totalScore)
            } else {
                var startNumber = 2; // 星星个数
                var isFinalGame = true; // true代表最后一关的最后一个游戏
                var isFinalBarrier = false; // true代表最后一个关卡
                var isSingleLink = true; //非集训营和地图单个链接游戏结束
                window.starRating('modalBox', startNumber, isFinalGame, isFinalBarrier, isSingleLink)
                window.buttonClick(true)
            }
        } else {
            var startNumber = 2; // 星星个数
            var isFinalGame = false; // true代表最后一关的最后一个游戏
            var isFinalBarrier = false; // true代表最后一个关卡
            var isSingleLink = false; //非集训营和地图单个链接游戏结束
            window.starRating('modalBox', startNumber, isFinalGame, isFinalBarrier, isSingleLink)
            window.buttonClick(false)
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
window.starRating = function (string, num, isFinalGame, isFinalBarrier, isSingleLink) {
    // 如果是单个链接只显示一个重来按钮
    if (isSingleLink) {
        window.interAction.overType = 1;
        startState(1)
        return
    }
    // 不是当前关卡的最后一个游戏 应该显示greatImg 包含了home和next按钮
    if (!isFinalGame) {
        startState(2)
        return
    }
    // 判断如果是当前关卡最后一个游戏且是最后一个关卡应该显示again home 足迹
    if (isFinalGame && isFinalBarrier) {
        window.interAction.overType = 2;
        startState(1)
        return
    }
    // 否则应该显示again home next
    window.interAction.overType = 3;
    window.startState(1)
    return
}
window.startState = function (type) {
    if (type == 1) {
        window.gameMainObj.state.start('over')
    } else if (type == 2) {
        window.gameMainObj.state.start('centerState');
    }
}

export default class extends Phaser.State {
    constructor() {
        super()
        this.group
        this.prompt
        this.bgAudio
        this.bgPic
        this.wordBgImg
        this.wordCard
        this.riverPic
        this.Hint
        this.word
        this.tmp
        this.wordData
        this.dragVisable = true
        this.number = 0
        // this.jumpSize = [20, 330, 620, 910, 1080]
        this.jumpSize = [20, 165, 325, 475, 600]
        window.gameMainObj = this
    }

    init() {
        // gameOver()
    }

    preload() {
        // this.wordData = this.state.states.preload.dataRes
        // for (let i = 0; i < 3; i++) {
        //     this.load.image('wordCard' + (i + 1), this.wordData['word' + (i + 1)].imgSrc)
        //     this.load.audio('wordAudio' + (i + 1), this.wordData['word' + (i + 1)].audioSrc)
        // }
        //this.wordData = this.state.states.preload.dataRes
        this.wordData = {
            "word1": {
                "desc": "frog",
                "audioSrc": "https://a.s.babyfs.cn/ce05ea7900d079beb24e2f1357ab42f593686264.mp3",
                "imgSrc": "http://a.hiphotos.baidu.com/image/h%3D300/sign=ea4799136ed0f703f9b293dc38fa5148/faf2b2119313b07eaad49f0c00d7912397dd8c4d.jpg",
            },
            "word2": {
                "desc": "dog",
                "audioSrc": "https://a.s.babyfs.cn/76614b51f4df9367be50089bfa1804cbc8437cd2.mp3",
                "imgSrc": "http://a.hiphotos.baidu.com/image/h%3D300/sign=ea4799136ed0f703f9b293dc38fa5148/faf2b2119313b07eaad49f0c00d7912397dd8c4d.jpg",
            },
            "word3": {
                "desc": "kangaroo",
                "audioSrc": "https://a.s.babyfs.cn/99423bc5e40ee005e4782b3b39f2d4cee34a89df.mp3",
                "imgSrc": "http://a.hiphotos.baidu.com/image/h%3D300/sign=ea4799136ed0f703f9b293dc38fa5148/faf2b2119313b07eaad49f0c00d7912397dd8c4d.jpg",
            }
        }
        for (let i = 0; i < 3; i++) {
            this.load.image('wordCard' + (i + 1), this.wordData['word' + (i + 1)].imgSrc)
            this.load.audio('wordAudio' + (i + 1), this.wordData['word' + (i + 1)].audioSrc)
        }
    }

    create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //加载背景图
        this.bgPic = game.add.image(0, 0, 'bgImg')
        this.bgPic.width = bgWidth
        this.bgPic.height = bgHeight
        this.bgPic.centerX = screenWidth / 2
        this.bgPic.centerY = screenHeight / 2

        //波纹
        this.riverPic = game.add.tileSprite(offsetX(190), 0, scaleSize(600), screenHeight, 'riverPic');
        //提示音
        this.prompt = game.add.audio('pp')
        this.prompt.play()
        //背景音
        this.bgAudio = game.add.audio('bgAudio')
        this.bgAudio.loopFull()
        //青蛙
        this.frogInit = game.add.sprite(offsetX(20), offsetY(170), 'frogInit')
        this.frogInit.width = scaleSize(135)
        this.frogInit.height = scaleSize(119)
        this.frogInit.animations.add('walk');
        this.frogInit.animations.play('walk', 1, true);
        //禁止的蛙房子
        this.house1 = game.add.image(offsetX(550), offsetY(25), 'house2')
        this.house1.width = scaleSize(339)
        this.house1.height = scaleSize(281)

        this.main = () => {
            this.dottedLineflag = true
            if (this.number < 3) {
                setTimeout(() => {
                    // 随机分配图片
                    let randomArray = [
                        [0, 1, 2],
                        [0, 2, 1],
                        [1, 0, 2],
                        [1, 2, 0],
                        [2, 0, 1],
                        [2, 1, 0]
                    ]
                    let randomNum = randomArray[Math.floor(Math.random() * randomArray.length)]

                    for (let i = 0; i < 3; i++) {
                        // 创建单词卡片组
                        this['wordContainer' + (i + 1)] = this.add.group()
                        this.wordBgImg = this['wordContainer' + (i + 1)].create(0, 0, 'stakesUp')
                        this.wordBgImg.anchor.setTo(0.5, 0.5)
                        // this.wordBgImg.scale.setTo(.87, .87)
                        // var wordBgImgWidth = this.wordBgImg.getBounds().width;
                        // var wordBgImgHeight = this.wordBgImg.getBounds().height;
                        // this['wordContainer' + (i + 1)].x = (300 + wordBgImgWidth / 2) + 250 * i
                        // this['wordContainer' + (i + 1)].y = 160
                        //
                        // // 随机排放单词数据
                        // this.wordCard = this['wordContainer' + (i + 1)].create(this.wordBgImg.centerX, this.wordBgImg.centerY, 'wordCard' + (randomNum[i] + 1))
                        // this.wordCard.scale.setTo(.22, .22)
                        // this.wordCard.anchor.setTo(0.5, 0.5)


                        this.wordBgImg.width = scaleSize(200)
                        this.wordBgImg.height = scaleSize(210)
                        this['wordContainer' + (i + 1)].x = offsetX(200+(i*130))
                        this['wordContainer' + (i + 1)].y = offsetY(80)

                        // 随机排放单词数据
                        this.wordCard = this['wordContainer' + (i + 1)].create(this.wordBgImg.centerX, this.wordBgImg.centerY, 'wordCard' + (randomNum[i] + 1))
                        this.wordCard.width = scaleSize(180)
                        this.wordCard.height = scaleSize(180)
                        this.wordCard.anchor.setTo(0.5, 0.5)
                        this['wordContainer' + (i + 1)].wordAudio = this.add.audio('wordAudio' + (randomNum[i] + 1))
                        this['wordContainer' + (i + 1)].wordContent = this.wordData['word' + (i + 1)].desc

                        //卡片进场动画
                        game.add.tween(this['wordContainer' + (i + 1)]).from({
                            x: (this.world.width - 50 * i)
                        }, 2000, Phaser.Easing.Bounce.Out, true);

                        //随机分配word卡片id
                        this['wordContainer' + (i + 1)].children[0].wordId = randomNum[i]

                        game.physics.enable(this['wordContainer' + (i + 1)], Phaser.Physics.ARCADE);

                        //开启拖拽
                        this['wordContainer' + (i + 1)].children[0].inputEnabled = true
                        this['wordContainer' + (i + 1)].children[0].input.enableDrag()
                        this['wordContainer' + (i + 1)].children[0].events.onDragStart.add(this.onDragStart, this)
                        this['wordContainer' + (i + 1)].children[0].events.onDragUpdate.add(this.onDragUpdate, this)
                        this['wordContainer' + (i + 1)].children[0].events.onDragStop.add(this.onDragStop, this)

                    }

                    //虚线框
                    this.dottedLine = game.add.sprite(offsetX(150 * (this.number + 1)), offsetY(160), 'dottedLine')
                    this.dottedLine.alpha = 0
                    game.add.tween(this.dottedLine).to({
                        alpha: 1
                    }, 500, Phaser.Easing.Linear.None, true, 0, 1000, true);
                    this.dottedLine.width = scaleSize(200)
                    this.dottedLine.height = scaleSize(200)
                    game.physics.enable(this.dottedLine, Phaser.Physics.ARCADE);

                    //提示文本框
                    this.Hint = game.add.sprite(offsetX(200), offsetY(300), 'Hint')
                    this.Hint.width = scaleSize(636)
                    this.Hint.height = scaleSize(82)

                    //提示文字
                    this.tmp = game.add.text(offsetX(250), offsetY(305), this.wordData['word' + (this.number + 1)].desc, {
                        font: scaleSize(48) + "px Arial",
                        width: '200px',
                        align: 'center',
                        fill: "#db712b"
                    })

                    //提示语音
                    this.word = game.add.audio('wordAudio' + (this.number + 1))
                    this.word.play()

                    //文本框语音重复听
                    this.Hint.inputEnabled = true
                    this.Hint.events.onInputDown.add((e) => {
                        this.Hint.alpha = 0.7
                        setTimeout(() => {
                            this.Hint.alpha = 1
                        }, 500)
                        this.word.play()
                    }, this)
                }, 2000)
            } else {
                //结束再跳一次，延迟1s
                setTimeout(() => {
                    this.frogInit.kill()
                    let frogJump = game.add.image(offsetX(this.jumpSize[this.number]), offsetY(150), 'frogJump')
                    frogJump.width = scaleSize(167)
                    frogJump.height = scaleSize(128)
                    this.successAudio.play()
                    var tweenKstep1 = game.add.tween(frogJump).to({
                        x: offsetX(80 + this.jumpSize[this.number]),
                        y: offsetY(120),
                        angle: -5
                    }, 700, 'Linear', true)
                    tweenKstep1.onComplete.add((e) => {
                        var tweenKstep2 = game.add.tween(frogJump).to({
                            x: offsetX(110 + this.jumpSize[this.number]),
                            y: offsetY(140),
                            angle: 15
                        }, 500, 'Linear', true)
                        tweenKstep2.onComplete.add((e) => {
                            this.house1.kill();
                            this.house2 = game.add.sprite(offsetX(550), offsetY(25), 'house1');
                            this.house2.width = scaleSize(339)
                            this.house2.height = scaleSize(281)
                            this.house2.animations.add('walk');
                            this.house2.animations.play('walk', 5, false);
                            frogJump.kill()
                            //青蛙笑
                            this.Hooray = game.add.audio('hooray')
                            setTimeout(() => {
                                this.Hooray.play()
                            }, 1000)
                            this.happyfrog = game.add.sprite(offsetX(80 + this.jumpSize[this.number]), offsetY(140), 'happyfrog');
                            // this.happyfrog.scale.setTo(1.2, 1.2)
                            this.happyfrog.width = scaleSize(250)
                            this.happyfrog.height = scaleSize(190)
                            this.happyfrog.animations.add('walk');
                            this.happyfrog.animations.play('walk', 3, false);
                            //进屋
                            setTimeout(() => {
                                this.happyfrog.kill()
                                let frogJump = game.add.image(offsetX(110 + this.jumpSize[this.number]), offsetY(140), 'frogJump')
                                frogJump.width = scaleSize(167)
                                frogJump.height = scaleSize(128)
                                var tweenKstep3 = game.add.tween(frogJump).to({
                                    y: offsetY(75),
                                    alpha: 0
                                }, 700, 'Linear', true)
                                tweenKstep3.onComplete.add((e) => {
                                    gameOver()
                                })
                            }, 3000)
                        })
                    })
                }, 1000)
            }
        }
        //进场指导音
        setTimeout(() => {
            this.main()
}, 1100)
    }
    //元素拖拽跟移
    onDragUpdate(sprite, pointer) {
        sprite.parent.children[1].x = sprite.parent.children[0].centerX
        sprite.parent.children[1].y = sprite.parent.children[0].centerY
    }
    //拖拽成功
    onDragStop(sprite, pointer) {
        var collisionFlag = false
        //恢复透明度
        for (var i = 0; i < 3; i++) {
            this['wordContainer' + (i + 1)].alpha = 1
        }
        game.physics.arcade.overlap(this.dottedLine, sprite, function () {
            collisionFlag = true
        });
        if (sprite.wordId == this.number && collisionFlag) {
            //成功提示音
            this.successAudio = game.add.audio('frog')
            this.successAudio.play()
            //禁止拖拽
            this.dragVisable = false
            sprite.parent.children[0].kill()
            sprite.parent.children[1].kill()
            this.frogInit.kill()
            this.dottedLine.kill()
            //删除单词卡片组
            for (var i = 0; i < 3; i++) {
                this['wordContainer' + (i + 1)].destroy()
            }

            //提示框消失
            this.tmp.kill()
            this.Hint.kill()
            //出现浮木
            this.stakesDown = game.add.sprite(offsetX(150 * (this.number + 1)), offsetY(220), 'stakesDown')
            this.stakesDown.width = scaleSize(220)
            this.stakesDown.height = scaleSize(77)
            //跳动青蛙
            let frogJump = game.add.image(offsetX(this.jumpSize[this.number]), offsetY(150), 'frogJump')
            frogJump.width = scaleSize(167)
            frogJump.height = scaleSize(128)
            var tweenKstep1 = game.add.tween(frogJump).to({
                x: offsetX(90 + this.jumpSize[this.number]),
                y: offsetY(120),
                angle: -5
            }, 700, 'Linear', true)
            tweenKstep1.onComplete.add((e) => {
                var tweenKstep2 = game.add.tween(frogJump).to({
                    x: offsetX(160 + this.jumpSize[this.number]),
                    y: offsetY(170),
                    angle: 15
                }, 500, 'Linear', true)
                tweenKstep2.onComplete.add((e) => {
                    frogJump.kill()
                    this.frogInit = game.add.sprite(offsetX(this.jumpSize[this.number + 1]), offsetY(180), 'frogInit')
                    this.frogInit.width = scaleSize(135)
                    this.frogInit.height = scaleSize(119)
                    this.frogInit.animations.add('walk');
                    this.frogInit.animations.play('walk', 1, true);
                    this.number++
                    this.main()
                })
            })
        } else {
            //失败提示音
            this.wrongAudio = game.add.audio('wrong')
            this.wrongAudio.play()
            // pointer拿到拖拽点
            sprite.parent.children[1].x = sprite.parent.children[0].centerX
            sprite.parent.children[1].y = sprite.parent.children[0].centerY
            for (let i = 0; i < 2; i++) {

                const tween = this.add.tween(sprite.parent.children[i]);
                // tween可以传递数组，它会依次动画
                tween.to({
                    x: 0,
                    y: 0
                }, 1000, "Linear")
                tween.start()
            }
        }
    }
    //拖拽开始
    onDragStart(sprite, pointer) {
        //不是本元素变淡
        for (var i = 0; i < 3; i++) {
            if (this['wordContainer' + (i + 1)].children[0].wordId !== sprite.wordId) {
                this['wordContainer' + (i + 1)].alpha = 0.5
            }
        }
        game.physics.enable(sprite, Phaser.Physics.ARCADE);
    }
    update() {
        this.riverPic.tilePosition.y += 0.4;
    }
}
