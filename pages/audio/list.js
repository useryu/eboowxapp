var app = getApp()
/**
 * @fileOverview 演示会话服务和 WebSocket 信道服务的使用方式
 */

// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');

// 引入配置
var config = require('../../config');
var showModel = (title, content) => {
    wx.hideToast();

    wx.showModal({
        title,
        content: JSON.stringify(content),
        showCancel: false
    });
};
Page({
  data: {
    current: null,
    audioAction: {
      method: 'pause'
    },
    list:[]
  },
  onLoad:function(options){
    var that=this;
    qcloud.request({
        // 要请求的地址
        url: config.service.audioListUrl,
        data: {
          bookId: app.globalData.userObj.data.data.user.reading_book_id  
        },
        success(result) {
          that.setData({
            list:result.data.list
          });
        },

        fail(error) {
            showModel('请求失败', error);
            console.log('request fail', error);
        },

        complete() {
            console.log('request complete');
        }
    });

  },
  onplay:function(e){
  },
  onend:function(e){
    var id = e.target.id;
    qcloud.request({
        // 要请求的地址
        url: config.service.playEndUrl,
        data: {
          id: id,
          bookId: app.globalData.userObj.data.data.user.reading_book_id
        },
        // 请求之前是否登陆，如果该项指定为 true，会在请求之前进行登录
        login: true,

        success(result) {
            showModel("音频已听完")
        },

        fail(error) {
            showModel('请求失败', error);
            console.log('request fail', error);
        },

        complete() {
            console.log('request complete');
        }
    });
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  play: function (e) {
    var id = e.target.id;
    if (this.current) {
      //this.current.pause();
    }
    this.current = wx.createAudioContext(id);
  }
})