import Phaser from 'phaser'
import publicMethod from './publicMethod'
export default class extends Phaser.State {
    constructor() {
        super()
        this.elesOffset = [
            [10, 10], [450, 30], [880, 60], [10, 420], [450, 420], [850, 420]
        ]
        this.group
        this.number = 0
        this.btnOff = true
        this.btnOff1 = true
        this.rotation = 1
        this.prompt
        this.bg
        this.countDownData = null
        this.pageNumber = 0
        this.afterClickedImgSrc = null
        this.clickedAudioSrc = null
        this.data = null
        this.eleWidth = 0
        this.eleHeight = 0
        window.gameMainObj = this
    }
    init() {
        this.prompt = this.add.audio('pp');
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    }
    preload() {
        var audio = document.getElementsByClassName("audio")
        this.data = this.state.states.preload.dataRes

        //自定义数据流
        let data = publicMethod.extractingData(this.data)
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[i].length; j++) {
                if (data[i][1].search(/https/)) {
                    data[i][1]=data[i][1].replace(/http/,'https')
                } 
            }
        }
        this.json = []
        var result = [];
        for (let i = 0, len = data.length; i < len; i += data.length / window.totalPage) {
            result.push(data.slice(i, i + data.length / window.totalPage));
        }
        for (let i = 0; i < result.length; i++) {
            for (let j = 0; j < result[i].length; j++) {
                result[i][j][0] = result[i][j][0] + '' + i + '' + j
            }
        }
        for (let i = 0; i < result.length; i++) {
            for (let j = 0; j < result[i].length; j++) {
                if (/.jpg$|.png$|.gif$/g.test(result[i][j][1])) {
                    this.load.image(result[i][j][0], result[i][j][1])
                } else {
                    this.load.audio(result[i][j][0], result[i][j][1])
                    if (!this.prompt.usingWebAudio) {
                        audio[j - 3].id = result[i][j][0]
                        audio[j - 3].src = result[i][j][1]
                    }
                }
            }
        }
        for (let i = 0; i < result.length; i++) {
            this.json[i] = {}
        }
        for (let i = 0; i < this.json.length; i++) {
            this.json[i].afterClickedImgSrc = {}
            this.json[i].clickedAudioSrc = {}
        }
        for (let i = 0; i < result.length; i++) {
            for (let j = 0; j < result[i].length; j++) {
                /.jpg$|.png$|.gif$/g.test(result[i][j][1]) ?
                    this.json[i].afterClickedImgSrc[result[i][j][0]] = result[i][j][1] :
                    this.json[i].clickedAudioSrc[result[i][j][0]] = result[i][j][1]
            }
        }
    }
    create() {
        let that = this
        this.intrduceMusic = that.add.audio('intrduceMusic')
        this.prompt.play()
        game.time.events.repeat(Phaser.Timer.SECOND * 2, 1, function () {
            that.intrduceMusic.play()
        }, this)

        function main(eles) {
            that.number = 0;
            that.btnOff = true;
            var key = publicMethod.pageIndex(that.json).join('').replace(/[^0-9]/g, '').split('')
            that.countDownData = that.json[key[that.pageNumber]]
            that.countDownData.keysArr = ["li1", "li2", "li3", "li1", "li2", "li3"];
            that.afterClickedImgSrc = publicMethod.objectKeys(that.countDownData.afterClickedImgSrc).concat(
                publicMethod.objectKeys(that.countDownData.afterClickedImgSrc))
            that.clickedAudioSrc = publicMethod.objectKeys(that.countDownData.clickedAudioSrc).concat(
                publicMethod.objectKeys(that.countDownData.clickedAudioSrc));
            game.add.image(0, 0, 'bgImg')
            game.physics.startSystem(Phaser.Physics.ARCADE);
            that.group = game.add.group();
            that.group.enableBody = true;
            var speed = [-80, 80]
            for (var i = 0; i < eles.length; i++) {
                (function (index) {
                    var bubble = game.add.audio('bubble');
                    var over = game.add.audio('star');
                    that.countDownData.keysArr[index] = that.group.create(0, 0, that.countDownData.keysArr[index]);
                    that.countDownData.keysArr[index].width = 290;
                    that.countDownData.keysArr[index].height = 290;
                    that.countDownData.keysArr[index].x = eles[index][0];
                    that.countDownData.keysArr[index].y = eles[index][1];
                    that.countDownData.keysArr[index].inputEnabled = true;
                    that.countDownData.keysArr[index].body.velocity.set(speed[publicMethod.ranDom(0, 2)], speed[publicMethod.ranDom(0, 2)])
                    that.countDownData.keysArr[index].events.onInputDown.add((e) => {
                        var btnOff = true
                        that.preWord = this;
                        that.number++;
                        that.prompt.pause()
                        var sound = game.add.audio(that.clickedAudioSrc[index].keys)
                        bubble.play()
                        sound.play()
                        if (that.number == eles.length && that.btnOff) {
                            game.time.events.repeat(Phaser.Timer.SECOND, 1, () => {
                                that.btnOff = false;
                                publicMethod.gameOver(() => {
                                    that.btnOff1 = true;
                                    main(that.elesOffset)
                                }, () => {
                                    that.intrduceMusic.pause()
                                })
                            })
                        }
                        that.countDownData.keysArr[index].kill()
                        var sprite = game.add.sprite(e.position.x, e.position.y, that.afterClickedImgSrc[index].keys)
                        sprite.width = 300
                        sprite.height = 300
                        var graphics = game.add.graphics(0, 0)
                        graphics.beginFill(0xFFFFFF)
                        var circle = graphics.drawCircle(e.position.x + 150, e.position.y + 150, 300)
                        sprite.mask = circle;
                    }, this)
                })(i)
            }
            that.group.setAll('body.collideWorldBounds', true)
            that.group.setAll('body.bounce', new Phaser.Point(1, 1))
        }
        main(this.elesOffset)
    }
    update() {
        game.physics.arcade.collide(this.group)
    }
}
