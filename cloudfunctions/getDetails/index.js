// 云函数入口文件
const cloud = require('wx-server-sdk')
var rp = require('request-promise');
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {


  return rp(`https://api.apiopen.top/getSingleJoke?sid=${event.id}`)
    .then(function (res) {
      console.log(event.id);
      return res
    })
    .catch(function (err) {
      console.log(err);
    });
}