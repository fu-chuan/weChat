// pages/order/index.js
import { request } from '../../request/index.js';
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: '全部',
        isActive: true
      },
      {
        id: 1,
        value: '待付款',
        isActive: false
      },
      {
        id: 2,
        value: '待发货',
        isActive: false
      },
      {
        id: 3,
        value: '退款/退货',
        isActive: false
      }
    ],
    orders: {}
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(options) {
    // 判断token是否有值
    const token = wx.getStorageSync('token');
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index'
      });
      return;
    }

    // 获取当前小程序的页面栈数组 长度最大是10页
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    // console.log(currentPage.options);
    let {type} = currentPage.options;
    this.changeTitleByIndex(type - 1)
    this.postOrders(type);
  },

  async postOrders(type) {
    const res = await request({
      url: '/my/orders/all',
      data: { type }
    });
    this.setData({
      orders:  res.orders.map(v=>({...v,create_time_cn:(new Date(v.create_time*1000).toLocaleString())}))
    });
  },

  changeTitleByIndex(index) {
      // 2 修改源数组
      let { tabs } = this.data;
      tabs.forEach((v, i) =>
        i === index ? (v.isActive = true) : (v.isActive = false)
      );
      // 3 赋值到data中
      this.setData({
        tabs
      });
  },

  // 标题点击事件 从子组件传递过来
  handleTabsItemChange(e) {
    // 1 获取被点击的标题索引
    const { index } = e.detail;
    this.changeTitleByIndex(index)
  }
});
