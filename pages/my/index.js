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

Page( {
  data: {
    userInfo: {},
    userListInfo: [ {
      icon: '../../images/iconfont-dingdan.png',
      text: '我的测试',
      myPageName: 'mytest'
    }, {
        icon: '../../images/iconfont-shouhuodizhi.png',
        text: '会员管理',
      myPageName: 'mymember'
      }, {
        icon: '../../images/iconfont-kefu.png',
        text: '联系客服',
      myPageName: 'mycustomer'
      }, {
        icon: '../../images/iconfont-help.png',
        text: '关于易步',
      myPageName: 'myabout'
      }]
  },

  onLoad: function() {
    var that = this
    app.getUserObj(function(userObj) {
            //更新数据
            that.setData({
                userInfo: userObj.data.data.userInfo
            })
    })
  }
})