/**
 * 格式化日期
 * @param {DateTime} time 日期格式
 */
export function formatTime (time) {
  var d = new Date(time);
  var times = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
  //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
  var dateBegin = new Date(times.replace(/-/g, "/"));//将-转化为/，使用new Date
  var dateEnd = new Date();//获取当前时间
  var dateDiff = dateEnd.getTime() - dateBegin.getTime();//时间差的毫秒数
  var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
  var leave1 = dateDiff % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
  var hours = Math.floor(leave1 / (3600 * 1000))//计算出小时数
  //计算相差分钟数
  var leave2 = leave1 % (3600 * 1000)    //计算小时数后剩余的毫秒数
  var minutes = Math.floor(leave2 / (60 * 1000))//计算相差分钟数
  //计算相差秒数
  // var leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
  // var seconds = Math.round(leave3 / 1000);
  var timesString = '';

  if (dayDiff != 0) {
    timesString = dayDiff + '天之前';
  } else if (dayDiff == 0 && hours != 0) {
    timesString = hours + '小时之前';
  } else if (dayDiff == 0 && hours == 0) {
    timesString = minutes + '分钟之前';
  }
  return timesString
}

/**
 * 过滤富文本内容
 * @param {String} data 富文本内容
 */
export function formatText (data) {
  data = data.replace(/(\n)/g, "");
  data = data.replace(/(\t)/g, "");
  data = data.replace(/(\r)/g, "");
  data = data.replace(/<\/?[^>]*>/g, "");
  data = data.replace(/\s*/g, "");
  return data;
}