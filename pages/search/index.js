// pages/search/index.js
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    isFocus: false,
    inputVal: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  // 防抖
  timer: 0,

  handleInput(e) {
    let {value} = e.detail;
    if (!value.trim()) {
      this.setData({
        goods: [],
        isFocus: false
      })
      return
    }
   this.setData({
     isFocus:true
   })

    // 防抖
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.getSearch(value)
    }, 1000)
  }, 

  async getSearch(query) {
      let res = await request({
        url: "/goods/search",
        data: {query}
      })
      this.setData({
        goods: res.goods
      })   
  },
  // 清楚输入框
  handleBtn() {
    this.setData({
      goods: [],
      isFocus: false,
      inputVal: ''
    })
  }
})