/**
 * @fileOverview 微信小程序的入口文件
 */

var qcloud = require('./vendor/qcloud-weapp-client-sdk/index');
var config = require('./config');

App({
    /**
     * 小程序初始化时执行，我们初始化客户端的登录地址，以支持所有的会话操作
     */
    onLaunch() {
        qcloud.setLoginUrl(config.service.loginUrl);
    },
  getUserObj:function(cb){
    var that = this
    if(this.globalData.userObj){
      typeof cb == "function" && cb(this.globalData.userObj)
    }else{
       qcloud.request({
            // 要请求的地址
            url: config.service.requestUrl,

            // 请求之前是否登陆，如果该项指定为 true，会在请求之前进行登录
            login: true,

            success(result) {
                console.log('request success', result);
                that.globalData.userObj = result
                typeof cb == "function" && cb(that.globalData.userObj)
            },

            fail(error) {
                showModel('请求失败', error);
                console.log('request fail', error);
            },

            complete() {
                console.log('request complete');
            }
        });
    }
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData:{
    userObj:null
  }
});