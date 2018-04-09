import Phaser from 'phaser'
import axios from 'axios'
import Qs from 'qs'
import '../../../components/callAppFunc'
import util from '../../../components/util'

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
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
  }
  preload() {
    let _self = this
    // 预加载
    var loadingSprite = this.add.sprite(gameWidth / 2, gameHeight / 2, 'loading', 0)
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
        var data = res.data.data.parsed.data;
        this.dataRes = data
        var responseData = res.data.data.entity

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
        // window.totalPage = res.data.data.parsed.data.public.gameTimes
        // 游戏当前页数
        window.currentPage = 1
        // 单个分数
        window.perScore = 10
        // 总分
        window.totalScore = 30
        // 当前关卡最后一个游戏
        window.isFinalGame = window.xIndex == window.xTotal ? true : false
        // 正确计数
        window.correctCount = 3

        // 结束页防止连续点击
        window.overClick = true;

        window.totalPage=this.dataRes.public.gameTimes;
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
        var wordData = event.data
        _self.dataRes = data
      } else {
        console.log('event.data 不存在')
      }
    });
    // 公共资源加载
    this.load.image('start', 'assets/common/start_btn.png')
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

    this.load.image('bgImg', 'assets/paopao/images/bg.jpg')
    this.load.image('li1', 'assets/paopao/images/li1.png')
    this.load.image('li2', 'assets/paopao/images/li2.png')
    this.load.image('li3', 'assets/paopao/images/li3.png')

    this.load.audio('pp', 'assets/paopao/audio/pp.mp3')
    this.load.audio('intrduceMusic', 'assets/paopao/audio/bgaudio.mp3')
    this.load.audio('wrong', 'assets/paopao/audio/wrong.mp3')
    this.load.audio('bubble', 'assets/paopao/audio/bubble.mp3')
  }
  create() {
    this.state.start('start')
  }
}
