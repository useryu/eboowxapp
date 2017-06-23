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
  myanswers:[]
  },

  onLoad: function() {
    var that = this

    qcloud.request({
        // 要请求的地址
      url: config.service.getBookQuiz,
      data: {
        bookId: app.globalData.userObj.data.data.user.reading_book_id
      },
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
    var self=this;
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
      url: config.service.submitBookQuizPoint,
      data: {
        bookId: app.globalData.userObj.data.data.user.reading_book_id,
        point: pointer,
        total: self.data.testList.length
      },
      success(result) {
        var isPassed = result.data.passed;
        if (isPassed == 1) {
          wx.showModal({
            title: '您之前已经通过本章节的测试',
            content: JSON.stringify('不需要再次测试'),
            showCancel: false,
            success: function (res) {
              wx.reLaunch({ url: '/pages/index/index' });
            }
          });
          return;
        }
        var isDone = result.data.quiz_is_done;
        if(isDone==1){
          var isPass = result.data.ifUpgradeToNextLevel;
          if(isPass==1){
            wx.showModal({
              title:'恭喜升级了',
              content: JSON.stringify('您可以进入下一个级别的学习了'),
              showCancel: false,
              success: function (res) {
                wx.reLaunch({ url: '/pages/index/index' });
              }
            });
          } else {
            wx.showModal({
              title: '恭喜通过本书测试',
              content: JSON.stringify('您还需要再积累本级别的有效时长来升级'),
              showCancel: false,
              success: function (res) {
                wx.reLaunch({ url: '/pages/index/index' });
              }
            });
          }
        } else {
          wx.showModal({
            title: '本次测试未通过',
            content: JSON.stringify('先去学习一下，再来测试吧，建议多听多读'),
            showCancel: false,
            success: function (res) {
              wx.reLaunch({ url: '/pages/index/index' });
            }
          });
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