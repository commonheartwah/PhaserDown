import Phaser from 'phaser'
import axios from 'axios'
import Qs from 'qs'
import util from '../../../components/util'
import { screenConfigInit, screenConfigPreload, screenConfigCreate } from '../../../components/screenConfig'

var BASE = ''
if(window.location.host.indexOf('babyfs.cn') > -1 ) {
    BASE = 'https://m.babyfs.cn'
} else {
    BASE = ''
}
const requestData = params => {
  return axios.get(`${BASE}/api/evaluation/get_tem_ins`, {
    params: params
  })
}

export default class extends Phaser.State {
  constructor() {
    super()
    this.dataRes = null
  }
  init() {
    // this.scale.pageAlignHorizontally = true
    // this.scale.pageAlignVertically = true
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
  }
  preload() {
    let _self = this
    // 预加载
    const loadingSprite = this.add.sprite(offsetX(350), offsetY(200), 'loading', 0)
    loadingSprite.width = scaleSize(290);
    loadingSprite.height = scaleSize(240);
    loadingSprite.visible = false;
    loadingSprite.animations.add('loading')
    loadingSprite.anchor.setTo(0.5, 0.5)
    loadingSprite.scale.setTo(0.4, 0.4)
    loadingSprite.visible = true;
    loadingSprite.animations.play('loading', 10, true)

    // 游戏真实渲染
      requestData({
      tem_ins_id: util.getQueryString('tem_ins_id')
    }).then((res) => {
      if (res.data.success) {
        // 数据加载
        const data = res.data.data.parsed.data[1]
        this.dataRes = data
        const responseData = res.data.data.entity

        // qid是questionid
        window.qid = util.getQueryString('qid')
        // 当前关卡下的第几个游戏
        window.xIndex = util.getQueryString('index')
        // 当前关卡下的游戏总数
        window.xTotal = util.getQueryString('total')
        // 游戏模板id
        window.temId = responseData.templateId
        // 游戏模板实例id
        window.temInsId = responseData.id
        // 游戏类型
        window.type = responseData.type
        // 游戏总页数
        window.totalPage = 1
        // 游戏当前页数
        window.currentPage = 1
        // 单个分数
        window.perScore = 30
        // 总分
        window.totalScore = 30
        // 当前关卡最后一个游戏
        window.isFinalGame = window.xIndex == window.xTotal ? true : false
        // 正确计数
        window.correctCount = 3
        // 结束页防止连续点击
        window.overClick = true;
        // 埋点统计
        util.aboutMtaH5(window.qid, window.temId, window.temInsId)

      }
    }).catch((e) => {
      console.log(e)
    })
    /**
     * iframe通信得到的数据
     */
    window.addEventListener('message', function (event) {
      if (event.data) {
        const wordData = event.data
        _self.dataRes = data
      } else {
        console.log('event.data 不存在')
      }
    })
    // 公共资源加载
    this.load.image('start', 'assets/common/start_btn.png')
    this.load.image('star', 'assets/common/start_btn.png')
    this.load.image('star_dark', 'assets/common/star_dark.png')
    this.load.image('star_light', 'assets/common/star_light.png')
    this.load.image('overBg', 'assets/common/over_bg.png')
    this.load.image('light', 'assets/common/light.png')
    this.load.image('nextBtn', 'assets/common/btn_next.png')
    this.load.image('perfect', 'assets/common/Perfect.png')
    this.load.image('menu', 'assets/common/menu.png')
    this.load.image('repeat', 'assets/common/rep.png')
    this.load.image('foot', 'assets/common/foot.png')
    this.load.image('greatImg', 'assets/common/greatImg.png')
    this.load.audio('starMusic', 'assets/common/star.mp3')

    // 背景图片
    this.load.image('bgImg', 'assets/frogJump/images/bg.jpg')
    //动画房子
    this.load.spritesheet('house1', 'assets/frogJump/images/house.png', 339, 281, 5);
    //禁止房子
    this.load.image('house2', 'assets/frogJump/images/house2.png')
    // 青蛙正常状态
    this.load.spritesheet('frogInit','assets/frogJump/images/frog_init.png',135,119,2)
    // 青蛙跳跃状态
    this.load.image('frogJump','assets/frogJump/images/frog_jump.png')
    // 青蛙开心状态
    this.load.spritesheet('happyfrog','assets/frogJump/images/happyfrog.png',187,161,5)
    //波纹
    this.load.image('riverPic','assets/frogJump/images/river.png')
    // 上面木桩
    this.load.image('stakesUp','assets/frogJump/images/Stakes1.png')
    // 下面木桩
    this.load.image('stakesDown','assets/frogJump/images/Stakes2.png')
    // 提示语音框
    this.load.image('Hint','assets/frogJump/images/heng_stakes.png')
    // 虚线
    this.load.image('dottedLine','assets/frogJump/images/dotted_line.png')

    //音频
    game.load.audio('bgAudio', 'assets/frogJump/audio/bgAudio.mp3')
    game.load.audio('pp', 'assets/frogJump/audio/pp.mp3')
    game.load.audio('wrong', 'assets/frogJump/audio/wrong.mp3')
    game.load.audio('frog', 'assets/frogJump/audio/frog.mp3')
    game.load.audio('hooray', 'assets/frogJump/audio/Hooray.mp3')

  }
  create() {
    this.state.start('start')
  }
}
