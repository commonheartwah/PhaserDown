/**
 *  全局变量、函数
 *  screenWidth, screenHeight       屏幕尺寸
 *  gameWidth, gameHeight           游戏尺寸
 *  bgWidth, bgHeight               背景图尺寸
 *
 *  offsetX(), offsetY()          偏移量 1倍
 *  scaleSize(n)                    缩放尺寸 n为2倍设计图尺寸
 *
 */
export default{
    init: function(cb){

        window.screenWidth = window.innerWidth
        window.screenHeight = window.innerHeight
        if(screenWidth < screenHeight){
            window.screenWidth = window.innerHeight
            window.screenHeight = window.innerWidth
        }

        var is5
        var sc5 = 1 // iPhone 4-5
        if(screenWidth < 666){
            is5 = true
            sc5 = screenWidth / 667
        }
        window.gameWidth = is5 ? screenWidth * 2 : 1334
        window.gameHeight = is5 ? screenHeight * 2 : 750
        var scaleX = screenWidth / gameWidth
        var scaleY = screenHeight / gameHeight
        var scaleMin = Math.min(scaleX, scaleY)
        window.bgWidth = is5 ? 1624 / 2 * sc5 : screenWidth > 960 ? 1624 * scaleMin : 1624 / 2
        window.bgHeight = is5 ? 1000 / 2 * sc5 : screenWidth > 960 ? 1000 * scaleMin : 1000 / 2

        var sc = window.screenWidth > 960 ? 2 * scaleMin : 1
        var _offsetX = (screenWidth - gameWidth / 2 * sc) / 2
        var _offsetY = (screenHeight - gameHeight / 2 * sc) / 2
        if(is5){
            sc = sc5
        }

        window.offsetX = function(num){
            return num * sc + _offsetX
        }
        window.offsetY = function(num){
            return num * sc + _offsetY
        }
        window.scaleSize = function(num){
            return num  / 2 * sc
        }
        cb && cb();
    }
}
