var app = getApp()
/**
 * @fileOverview 演示会话服务和 WebSocket 信道服务的使用方式
 */

// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');

// 引入配置
var config = require('../../config');

// 显示繁忙提示
var showBusy = text => wx.showToast({
    title: text,
    icon: 'loading',
    duration: 10000
});

// 显示成功提示
var showSuccess = text => wx.showToast({
    title: text,
    icon: 'success'
});

// 显示失败提示
var showModel = (title, content) => {
    wx.hideToast();

    wx.showModal({
        title,
        content: JSON.stringify(content),
        showCancel: false
    });
};

/**
 * 使用 Page 初始化页面，具体可参考微信公众平台上的文档
 */
Page({

    /**
     * 初始数据，我们把服务地址显示在页面上
     */
    data: {
        userObj:null
    },

    onLoad: function() {
        var that = this
        app.getUserObj(function(userObj) {
                //更新数据
                that.setData({
                    userObj: userObj
                })
        })
    }, 
    scanBook(){
        var that = this
        wx.scanCode({
          success: function(res){
            qcloud.request({
                // 要请求的地址
                url: config.service.switchToBook,

                // 请求之前是否登陆，如果该项指定为 true，会在请求之前进行登录
                login: true,

                data:{
                    bookNo:res.result
                },

                success(result) {
                    console.log('request success', result);
                    that.setData({
                        userObj: result
                    });
                    app.globalData.userObj = result;
                },

                fail(error) {
                    showModel('请求失败', error);
                    console.log('request fail', error);
                },

                complete() {
                    console.log('request complete');
                }
            });
            showSuccess("您进入书本的学习");
          },
          fail: function(res) {
            showModel("扫码失败", "如果是书本上二维码不清晰，请通知管理人员书本上二维码损坏");
          },
          complete: function(res) {
            // complete
          }
        })
    },
    toAudioListPage() {
        wx.navigateTo({ url: '../audio/list' });
    },
    toAssistListPage() {
        wx.navigateTo({ url: '../assist/list' });
    },
    toQuizListPage() {
        wx.navigateTo({ url: '../quiz/list' });
    },

    /**
     * 点击「清除会话」按钮
     */
    clearSession() {
        // 清除保存在 storage 的会话信息
        qcloud.clearSession();
        showSuccess('会话已清除');
    },
});
