import Phaser from 'phaser'
import axios from 'axios'
import Qs from 'qs'
import util from '../../../components/util'
import '../../../components/callAppFunc'

var BASE = ''
if(window.location.host.indexOf('babyfs.cn') > -1 ) {
    BASE = 'https://m.babyfs.cn'
} else {
    BASE = ''
}
// const BASE = 'https://m.babyfs.cn'
// const BASE = ''
const requestData = params => {
    return axios.get( `${BASE}/api/evaluation/get_tem_ins`, {
        params: params
    } )
};



export default class extends Phaser.State {
    constructor() {
        super();
        this.wordArr = []
    }
    init() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    }
    preload() {
        let _self = this;

        // 预加载
        var loadingSprite = this.add.sprite( gameWidth/2, gameHeight/2, 'loading', 0 )
        loadingSprite.visible = false;
        loadingSprite.animations.add( 'loading');
        loadingSprite.anchor.setTo(0.5, 0.5)
        loadingSprite.scale.setTo(0.4, 0.4)
        loadingSprite.visible = true;
        loadingSprite.animations.play('loading', 10, true);

        // 游戏真实渲染
        requestData( {
            tem_ins_id: util.getQueryString( 'tem_ins_id' )
        } ).then( ( res ) => {
            if( res.data.success ) {
                // 数据加载
                var wordData = res.data.data.parsed.data[1];
                var responseData = res.data.data.entity;
                for( var i = 0; i < 3; i++ ) {
                    this.wordArr.push( wordData[ 'word' + ( i + 1 ) ] );
                }
                // qid是questionid
                window.qid = util.getQueryString( 'qid' )
                // 当前关卡下的第几个游戏
                window.xIndex = util.getQueryString( 'index' )
                // 当前关卡下的游戏总数
                window.xTotal =util.getQueryString( 'total' )
                // 游戏模板id
                window.temId = responseData.templateId
                // 游戏模板实例id
                window.temInsId = responseData.id
                // 游戏类型
                window.type = responseData.type
                // 游戏总页数
                window.totalPage = res.data.data.parsed.data.public.gameTimes
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
                // 埋点统计
                util.aboutMtaH5(window.qid, window.temId, window.temInsId)

            }
        } ).catch( ( e ) => {
            console.log( e );
        } )
        /**
         * iframe通信得到的数据
         */
        window.addEventListener('message', function(event) {
            if (event.data) {
                var wordData = event.data[1]
                for( var i = 0; i < 3; i++ ) {
                    _self.wordArr.push( wordData[ 'word' + ( i + 1 ) ] );
                }
            } else {
                console.log('event.data 不存在')
            }
        });
        // 公共资源加载
        this.load.image( 'start', 'assets/common/start_btn.png' )
        this.load.image( 'star', 'assets/common/start_btn.png' )
        this.load.image( 'star_dark', 'assets/common/star_dark.png' )
        this.load.image( 'star_light', 'assets/common/star_light.png' )
        this.load.image( 'overBg', 'assets/common/over_bg.png' )
        this.load.image( 'light', 'assets/common/light.png' )
        this.load.image( 'nextBtn', 'assets/common/btn_next.png' )
        this.load.image( 'perfect', 'assets/common/Perfect.png' )
        this.load.image( 'menu', 'assets/common/menu.png' )
        this.load.image( 'repeat', 'assets/common/rep.png' )
        this.load.image( 'foot', 'assets/common/foot.png' )
        this.load.image( 'greatImg', 'assets/common/greatImg.png' )
        this.load.audio('starMusic', 'assets/common/star.mp3')


        // 加载背景图片
        var bgImg = this.load.image( 'bgImg', 'assets/linkGame/background.png' );
        this.load.image( 'wordBg', 'assets/linkGame/wordBg.png' );
        this.load.image( 'chatBg', 'assets/linkGame/chatBg.png' );
        this.load.image( 'bgLight', 'assets/linkGame/bgLight.png' );
        this.load.image( 'reward', 'assets/linkGame/carrot.png' );
        this.load.image( 'closeMouseRabbit', 'assets/linkGame/rabbit_close_mouse.png' );
        this.load.image( 'openMouseRabbit', 'assets/linkGame/rabbit_open_mouse.png' );

        // 加载兔子图片
        this.load.spritesheet( 'rabbitSprite', 'assets/linkGame/rabbitSprite.png', 2430 / 9, 374, 9 );

        // 加载音频
        this.load.audio( 'bgMusic', 'assets/linkGame/bgMusic.mp3' )
        this.load.audio( 'rewardMusic', 'assets/linkGame/rewardMusic.mp3' )
        this.load.audio( 'eatMusic', 'assets/linkGame/eatMusic.mp3' )
        this.load.audio( 'intrduceMusic', 'assets/linkGame/intrduceMusic.mp3' )


    }
    create() {
        this.state.start( 'start' );
    }
}
