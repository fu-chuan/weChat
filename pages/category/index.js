// pages/category/index.js
import { getGoods } from '../../request/category'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftGoodsList: [],
    rightGoodsList: [],
    currentIndex: 0,
    scrollTop: 0
  },
  Cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取本地存储数据
    let Cates = wx.getStorageSync("cates");
    // 不存在旧数据 就获取新数据
      if (!Cates) {
        this._getGoods()
      } else {
        if (Date.now() - Cates.time > 1000 * 10) {
          this._getGoods()
        } else {
          this.Cates = Cates.data
          let leftGoodsList = this.Cates.map(value => value.cat_name)
          let rightGoodsList = this.Cates[0].children
          this.setData({
            leftGoodsList,
            rightGoodsList,
            
          })
        }
      }

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
  },

  
  /**
   * 请求分类数据
   */
  _getGoods() {
    getGoods().then(res => {
      // console.log(JSON.parse(res.data).message);
      this.Cates = JSON.parse(res.data).message;
      wx.setStorageSync("cates", {time:Date.now(), data:this.Cates});
        
      let leftGoodsList = this.Cates.map(value => value.cat_name)
      // console.log(leftGoodsList);
      let rightGoodsList = this.Cates[0].children
      this.setData({
        leftGoodsList,
        rightGoodsList
      })
      
    })
  },

  /**
   * 点击事件
   */
  handleItemTap(e) {
    // 这里获取左侧的索引值，并赋值给右侧goods数据
    const {index} = e.currentTarget.dataset
    let rightGoodsList = this.Cates[index].children
    this.setData({
      currentIndex: index,
      rightGoodsList,
      // 重新设置值
      scrollTop: 0
    })


  }
})