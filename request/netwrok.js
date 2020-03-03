
  
export default function(option) {
    const baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1';
    let header={...option.header};
    if(option.url.includes("/my/")){
      // 拼接header 带上token
      header["Authorization"]=wx.getStorageSync("token");
    }
    let ajaxTime = 0;
    ajaxTime++
    wx.showLoading({
        title: '加载中',
        mask: true
    
    });
    return new Promise((resolve, reject) => {
        wx.request({
            ...option,
            header: header,
            url: baseURL + option.url,
            method: option.method || 'GET',
            dataType: option.data || {},
            success: resolve,
            file: reject,
            complete: () => {
                ajaxTime--
                // 关闭正在等待的图标
                if (ajaxTime=== 0) {
                    wx.hideLoading()
                }
            }
        });
    })
}