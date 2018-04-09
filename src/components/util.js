export default {
    /**
     * 获取url参数值
     * @param  {[string]} name [key]
     * @return {[type]}      [description]
     */
    getQueryString: function( name ) {
        var reg = new RegExp( '(^|&)' + name + '=([^&]*)(&|$)', 'i' );
        var r = window.location.search.substr( 1 ).match( reg );
        if( r != null ) {
            return unescape( r[ 2 ] );
        }
        return null;
    },
    /**
     * 埋点统计相关
     * @return {[type]} [description]
     */
    aboutMtaH5: function( qId, temId, temInsId) {
        // qId存在是地图模板 否则是之前的集训营链接形式或者单个链接形式
        if( qId ) {
            try {
                MtaH5.clickStat( 'gameTemp', {
                    'map': window.temId + ',' + window.temInsId
                } )
            } catch( e ) {
                console.log( e );
            }
        } else {
            try {
                MtaH5.clickStat( 'gameTemp', {
                    'single': window.temId + ',' + window.temInsId
                } )
            } catch( e ) {
                console.log( e );
            }
        }
    }
}
