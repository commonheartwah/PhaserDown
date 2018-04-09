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
        const startNumber = 2 // 星星个数
        const isFinalGame = true // true代表最后一关的最后一个游戏
        const isFinalBarrier = false // true代表最后一个关卡
        const isSingleLink = true //非集训营和地图单个链接游戏结束
        window.starRating('modalBox', startNumber, isFinalGame, isFinalBarrier, isSingleLink)
        window.buttonClick(true)
      }
    } else {
      const startNumber = 2 // 星星个数
      const isFinalGame = false // true代表最后一关的最后一个游戏
      const isFinalBarrier = false // true代表最后一个关卡
      const isSingleLink = false //非集训营和地图单个链接游戏结束
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
    window.interAction.overType = 1
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
    window.interAction.overType = 2
    startState(1)
    return
  }
  // 否则应该显示again home next
  window.interAction.overType = 3
  window.startState(1)
  return
}
window.startState = function (type) {
  if (type == 1) {
    window.gameMainObj.state.start('over')
  } else if (type == 2) {
    window.gameMainObj.state.start('centerState')
  }
}

export default class extends Phaser.State {

  constructor() {
    super()
    this.rabbit1 = null
    window.gameMainObj = this
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

  preload(){
  }

  create() {
    this.physics.startSystem(Phaser.ARCADE)

    // 加载背景图
    this.add.image(0, 0, 'bgImg')
    // 加载彩色兔子
    this.rabbit1 = this.add.sprite(667, 350, 'centerfox')
    this.physics.enable(this.rabbit1, Phaser.Physics.ARCADE)
    this.rabbit1.anchor.setTo(0.5, 0.5)
    this.rabbit1.scale.setTo(0.5, 0.5)
    const foxM = this.add.audio('foxM')
    setTimeout(function () { foxM.fadeIn(400) }, 1000)

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

    setTimeout(()=>{
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
   },3000)
  }

  update() {

  }

  onDragStart(sprite, pointer) {
    this.x = pointer.x
    this.y = pointer.y
  }

  onFox(sprite, pointer) {
    if (this.x = game.width / 2) {
      if (this.fox.key.substring(5) == this.rabbit1.key.substring(6)) {
        const yeah = this.add.audio('yeah')
        yeah.play()
        const foxM = this.add.audio('foxM')
        setTimeout(function () { foxM.fadeIn(400) }, 1000)
        const ll = this.add.image(100, -100, 'lightleft')
        const lr = this.add.image(550, -50, 'lightright')
        const flower = this.add.image(667, 0, 'flower')
        flower.anchor.setTo(0.5, 0.5)
        this.tween = this.add.tween(flower)
        this.tween.to({ y: [0], y: [400] }, 1000, "Linear")
        this.tween.start()
        this.fox.kill()

        setTimeout(function () {
          ll.kill()
          lr.kill()
          flower.kill()
        }, 3000)
        this.time.events.loop(Phaser.Timer.SECOND * 2.5, this.closeLeft, this)
        this.time.events.loop(Phaser.Timer.SECOND * 2.5, this.closeRight, this)
        this.add.image(0, 0, 'curtaintop')
        setTimeout(function () {
          gameOver()
        }, 5000)
      } else {
      }
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
      const wrong = this.add.audio('wrongnew')
      wrong.play()
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