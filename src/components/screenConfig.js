/**
 * 创建人：王阿海
 * 创建时间：2018-01-26
 * 最后修改时间：2018-02-22
 * 说明：
 * 1，竖屏显示游戏，游戏默认为横屏展示，即使用户横屏了，游戏依旧横屏显示，如若用户开启横屏 则游戏横屏显示
 * 2，适配了几乎所有 移动端 和 PC 端，以 y 轴为基准， x 轴等比缩放，页面居中显示
 * 使用方法
 * 1，import { screenConfigInit, screenConfigPreload,screenConfigCreate } from '../../components/screenConfig'
 * 2，在 init 中调用 screenConfigInit() 即可
 * 3，在 preload 中调用 screenConfigPreload(游戏宽度，游戏高度，参数三)， 第三个参数详情见下面的函数注释
 * 4，在 creat 中调用 screenConfigCreate(游戏宽度，游戏高度，参数三)， 第三个参数详情见下面的函数注释
 * 5，使用方法只需在 main.js 中调用一次就OK，第三个参数传递 game
 * 注意！！！以下三个方法必须同时使用 缺一不可 缺一不可 缺一不可
 */
export function screenConfigInit() {
  Phaser.World.prototype.displayObjectUpdateTransform = function () {
    if (!game.scale.correct) {
      this.x = game.camera.y + game.width
      this.y = -game.camera.x
      this.rotation = Phaser.Math.degToRad(Phaser.Math.wrapAngle(90))
    } else {
      this.x = -game.camera.x
      this.y = -game.camera.y
      this.rotation = 0
    }
    PIXI.DisplayObject.prototype.updateTransform.call(this)
  }
}

/**
 * 在 preload 中调用
 * @param { 游戏宽度 } WIDTH
 * @param { 游戏高度} HEIGHT
 * @param { 有两个值 如若在初始化 main.js 中传递 game ，在其他 state 中传递 this} PRAM
 */
export function screenConfigPreload(WIDTH, HEIGHT, PRAM) {
  if (game.device.iPad) {
    PRAM.scale.pageAlignHorizontally = true
    PRAM.scale.pageAlignVertically = true
    PRAM.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
  } else {
    PRAM.scale.pageAlignHorizontally = true
    PRAM.scale.pageAlignVertically = true
    PRAM.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT
  }

  if (PRAM.scale.isLandscape) {
    PRAM.scale.correct = true
    PRAM.scale.setGameSize(WIDTH, HEIGHT)
  } else {
    PRAM.scale.correct = false
    PRAM.scale.setGameSize(HEIGHT, WIDTH)
  }
}

/**
 * 在 create 中调用
 * @param { 游戏宽度 } WIDTH
 * @param { 游戏高度} HEIGHT
 * @param { 有两个值 如若在初始化 main.js 中传递 game ，在其他 state 中传递 this} PRAM
 */
export function screenConfigCreate(WIDTH, HEIGHT, PRAM) {
  PRAM.scale.onOrientationChange.add(function () {
    if (PRAM.scale.isLandscape) {
      PRAM.scale.correct = true
      PRAM.scale.setGameSize(WIDTH, HEIGHT)
    } else {
      PRAM.scale.correct = false
      PRAM.scale.setGameSize(HEIGHT, WIDTH)
    }
  }, this)
}
