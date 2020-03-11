//index.js
//获取应用实例
const app = getApp()
const db = require('../../assets/db.js')

Page({
  data: {
   slides: db.slides
  },
  onLoad: function () {

  },
  readMore(event){
    wx.navigateTo({
      url: `/pages/vehicles/index?id=${event.target.dataset.id}`
    })
  }
})
