export function getSetting() {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: result => {
        resolve(result);
      },
      fail: err => {
        reject(err);
      }
    });
  });
}

export function chooseAddress() {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: result => {
        resolve(result);
      },
      fail: err => {
        reject(err);
      }
    });
  });
}

export function openSetting() {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: result => {
        resolve(result);
      },
      fail: err => {
        reject(err);
      }
    });
  });
}

export function showModal({content}) {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '提示',
      content: content,
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    });
  });
}


export function showToast({title}) {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title: title,
      icon: 'none',
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    });
  });
}

export function login() {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout:10000,
      success: (result) => {
        resolve(result)
      },
      fail: err => {
        reject(err)
      }
    });
  });
}

/**
 * promise 形式 小程序微信支付
 * @param {object} pay  支付方式必要传的参数
 */
export function requestPayment(pay) {
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      timeStamp: pay.timeStamp,
      nonceStr: pay.nonceStr,
      package: pay.package,
      signType: pay.signType,
      paySign: pay.paySign,
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
    });
      
  });
}