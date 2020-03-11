Page({
  onLoad:function() {
    this.popup = this.selectComponent('#popup')
  },
  showpopup:function() {
    // 弹窗
    console.log("点击了按钮")
    this.popup.showPopup();
  },
  _error(){
    console.log("没有")
    this.popup.hidePopup();
  },
  _success(){
    console.log("学会了")
    this.popup.hidePopup();
  },
  change:function(e){
    console.log('catch')
    var mComponent = this.selectComponent('#myComponent')
    mComponent.setText('外部调用了');
  },
  onChange:function(){
    wx.showToast({
      title:'捕获事件'
    })
  }
})