// 云函数入口文件
const cloud = require('wx-server-sdk')
var rp = require('request-promise');
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return rp(`https://api.apiopen.top/getJoke?start=${event.start}&&count=${event.count}&&type=video`)
    .then(function (result) {
      return result
    })
    .catch(function (err) {
      console.log(err)
    });
}