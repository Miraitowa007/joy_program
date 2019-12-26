// pages/detail/detail.js
const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    details:[],
    id:0,
    active:1,
    value:'',
    comments:[]
  },
  onChange(event) {
    // event.detail 为当前输入的值
    this.setData({
      value:event.detail,
    })
  },
  getDetails:function(options){
    wx.cloud.callFunction({
      name:'getDetails',
      data:{
        id:options.id
      }
    }).then( res=>{
      console.log(res);
      this.setData({
        details:JSON.parse(res.result).result,
        id:options.id
      })
    }).catch( err=>{
      console.log(err);
    })
  },
  gotocomment:function(){
    wx.showLoading({
      title: '评价中',
    })
    db.collection('comments').add({
      data:{
        value: this.data.value,
        passtime: new Date().getTime(),
        id:this.data.id,
      }
    }).then( res=>{
      wx.hideLoading();
      wx.showToast({
        title: '评价成功',
      }),
      this.setData({
        value:''
      })
    }).catch( err=>{
      wx.hideLoading();
      wx.showToast({
        title: '评价失败',
      })
    })
  },
  show: function () {
    db.collection('comments').where({
      id:this.data.id
    }).get().then(res2 => {
      console.log(res2);
      this.setData({
        comments: res2.data
      })
    }).catch(err => { console.log(err) })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetails(options);
    this.show();
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})