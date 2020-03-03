// pages/cart/index.js
import regeneratorRuntime from '../../lib/runtime/runtime';
import {
  getSetting,
  chooseAddress,
  openSetting,
  showModal,
  showToast,
  requestPayment
} from '../../utils/asyncAdress';
import {request} from '../../request/index';
Page({
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },
  onShow() {
    const address = wx.getStorageSync('address');
    let cart = wx.getStorageSync('cart') || [];
    cart = cart.filter(v => v.checked);
    this.setData({
      address
    });
    // 1 总价格 总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      totalPrice += v.num * v.goods_price;
      totalNum += v.num;
    });
    this.setData({
      cart,
      totalPrice,
      totalNum
    });
  },

  async handlechooseAddress() {
    try {
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting['scope.address'];
      if (scopeAddress === false) {
        await openSetting();
      }
      const res2 = await chooseAddress();
      wx.setStorageSync('address', res2);
    } catch (err) {}
  },

  async handlePay() {
    try {
      const token = wx.getStorageSync('token');
      if (!token) {
        wx.navigateTo({
          url: '/pages/auth/index',
        });
        return
      }
      const order_price = this.data.totalPrice;
      const consignee_addr =this.data.address.all;
      const cart = this.data.cart;
      let goods = [];
      goods = cart.forEach(v => goods.push({
        goods_id: v.goods_id,
        goods_number: v.num,
        goods_price: v.goods_price
      }))
      const {order_number} = await request ({
        url: '/my/orders/create',
        data: {
          order_price,
          consignee_addr,
          goods
        },
        method: 'POST'
      });
     const res = await request({
       url: '/my/orders/req_unifiedorder',
       method: 'POST',
       data: {order_number}
     }) 
     const pay = res;
  
     // 发起微信支付
     await requestPayment(pay);
  
     // 查看订单支付状态
    const res1 = await request({
      url: '/my/orders/chkOrder',
      method: 'POST',
      data: {order_number}
    });
    await showToast({title: '支付成功'});

    // 手动删除缓存中，已经支付的商品
    let newCart = wx.getStorageSync('cart');
    newCart = newCart.filter(v => !v.checked);
    wx.setStorageSync("cart", newCart);
    
    // 支付成功跳转订单页面
    wx.navigateTo({
      url: '/pages/order/index',
    });
      

    } catch(error) {
    await showToast({title: '支付失败'})
    }
   
  
  },
});


