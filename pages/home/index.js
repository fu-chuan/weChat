// pages/home/index.js

import {getSwiperList, getNavigator, getFloorData} from '../../request/home'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    navList: [],
    floorData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getSwiperList()
    this._getNavigator()
    this._getFloorData()
  },

  
  onShow: function () {

  },



  /**
   *   发送网络请求
   */
  _getSwiperList() {
    getSwiperList().then(res => {
      // console.log(JSON.parse(res.data));
      
      this.setData({
        swiperList: JSON.parse(res.data).message
      })
    })
  },
  _getNavigator() {
    getNavigator().then(res => {
      // console.log(res);
      this.setData({
        navList: JSON.parse(res.data).message
      })
    })
  },
  _getFloorData() {
    getFloorData().then(res => {
      const data = JSON.parse(res.data).message
      this.setData({
        floorData: data
      })
    })
  }
})