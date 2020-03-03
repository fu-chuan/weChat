// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "体验问题",
        isActive: true
      },
      {
        id: 1,
        value: "投诉",
        isActive: false
      }
    ],
    imgArray: [],
    text: ''

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
  },

  // 点击+号 添加图片
  handleChooseImg() {
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        this.setData({
          imgArray: [...this.data.imgArray, ...result.tempFilePaths]
        })
      }
    });   
  },
  
  // 删除图片
  removeImg(e) {
    let {index} = e.currentTarget.dataset;
    let {imgArray} = this.data;
    imgArray.splice(index, 1);
    this.setData({
      imgArray
    })
  },

  // 外网图片路径数组
  UpLoadImg: [],

  // 点击提交
  handleButton() {
    const {text, imgArray} = this.data;
    if (!text) {
      wx.showToast({
        title: '请输入文字',
        icon: 'none',
        mask: true,
      });
      return; 
    };

    wx.showLoading({
      title: '正在上传中',
      mask: true,
    });
      
    if (imgArray.length != 0) {
      imgArray.forEach((v, i) => {
        wx.uploadFile({
          url: 'https://images.ac.cn/Home/Index/UploadAction/',
          filePath: v,
          name: 'file',
          formData: {},
          success: (result) => {
            let url = JSON.parse(result.data).url;
            this.UpLoadImg.push(url);
            
        if (i === imgArray.length -1) {
          wx.hideLoading();
  
          this.setData({
            imgArray: [],
            text: ''
          });
          wx.navigateBack({
            delta: 1
          });
        }
          },
        });
  
      });
  
    } else {
      wx.hideLoading();
      wx.navigateBack({
        delta: 1
      });
        
    }
   
  },

  // 文本框事件
  handleText(e) {
    this.setData({
      text: e.detail.value
    });

  }
  
})