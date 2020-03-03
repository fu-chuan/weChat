// pages/profile/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    // 被收藏数
    collectNum: 0
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let  collect = wx.getStorageSync('collect')
    const userInfo = wx.getStorageSync('userInfo');
    this.setData({
      userInfo,
      collectNum: collect.length
    });

  },
})