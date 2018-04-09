import Phaser from 'phaser'
import publicMethod from './publicMethod'
export default class extends Phaser.State {
  constructor() {
    super()
    this.elesOffset = [
        [0, 0], [450, 30], [880, 60], [10, 420], [450, 420], [850, 420]
    ]
    this.Index = []
    this.group
    this.groupPaopao
    this.number = 0
    this.btnOff = true
    this.btnOff1 = true
    this.prompt
    this.bg
    this.countDownData = null
    this.pageNumber = 0
    this.beforeClickedImgSrc = null
    this.clickedAudioSrc = null
    this.data = null
    this.eleWidth = 0
    this.eleHeight = 0
    window.gameMainObj = this
  }
  init() {
      this.prompt = game.add.audio('pp')
  }
  preload() {
      this.data=this.state.states.preload.dataRes
      //自定义数据流
      let data=publicMethod.extractingData(this.data)
      this.json=[]
      var result = [];
      for(let i=0,len=data.length;i<len;i+=data.length/window.totalPage){
         result.push(data.slice(i,i+data.length/window.totalPage));
      }
      for(let i=0;i<result.length;i++){
          for(let j=0;j<result[i].length;j++){
              result[i][j][0]=result[i][j][0]+''+i+''+j
          }
      }
      for(let i=0;i<result.length;i++){
          for(let j=0;j<result[i].length;j++){
              if(/.jpg$|.png$|.gif$/g.test(result[i][j][1])){
                  this.load.image(result[i][j][0],result[i][j][1])
              }else{
                  this.load.audio(result[i][j][0],result[i][j][1])
              }
          }
      }
      for(let i=0;i<result.length;i++){
          this.json[i]={}
      }
      for(let i=0;i<this.json.length;i++){
          this.json[i].beforeClickedImgSrc={}
          this.json[i].clickedAudioSrc={}
      }
      for(let i=0;i<result.length;i++){
          for(let j=0;j<result[i].length;j++){
              /.jpg$|.png$|.gif$/g.test(result[i][j][1])?
              this.json[i].beforeClickedImgSrc[ result[i][j][0] ]=result[i][j][1]:
              this.json[i].clickedAudioSrc[ result[i][j][0] ]=result[i][j][1]
          }
      }
  }
  create() {
      let that = this
      this.bg = game.add.audio('Cpp')
      this.prompt.play()
      game.time.events.repeat(Phaser.Timer.SECOND * 2, 1, () => {
          that.bg.play()
      }, this)
      function main(eles){
          that.number = 0
          that.btnOff = true
          var key = publicMethod.pageIndex(that.json).join('').replace(/[^0-9]/g, '').split('')
          that.countDownData = that.json[ key[ that.pageNumber ] ]
          that.countDownData.keysArr = []
          that.beforeClickedImgSrc = publicMethod.objectKeys(that.countDownData.beforeClickedImgSrc).concat(
                                publicMethod.objectKeys(that.countDownData.beforeClickedImgSrc))
          that.clickedAudioSrc = publicMethod.objectKeys(that.countDownData.clickedAudioSrc).concat(
                            publicMethod.objectKeys(that.countDownData.clickedAudioSrc))

          for(let i = 0; i < that.beforeClickedImgSrc.length; i++) {
              that.countDownData.keysArr[i] = that.beforeClickedImgSrc[i].keys
          }
          game.add.image(0, 0, 'bgImg')
          game.physics.startSystem(Phaser.Physics.ARCADE)
          that.group = game.add.group()
          that.group.enableBody = true
          that.groupPaopao = game.add.group()
          that.groupPaopao.enableBody = true
          let speed = [ -80, 80 ]
          let x = speed[ publicMethod.ranDom(0, 2) ]
          let y = speed[ publicMethod.ranDom(0, 2) ]
          for (var i = 0; i < eles.length; i++){
              (function(index){
                  var bubble = game.add.audio('bubble')
                  var over = game.add.audio('star')
                  that.countDownData.keysArr[ index ] = that.group.create(0, 0, that.countDownData.keysArr[ index ])
                  that.countDownData.keysArr[ index ].width = 290
                  that.countDownData.keysArr[ index ].height = 290
                  that.countDownData.keysArr[ index ].x = eles[ index ][ 0 ]
                  that.countDownData.keysArr[ index ].y = eles[ index ][ 1 ]
                  that.countDownData.keysArr[ index ].inputEnabled = true

                  var graphics = game.add.graphics( eles[ index ][ 0 ] + 145, eles[ index ][ 1 ] + 145 )
                  graphics.beginFill(0xFFFFFF)
                  var circle = graphics.drawCircle(0, 0, 290)
  				  that.countDownData.keysArr[ index ].mask = circle;
                  that.Index.push(circle)

                  that.countDownData.keysArr[ index ][ index ] = that.groupPaopao.create(0, 0, 'paopao')
                  that.countDownData.keysArr[ index ][ index ].width = 310
                  that.countDownData.keysArr[ index ][ index ].height = 310
                  that.countDownData.keysArr[ index ][ index ].x = eles[ index ][ 0 ]
                  that.countDownData.keysArr[ index ][ index ].y = eles[ index ][ 1 ]
                  that.countDownData.keysArr[ index ][ index ].inputEnabled = true
                  that.countDownData.keysArr[ index ][ index ].body.velocity.set(x, y)
                  that.countDownData.keysArr[ index ][ index ].events.onInputDown.add( (e) => {
                      that.preWord = this
                      that.number++
                      that.prompt.pause()
                      var sound = game.add.audio(that.clickedAudioSrc[ index ].keys)
                      bubble.play()
                      sound.play()
                      if(that.number == eles.length && that.btnOff){
                          that.btnOff = false
                          publicMethod.gameOver( () => {
                              that.btnOff1 = true
                              that.pageNumber++
                              main(that.elesOffset)
                          },() => {
                              that.bg.pause()
                          })
                      }
                      that.countDownData.keysArr[ index ].kill()
                      that.countDownData.keysArr[ index ][ index ].kill()
                  }, this)
              })(i)
          }
          that.groupPaopao.setAll('body.collideWorldBounds', true)
          that.groupPaopao.setAll('body.bounce', new Phaser.Point(1, 1))
      }
      main(this.elesOffset)
  }
  update() {
      for(var i = 0; i < this.Index.length; i++){
          this.Index[ i ].x = this.countDownData.keysArr[ i ][ i ] .x + 155
          this.Index[ i ].y = this.countDownData.keysArr[ i ][ i ].y + 155
          this.countDownData.keysArr[ i ].x = this.countDownData.keysArr[ i ][ i ] .x
          this.countDownData.keysArr[ i ].y = this.countDownData.keysArr[ i ][ i ].y
      }
      game.physics.arcade.collide(this.groupPaopao)
  }
}
