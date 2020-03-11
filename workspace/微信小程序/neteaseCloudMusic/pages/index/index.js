// pages/index/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: [],
    functionList: [{
      text: "每日推荐",
      iconPath: "../../images/日历.png"
    }, {
      text: "歌单",
      iconPath: "../../images/歌单.png"
    }, {
      text: "排行榜",
      iconPath: "../../images/排行榜.png"
    }, {
      text: "电台",
      iconPath: "../../images/电台.png"
    }, {
      text: "直播",
      iconPath: "../../images/直播.png"
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: app.globalData.API_BASE + '/personalized/privatecontent',
      success: res => {
        console.log(res),
          this.setData({
            imgUrl: res.data.result
          })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})