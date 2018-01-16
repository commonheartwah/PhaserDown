import Phaser from 'phaser'

export default class extends Phaser.State {
  constructor () {
    super()
    this.platforms = null
    this.player = null
    this.cursors = null
    this.stars = null
    this.score = 0
    this.scoreText = null
  }

  preload () {
    // 图片加载 星星
    this.load.image('star', 'assets/star.png')
    // 背景
    this.load.image('sky', 'assets/sky.png')
    // 地板
    this.load.image('ground', 'assets/platform.png')
    // 加载精灵图 角色
    this.load.spritesheet('dude', 'assets/dude.png', 32, 48)
  }
  create () {
    // 启动ARCADE物理引擎
    this.physics.startSystem(Phaser.ARCADE)
    this.add.sprite(0, 0, 'sky')
    // 创建组
    this.platforms = this.add.group()
    // 开启组的物理引擎
    this.platforms.enableBody = true

    // 通过组去创建大陆
    let ledge = this.platforms.create(400, 400, 'ground')
    // 不可移动
    ledge.body.immovable = true
    let ledgee = this.platforms.create(-150, 250, 'ground')
    // 不可移动
    ledgee.body.immovable = true

    var ground = this.platforms.create(0, this.world.height - 64, 'ground')
    this.physics.arcade.enable(ground)
    // 不可移动
    ground.body.immovable = true
    ground.scale.setTo(2, 2)

    this.player = this.add.sprite(32, this.world.height - 150, 'dude')
    // 创建角色的物理属性
    this.physics.arcade.enable(this.player)
    // 设置角色的重力
    this.player.body.gravity.y = 300
    // 碰撞世界范围
    this.player.body.collideWorldBounds = true
    // 创建动画 数组为要播放的帧序号(精灵图) 10毫秒 是否循环
    this.player.animations.add('left', [0, 1, 2, 3], 10, true)
    this.player.animations.add('right', [5, 6, 7, 8], 10, true)

    // 创建按键 方向
    this.cursors = this.input.keyboard.createCursorKeys()

    // 创建星星的组
    this.stars = this.add.group()
    this.stars.enableBody = true
    for (var i = 0; i < 12; i++) {
      var star = this.stars.create(i * 70, 0, 'star')
      star.body.gravity.y = 300
      // 落地的弹性系数
      star.body.bounce.y = 0.7 + Math.random() * 0.2
    }

    this.scoreText = this.add.text(16, 16, 'score:0', { fontSize: '32px', fill: '#000' })
  }
  update () {
    this.physics.arcade.collide(this.player, this.platforms)
    this.physics.arcade.collide(this.stars, this.platforms)
    // 那美克星的碰撞检测，有一个会调函数可以自定义，我们通常在这里自己书写这个函数
    this.physics.arcade.overlap(this.stars, this.player, this.collectStar, null, this)

    if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -150
      this.player.animations.play('left')
    } else if (this.cursors.right.isDown) {
      this.player.body.velocity.x = 150
      this.player.animations.play('right')
    } else {
      this.player.body.velocity.x = 0
      // 精灵图第4帧
      this.player.frame = 4
    }
    // 解决下小bug 一直喝。。。。。不不不。。。一直往上跳
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.body.velocity.y = -350
    }
  }
  collectStar (player, star) {
    star.kill()
    this.score += 10
    this.scoreText.text = 'score:' + this.score
    if (this.score % 120 === 0) {
      alert('winner')
      this.state.start('Boot')
    }
  }
}
