// pages/auth/index.js
import regeneratorRuntime from '../../lib/runtime/runtime';
import { login } from '../../utils/asyncAdress';
import {request} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  async getUserInfo(e) {
    try {
         // console.log(e);
    const {encryptedData, iv, rawData, signature} = e.detail;
    const {code} = await login()
    // console.log(code);
    const loginParams = {encryptedData, iv, rawData, signature, code}
    const res = await request({
      url: '/users/wxlogin',
      data: loginParams,
      method: 'POST',
    })
    wx.setStorageSync('token', token);
    wx.navigateBack({
      delta: 1
    });
    } catch(error) {
      console.log(error);
      
    }
      
    
  }
})