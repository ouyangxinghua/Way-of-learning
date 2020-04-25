function MillisecondToDate(msd) {
    var time = parseFloat(msd) / 1000 / 3600;
    return time;
}

function money(time) {
    let result;
    if (time <= 1) result = 5;
    if (time > 1 && time < 24) {
        result = (time * 5).toFixed(1)
    }
    if (time > 24) {
        result = ((time / 24) * 50).toFixed(1)
    }
    return result
}

// 返回格式为xx天xx小时xx分钟
function transform(faultDate, completeTime) {
    var stime = Date.parse(new Date(faultDate));
    var etime = Date.parse(new Date(completeTime));
    // 两个时间戳相差的毫秒数
    var usedTime = etime - stime;
    // 计算相差的天数  
    var days = Math.floor(usedTime / (24 * 3600 * 1000));
    // 计算天数后剩余的毫秒数
    var leave1 = usedTime % (24 * 3600 * 1000);  
    // 计算出小时数  
    var hours = Math.floor(leave1 / (3600 * 1000));
    // 计算小时数后剩余的毫秒数
    var leave2 = leave1 % (3600 * 1000);        
    // 计算相差分钟数
    var minutes = Math.floor(leave2 / (60 * 1000));
    var time;
    if(days >= 1){
        time = days + "天" + hours + "时" + minutes + "分钟";
    }else {
        if(hours >= 1){
            time = hours + "时" + minutes + "分钟";
        }else {
            time = minutes + "分钟";
        }
    }
    return time;
}
console.log(transform(48947823,78947823))