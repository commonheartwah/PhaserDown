import Phaser from 'phaser'
import { screenConfigInit, screenConfigPreload,screenConfigCreate } from '../../../components/screenConfig'

export default class extends Phaser.State {

  constructor() {
    super()
    this.txtI = 'I'
    this.txtSee = 'see'
    this.txtA = 'a'
    this.txtGray = 'gray'
    this.txtShark = 'shark,'
    this.txtSplash = 'splash,'
    this.txt = '我看见一条鲨鱼，哗啦哗啦哗啦'
    this.time1
    this.time2
    this.time3
    this.time4
    this.time5
    this.time6
    this.time7
    this.time8
    this.time11
    this.time22
    this.time33
    this.time44
    this.time55
    this.time66
    this.time77
    this.time88
    this.shipin
    this.newwordbtn
    this.txtshipinAction
  }

  init() {
    screenConfigInit()
  }

  preload() {
    screenConfigPreload(1920,1080,this)

    /********************* 图片文件 *****************/
    // 图片背景图片
    this.load.image('background', 'assets/grayshark/images/bgnew.png')
    // 小兔子
    this.load.image('rabbit', 'assets/grayshark/images/tutu.png')
    this.load.image('rabbitnew', 'assets/grayshark/images/rabbit.png')
    // 鲨鱼
    this.load.image('shayu', 'assets/grayshark/images/shayunew.png')
    // I 我 图片
    this.load.image('I', 'assets/grayshark/images/I.png')
    // see 看见 图片
    this.load.image('see', 'assets/grayshark/images/see.jpg')
    // gray 灰色 图片
    this.load.image('gray', 'assets/grayshark/images/gray.png')
    // shark 鲨鱼 图片
    this.load.image('shark', 'assets/grayshark/images/shark.jpg')
    // splash 哗啦 图片
    this.load.image('splash', 'assets/grayshark/images/splash.gif')
    // 生词点击图片按钮
    this.load.image('newwords', 'assets/grayshark/images/newwords.png')
    // 视频按钮
    this.load.image('action', 'assets/grayshark/images/action.png')
    // 生词显示的图片
    this.load.image('newwordsimg', 'assets/grayshark/images/newwordsimg.png')
    // 生词上的小喇叭
    this.load.image('sound', 'assets/grayshark/images/sound.png')

    /********************* 音频文件 *****************/
    // 歌曲音频 快语速
    this.load.audio('musickuai', 'assets/grayshark/audio/music_kuai.mp3')
    // 歌曲音频 慢语速
    this.load.audio('musicman', 'assets/grayshark/audio/music_man.mp3')
    // I 音频
    this.load.audio('iM', 'assets/grayshark/audio/I.mp3')
    // see 音频
    this.load.audio('seeM', 'assets/grayshark/audio/see.mp3')
    // gray 灰色 音频
    this.load.audio('grayM', 'assets/grayshark/audio/gray.mp3')
    // shark 鲨鱼 音频
    this.load.audio('sharkM', 'assets/grayshark/audio/shark.mp3')
    // splash 哗啦 音频
    this.load.audio('splashM', 'assets/grayshark/audio/splash.mp3')
    // 兔子 音频
    this.load.audio('rabbitM', 'assets/grayshark/audio/rabbit.mp3')
    // 生词 音频
    this.load.audio('newwordsM', 'assets/grayshark/audio/newwords.mp3')

    /********************* 视频文件 *****************/
    // this.load.video('shipin', 'assets/grayshark/video/shipin.mp4')
  }

  create() {
    screenConfigCreate(1920,1080,this)

    var bg = this.add.sprite(0, 0, 'background')
    var musickuai = this.add.audio('musickuai')
    var musicman = this.add.audio('musicman')
    var iM = this.add.audio('iM')
    var seeM = this.add.audio('seeM')
    var grayM = this.add.audio('grayM')
    var sharkM = this.add.audio('sharkM')
    var splashM = this.add.audio('splashM')
    var rabbitM = this.add.audio('rabbitM')
    var newwordsM = this.add.audio('newwordsM')
    var iImg, seeImg, grayImg, sharkImg, splashImg1, splashImg2, splashImg3, tuziImg, newwordimg, suondbtn
    var iImgt, seeImgt, grayImgt, sharkImgt, splashImg1t, splashImg2t, splashImg3t, tuziImgt
    var hid

    // 鲨鱼 兔子 运动函数
    var greenJellyrabbit = this.add.sprite(600, 0, 'rabbit')
    this.add.tween(greenJellyrabbit).to({ x: 20 }, 5000, Phaser.Easing.Default, true, 0, 1000, true)
    var greenJellyfish = this.add.sprite(-1000, 0, 'shayu')
    this.add.tween(greenJellyfish).to({ x: 20 }, 8000, Phaser.Easing.Default, true, 0, 1000, true)

    // 动作示范模块事件代码
    this.txtshipinAction = this.add.sprite(50, 100, 'action')
    this.txtshipinAction.scale.setTo(2, 2)
    this.txtshipinAction.inputEnabled = true
    this.txtshipinAction.events.onInputDown.add(function () {
      // this.shipin = this.add.video('shipin')
      // this.shipin.play()
      // hid = this.shipin.addToWorld(400, 300, 0.1, 0.1)
      // console.log(hid)
    }, this)

    // 生词按钮显示模块事件代码
    this.newwordbtn = this.add.sprite(250, 100, 'newwords')
    this.newwordbtn.scale.setTo(2, 2)
    this.newwordbtn.inputEnabled = true
    this.newwordbtn.events.onInputDown.add(function () {
      newwordimg = this.add.sprite(650, 330, 'newwordsimg')
      newwordimg.scale.setTo(2.2, 2.2)
      suondbtn = this.add.button(1250, 380, 'sound', function () {
        newwordsM.fadeIn(400)
      })
      suondbtn.scale.setTo(0.7, 0.7)
    }, this)

    // shipin1.addToWorld(400, 300, 0.5, 0.5)

    // 初始化启动快速音频以及样式
    musickuai.fadeIn(400)
    this.kuaisu()

    /****文本资源加载位置初始化****/
    // I
    this.txtI = this.add.text(450, 820, 'I', { font: "60px", fill: '#000', align: "center" })
    this.txtI.anchor.set(0.5)
    this.txtI.inputEnabled = true
    this.txtI.events.onInputDown.add(function () {
      iImg = this.add.sprite(700, 190, 'I')
      iImgt = this.add.text(970, 720, '我', { font: "60px", fill: 'blue', align: "center" })
      iM.fadeIn(400)
    }, this)

    // see
    this.txtSee = this.add.text(520, 820, 'see', { font: "60px", fill: '#000', align: "center" })
    this.txtSee.anchor.set(0.5)
    this.txtSee.inputEnabled = true
    this.txtSee.events.onInputDown.add(function () {
      seeImg = this.add.sprite(700, 190, 'see')
      seeImgt = this.add.text(950, 710, '看见', { font: "60px", fill: 'blue', align: "center" })
      seeM.fadeIn(400)
    }, this)

    // a
    this.txtA = this.add.text(600, 820, 'a', { font: "60px", fill: '#000', align: "center" })
    this.txtA.anchor.set(0.5)
    this.txtA.inputEnabled = true
    this.txtA.events.onInputDown.add(function () {
      // this.add.sprite(0, 0, 'a')
    }, this)

    // gray
    this.txtGray = this.add.text(700, 820, 'gray', { font: "60px", fill: '#000', align: "center" })
    this.txtGray.anchor.set(0.5)
    this.txtGray.inputEnabled = true
    this.txtGray.events.onInputDown.add(function () {
      grayImg = this.add.sprite(700, 190, 'gray')
      grayImgt = this.add.text(950, 710, '灰色的', { font: "60px", fill: 'blue', align: "center" })
      grayM.fadeIn(400)
    }, this)

    // shark
    this.txtShark = this.add.text(860, 820, 'shark,', { font: "60px", fill: '#000', align: "center" })
    this.txtShark.anchor.set(0.5)
    this.txtShark.inputEnabled = true
    this.txtShark.events.onInputDown.add(function () {
      sharkImg = this.add.sprite(700, 190, 'shark')
      sharkImgt = this.add.text(950, 710, '鲨鱼', { font: "60px", fill: 'blue', align: "center" })
      sharkM.fadeIn(400)
    }, this)

    // txtSplash
    this.txtSplash1 = this.add.text(1050, 820, 'splash,', { font: "60px", fill: '#000', align: "center" })
    this.txtSplash1.anchor.set(0.5)
    this.txtSplash1.inputEnabled = true
    this.txtSplash1.events.onInputDown.add(function () {
      splashImg1 = this.add.sprite(700, 190, 'splash')
      splashImg1t = this.add.text(950, 710, '哗啦', { font: "60px", fill: 'blue', align: "center" })
      splashM.fadeIn(400)
    }, this)

    // txtSplash
    this.txtSplash2 = this.add.text(1250, 820, 'splash,', { font: "60px", fill: '#000', align: "center" })
    this.txtSplash2.anchor.set(0.5)
    this.txtSplash2.inputEnabled = true
    this.txtSplash2.events.onInputDown.add(function () {
      splashImg2 = this.add.sprite(700, 190, 'splash')
      splashImg2t = this.add.text(950, 710, '哗啦', { font: "60px", fill: 'blue', align: "center" })
      splashM.fadeIn(400)
    }, this)

    // txtSplash
    this.txtSplash3 = this.add.text(1450, 820, 'splash', { font: "60px", fill: '#000', align: "center" })
    this.txtSplash3.anchor.set(0.5)
    this.txtSplash3.inputEnabled = true
    this.txtSplash3.events.onInputDown.add(function () {
      splashImg3 = this.add.sprite(700, 190, 'splash')
      splashImg3t = this.add.text(950, 710, '哗啦', { font: "60px", fill: 'blue', align: "center" })
      splashM.fadeIn(400)
    }, this)

    // 文字
    this.txtSplash = this.add.text(550, 900, '我看见一条鲨鱼，哗啦哗啦哗啦', { font: "60px", fill: '#000', align: "center" })

    // 快慢速切换
    this.txtSpeed = this.add.text(1700, 900, '正常速度', { font: "50px", fill: '#000', align: "center" })
    this.txtSpeed.anchor.set(0.5)
    this.txtSpeed.inputEnabled = true
    this.txtSpeed.events.onInputDown.add(function () {
      switch (this.txtSpeed.text) {
        case '正常速度':
          this.txtSpeed.text = '慢速度'
          musicman.fadeIn(400)
          musickuai.stop()
          // 慢速文本样式
          this.timeremove()
          this.mansu()
          break
        case '慢速度':
          this.txtSpeed.text = '正常速度'
          musickuai.fadeIn(400)
          musicman.stop()
          // 快速文本样式
          this.timeremove1()
          this.kuaisu()
          break
        default: alert(111)
      }
    }, this)

    bg.inputEnabled = true
    bg.events.onInputDown.add(function () {
      // if(tuziImg){
      //   tuziImg.kill()
      //   tuziImgt.kill()
      // }
      if (newwordimg) {
        newwordimg.kill()
        suondbtn.kill()
        newwordsM.stop()
      }
      if (iImg) {
        iImg.kill()
        iImgt.kill()
      }
      if (seeImg) {
        seeImg.kill()
        seeImgt.kill()
      }
      if (grayImg) {
        grayImg.kill()
        grayImgt.kill()
      }
      if (sharkImg) {
        sharkImg.kill()
        sharkImgt.kill()
      }
      if (splashImg1) {
        splashImg1.kill()
        splashImg1t.kill()
      }
      if (splashImg2) {
        splashImg2.kill()
        splashImg2t.kill()
      }
      if (splashImg3) {
        splashImg3.kill()
        splashImg3t.kill()
      }
      // this.shipin.stop()
      // hid.kill()

    }, this)


  }

  // 慢速文本样式
  mansu() {
    this.time11 = this.time.events.loop(Phaser.Timer.SECOND * 1.5, this.txtIFunn, this)
    this.time22 = this.time.events.loop(Phaser.Timer.SECOND * 1.8, this.txtSeeFunn, this)
    this.time33 = this.time.events.loop(Phaser.Timer.SECOND * 2.1, this.txtAFunn, this)
    this.time44 = this.time.events.loop(Phaser.Timer.SECOND * 2.6, this.txtGrayFunn, this)
    this.time55 = this.time.events.loop(Phaser.Timer.SECOND * 3, this.txtSharkFunn, this)
    this.time66 = this.time.events.loop(Phaser.Timer.SECOND * 4, this.txtSplash1Funn, this)
    this.time77 = this.time.events.loop(Phaser.Timer.SECOND * 5, this.txtSplash2Funn, this)
    this.time88 = this.time.events.loop(Phaser.Timer.SECOND * 6, this.txtSplash3Funn, this)
  }

  // 快速文本样式
  kuaisu() {
    this.time1 = this.time.events.loop(Phaser.Timer.SECOND * 0.5, this.txtIFun, this)
    this.time2 = this.time.events.loop(Phaser.Timer.SECOND * 0.8, this.txtSeeFun, this)
    this.time3 = this.time.events.loop(Phaser.Timer.SECOND * 1.1, this.txtAFun, this)
    this.time4 = this.time.events.loop(Phaser.Timer.SECOND * 1.6, this.txtGrayFun, this)
    this.time5 = this.time.events.loop(Phaser.Timer.SECOND * 2, this.txtSharkFun, this)
    this.time6 = this.time.events.loop(Phaser.Timer.SECOND * 2.5, this.txtSplash1Fun, this)
    this.time7 = this.time.events.loop(Phaser.Timer.SECOND * 3, this.txtSplash2Fun, this)
    this.time8 = this.time.events.loop(Phaser.Timer.SECOND * 3.5, this.txtSplash3Fun, this)
  }

  // 移除快速音频定时器
  timeremove() {
    this.time.events.remove(this.time1);
    this.time.events.remove(this.time2);
    this.time.events.remove(this.time3);
    this.time.events.remove(this.time4);
    this.time.events.remove(this.time5);
    this.time.events.remove(this.time6);
    this.time.events.remove(this.time7);
    this.time.events.remove(this.time8);
  }

  // 移除慢速音频定时器
  timeremove1() {
    this.time.events.remove(this.time11);
    this.time.events.remove(this.time22);
    this.time.events.remove(this.time33);
    this.time.events.remove(this.time44);
    this.time.events.remove(this.time55);
    this.time.events.remove(this.time66);
    this.time.events.remove(this.time77);
    this.time.events.remove(this.time88);
  }

  // I 样式切换
  txtIFun() {
    this.txtI.fill = 'red'
  }

  // see 样式切换
  txtSeeFun() {
    this.txtSee.fill = 'red'
  }

  // a 样式切换
  txtAFun() {
    this.txtA.fill = 'red'
  }

  // Gray 样式切换
  txtGrayFun() {
    this.txtGray.fill = 'red'
  }

  // Shark 样式切换
  txtSharkFun() {
    this.txtShark.fill = 'red'
  }

  // txtSplash1样式切换
  txtSplash1Fun() {
    this.txtSplash1.fill = 'red'
  }

  // txtSplash2 样式切换
  txtSplash2Fun() {
    this.txtSplash2.fill = 'red'
  }

  // txtSplash3 样式切换
  txtSplash3Fun() {
    this.txtSplash3.fill = 'red'
  }

  // I 样式切换
  txtIFunn() {
    this.txtI.fill = 'green'
  }

  // see 样式切换
  txtSeeFunn() {
    this.txtSee.fill = 'green'
  }

  // a 样式切换
  txtAFunn() {
    this.txtA.fill = 'green'
  }

  // Gray 样式切换
  txtGrayFunn() {
    this.txtGray.fill = 'green'
  }

  // Shark 样式切换
  txtSharkFunn() {
    this.txtShark.fill = 'green'
  }

  // txtSplash1样式切换
  txtSplash1Funn() {
    this.txtSplash1.fill = 'green'
  }

  // txtSplash2 样式切换
  txtSplash2Funn() {
    this.txtSplash2.fill = 'green'
  }

  // txtSplash3 样式切换
  txtSplash3Funn() {
    this.txtSplash3.fill = 'green'
  }

  update() {

  }
}
