import Phaser from 'phaser'

export default class extends Phaser.State {

  constructor() {
    super()
    this.rabbit1 = null
    
    this.tween = null
    this.tween1 = null
    this.curtainleft = null
    this.curtainright = null
    this.leftrun = null
    this.rightrun = null
    this.fox = null
    this.pig = null
    this.rabbit = null
  }

  init() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
  }

  preload() {
    var arr = this.state.states.preload.dataRes

    if(arr.group1.correctImg.search(/https/)){
      arr.group1.correctImg=arr.group1.correctImg.replace(/http/,'https')
    }
    if(arr.group1.audioLink.search(/https/)){
      arr.group1.audioLink=arr.group1.audioLink.replace(/http/,'https')
    }
    if(arr.group2.correctImg.search(/https/)){
      arr.group2.correctImg=arr.group2.correctImg.replace(/http/,'https')
    }
    if(arr.group2.audioLink.search(/https/)){
      arr.group2.audioLink=arr.group2.audioLink.replace(/http/,'https')
    }
    if(arr.group3.correctImg.search(/https/)){
      arr.group3.correctImg=arr.group3.correctImg.replace(/http/,'https')
    }
    if(arr.group3.audioLink.search(/https/)){
      arr.group3.audioLink=arr.group3.audioLink.replace(/http/,'https')
    }
    // 接口数据 彩色动物图片
    this.load.image('centerfox', arr.group3.correctImg)
    this.load.image('centerpig', arr.group2.correctImg)
    this.load.image('centerrabbit', arr.group1.correctImg)
    // 接口数据 黑色动物图片
    this.load.image('blackfox', arr.group3.correctImg)
    this.load.image('blackpig', arr.group2.correctImg)
    this.load.image('blackrabbit', arr.group1.correctImg)
    // 接口数据 单词音频
    this.load.audio('foxM', arr.group3.audioLink)
    this.load.audio('pigM', arr.group2.audioLink)
    this.load.audio('rabbitM', arr.group1.audioLink)
  }

  create() {
    this.physics.startSystem(Phaser.ARCADE)

    // 加载背景图
    this.add.image(0, 0, 'bgImg')
    // 加载彩色兔子
    this.rabbit1 = this.add.sprite(667, 350, 'centerrabbit')
    this.physics.enable(this.rabbit1, Phaser.Physics.ARCADE)
    this.rabbit1.anchor.setTo(0.5, 0.5)
    this.rabbit1.scale.setTo(0.5, 0.5)
    const rabbitM = this.add.audio('rabbitM')
    setTimeout(function () { rabbitM.fadeIn(400) }, 5200)

    // 加载 黑色小动物
    this.fox = this.add.sprite(427, 610, 'blackfox')
    this.fox.tint='#000'
    this.fox.scale.setTo(0.28, 0.28)
    this.fox.anchor.setTo(0.5, 0.5)
    this.pig = this.add.sprite(667, 610, 'blackpig')
    this.pig.tint='#000'
    this.pig.scale.setTo(0.28, 0.28)
    this.pig.anchor.setTo(0.5, 0.5)
    this.rabbit = this.add.sprite(907, 610, 'blackrabbit')
    this.rabbit.tint='#000'
    this.rabbit.scale.setTo(0.28, 0.28)
    this.rabbit.anchor.setTo(0.5, 0.5)

    this.curtainleft = this.add.image(-200, 0, 'curtainleft')
    this.tween = this.add.tween(this.curtainleft)
    // tween可以传递数组，它会依次动画
    this.tween.to({ x: [0], x: [-862] }, 2500, "Linear")
    this.tween.start()

    this.curtainright = this.add.image(567, 0, 'curtainright')
    this.tween1 = this.add.tween(this.curtainright)
    // tween可以传递数组，它会依次动画
    this.tween1.to({ x: [667], x: [1145] }, 2500, "Linear")
    this.tween1.start()
    this.add.image(0, 0, 'curtaintop')

    setTimeout(() => {
      // 开启狐狸拖拽引擎
      this.fox.inputEnabled = true
      this.fox.input.enableDrag()
      this.fox.events.onDragStart.add(this.onDragStart, this)
      this.fox.events.onDragStop.add(this.onFox, this)

      // 开启猪拖拽引擎
      this.pig.inputEnabled = true
      this.pig.input.enableDrag()
      this.pig.events.onDragStart.add(this.onDragStart, this)
      this.pig.events.onDragStop.add(this.onPig, this)

      // 开启兔子拖拽引擎
      this.rabbit.inputEnabled = true
      this.rabbit.input.enableDrag()
      this.rabbit.events.onDragStart.add(this.onDragStart, this)
      this.rabbit.events.onDragStop.add(this.onRabbit, this)
    }, 3000)
  }

  update() {

  }

  onDragStart(sprite, pointer) {
    this.x = pointer.x
    this.y = pointer.y
  }

  onFox(sprite, pointer) {
    if (this.x = game.width / 2) {
      const wrong = this.add.audio('wrongnew')
      wrong.play()
    }
    // pointer拿到拖拽点
    const tween = this.add.tween(sprite);
    // tween可以传递数组，它会依次动画
    tween.to({ x: [427], y: [610] }, 1000, "Linear")
    tween.start()
  }

  onPig(sprite, pointer) {
    if (this.x = game.width / 2) {
      const wrong = this.add.audio('wrongnew')
      wrong.play()

    }
    // pointer拿到拖拽点
    const tween = this.add.tween(sprite);
    // tween可以传递数组，它会依次动画
    tween.to({ x: [667], y: [610] }, 1000, "Linear")
    tween.start()
  }

  onRabbit(sprite, pointer) {
    if (this.x = game.width / 2) {
      if (this.rabbit.key.substring(5) == this.rabbit1.key.substring(6)) {

        const yeah = this.add.audio('yeah')
        yeah.play()
        const rabbitM = this.add.audio('rabbitM')
        setTimeout(function () { rabbitM.fadeIn(400) }, 1000)
        const ll = this.add.image(100, -100, 'lightleft')
        const lr = this.add.image(550, -50, 'lightright')
        const flower = this.add.image(667, 0, 'flower')
        flower.anchor.setTo(0.5, 0.5)
        this.tween = this.add.tween(flower)
        this.tween.to({ y: [0], y: [400] }, 1000, "Linear")
        this.tween.start()
        this.rabbit.kill()

        setTimeout(function () {
          ll.kill()
          lr.kill()
          flower.kill()
        }, 3000)
        this.time.events.loop(Phaser.Timer.SECOND * 2.5, this.closeLeft, this)
        this.time.events.loop(Phaser.Timer.SECOND * 2.5, this.closeRight, this)
        this.add.image(0, 0, 'curtaintop')
        setTimeout(function () {
          game.state.start('gameStaTwo')
        }, 5000)
      } else {
      }
    }
    // pointer拿到拖拽点
    const tween = this.add.tween(sprite);
    // tween可以传递数组，它会依次动画
    tween.to({ x: [907], y: [610] }, 1000, "Linear")
    tween.start()
  }

  closeLeft() {
    this.fox.inputEnabled = false
    this.pig.inputEnabled = false
    this.rabbit.inputEnabled = false
    this.tween = this.add.tween(this.curtainleft)
    this.tween.to({ x: [-610], x: [0] }, 2500, "Linear")
    this.tween.start()
    this.rabbit1.kill()
  }

  closeRight() {
    this.tween1 = this.add.tween(this.curtainright)
    this.tween1.to({ x: [667], x: [567] }, 2500, "Linear")
    this.tween1.start()
  }
}