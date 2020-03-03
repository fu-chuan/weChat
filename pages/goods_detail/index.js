// pages/goods_detail/index.js
import regeneratorRuntime from '../../lib/runtime/runtime'
import {request} from '../../request/index'
// import request from '../../request/netwrok'  // 返回数据类型为JSON
Page({

  /**
   * 页面的初始数据
   */
  data: {
     goodsDetail: {},
     isCollect: false
  },
  GoodsInfo: {},

  onShow: function () {
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    let options = currentPage.options;
    const {goods_id} = options
    // console.log(goods_id);
    this.getGoodsDetail(goods_id);


  },


  /*
  * 请求是数据
  */
  async getGoodsDetail(goods_id) {
    const res = await request({
      url: "/goods/detail",
      data: {goods_id}
    })
    this.GoodsInfo = res

    // 获取缓存中的商品收藏数组
    let collect = wx.getStorageSync('collect') || [];
    // 判断商品是否收藏
    let isCollect =collect.some(v => v.goods_id === this.GoodsInfo.goods_id)
    
    this.setData({
      goodsDetail: {
        goods_name: res.goods_name,
        goods_price: res.goods_price,
        goods_introduce: res.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: res.pics
      },
      isCollect
    })  
  },

  /*
  * 点击图片放大
  */
 clickImg(e){
   const urls = this.GoodsInfo.pics.map(v => v.pics_mid)
   const current = e.currentTarget.dataset.url
   wx.previewImage({
    current, // 当前显示图片的http链接
    urls    // 需要预览的图片http链接列表
  })
 },

 /*
  * 点击加入购物车
  */
 handleCartAdd() {
  // 1 获取缓存中的购物车 数组
  let cart = wx.getStorageSync("cart") || [];
  // 2 判断 商品对象是否存在于购物车数组中
  let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id);
  if (index === -1) {
    //3  不存在 第一次添加
    this.GoodsInfo.num = 1;
    this.GoodsInfo.checked = true;
    cart.push(this.GoodsInfo);
  } else {
    // 4 已经存在购物车数据 执行 num++
    cart[index].num++;
  }
  // 5 把购物车重新添加回缓存中
  wx.setStorageSync("cart", cart);
  // 6 弹窗提示
  wx.showToast({
    title: '加入成功',
    icon: 'success',
    // true 防止用户 手抖 疯狂点击按钮 
    mask: true
  })
},

/**
 *  点击收藏
 */
handleCollect() {
  let isCollect = false;
  // 获取缓存中的商品收藏数组
  let collect = wx.getStorageSync('collect') || [];
  // 判断是否收藏
  let index = collect.findIndex(v => v.goods_id === this.GoodsInfo.goods_id);
  if(index !== -1) {
    collect.splice(index, 1);
    isCollect = false;
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true
      });
  } else {
    collect.push(this.GoodsInfo)
    isCollect = true;
    wx.showToast({
      title: '收藏成功',
      icon: 'success',
      mask: true
    });
  };

  wx.setStorageSync('collect', collect);
  this.setData({
    isCollect
  })  
}
})