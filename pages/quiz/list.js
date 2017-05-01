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
    list:[]
  },
  onLoad:function(options){
    var that=this;
    qcloud.request({
        // 要请求的地址
        url: config.service.getBookQuiz,
        data: {
          bookId:1
        },
        success(result) {
          that.setData({
            list:result.data
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
  toQuiz:function(e){
    var quizId=e.target.id
  }
})