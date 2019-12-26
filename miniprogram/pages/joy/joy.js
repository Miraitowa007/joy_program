// pages/joy/joy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    joylist:[],
  },
  getJoylist:function(){
    wx.showLoading({
      title: '欢乐马上到来',
    })
    wx.cloud.callFunction({
      name: "novallist",
      data: {
        start:this.data.joylist.length,
        count: 5,
      }
    }).then(res => {
      console.log(res);
      this.setData({
        joylist: this.data.joylist.concat   (JSON.parse(res.result).result)
      })
      wx.hideLoading();
    }).catch(err => {
      console.log(err);
      wx.hideLoading();
    })
  },
  getDetail:function(event){
    console.log(event.target.dataset.id)
    wx.navigateTo({
      url: `../detail/detail?id=${
        event.target.dataset.id}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getJoylist()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getJoylist()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})