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
    testList: [],
  mypointer:-1,
  myanswers:[],
  adult:1
  },

  onLoad: function(options) {
    var that = this
    var t = options.t
    var quizUrl = config.service.getLevelQuizUrl
    if (t && 'child'==t){
      quizUrl = config.service.getChildLevelQuiz;
      that.setData({
        adult:0
      })
    }
    qcloud.request({
        // 要请求的地址
        url: quizUrl,
        success(result) {
          that.setData({
            testList:result.data
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
  radioChange: function(e) {
    var newArr = this.data.myanswers
    var founded = false
    for(var item in newArr){
      if(newArr[item].id==e.target.id){
        newArr[item].optionid=e.detail.value
        founded=true
        break
      }
    }
    if(!founded){
      newArr.push({id:e.target.id,optionid:e.detail.value})
    }
    this.setData({
      myanswers: newArr
    });
  },
  submitAnswer: function() {
    var that=this;
    var pointer=0;
    var newArr = this.data.myanswers
    for(var i in newArr){
      var answer=newArr[i]
      for(var j in this.data.testList){
        var test = this.data.testList[j]
        if(answer.id==test.id){
          if(answer.optionid==test.answer){
            pointer++
          }
          break;
        }
      }
    }
    console.log(pointer)
    this.setData({
      mypointer:pointer
    })
    qcloud.request({
      // 要请求的地址
      url: config.service.submitLevelPoint,
      data: {
        point: pointer,
        adult: that.data.adult
      },
      success(user) {
        app.globalData.userObj.data.data.user.point=pointer;
        wx.showToast({
          title: '你答对了' + pointer + '题',
          icon: 'success'
        });
        if(pointer>0){
          wx.reLaunch({ url: '/pages/index/index' });
        }
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
})