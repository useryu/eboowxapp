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
    testList: [{
      id:1,
      title: 'test1',
      answer: 1,
      options: [{id:1,text:'select a'},{id:2,text:'select a'},{id:3,text:'select a'},{id:4,text:'select a'}]
    },{
      id:2,
      title: 'test2',
      answer: 1,
      options: [{id:1,text:'select a'},{id:2,text:'select a'},{id:3,text:'select a'},{id:4,text:'select a'}]
    },{
      id:3,
      title: 'test3',
      answer: 1,
      options: [{id:1,text:'select a'},{id:2,text:'select a'},{id:3,text:'select a'},{id:4,text:'select a'}]
    }
	],
  mypointer:-1,
  myanswers:[]
  },

  onLoad: function() {
    var that = this
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
    wx.showToast({
        title: '你得了'+pointer+'分',
        icon: 'success'
    });
  }
})